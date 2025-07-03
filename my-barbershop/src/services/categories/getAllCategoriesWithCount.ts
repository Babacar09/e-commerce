

import { CategoryWithCount } from '@/lib/types/category';

export const getAllCategoriesWithCount = async (): Promise<CategoryWithCount[]> => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/categories/with-count', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Erreur lors du chargement des catégories');
    }

    return res.json();
  } catch (error) {
    console.error('Erreur dans getAllCategoriesWithCount:', error);
    return [];
  }
};



