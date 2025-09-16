import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./SongsGrid.css";

const supabaseUrl = "https://ofkfygqrfenctzitigae.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ma2Z5Z3FyZmVuY3R6aXRpZ2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NjgwMjcsImV4cCI6MjA3MzI0NDAyN30.-GFl3-IncJ7hno_LHE5jtCOe_HI07nxwiq3aaISHolo";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Song {
  id: number;
  title: string;
  artist: string;
  audio_url: string;
  cover_url: string;
}


const SongsGrid: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase.from("songs").select("*").limit(4);
      if (error) {
        setError(error.message);
      } else if (data) {
        setSongs(data);
      }
      setLoading(false);
    };
    fetchSongs();
  }, []);

  if (loading) return <div>Učitavanje pesama...</div>;
  if (error) return <div style={{color:'#f00',textAlign:'center',marginTop:'2rem'}}>Greška: {error}</div>;
  if (!songs.length) return <div style={{textAlign:'center',marginTop:'2rem'}}>Nema pesama za prikaz.</div>;

  return (
    <div className="songs-grid">
      {songs.map((song) => (
        <div className="song-card" key={song.id}>
          <img className="cover" src={song.cover_url} alt={song.title} />
          <div className="song-info">
            <div className="title">{song.title}</div>
            <div className="artist">{song.artist}</div>
          </div>
          <audio controls src={song.audio_url} className="audio-player" />
        </div>
      ))}
    </div>
  );
};

export default SongsGrid;
