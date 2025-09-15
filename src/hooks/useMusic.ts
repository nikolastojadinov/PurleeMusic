import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface MusicFile {
  name: string;
  url: string;
  size: number;
  lastModified: string;
}

export const useMusic = () => {
  const [musicFiles, setMusicFiles] = useState<MusicFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMusicFiles = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // List files from the 'music' bucket
      const { data: files, error: listError } = await supabase.storage
        .from('music')
        .list('', {
          limit: 100,
          offset: 0
        });

      if (listError) {
        throw listError;
      }

      if (!files) {
        setMusicFiles([]);
        return;
      }

      // Filter for audio files and create URLs
      const audioFiles = files.filter(file => 
        file.name.endsWith('.mp3') || 
        file.name.endsWith('.wav') || 
        file.name.endsWith('.ogg') || 
        file.name.endsWith('.m4a')
      );

      const musicFilesWithUrls: MusicFile[] = await Promise.all(
        audioFiles.map(async (file) => {
          // Get public URL for the file
          const { data: urlData } = supabase.storage
            .from('music')
            .getPublicUrl(file.name);

          return {
            name: file.name,
            url: urlData.publicUrl,
            size: file.metadata?.size || 0,
            lastModified: file.updated_at || file.created_at || ''
          };
        })
      );

      setMusicFiles(musicFilesWithUrls);
    } catch (err) {
      console.error('Error fetching music files:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch music files');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMusicFiles();
  }, []);

  return {
    musicFiles,
    isLoading,
    error,
    refetch: fetchMusicFiles
  };
};