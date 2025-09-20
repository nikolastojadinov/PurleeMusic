import React from "react";

export type Song = {
  title: string;
  artist: string;
  cover_url: string;
};

const songs: Song[] = [
  {
    title: "Retro Lounge",
    artist: "PurpleMusic Artist",
    cover_url: "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Covers/F6897AAD-9902-4F0C-95EA-FD213A783D92.png",
  },
  {
    title: "Deep Abstract Ambient",
    artist: "PurpleMusic Artist",
    cover_url: "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Covers/621B279E-CA15-482E-849A-60D0774A9DD5.png",
  },
  {
    title: "Running Night",
    artist: "PurpleMusic Artist",
    cover_url: "https://ofkfygqrfenctzitigae.supabase.co/storage/v1/object/public/Covers/76DD6929-0A2A-4D7C-8E09-86124174600A.png",
  },
];

const RecentlyPlayed: React.FC = () => (
  <section>
    <h2 className="text-xl font-bold text-yellow-300 mb-4">Recently Played</h2>
    <div className="flex overflow-x-auto gap-4 pb-2">
      {songs.map((song, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center min-w-[120px] max-w-[140px] flex-shrink-0"
        >
          <div
            className="w-[120px] h-[120px] bg-gray-800 rounded-xl overflow-hidden shadow-lg flex-shrink-0"
          >
            <img
              src={song.cover_url}
              alt={song.title}
              className="w-full h-full object-cover rounded-xl"
              draggable={false}
            />
          </div>
          <div className="w-full text-center mt-2">
            <div className="font-semibold text-white truncate">{song.title}</div>
            <div className="text-sm text-gray-400 truncate">{song.artist}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default RecentlyPlayed;
