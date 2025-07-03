import { getAllCategoriesWithCount } from "@/services/categories/getAllCategoriesWithCount"



export default async function CategoryListPage(){
    const categories = await getAllCategoriesWithCount()
    const imagesMap :{[key:string]:string}={
  "Ciseaux": "/images/haircut-ciseaux-de-coiffure-sans-microdenture-1.jpg",
  "Tondeuses": "/images/tondeuse-coiffure-obarber-TO30.jpg",
  "Fauteilles": "/images/fauteille-noires.jpg",
  "Mobile barbiers": "/images/barbier.webp",
  "Mirroirs": "/images/mirroir2.avif",
  "Désinfectant": "/images/potsdedesinfectant.jpg",
  "Peignes": "/images/peigne01.jpg",
  "Rasoirs": "/images/rasoirs.jpg",
  "Brosses": "/images/brosses.jpg",
  "Capes": "/images/cape.jpg",
  "Trousses": "/images/trousses.webp",
  "Serviettes": "/images/serviette2.webp",
  "Protection tondeuses": "/images/protectiontondeuse.jpg",
   "Tabliers": "/images/tablier2.jpg",
  "Vaporisateurs": "/images/vaporisateur4.webp",
  "Cremes": "/images/cremes2.webp"
}
    return(
        <div className="w-full auto mx-auto mt-10 px-3">
            <h1 className="text-center text-2xl font-bold mb-12">Nos categories</h1>
            <div
            className="grid grid-cols-3 md:grid-cols-8 gap-x-1 gap-y-3"
            >
            {categories.map((category)=>(
                <a 
                    key={category.title}
                    className="flex flex-col items-center group"
                    href={`/products?category=${category.title}`}>
                    <div
                        className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden mb-2 border border-gray-300 group-hover:border-gray-600 transition-all">
                        <img 
                        className="object-cover group-hover:scale-110 transition-transform-400"
                        src={imagesMap[category.title] || "/images/potsdedesinfectant.jpg"  }
                        alt={category.title} 
                        />
                    </div> 
                    <span className="text-sm md:text-base text-center font-bold">{category.title}</span>   
                </a>
            ))}
          </div>
        </div>
    )
}