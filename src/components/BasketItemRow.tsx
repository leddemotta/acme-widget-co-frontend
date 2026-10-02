import type { Product } from '../types';

interface BasketItemRowProps {
  product: Product;
  count: number;
  onAdd: (code: string) => void;
  onRemove: (code: string) => void;
}

export function BasketItemRow({
  product,
  count,
  onAdd,
  onRemove,
}: BasketItemRowProps) {
  return (
    <div className="basket-item">
      <div className="basket-item-info">
        <span className="item-code-tag">{product.code}</span>
        <div>
          <div className="item-name">{product.name}</div>
          <div className="item-subtotal">${product.price.toFixed(2)} each</div>
        </div>
      </div>

      <div className="basket-item-controls">
        <button
          className="qty-btn"
          aria-label={`Remove one ${product.name}`}
          onClick={() => onRemove(product.code)}
        >
          -
        </button>
        <span className="item-qty">{count}</span>
        <button
          className="qty-btn"
          aria-label={`Add one ${product.name}`}
          onClick={() => onAdd(product.code)}
        >
          +
        </button>
      </div>
    </div>
  );
}
