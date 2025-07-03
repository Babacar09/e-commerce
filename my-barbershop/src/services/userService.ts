

export const fetchUsers = async()=>{
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1/"
        const token = localStorage.getItem('adminToken')
        const response = await fetch(`${API_URL}/users/all`,{
            method:"GET",
            headers:{
                 "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`,
            }
        })
        if(!response.ok){
            throw new Error("Impossible de recuperer les users")
        }
        return response.json()
        
    } catch (error) {
        console.log("Erreur lors de la recuperations des donnees users:", error);
        return [];
    }
}