

export default function BannerStatic(){
    return(
        <div className="flex bg-whitesmoke from-white-500 to-indigo-600 text-black p-10 rounded-xl shadow-lg max-w-full mx-auto" 

        >
            <div className="w-1/2 space-y-11 mt-11" >
                <h1 className="text-4xl font-bold leading-tight ">Welcome to Barbershop</h1>
                <p className="text-lg">
                Barebershop est une boutique de qui vend des articles <br />
                 de coiffure pour les coiffeurs et les clients
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                    En savoir plus
                </button>
            </div>
            <div className="w-1/2 flex justify-center">
                <img
                    src="/images/matosbarber.jpg"
                    alt="Design"
                    className="w-[450PX] h-[450PX] rounded-full shadow-xl object-cover"
                />
            </div>
          
        </div>
    )
}