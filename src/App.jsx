import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Anime from './pages/Anime';
import AnimeModal from './components/AnimeModal';
import MovieModal from './components/MovieModal';

function App() {
  // const [count, setCount] = useState(0)

  const [ selectedAnime, setSelectedAnime ] = useState(null);
  const [ selectedMovie, setSelectedMovie ] = useState(null);
  const [ genresMap, setGenresMap ] = useState({});

  return (
    <div className='min-h-screen bg-gray-950 text-white font-sans'>
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies onSelect={setSelectedMovie} genresMap={genresMap} />} />
          <Route path="/anime" element={<Anime onSelect={setSelectedAnime} />} />
        </Routes>
      </main>

      {selectedAnime && (
        <AnimeModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
          />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} genresMap={genresMap}
        onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
    );
}

export default App