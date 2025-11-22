// src/components/MenuSection.tsx
import { useState, useEffect } from 'react';
import { getMenu } from '../api'; // ✅ Importez la fonction

type MenuItem = {
  id: number;
  name: string;
  price: number; // ou string, selon votre API
  description: string;
  category: string; // ex: "appetizers", "mains", etc.
};

export default function MenuSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const menuCategories = [
    { id: 'appetizers', name: 'Entrées', icon: 'ri-restaurant-line' },
    { id: 'mains', name: 'Plats Principaux', icon: 'ri-bowl-line' },
    { id: 'desserts', name: 'Desserts', icon: 'ri-cake-line' },
    { id: 'beverages', name: 'Boissons', icon: 'ri-cup-line' }
  ] as const;

  type MenuCategory = typeof menuCategories[number]['id'];
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('appetizers');

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        const items = await getMenu();
        setMenuItems(items);
      } catch (err) {
        console.error("Erreur chargement menu:", err);
        setError("Impossible de charger le menu.");
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  // Filtrer les items par catégorie
  const filteredItems = menuItems.filter(item =>
    item.category === activeCategory
  );

  if (loading) return <div className="text-center py-8">Chargement du menu...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Menu</h2>

      {/* Boutons de catégories */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {menuCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === category.id
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className={`${category.icon} mr-2`}></i>
            {category.name}
          </button>
        ))}
      </div>

      {/* Items du menu */}
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500">Aucun plat disponible dans cette catégorie.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className="text-lg font-bold text-amber-600 ml-4">
                  {typeof item.price === 'number' 
                    ? item.price.toLocaleString() 
                    : item.price} CFA
                </span>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}