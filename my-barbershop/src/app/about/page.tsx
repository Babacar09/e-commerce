"use client";
import Footer from "@/components/Footer";
import { FaHandshake, FaStar, FaTruck } from "react-icons/fa";
import { FaCut } from "react-icons/fa";


export default function AboutPage() {

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-12 text-gray-800 w-full">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">À propos de <span className="text-yellow-700">My Barbershop</span></h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          L’élégance, la performance et le style au service de votre coupe. Nous sommes plus qu’une boutique – nous sommes votre partenaire beauté.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">💈 Notre histoire</h2>
          <p className="text-gray-700 leading-relaxed">
            Fondée par des passionnés de la coiffure et du soin masculin, <strong>My Barbershop</strong> est née d’une envie de proposer des outils de qualité professionnelle au plus grand nombre.
            Chaque produit est soigneusement sélectionné pour garantir une expérience unique, digne des meilleurs salons.
          </p>
        </div>
        <img
          src="./images/barbershoplogo.webp"
          alt="Barbershop"
          className="rounded-lg shadow-lg w-full h-auto object-cover"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-center mb-8">🚀 Pourquoi choisir My Barbershop ?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <FaCut className="mx-auto text-3xl text-yellow-700" />
            <h3 className="font-semibold text-lg">Qualité Pro</h3>
            <p className="text-sm text-gray-600">Des produits haut de gamme utilisés par les professionnels.</p>
          </div>
          <div className="space-y-2">
            <FaTruck className="mx-auto text-3xl text-yellow-700" />
            <h3 className="font-semibold text-lg">Livraison Rapide</h3>
            <p className="text-sm text-gray-600">Expédition express et suivi à chaque étape.</p>
          </div>
          <div className="space-y-2">
            <FaHandshake className="mx-auto text-3xl text-yellow-700" />
            <h3 className="font-semibold text-lg">Service Client</h3>
            <p className="text-sm text-gray-600">Une équipe à l’écoute et réactive 7j/7.</p>
          </div>
          <div className="space-y-2">
            <FaStar className="mx-auto text-3xl text-yellow-700" />
            <h3 className="font-semibold text-lg">Avis Vérifiés</h3>
            <p className="text-sm text-gray-600">Des milliers de clients satisfaits partout dans le pays.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 p-8 rounded-lg shadow-inner">
        <h2 className="text-2xl font-bold mb-4">📍 Où nous trouver ?</h2>
        <p>
          Nous sommes basés à <strong>Paris</strong>, mais nous livrons dans toute la France.
          Suivez-nous sur <a href="https://instagram.com" className="text-red-600 underline">Instagram</a> pour découvrir nos dernières nouveautés et conseils.
        </p>
      </section>

     
   

    </main>
  


 

  
           
  )
 
   
}
     

