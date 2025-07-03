"use client"
//import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type Product={
    id:number;
    images:string[];
    title:string;
    price:number
    description:string;
    stock:number;
    categoryId:number|null;
    
}

const DashboardProducts = () =>{
const router = useRouter()
const [products, setProducts] = useState<Product[]>([])
const [currentPage, setPage] = useState<number>(1)
const [totalPages, setTotalPages] = useState<number>(1);
const limit = 8
const [product, setProduct] = useState({
    id:0,
    title:"",
    description:"",
    price:0,
    stock:0,
    images:"",
    categoryId:0
})
//console.log("Donnees envoye:",product)
const [loadings, setLoadings] = useState(false)
const [errorMessage, setErrorMessage] = useState("")

useEffect(()=>{
const fetchProducts = async()=>{
    try {
        const API_URL= process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000/api/v1/products?page=${currentPage}&limit=${limit}`
        const token =localStorage.getItem('adminToken')
        const response = await fetch(`${API_URL}/products`)

        console.log("🟢 Token récupéré :", token);


        if (!token) {
            console.error("❌ Aucun token trouvé !");
            return setErrorMessage("Erreur : Vous devez être connecté en tant qu'admin.");
        }
        
        console.log('Response Status:', response.status);
        if(!response.ok) throw new Error(`Erreur de la recuperation des produits(status:${response.status})`)
            const data = await response.json()
        console.log("produit recuprer", data)
           if(data && Array.isArray(data.products)){
            setProducts(data.products)
           }else if(data && data.products){
            setProducts([data.product])
            setTotalPages(Math.ceil(Number(data.totalPages)));
           }else{
            throw new Error("les donnees ne sont pas valides")
           }
            
        

       
       // setProducts(products)
        //console.log(response)
        
    } catch (error) {
        console.error("Erreur:", error)
        setErrorMessage('Erreur de recuperation des donnees')
    }
}

fetchProducts()
},[currentPage])
const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}= e.target
    setProduct({
        ...product,
         [name]:
         name === "price" // Si c'est le prix, on formate en nombre à 2 décimales
         ? value === ""
             ? 0 // Si vide, on met une valeur par défaut
             : parseFloat(value) // Convertir en nombre
         : name === "stock" // Si c'est le stock, on s'assure que c'est un entier
         ? value === ""
             ? 0 // Si vide, on met une valeur par défaut
             : parseInt(value) // Convertir en entier
         : value //
        })
}
const handleDelete = async(id:number)=>{
    if(!window.confirm("voulez-vous supprimer ce produit")) return  
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
        const response = await fetch(`${API_URL}/products/${id}`,{
            method:"DELETE",
            headers:{
               "Authorization":`Bearer ${localStorage.getItem('adminToken')}`
            },
        })
        if (!response.ok) throw new Error("Erreur lors de la suppression");
        setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
        console.error("Erreur de suppression :", error);
        setErrorMessage("Erreur lors de la suppression du produit");
    } 
   


}
const handleEdit = (product:Product) =>{
    setProduct({
        id:product.id,
        title:product.title,
        description:product.description,
        price:product.price,
        stock:product.stock,
        images:product.images[0]||"",
        categoryId:product.categoryId||0,
    })
}
const handleUpdate = async(e:React.FormEvent)=>{
    e.preventDefault()
    setLoadings(true)
    setErrorMessage("")
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'
        const token = localStorage.getItem("adminToken");
        
        const updatedProducte = {
            //...product,
            //title:product.title,
            price: Number(product.price), // S'assurer que price est bien un nombre avec 2 décimales
            stock: Number(product.stock), // S'assurer que stock est un nombre
            //images: product.images ? [product.images] : [], / Convertir en tableau
            images: product.images ? [product.images] : [] ,
            categoryId: Number(product.categoryId), // S'assurer que categoryId est un nombre
        };
        const response = await fetch(`${API_URL}/products/${product.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`,
            },
            body:JSON.stringify(updatedProducte)
        })
        const updatedProduct = await response.json()
        console.log("produit modifie", updatedProduct);
        if(!response.ok){
            throw new Error("Impossible de modifier le produit")
        }
        setProducts(products.map((p)=>(p.id === updatedProduct.id? updatedProduct:p)))
        setProduct({
            id:0,
            title:"",
            description:"",
            price:0,
            stock:0,
            images:"",
            categoryId:0
        })
    } catch (error) {
        console.error("Erreur de modification :", error);
        setErrorMessage("Erreur lors de la modification du produit");
    }finally{
        setLoadings(false)
    }
}
const handleSubmit = async (e:React.FormEvent) =>{
    
e.preventDefault()
console.log("🟢 handleSubmit appelé !");
console.log("🔵 Formulaire soumis !");
console.log("produits avant envoi", product)
setLoadings(true)
setErrorMessage("")
const categoryId = Number(product.categoryId)
if (!product.categoryId || isNaN(categoryId)) {
    return setErrorMessage("Veuillez fournir un identifiant de catégorie valide.");
}
const { id, ...productWithoutId } = product;
const productData = {
    //...product,
    ...productWithoutId,
    categoryId: Number(product.categoryId),
    images: product.images ? [product.images] : [],
    title: String(product.title).trim(),
    description: String(product.description).trim(),
    price: parseFloat(Number(product.price).toFixed(2)),
    stock: Number(product.stock),

    //categoryId:categoryId, // Convertir la catégorie en nombre
    //images: product.images ? [product.images] : []  // Assurer que les images sont envoyées sous forme de tableau
};

console.log("📤 Données envoyées :", JSON.stringify(productData, null, 2));






try {
    const API_URL= process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1"
    const token = localStorage.getItem("adminToken");
    const response = await fetch(`${API_URL}/products`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
            
    },
    body:JSON.stringify(productData)
})
//const responseData = await response.json();
//console.log("🔴 Réponse API:", responseData);



 
    const newProduct = await response.json()
 console.log("✅ Produit ajouté :", newProduct);
setProducts([ newProduct]) 
setProduct({id:0,title:"", description:"", price:0, stock:0, images:"", categoryId:0})
router.refresh()
} catch (error) {
    setErrorMessage("Erreur lors de l'ajout du produit")
    console.error("Erreur de suppression :", error);
    setErrorMessage("Erreur lors de la suppression du produit");
}finally{
    setLoadings(false)
}
}
return(
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Ajout des produits</h1>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>  }
      
        <form onSubmit={product.id ? handleUpdate: handleSubmit} className="space-y-3 bg-white p-4 rounded-md shadow-md">
       
            <input 
            type="text"
            name="title"
            placeholder="titre du produit"
            value={product.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            />
            <input 
            type="number"
            name="price"
            placeholder="prix"
            value={product.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            />
            <input 
            type="text"
            name="images"
            placeholder="images du produits"
            value={product.images}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            />
              <input 
            type="text"
            name="description"
            placeholder="description du produits"
            value={product.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            />
            <input 
            type="number"
            name="stock"
            placeholder="stock du produits"
            value={product.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            />
            <input 
                type="text"
                name="categoryId" 
                placeholder="ID de la catégorie"
                value={product.categoryId}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
                    <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          disabled={loadings}
          >
            {loadings?"Ajout en cours":"Ajouter"}
          </button>
        </form>
        <h2 className="text-xl font-bold mt-6">Produits existant</h2>
        <div className="overflow-x-auto mt-4">
         <table className="min-w-full table-auto border-collapse">
            <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">Images</th>
                    <th className="px-4 py-2 text-left">Titres</th>
                    <th className="px-4 py-2 text-left">Descriptions</th>
                    <th className="px-4 py-2 text-left">Prix</th>
                    <th className="px-4 py-2 text-left">Stock</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p)=>(
                    <tr key={p.id} className="border-b">
                        <td className="px-4 py-2">
                            <img src={p.images[0]} alt={p.title} className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="px-4 py-2">{p.title}</td>
                        <td className="px-4 py-2">{p.description}</td>
                        <td className="px-4 py-2">{p.price}CFA</td>
                        <td className="px-4 py-2">{p.stock}</td>
                        <td className="px-4 py-2 flex items-center">
                            <button
                            onClick={()=>handleDelete(p.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 w-full mr-5"

                            >
                                Supprimer
                            </button>
                            <button
                            onClick={()=>handleEdit(p)}
                            className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 w-full"
                            >
                                Modifier
                            </button>
                          
                        </td>
                       
                     
                    </tr>
                ))}
            </tbody>
         </table>
      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
         onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
         
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
      
           </div>
    </div>

)
}
export default DashboardProducts