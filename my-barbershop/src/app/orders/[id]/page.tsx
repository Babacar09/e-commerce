
import { notFound } from 'next/navigation';

import { getOrderById } from '@/lib/order/getOrderById';
import OrderPaymentClient from '@/components/OrderPaymentClient';

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const order = await getOrderById(params.id);

  if (!order) return notFound();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Détails de la commande</h1>

      <div className=" rounded p-2 mb-6">
        <p><strong>ID :</strong> {order.id}</p>
        <p><strong>Status :</strong> {order.status}</p>
        <p><strong>Total :</strong> {order.total} €</p>

        <ul className="mt-4 space-y-2">
          {Array.isArray(order.orderProducts) && order.orderProducts.length > 0 ? (
            order.orderProducts.map((item: any) => (
              <li key={item.id} className=" p-2 rounded">
                <img src={item.product.images[0]} alt="image" className='w-60 ml-40'  />
                <p><strong>Produit :</strong> {item.product?.title || 'Produit inconnu'}</p>
                <p><strong>Description:{item.product.description}</strong></p>
                <p><strong>Quantité :</strong> {item.product_quantity}</p>
                <p><strong>Prix unitaire :</strong> {item.product_unit_price} €</p>
              </li>
            ))
          ) : (
            <li className="text-gray-500">Aucun produit trouvé pour cette commande.</li>
          )}
        </ul>

      </div>
{/* 
      <PayButton orderId={order.id}  /> */}
      <OrderPaymentClient orderId={order.id} />
    </div>
  );
}

