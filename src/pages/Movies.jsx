import { useEffect, useState } from "react";

// format date yyyy-mm-dd to dd-mm-yyyy
function formatDate(dateString) {
    if (!dateString) return "To be announced...";

    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function Movies({ onSelect }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=aa1e27152f2b9dd7d5b3ccb3268be17a&language=en-UK");
                const data = await response.json();
                setMovies(data.results || []);
                console.log(data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
        
    }, []);

    if (loading) {
        return <p className="text-center mt-10 text-gray-400">Loading movies...</p>;
    }

    return (
        <section className="p-10">
            <h2 className="text-center text-3xl font-semibold mb-4 text-lilac-200"> Movies </h2>
            <p className="mb-6 text-gray-400"> 
                Explore trending and upcoming movies here! 
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <div key={movie.id} className="cursor-pointer bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition" 
                    onClick={() => {
                        console.log("Interested in:", movie.title);
                        onSelect(movie);
                    }}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-72 object-cover" />

                        <div className="p-3 text-center">
                            <h3 className="text-lg font-semibold text-lilac-200"> {movie.title} </h3>
                            <p className="text-sm text-gray-400"> Release date: {formatDate(movie.release_date)} </p>
                            {/* <p className="text-sm text-gray-400"> {movie.overview} </p> */}
                        </div> 
                    </div>
                ))}
            </div>
        </section>
    )
}