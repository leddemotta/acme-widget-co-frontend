import type { BasketBreakdown, Product } from '../types';
import { BasketItemRow } from './BasketItemRow';

interface BasketProps {
  groupedItems: { product: Product; count: number }[];
  totalItemsCount: number;
  breakdown: BasketBreakdown;
  onAddProduct: (code: string) => void;
  onRemoveProduct: (code: string) => void;
  onClearBasket: () => void;
}

export function Basket({
  groupedItems,
  totalItemsCount,
  breakdown,
  onAddProduct,
  onRemoveProduct,
  onClearBasket,
}: BasketProps) {
  return (
    <aside className="basket-column">
      <div className="basket-card">
        {/* Header */}
        <div className="basket-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Shopping Basket
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="basket-count">{totalItemsCount} items</span>
            {totalItemsCount > 0 && (
              <button className="clear-btn" onClick={onClearBasket}>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Basket Items List / Empty State */}
        {groupedItems.length === 0 ? (
          <div className="empty-basket">
            <p>Your basket is currently empty.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
              Click a product or select a test preset above.
            </p>
          </div>
        ) : (
          <div className="basket-items">
            {groupedItems.map(({ product, count }) => (
              <BasketItemRow
                key={product.code}
                product={product}
                count={count}
                onAdd={onAddProduct}
                onRemove={onRemoveProduct}
              />
            ))}
          </div>
        )}

        {/* Financial Breakdown */}
        <div className="summary-rows">
          <div className="summary-row">
            <span>Subtotal (Gross)</span>
            <span>${breakdown.subtotal.toFixed(2)}</span>
          </div>

          {breakdown.discount > 0 && (
            <div className="summary-row discount-row">
              <span>Special Offer Discount</span>
              <span>-${breakdown.discount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Delivery Charge</span>
            <span>
              {breakdown.delivery === 0 ? (
                <strong style={{ color: '#34d399' }}>FREE</strong>
              ) : (
                `$${breakdown.delivery.toFixed(2)}`
              )}
            </span>
          </div>

          <div className="summary-row total-row">
            <span>Total Amount</span>
            <span className="total-value">${breakdown.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
