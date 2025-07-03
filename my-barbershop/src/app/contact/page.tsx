"use client";


import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState<string|null>(null);
  const [error, setError] = useState<string |null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi (à remplacer par logique API)
    setSuccess(null);
    setError(null)
    setFormData({ name: "", email: "", message: "" });
    try {
      const res = await fetch('http://localhost:3000/api/v1/contact-message',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',

        },
        body:JSON.stringify(formData)
      })
      if(!res.ok){
        const err = await res.json()
        throw new Error(err.message || 'Erreur inconnue')
      }
       setSuccess('Message envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' });
    } catch (err:any) {
      setError(err.message)
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-66 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg max-w-5xl w-full grid md:grid-cols-2 overflow-hidden max-h-5xl">
        {/* Left: Form */}
        <div className="p-8 md:p-12">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Nous contacter</h1>
          {success && <p className="text-green-600 mb-4">Votre message a été envoyé !</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="Écrivez votre message ici..."
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-700 hover:bg-yellow-900 text-white px-6 py-3 rounded-md font-semibold shadow w-full"
            >
              Envoyer
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="bg-yellow-700 text-white flex flex-col justify-center p-8 md:p-12 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Nos coordonnées</h2>
            <div className="flex items-center gap-3 mb-4">
              <FaEnvelope className="text-xl" />
              <span>contact@mybarbershop.com</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <FaPhoneAlt className="text-xl" />
              <span>+33 6 12 34 56 78</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-xl" />
              <span>123 Rue des Coiffeurs, 75001 Paris</span>
            </div>
          </div>
        </div>
      </div>

    </main>
      
  
  
    )
}



