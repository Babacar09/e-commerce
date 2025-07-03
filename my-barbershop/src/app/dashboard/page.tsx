"use client"

import { HouseIcon, Link } from "lucide-react"

export default function DashboardPage(){
    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Bienvenu sur le dashboard</h1>
            <p className="text-gray-600">Gerer les commandes votre profils et bien plus encore</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 bg-white rounded-xl shadow-md text-center">
                
                    <h2 className="text-xl font-semibold text-center" >
                        
                        <a href="/dashboard/orders"  > Commandes </a>
                        
                    

                        </h2>
                  
                    <p className="text-gray-500 mt-2">Voir et gerer toutes les commandes</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md text-center">
                    <h2 className="text-xl font-semibold">
                    <a href="/dashboard/users">Profils</a>    
                    </h2>
                    <p className="text-gray-500 mt-2">Modifier vos informations</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md text-center">
                    <h2 className="text-xl font-semibold">
                    <a href="/dashboard/products">Produits</a>    
                    </h2>
                    <p className="text-gray-500 mt-2">Modifier vos informations</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md text-center">
                    <h2 className="text-xl font-semibold">Parametres</h2>
                    <p className="text-gray-500 mt-2">Gerer vos preferences et options</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md text-center">
                    <h2 className="text-xl font-semibold">
                      <a href="/dashboard/categories">Categories  </a>  
                    </h2>
                    <p className="text-gray-500 mt-2">Ajouter les differentes produits</p>
                </div>
                    <div className="p-6 bg-white rounded-xl shadow-md text-center">
                    <h2 className="text-xl font-semibold">
                      <a href="/dashboard/contact">Contact  </a>  
                    </h2>
                    <p className="text-gray-500 mt-2">Voir les messages des contacts</p>
                </div>
            </div>
        </div>
    )
}