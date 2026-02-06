import { useEffect, useState } from "react";

export default function Anime({ onSelect }) {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
                const data = await response.json();
                const items = data.data || [];
                
                // Use map to filter the id of the animes as there is one that has the same id twice.
                const map = new Map();
                items.forEach((item) => {
                    const id = item?.mal_id;
                    if (id != null && !map.has(id)) {
                        map.set(id, item);
                    }
                });
                const uniqueItems = Array.from(map.values());
                setAnimeList(uniqueItems);
                console.log(uniqueItems)
            } catch (error) {
                console.error("Error fetching anime:", error);
            } finally {
                setLoading(false);
            };
        };

        fetchAnime();
    }, []);

    if (loading) {
        return (
        <p className="text-center mt-10 text-gray-400"> 
        Loading anime... </p> );
    }

    return (
        <section className="p-10">
            <h2 className="text-center text-3xl font-semibold mb-4 text-lilac-200">
                Anime
            </h2>

            <p className="mb-6 text-gray-400">
                Explore trending and upcoming anime!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                
                {animeList.map((anime) => (
                    <div key={anime.mal_id} 
                    className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition"
                    onClick={() => {
                        console.log("Clicked:", anime.title);
                        onSelect(anime);
                    }}>
                    
                    <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-72 object-cover"/>

                    <div className="p-3">
                        <h3 className="text-lg font-semibold text-lilac-200">
                            {anime.title}
                        </h3>

                        <p className="text-sm text-gray-400">
                            {anime.type} * {anime.year || "TBA"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </section>
    )
}