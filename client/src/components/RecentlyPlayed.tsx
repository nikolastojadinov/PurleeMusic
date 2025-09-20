
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
    <div className="recently-played px-2">
      <h2 className="text-xl font-bold mb-4 pl-1">Recently Played</h2>
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {songs.map((song: Song) => (
          <div
            key={song.id}
            className="flex-shrink-0 flex flex-col items-center w-20 md:w-24 lg:w-28"
          >
            <div className="relative group">
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-md shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:shadow-lg"
              />
              <button
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 rounded-md"
                tabIndex={-1}
                aria-label={`Play ${song.title}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32" height="32">
                  <circle cx="12" cy="12" r="12" fill="black" fillOpacity="0.6" />
                  <polygon points="10,8 17,12 10,16" fill="white" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-xs md:text-sm font-semibold text-center truncate w-full max-w-[5.5rem] md:max-w-[6.5rem] lg:max-w-[7.5rem]" title={song.title}>
              {song.title}
            </p>
            <p className="text-[11px] md:text-xs text-gray-400 text-center truncate w-full max-w-[5.5rem] md:max-w-[6.5rem] lg:max-w-[7.5rem]" title={song.artist}>
              {song.artist}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
