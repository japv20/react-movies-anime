// import { useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";

export default function AnimeModal ({ anime, onClose }) {
    if (!anime) return null;

    return (
        <ModalPortal>
    
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
            <div className="relative text-center bg-gray-900 rounded-xl p-6 w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-white">
                    &times;
                </button>

                <img src={anime.images.jpg.large_image_url} className="w-48 mx-auto mb-4" alt={anime.title} />

                <h2 className="text-xl font-bold text-purple-300"> 
                    {anime.title} 
                </h2>

                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {/* condition ?. expressionIfTrue - If anime.genres exists then run map function */}
                    {anime.genres?.map((genre) => (
                        <span key={genre.mal_id} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"> 
                            {genre.name}
                        </span>
                    ))}
                </div>

                <p className="text-sm text-gray-400 mt-2">
                    {anime.synopsis || "No synopsis available"}
                </p>
            </div>
            </div>
        </ModalPortal>
    );
}