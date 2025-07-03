"use client"


import Link from "next/link";
import { useEffect, useState } from "react";

interface Category{
    id:string;
    title:string;
    description:string
   
}

export default function CategoryList(){
    const [categories, setCategories] = useState<Category[]>([])
    const [loadings, setLoadings] = useState(true)
    const [error, setError] = useState<string|null>(null)

    useEffect(()=>{
        const fetchCategories = async()=>{
        try {
            const response =  await fetch("http://localhost:3000/api/v1/categories")
            if(!response.ok){
                throw new Error("erreur de la recuperation des categories")
            }
            const data = await response.json()
            console.log("✅ Réponse de l'API :", data);
            const sortedData = data.sort((a:Category, b:Category) => Number(a.id) - Number(b.id));

            setCategories(sortedData)
        } catch (err:any) {
           setError(err.message)
        }finally{
            setLoadings(false)
        }
    
    }
    fetchCategories()

    },[])

  
    if(loadings) return <p>Chargement des categories...</p>
    if(error) return <p className="text-red-500">erreur:{error}</p>
    return(
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 bordered-rounded">
            {categories.map((category)=>(
            <Link 
                     key={category.id}   
                     href={`/categories/${category.id}`}
                     className="px-12 px-4  text-blue-800 font-semibold rounded-lg hover:bg-gray-400 transition text-center m-2 max-w-[200px] min-w-[150px]"
                        >
                     {category.title}
            </Link>
           
                  
           ))}
        
           
          
        </div>
    )
}