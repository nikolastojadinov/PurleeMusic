
type Song = {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
};

interface RecentlyPlayedProps {
  songs: Song[];
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ songs }) => {
  return (
    <div className="recently-played">
      <h2 className="text-xl font-bold mb-4">Recently Played</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {songs.map((song: Song) => (
          <div key={song.id} className="flex-shrink-0 w-32">
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
            />
            <p className="mt-2 text-sm font-semibold">{song.title}</p>
            <p className="text-xs text-gray-400">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
