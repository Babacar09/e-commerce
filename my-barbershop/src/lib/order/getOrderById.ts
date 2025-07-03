export async function getOrderById(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
      credentials: 'include', // utile si l'utilisateur est authentifié par cookie
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Erreur lors de la récupération de la commande');
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Erreur réseau :', error);
    return null;
  }
}
