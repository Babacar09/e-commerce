export const fetchReviewsByProduct = async(productId:number)=>{

    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'
        const response = await fetch(`${API_URL}/reviews/product/${productId}`)
        if(!response.ok){
            throw new Error("Erreur de la recuperation des donnees")
          
        }
        return await response.json()
        
    } catch (error) {
    console.error("Erreur fetch reviews:", error)     
    return []   
    }
}