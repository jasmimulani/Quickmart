import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../Context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();
  
  console.log("🛍️ BestSeller - Products received:", products);
  console.log("🛍️ BestSeller - In-stock products:", products?.filter(p => p.inStock));
  
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between">
        <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
        <a href="#" className="text-sm text-primary hover:underline hidden md:inline">View all</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => {
            console.log("🛍️ Rendering product:", product.name);
            return <ProductCard key={index} product={product} />;
          })}
      </div>
    </div>
  );
};

export default BestSeller;
