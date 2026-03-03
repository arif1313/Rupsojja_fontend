import React from 'react';
import ProductCard from './ProductCard';



const ProductGrid = ({ products, columns = 4 }) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };
  return (
  
    <div className={`grid ${gridCols[columns]} gap-2 lg:gap-6 md:gap-4`}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;