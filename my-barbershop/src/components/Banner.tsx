"use client"
import {motion, AnimatePresence} from "framer-motion"
import { useEffect, useState } from "react"
const slides=[
    {images:"/images/fauteille.webp",title:"Fauteille de coiffeur",description:"Decouvrer les nouveaux fauteilles confortables pour vos clients"},
    {images:"/images/mirroir1.jpg",title:"Mirroir",description:"Decouvrer nos nouveaux mirroirs pour vos clients"},
    {images:"/images/chariotderangement.webp",title:"Chariots de rangement mobiles",description:"Venez decouvrir nos nouveaux chariots de rangements pour vos outils"},
    {images:"/images/tondeuse-a-cheveux-electrique-alizz-rechargeable-al-809a.webp",title:"Tondeuse elictrique ",description:"voici les nouveaux tondeuses electriques avec fils et rechargeable "},
    {images:"/images/tondeusesansfil.jpg",title:"Tondeuse sans fils ",description:"Voici les nouveaux tondeuses sans fils rechargeable"},
    {images:"/images/protectiontondeuse.jpg",title:"Protection de tondeuse ",description:"Voici les nouveaux protection de tondeuse"},
    {images:"/images/ciseauxstandars.avif",title:"Ciseaux sans fils",description:"Voici les nouveaux ciseaux sans fils"},
    {images:"/images/peigne.jpg",title:"Peigne a cheveux ",description:"Voici les nouveaux peignes"},
    {images:"/images/raoir.webp",title:"Rasoirs",description:"Voici les nouveaux rasoirs"},
    {images:"/images/brosseapoussire.jpg",title:"Brosse a poussiere",description:"Voici les nouveaux brosse a poussiere"},
    {images:"/images/vaporisateur.avif",title:"Vaporisateur ",description:"Voici nos nouveaux vaporisateurs"},
    {images:"/images/cape.webp",title:"Cape de coiffeur ",description:"Voici les nouveaux capes de coiffeurs"},
    {images:"/images/tabliercoiffeur.avif",title:"Tablier de coiffeur ",description:"Voici nos nouveaux tablier de coiffeur"},
    {images:"/images/serviette.jpg",title:"Serviettes ",description:"Voici nos nouveaux serviettes"},
    {images:"/images/sacaoutils2.jpg",title:"Trousse a outils",description:"Voici nos nouveaux sac a outils"},
    {images:"/images/potsdedesinfectant.jpg",title:"Pots de desinfectant ",description:"Voici nos nouveaux pots de desinfectant"},
    {images:"/images/produitscapilaires.png",title:"Produits capillaires ",description:"Veuiller voir nos nouveaux produits capillaires"},

]
export default function Banner(){
    const [index, setIndex] = useState(0)
    useEffect(()=>{
        const interval =setInterval(()=>{
        setIndex((prevIndex)=>(prevIndex+1)%slides.length)
    },4000)
    return ()=>clearInterval(interval)
    },[])
    return(
        <div className="relative w-full h-[500px] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                key={index}
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{backgroundImage:`url(${slides[index].images})`}}
                initial={{opacity:0, x:100}}
                animate={{opacity:1, x:0}}
                exit={{opacity:0, x:-100}}
                transition={{duration:0.8}}
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
                <motion.h1 
                className="text-3xl md:text-5xl font-bold"
                initial={{opacity:0, y:-30}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.8}}
                >
                    {slides[index].title}
                </motion.h1>
                <motion.p
                className="mt-4 text-lg md:text-xl"
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                transition={{delay:0.2, duration:0.8}}
                >
                    {slides[index].description}
                </motion.p>

            </div>
        </div>
    )
}