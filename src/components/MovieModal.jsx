import { useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";

export default function MovieModal ({ movie, onClose }) {
    if (!movie) return null;

    const [genresMap, setGenresMap] = useState({});
    useEffect(() => {
        const fetchGenres = async () => {
        try {
            const genres = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=aa1e27152f2b9dd7d5b3ccb3268be17a&language=en-UK");
            const genresData = await genres.json();

            const map = {};
            genresData.genres.forEach((genre) => {
                map[String(genre.id)] = genre.name;
            });
            setGenresMap(map);
        } catch (error) {
            console.error("Genre fetched failed", error);
        }
        };
        fetchGenres();
    }, [])

    return (
        <ModalPortal>
    
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
            <div className="relative bg-gray-900 text-center rounded-xl p-6 w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-3xl text-white">
                    &times;
                </button>

                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-48 mx-auto mb-4" alt={movie.original_title} />

                <h2 className="text-xl font-bold text-purple-300"> 
                    {movie.original_title} 
                </h2>

                <div className="flex flex-wrap gap-2 justify-center items-center mb-4">
                    {movie.genre_ids.map((id) => (
                        <span key={id} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                        {genresMap[String(id)] || "Unknown"}
                        </span>
                    ))}
                </div>

                <p className="text-sm text-gray-400 mt-2">
                    {movie.overview}
                </p>

            </div>
            </div>
        </ModalPortal>
    );
}