'use client';

import  Link  from 'next/link';
import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  title: string;
  images: string[];
}

interface OrderProduct {
  id: string;
  product_quantity: number;
  product_unit_price: number;
  product: Product;
}

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
}

interface Order {
  id: string;
  status: string;
  orderAt: string;
  shippingAddress: ShippingAddress;
  orderProducts: OrderProduct[];
  total: number;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
        if (!res.ok) throw new Error('Erreur API');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Mes commandes</h1>

      {orders.map(order => (
        <div key={order.id} className="border rounded-lg p-4 mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Commande #{order.id}</h2>
          <p className="text-sm text-gray-600">Date : {new Date(order.orderAt).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600 mb-2">Statut : {order.status}</p>
          <p className="text-sm text-gray-600 mb-2">Total : {order.total}</p>

          <div className="mb-3">
            <h3 className="font-semibold">Adresse de livraison :</h3>
            <p>{order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}</p>
            <p>Téléphone : {order.shippingAddress.phone}</p>
          </div>

          <h3 className="font-semibold mb-1">Produits :</h3>
          <ul className="space-y-2">
            {order.orderProducts.map(item => (
              <li key={item.id} className="flex gap-4 items-center">
                <img src={item.product.images[0]} alt={item.product.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <p className="font-medium">{item.product.title}</p>
                  <p>Quantité : {item.product_quantity}</p>
                  <p>Prix unitaire : {item.product_unit_price} €</p>
                
                </div>
              </li>
            ))}
          </ul>
               {/* 🔗 Ou un lien "Valider cette commande" ici */}
          <Link
            href={`/orders/${order.id}`}
            className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-800 w-full text-center"
          >
              Valider la commande
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;




