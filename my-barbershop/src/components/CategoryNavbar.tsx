// components/CategoryNavbar.tsx

import Link from 'next/link';
import { getAllCategoriesWithCount } from '@/services/categories/getAllCategoriesWithCount';
import CategoryNavbarScroll from './CategoryNavbarScroll';
//import { useRef } from 'react';

export default async function CategoryNavbar() {
  const categories = await getAllCategoriesWithCount();

  console.log(categories);
  

  return (

    <nav>
        <CategoryNavbarScroll categories={categories} />
    </nav>
   

    
  );
}



