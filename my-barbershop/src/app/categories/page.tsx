import CategoryList from "@/components/CategoryList"
import { CategoryWithCount } from "@/lib/types/category";

import { getAllCategoriesWithCount } from '@/services/categories/getAllCategoriesWithCount';

export default async function CategoriesPage() {
  //const categories = await getAllCategoriesWithCount();
    const categories: CategoryWithCount[] = await getAllCategoriesWithCount();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Catégories</h1>
      <ul className="grid grid-cols-2 gap-4">
        {categories.map((cat: any) => (
          <li key={cat.id} className="border p-2 rounded shadow">
            <h2 className="font-semibold">{cat.title}</h2>
            <p className="text-sm text-gray-600">Produits : {cat.productCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



// export default function CategoryPage(){
//     return(
//         <div className="mx-auto p-4 ">
//             <h1 className="text-2xl font-bold mb-4 text-center">Nos categories</h1>
//             <CategoryList/>
//         </div>
//     )
// }