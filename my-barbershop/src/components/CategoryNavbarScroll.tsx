// app/components/CategoryNavbarScroll.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";

interface Category {
  title: string;
  productCount: number;
}

export default function CategoryNavbarScroll({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollRef.current?.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    scrollRef.current?.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="bg-white px-4 py-2 flex gap-4 overflow-x-auto  cursor-grab select-none no-scrollbar scroll-smooth"
    >
      {categories.map((cat) => (
        <Link
          key={cat.title}
          href={`/products?category=${cat.title}`}
          className="whitespace-nowrap text-sm px-4 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
         {cat.title}
        {/* ({cat.productCount})  */}
        </Link>
      ))}
    </div>
  );
}











