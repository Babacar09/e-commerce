"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

export default function Login(){
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const router = useRouter()
    const handleLogin = async (e: React.FormEvent)=>{
        e.preventDefault()
        const res = await fetch("http://localhost:3000/api/v1/users/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
              
            },
            body:JSON.stringify({email, password})
        })
        const data = await res.json()
        if(res.ok){
            //si la connexion reussi enregistre le token dans le localStorage
            //localStorage.setItem('token', data.accessToken)
            localStorage.setItem("authToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user))

            console.log("Token enregistré:", data.accessToken);
            console.log("Utilisateur enregistré:", data.user);
            router.push("/")//Redirige l'utilisateur vers la page d'accueil
        }else{
            console.error("Erreur de connexion", data.message)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-5xl h-full">
                {/* <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Se connecter</h2> */}
            
            <div className="w-1/2 h-92">
                <Swiper 
                   modules={[Autoplay]}
                   spaceBetween={50}
                   slidesPerView={1}
                   autoplay={{ delay: 3000, disableOnInteraction:false }} 
                   loop={true} 
                   className="h-full"
                >
                    <SwiperSlide><img className="w-full h-full object-cover" src="/images/banner1.jpg" alt="slide1"/></SwiperSlide>
                    <SwiperSlide><img className="w-full h-full object-cover" src="/images/banner2.jpg" alt="slide2"/></SwiperSlide>
                    <SwiperSlide><img className="w-full h-full object-cover" src="/images/depositphotos_204479656-stock-photo-barber-shop-tools-equipment-men.jpg" alt="slide3"/></SwiperSlide>

                </Swiper>
            </div>
            <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg h-full flex items-center justify-center">
                <div className="w-full max-w-sm">

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Se connecter</h2>
           
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"            
                        />
                    </div>
                    <div>
                        <input type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="password"
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                            <label htmlFor="remember" className="text-sm text-gray-600 ml-2">Se souvenir de moi</label>
                        </div>
                        <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Mot de passe oublie</a>
                    </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Se connecter</button>
                </form>
                <div className="mt-6 text-center">
                    <span className="text-sm text-gray-600">Vous n'avez pas de compte?</span>
                    <a href="/auth/register" className="text-sm font-semibold text-blue-600 hover:underline">Inscrivez vous</a>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}