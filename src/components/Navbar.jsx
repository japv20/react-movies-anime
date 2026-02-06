import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-purple-700 font-mono text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-2x1 font-bold"> Movies and Anime Explorer </h1>
            <ul className="flex gap-6">
                <li> <Link to="/" className="hover:text-lilac-200"> Home </Link> </li>
                <li> <Link to="/movies" className="hover:text-lilac-200"> Movies </Link> </li>
                <li> <Link to="/anime" className="hover:text-lilac-200"> Anime </Link> </li>
            </ul>
        </nav>
    )
}