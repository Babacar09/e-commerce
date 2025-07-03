import { useState } from "react";

export default function ShippingForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postCode: "",
    state: "",
    country: "Senegal", // par défaut
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form); // transmet les données au parent
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-semibold">Adresse de Livraison</h2>

      <input type="text" name="name" placeholder="Nom" value={form.name} onChange={handleChange} className="input" required />
      <input type="text" name="phone" placeholder="Téléphone" value={form.phone} onChange={handleChange} className="input" required />
      <input type="text" name="address" placeholder="Adresse" value={form.address} onChange={handleChange} className="input" required />
      <input type="text" name="city" placeholder="Ville" value={form.city} onChange={handleChange} className="input" required />
      <input type="text" name="postCode" placeholder="Code postal" value={form.postCode} onChange={handleChange} className="input" required />
      <input type="text" name="state" placeholder="Région/État" value={form.state} onChange={handleChange} className="input" required />
      <input type="text" name="country" placeholder="Pays" value={form.country} onChange={handleChange} className="input" required />

      <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full">
        Valider l’adresse
      </button>
    </form>
  );
}
