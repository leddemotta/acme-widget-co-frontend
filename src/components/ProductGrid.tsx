import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAdd: (code: string) => void;
}

export function ProductGrid({ products, onAdd }: ProductGridProps) {
  return (
    <section className="products-section">
      <h2 className="section-title">Available Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.code} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
