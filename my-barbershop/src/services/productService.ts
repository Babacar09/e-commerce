// services/productService.ts


export async function getProductById(id: string) {
    try {
      // Appel à l'API pour récupérer un produit par ID
      const res = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
        cache: 'no-store', // Désactivation de la mise en cache
      });
  
      // Vérifie si la réponse est OK
      if (!res.ok) {
        throw new Error(`Erreur lors de la récupération du produit avec ID ${id}`);
      }
  
      // Parse la réponse en JSON
      const data = await res.json();
  
      // Vérifie que le produit est bien présent dans la réponse
      if (!data.product) {
        throw new Error(`Produit avec l'ID ${id} introuvable dans la réponse`);
      }
  
      console.log("Produit récupéré:", data.product);
      return data.product; // Retourne le produit
  
    } catch (error) {
      console.error('Erreur:', error);
      return null; // Retourne null en cas d'erreur
    }
  }
  
  
  