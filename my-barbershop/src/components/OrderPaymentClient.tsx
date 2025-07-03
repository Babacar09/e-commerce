'use client';

import { useEffect, useState } from 'react';
//import PayButton from './PayButton';
import CheckoutButton from './CheckoutButton';

interface Props {
  orderId: string;
 
}

export default function OrderPaymentClient({ orderId }: Props) {
  const [token, setToken] = useState<string | null>(null);
  console.log('Token:', token);


  useEffect(() => {
    const savedToken = localStorage.getItem('authToken'); // récupère le token localStorage
    if (savedToken){
         setToken(savedToken);
    }
  }, []);

  if (!token) {
    return <p className="text-red-600">Vous devez être connecté pour payer cette commande.</p>;
  }

  //return <PayButton orderId={orderId} token={token} />;
  return <CheckoutButton orderId={orderId} />
  
}
