//import Navbar from "./Navbar";


import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    
                    {/* Colonne 1 : Logo & Description */}
                    <div>
                        <Link href="/" className="text-xl font-bold">
                            <Logo />
                        </Link>
                        <h2 className="text-2xl font-bold">Barbershop</h2>
                        <p className="mt-2 text-gray-400">
                            Découvrez nos produits de qualité et profitez des meilleures offres.
                        </p>
                    </div>

                    {/* Colonne 2 : Liens Rapides */}
                    <div>
                        <h3 className="text-xl font-semibold">Liens Utiles</h3>
                        <ul className="mt-3 space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white">Accueil</a></li>
                            <li><a href="/products" className="text-gray-400 hover:text-white">Produits</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-white">À propos</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Contact & Réseaux Sociaux */}
                    <div>
                        <h3 className="text-xl font-semibold">Contact</h3>
                        <p className="mt-2 text-gray-400">Email : contact@monshop.com</p>
                        <div className="flex justify-center md:justify-start space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook text-2xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-twitter text-2xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <i className="fab fa-instagram text-2xl"></i>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    © {new Date().getFullYear()} Mon E-Commerce. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}