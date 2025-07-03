"use client"

import React from 'react'
import{ useEffect, useState } from "react";
import OrderTable from "@/components/OrderTable";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/orders"); // Remplace avec l'URL de ton API
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des commandes");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        //@ts-ignore
        setError("Impossible de charger les commandes");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Liste des commandes</h1>
      <OrderTable orders={orders} />
    </div>
  );
};

export default OrdersPage;












// "use client"
// import { useEffect, useState } from "react";

// interface Order{
// id:number;
// customer:string;
// total:number;
// status:string
// }

// export default function OrderPage(){
//     const [orders, SetOrders] = useState<Order[]>([])
//     useEffect(()=>{
//         fetch("http://localhost:3000/api/v1/orders")
//         .then((res)=>res.json())
//         .then((data)=>SetOrders(data))
//     },[])
//     return(
//         <div className="p-6">
//             <h2 className="text-3xl font-bold">Commandes</h2>
//             <p className="text-gray-600">Gerer les commandes des clients ici</p>
//                 <div className="mt-6 border rounded-lg overflow-hidden">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="p-3">#</th>
//                                 <th className="p-3">Client</th>
//                                 <th className="p-3">Total</th>
//                                 <th className="p-3">Statut</th>
//                                 <th className="p-3">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map((order)=>(
//                             <tr className="border-t">
//                                 <td className="p-3">{order.id}</td>
//                                 <td className="p-3">{order.customer}</td>
//                                 <td className="p-3">{order.total}</td>
//                                 <td className={`p-3 ${order.status==="paye" ? "text-green-600":"text-red-600"}`}>{order.status}</td>
                            
//                                 <td className="p-3">
//                                     <button className="px-3 py-1 bg-blue-500 text-white rounded">Details</button>
                                
//                                 </td>
//                             </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//         </div>
//     )
// }