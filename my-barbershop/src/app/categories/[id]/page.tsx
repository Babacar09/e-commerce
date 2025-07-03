// page.tsx
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/v1/categories/${params.id}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p className="text-center text-red-500 py-10">Catégorie introuvable.</p>;
  }
  console.log("Fetching category with ID:", params.id);


  const data = await res.json();
  const products: Product[] = data.products;
  const category = data.category;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Produits dans : {category.title}</h1>

      {products.length === 0 ? (
        <p>Aucun produit trouvé dans cette catégorie.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded shadow p-4">
              <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
              <h2 className="mt-2 font-semibold">{product.title}</h2>
              <p className="text-red-600 font-bold">{product.price.toLocaleString()} FCFA</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}


