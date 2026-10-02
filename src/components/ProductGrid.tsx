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
      {products.length === 0 ? (
        <div className="no-products">
          <p className="no-products-title">No products found</p>
          <p className="no-products-hint">
            The catalog is currently empty.
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.code} product={product} onAdd={onAdd} />
          ))}
        </div>
      )}
    </section>
  );
}
