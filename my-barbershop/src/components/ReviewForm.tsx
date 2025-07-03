"use client"

import React, {  useState } from "react";

interface ReviewFromProps{
    productId:number;
    //onReviewSubmitted:()=>void;
}

const ReviewFrom: React.FC<ReviewFromProps> =({productId})=>{
    const [ratings, setRatings] = useState<number>(0);
    const [comment, setComment] = useState<string>("")
    const [message, setMessage] = useState("")


    // useEffect(() => {
    // }, [ratings, comment, productId]);

        const handleReviewSubmit = async () => {
          // Validation des données
          if (!ratings || !comment) {
            setMessage("Veuillez remplir tous les champs.");
            return;
          }
    
          const reviewData = {
            productId,
            ratings,
            comment,
          };
    
          try {
            const token = localStorage.getItem("authToken");
            console.log("Token utilisé pour POST:", token);

    
            if (!token) {
              setMessage("Token non trouvé. Veuillez vous connecter.");
              return;
            }
    
            const response = await fetch("http://localhost:3000/api/v1/reviews", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(reviewData),
         
              
            });
            console.log("review donnee",reviewData);
    
            if (!response.ok) {
              const errorData = await response.json();
              console.error("Erreur lors de l'envoi de l'avis", errorData);
              setMessage("Une erreur est survenue lors de l'envoi de l'avis.");
              return;
            }
    
            // Réinitialiser les champs
            setRatings(0);
            setComment("");
            setMessage("Votre avis a été soumis avec succès!");
          } catch (error) {
            console.error("Erreur réseau", error);
            setMessage("Une erreur est survenue lors de la soumission de l'avis.");
          }
        };
    
        // Appeler la fonction à chaque fois que les données changent
        //handleReviewSubmit();
   

    // function handleReviewSubmit(event: FormEvent<HTMLFormElement>): void {
    //     throw new Error("Function not implemented.");
    // }

    return(
        <form   className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Laisser un avis</h2>
            <div className="mt-4">
                <label htmlFor="ratings" className="block text-sm font-medium text-gray-700">Note</label>
                <select 
               
                id="ratings"
                value={ratings}
                onChange={(e)=>setRatings(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-md"
                >
                    <option value={0}>Selectionner une note</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div className="mt-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Commentaires</label>
                <textarea 
              
                id="comment"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                ></textarea>
            </div>

            <button
            type="button"
            onClick={handleReviewSubmit}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                Soummettre
            </button>
        </form>
    )
}

export default ReviewFrom