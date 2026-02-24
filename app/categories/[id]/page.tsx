"use client";

import React from "react";
import { ChevronLeft, Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

import { useProducts } from "@/context/ProductsContext";

const categories = [
    { id: "leafy-greens", label: "Leafy Greens", icon: "/images/cat-greens.jpg", color: "bg-emerald-50 text-emerald-600" },
    { id: "root-vegies", label: "Root Vegies", icon: "/images/cat-root.jpg", color: "bg-orange-50 text-orange-600" },
    { id: "peppers", label: "Peppers", icon: "/images/cat-peppers.jpg", color: "bg-red-50 text-red-600" },
    { id: "fruits", label: "Fruits", icon: "/images/cat-fruits.jpg", color: "bg-yellow-50 text-yellow-600" },
    { id: "grains", label: "Grains", icon: "/images/cat-grains.jpg", color: "bg-amber-50 text-amber-600" },
    { id: "herbs", label: "Herbs", icon: "/images/cat-herbs.jpg", color: "bg-teal-50 text-teal-600" },
    { id: "fungi", label: "Fungi", icon: "/images/cat-fungi.jpg", color: "bg-stone-50 text-stone-600" },
    { id: "berries", label: "Berries", icon: "/images/cat-berries.jpg", color: "bg-purple-50 text-purple-600" },
];

export default function CategoryDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const { products, searchQuery } = useProducts();

    const category = categories.find(c => c.id === id);
    const filteredProducts = products.filter(p =>
        p.categoryId === id &&
        (p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (!category) {
        return <div className="p-8 text-center">Category not found</div>;
    }

    return (
        <div className="flex flex-col gap-6 pb-32">
            {/* Header */}
            <header className="px-6 pt-8 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow"
                >
                    <ChevronLeft size={20} className="text-foreground" />
                </button>
                <h1 className="text-xl font-bold text-foreground capitalize">{category.label}</h1>
                <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center premium-shadow">
                    <Search size={20} className="text-foreground" />
                </button>
            </header>

            {/* Sub-header / Filter */}
            <div className="px-6 flex items-center justify-between">
                <span className="text-sm font-medium text-subtitle">{filteredProducts.length} Items found</span>
                <button className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10 transition-all hover:bg-primary/10">
                    <SlidersHorizontal size={14} /> Filter
                </button>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="px-6 grid grid-cols-2 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            ) : (
                <div className="px-6 py-20 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center text-4xl opacity-50">
                        📦
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-bold text-foreground">No Items Yet</p>
                        <p className="text-sm text-subtitle">We haven't added items to this category yet. Stay tuned!</p>
                    </div>
                </div>
            )}
        </div>
    );
}
