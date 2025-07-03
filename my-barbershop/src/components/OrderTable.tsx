type Product = {
    id: number;
    product_unit_price: string;
    product_quantity: number;
    product: {
      id: number;
      title: string;
      description: string;
      price: string;
      stock: number;
      images: string[];
      createdAt: string;
      updateddAt: string;
      categoryId: number;
    };
  };
  
  type Order = {
    id: number;
    orderAt: string;
    status: string;
    shippedAt: string | null;
    deliveredAt: string | null;
    shippingAddress: {
      id: number;
      phone: string;
      name: string;
      address: string;
      city: string;
      postCode: string;
      state: string;
      country: string;
    };
    products: Product[];
    user: {
      id: number;
      name: string;
      email: string;
      roles: string[];
      createdAt: string;
      updatedAt: string;
    };
  };
  
  const OrderTable = ({ orders }: { orders: Order[] }) => {
    return (
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Téléphone</th>
              <th className="px-6 py-3">Ville / Pays</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Statut</th>
              <th className="px-6 py-3">Produits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Aucune commande à afficher.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.user?.name || 'Inconnu'}</td>
                  <td className="px-6 py-4">{order.shippingAddress?.phone || 'Inconnu'}</td>
                  <td className="px-6 py-4">
                    {order.shippingAddress?.city || 'Inconnue'}, {order.shippingAddress?.country || 'Inconnu'}
                  </td>
                  <td className="px-6 py-4">
                    {order.orderAt ? new Date(order.orderAt).toLocaleDateString() : 'Inconnue'}
                  </td>
                  <td className="px-6 py-4 capitalize text-blue-600">{order.status}</td>
                  <td className="px-6 py-4">
                    <ul className="space-y-1">
                      {order.products?.map((item) => (
                        <li key={item.id}>
                          {item.product.title} × {item.product_quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  

















// // components/OrderTable.tsx
// import React from "react";

// type Product = {
//   id: number;
//   product_unit_price: string;
//   product_quantity: number;
//   product: {
//     id: number;
//     title: string;
//     images: string[];
//   };
// };

// type ShippingAddress = {
//   name: string;
//   phone: string;
//   city: string;
//   country: string;
// };

// type User = {
//   name: string;
//   email: string;
// };

// type Order = {
//   id: number;
//   orderAt: string;
//   status: string;
//   shippingAddress: ShippingAddress;
//   products: Product[];
//   user: User;
// };

// const OrderTable = ({ orders }: { orders: Order[] }) => {
//   if (!orders || orders.length === 0) {
//     return <p className="text-center text-gray-500">Aucune commande à afficher.</p>;
//   }

//   return (
//     <div className="overflow-x-auto bg-white rounded-xl shadow">
//       <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
//         <thead className="bg-gray-100 text-xs uppercase text-gray-600">
//           <tr>
//             <th className="px-6 py-3">ID</th>
//             <th className="px-6 py-3">Client</th>
//             <th className="px-6 py-3">Téléphone</th>
//             <th className="px-6 py-3">Ville / Pays</th>
//             <th className="px-6 py-3">Date</th>
//             <th className="px-6 py-3">Statut</th>
//             <th className="px-6 py-3">Produits</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100">
//           {orders.map((order) => (
//             <tr key={order.id}>
//               <td className="px-6 py-4 font-medium">{order.id}</td>
//               <td className="px-6 py-4">{order.user.name}</td>
//               <td className="px-6 py-4">{order.shippingAddress.phone}</td>
//               <td className="px-6 py-4">
//                 {order.shippingAddress.city}, {order.shippingAddress.country}
//               </td>
//               <td className="px-6 py-4">
//                 {new Date(order.orderAt).toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4 capitalize text-blue-600">{order.status}</td>
//               <td className="px-6 py-4">
//                 <ul className="space-y-1">
//                   {order.products.map((item) => (
//                     <li key={item.id}>
//                       {item.product.title} × {item.product_quantity}
//                     </li>
//                   ))}
//                 </ul>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

 export default OrderTable;
