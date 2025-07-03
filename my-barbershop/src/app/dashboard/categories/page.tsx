
import { getAllCategoriesWithCount } from "@/services/categories/getAllCategoriesWithCount";


export default async function CategoriesAdmin(){
    const categories = await getAllCategoriesWithCount();
   
    return(
        <div className="p-6">
            <h1 className="text-center font-bold text-3xl">Listes des categories</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md">
                        <thead>

                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border">Id</th>
                                <th className="py-2 px-4 border">Noms</th>
                            </tr>
                        </thead>
                            <tbody>
                                {categories.map((category)=>(
                                   <tr key={category.id}>
                                        <td className="py-4 px-6 border text-xl font-bold">{category.id}</td>
                                        <td className="py-4 px-6 border text-2xl font-bold text-center">{category.title}</td>
                                   </tr> 
                                ))}
                            </tbody>
                    
                    </table>
                </div>

        </div>      
    )
}