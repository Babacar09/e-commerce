"use client"
import { useState } from "react"

interface AuthResponse{
    accessToken:string;
    message?:string;
}

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

    const validateForm = () =>{
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Validation stricte de l'email
    console.log("Mot de passe:", password); // Log la valeur du mot de passe
    const isValidPassword = !!password.trim(); // Trim pour enlever les espaces blancs
    console.log("isValidPassword:", isValidPassword); // Log du mot de passe validé
    setIsFormValid(isValidEmail && isValidPassword); // Validation finale
    console.log("isFormValid:", isValidEmail && isValidPassword); // Log du résultat
    }
    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        console.log("🟢 La soumission du formulaire a été lancée !");
        setLoading(true)
        setErrorMessage("")
        try {
            const response = await fetch('http://localhost:3000/api/v1/users/signin',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({email, password})
            })
            console.log("reponse recue", response.status)
            //console.log("Réponse de la requête:", response.status, await response.json());
            const data:AuthResponse = await response.json();
            console.log("🔍 Réponse API:", data);
            if(!response.ok){
                throw new Error(data.message || "Email ou mots de passe incorrect")
            }
            if (!data.accessToken) {
                throw new Error("Token non fourni par l'API");
            }
          
            localStorage.removeItem("adminToken");
            localStorage.setItem("adminToken", data.accessToken);
            console.log("🎯 Token enregistré:", data.accessToken);

            const tokenTest = localStorage.getItem("adminToken");
            console.log("🎯 Vérification du token enregistré:", tokenTest);

            window.location.href = '/dashboard/products'
        } catch (error:any) {
            console.error("❌ Erreur de connexion:", error.message);
            setErrorMessage(error.message || 'Erreur de connexion')
        }finally{
            setLoading(false)
        }
    }
    return(
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Connexion admin</h1>
            {errorMessage &&  <p className="text-red-600">{errorMessage} </p> }
            <form 
          
            onSubmit={handleSubmit}
          
            className="space-y-4 bg-white p-4 rounded-md shadow-md"
            >
                <input 
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>{
                    console.log("📧 Email:", e.target.value);
                    setEmail(e.target.value)
                    validateForm()
                }} 
                className="w-full border p-2 rounded"
                required
                />
                <input 
                type="password"
                name="password"
                placeholder="mots de passe" 
                value={password}
                onChange={(e)=>{
                    console.log("📧 Password:", e.target.value);
                    setPassword(e.target.value)
                    validateForm()
                }}
                className="w-full border p-2 rounded"
                required
                 autoComplete="current-password"
                />
                <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={loading || !isFormValid}
                >
                      
                    {loading ?'Chargement':'Se connecter'}
                </button>
                <button
                    onClick={() => {
                        console.log('isFormValid:', isFormValid);
                        console.log('Mot de passe:', password);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Vérification du formulaire
                </button>
                
            </form>
        </div>
    )
}
export default AdminLogin