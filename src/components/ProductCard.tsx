import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (code: string) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const isRed = product.code === 'R01';
  const orbClass =
    product.code === 'R01'
      ? 'orb-red'
      : product.code === 'G01'
      ? 'orb-green'
      : 'orb-blue';

  const orbEmoji = isRed ? '🔴' : product.code === 'G01' ? '🟢' : '🔵';

  return (
    <div className="product-card">
      <div className="product-card-top">
        <div className={`product-orb ${orbClass}`}>{orbEmoji}</div>
        <span className="code-badge">{product.code}</span>
      </div>

      <h3 className="product-name">{product.name}</h3>
      <div className="product-price">${product.price.toFixed(2)}</div>

      {isRed && (
        <div className="offer-ribbon">
          🏷️ Buy 1, Get 2nd Half Price!
        </div>
      )}

      <button className="add-btn" onClick={() => onAdd(product.code)}>
        <span>+ Add to Basket</span>
      </button>
    </div>
  );
}
