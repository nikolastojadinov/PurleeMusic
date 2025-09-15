# PurleeMusic

🎵 A modern music streaming application built with React and Express, featuring Supabase integration for cloud storage and HTTP range request support for efficient audio streaming.

## Features

- **Cloud Storage**: Integrates with Supabase for secure music file storage
- **HTTP Range Requests**: Efficient audio streaming with partial content support
- **Real-time Player**: Play/pause controls with progress tracking
- **Now Playing**: Display current track information and progress
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Full TypeScript support for better development experience

## Tech Stack

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Supabase** - Cloud storage and database
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logging

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **CSS Grid** - Responsive layout
- **HTML5 Audio** - Native audio playback with range request support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd PurleeMusic
```

### 2. Environment Configuration

Copy the example environment file and configure your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Supabase details:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
PORT=3001
```

### 3. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Create a storage bucket named `music`:
   ```sql
   -- In Supabase SQL Editor
   INSERT INTO storage.buckets (id, name, public) VALUES ('music', 'music', true);
   ```
3. Set up storage policies for public access:
   ```sql
   -- Allow public read access to music files
   CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'music');
   ```

### 4. Install Dependencies

Install dependencies for both server and client:

```bash
npm run install:all
```

### 5. Upload Music Files

Upload your audio files (mp3, wav, flac, ogg, m4a, aac) to the `music` bucket in your Supabase dashboard.

## Development

### Start Development Servers

Run both backend and frontend in development mode:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend development server on `http://localhost:3000`

### Individual Commands

**Backend only:**
```bash
npm run server:dev
```

**Frontend only:**
```bash
npm run client:dev
```

## Production

### Build the Application

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

The application will be available at `http://localhost:3001`

## API Endpoints

### GET `/api/music`
Lists all audio files from the Supabase `music` bucket.

**Response:**
```json
{
  "files": [
    {
      "id": "file-id",
      "name": "song.mp3",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z",
      "last_accessed_at": null,
      "metadata": {}
    }
  ]
}
```

### GET `/api/stream/:name`
Streams an audio file by name with HTTP range request support for efficient playback.

**Parameters:**
- `name`: The filename of the audio file

**Headers:**
- `Range`: Optional. Specify byte range for partial content (e.g., `bytes=0-1023`)

**Response:**
- `200`: Full file content
- `206`: Partial content (when range header is provided)
- `404`: File not found
- `416`: Range not satisfiable

## File Format Support

Supported audio formats:
- MP3 (.mp3)
- WAV (.wav)
- FLAC (.flac)
- OGG (.ogg)
- M4A (.m4a)
- AAC (.aac)

## Architecture

### Backend Structure
```
server/
├── src/
│   └── index.ts          # Main Express server
├── package.json          # Server dependencies
└── tsconfig.json         # TypeScript configuration
```

### Frontend Structure
```
client/
├── src/
│   ├── components/
│   │   ├── MusicList.tsx      # File listing component
│   │   ├── MusicPlayer.tsx    # Audio player component
│   │   └── NowPlaying.tsx     # Current track display
│   ├── App.tsx               # Main application component
│   └── App.css              # Global styles
└── package.json             # Client dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
