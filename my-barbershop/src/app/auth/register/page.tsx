"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import { Autoplay } from "swiper/modules"


export default  function Register(){
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [avatar, setAvatar] = useState<string>("")
    const [error, setError] = useState<string>("")
    const router = useRouter()
    const handleRegister = async( e:React.FormEvent)=>{
        e.preventDefault()
        if(password !== confirmPassword) {
            setError("les mots de passe ne correspondent pas")
            return
        }
        try{
        const res = await fetch('http://localhost:3000/api/v1/users/signup',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name, email, password})
        })
        const data = await res.json()

        if(res.ok && data.user){
            //localStorage.setItem("token", data.accessToken)
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log(    localStorage.setItem('user', JSON.stringify(data.user)))
            router.push("/")
        }else{
            setError(data.message || "Erreur lors de l'inscription")
        }
    }catch(err){
        setError(`Erreur de connexion :${err instanceof  Error? err.message:'Probleme inconnu'}`)
    }
    }
    return (



<div className="min-h-screen flex items-center justify-center bg-gray-100">
   
{/* Conteneur flex pour les deux sections */}
<div className="flex w-full max-w-5xl h-full">
    {/* Partie Carrousel */}
    <div className="w-1/2 h-133 ">
        <Swiper 
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction:false }} 
        loop={true} 
        className="h-full"
        >
            <SwiperSlide><img className="w-full h-full object-cover" src="/images/banner1.jpg" alt="Slide 1" /></SwiperSlide>
            <SwiperSlide><img className="w-full h-full object-cover" src="/images/banner2.jpg" alt="Slide 2" /></SwiperSlide>
            <SwiperSlide><img className="w-full h-full object-cover" src="/images/Bocal-de-d-sinfection-en-verre-transparent-bouteille-de-d-sinfectant-pour-outils-de-barbier.avif" alt="Slide 3" /></SwiperSlide>
        </Swiper>
    </div>

    {/* Partie Formulaire */}
    <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg h-full flex items-center justify-center">
        <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">S'inscrire</h2>

            <form onSubmit={handleRegister} className="space-y-4">
                {error && (
                    <div className="text-sm text-red-500 text-center mb-4">{error}</div>
                )}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Nom</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">S'inscrire</button>
            </form>

            <div className="mt-6 text-center">
                <span className="text-sm text-gray-600">Vous avez déjà un compte ?</span>
                <a href="/auth/login" className="text-sm font-semibold text-blue-600 hover:underline">Se connecter</a>
            </div>
        </div>
    </div>
</div>
</div>

    )
}