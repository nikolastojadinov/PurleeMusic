import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required environment variables: SUPABASE_URL, SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes

// GET /api/music - List music files from Supabase bucket
app.get('/api/music', async (req, res) => {
  try {
    const { data, error } = await supabase.storage
      .from('music')
      .list('', {
        limit: 100,
        offset: 0,
      });

    if (error) {
      console.error('Error listing music files:', error);
      return res.status(500).json({ error: 'Failed to list music files' });
    }

    // Filter for audio files only
    const audioFiles = data?.filter(file => {
      const ext = file.name.toLowerCase().split('.').pop();
      return ext && ['mp3', 'wav', 'flac', 'ogg', 'm4a', 'aac'].includes(ext);
    }) || [];

    res.json({ files: audioFiles });
  } catch (error) {
    console.error('Unexpected error listing music files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/stream/:name - Stream audio file with range request support
app.get('/api/stream/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const range = req.headers.range;

    // Get signed URL for the file
    const { data, error } = await supabase.storage
      .from('music')
      .createSignedUrl(name, 3600); // 1 hour expiry

    if (error || !data?.signedUrl) {
      console.error('Error creating signed URL:', error);
      return res.status(404).json({ error: 'File not found' });
    }

    // Fetch file info to get content length
    const headResponse = await fetch(data.signedUrl, { method: 'HEAD' });
    if (!headResponse.ok) {
      return res.status(404).json({ error: 'File not found' });
    }

    const contentLength = parseInt(headResponse.headers.get('content-length') || '0');
    const contentType = headResponse.headers.get('content-type') || 'audio/mpeg';

    if (!range) {
      // If no range requested, send entire file
      res.set({
        'Content-Type': contentType,
        'Content-Length': contentLength.toString(),
        'Accept-Ranges': 'bytes',
      });

      const response = await fetch(data.signedUrl);
      if (!response.body) {
        return res.status(500).json({ error: 'Failed to stream file' });
      }

      response.body.pipe(res);
      return;
    }

    // Parse range header
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : contentLength - 1;
    const chunkSize = (end - start) + 1;

    // Fetch partial content
    const response = await fetch(data.signedUrl, {
      headers: {
        'Range': `bytes=${start}-${end}`,
      },
    });

    if (!response.ok || !response.body) {
      return res.status(416).json({ error: 'Range not satisfiable' });
    }

    res.status(206);
    res.set({
      'Content-Range': `bytes ${start}-${end}/${contentLength}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize.toString(),
      'Content-Type': contentType,
    });

    response.body.pipe(res);

  } catch (error) {
    console.error('Unexpected error streaming file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🎵 PurleeMusic server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;