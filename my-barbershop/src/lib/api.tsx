export const fetchProducts = async (page:number, limit:number, search?:string) =>{
    try {
        const response = await fetch(`http://localhost:3000/api/v1/products?page=${page}&limit=${limit}&search=${search || ''}`)
        const data = await response.json()
        console.log("✅ Données reçues de l'API :", data);
        //return data

        return data.products.map((product: any) => ({
            ...product,
            category: { title: product.category_title } // Transforme `category_title` en `{ title }`
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error
    }
}