"use client"

import { useEffect, useState } from "react";

interface Review {
    id: number;
    ratings: number;
    comment: string;
    createdAt: string;
    user: {
        id: number;
        name: string;
    };
}
interface ProductReviewsProps{
    productId:number
}

const ProductReviews:React.FC<ProductReviewsProps> = ({ productId}:ProductReviewsProps) => {
    const [reviews, setReviews] = useState<Review[]>([])
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:3000/api/v1/reviews/products/${productId}`,{
                  

               // const response = await fetch(`http://localhost:3000/api/v1/reviews/product/${productId}`, { // 🔥 Correction ici (product sans "s")
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                     
                });
                 console.log("Product ID:", productId);
    
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des avis");
                }
                console.log("Valeur de productId :", productId, typeof productId);

    
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error(error);
            }
        };
    
       if(productId) fetchReviews();
    }, [productId]);
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold">Avis du produit</h2>
            {reviews.length === 0 ? (
                <p>Aucun avis pour ce produit.</p>
            ) : (
                <div className="mt-4">
                    {reviews.map((review) =>(
                        <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                            <div className="flex justify-between">
                                <span className="font-semibold">{review.user.name} </span>
                                <span className="text-sm text-gray-500">{new Date(review.createdAt).toDateString()} </span>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm">Note: {review.ratings}/5</p>
                                <p className="mt-2">{review.comment} </p>
                            </div>
                        </div>
                    ))}
                </div>
               
            )}
        </div>
    );
}

export default ProductReviews;