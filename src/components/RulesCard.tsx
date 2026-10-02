import type { DeliveryRule, SpecialOffer } from '../types';

interface RulesCardProps {
  deliveryRules: DeliveryRule[];
  specialOffers: SpecialOffer[];
}

export function RulesCard({ deliveryRules, specialOffers }: RulesCardProps) {
  return (
    <div className="rules-card">
      <h2 className="section-title">Delivery & Offer Rules</h2>
      <div className="rules-list">
        {deliveryRules.map((rule, idx) => (
          <div key={idx} className="rule-item">
            <span>{rule.description}</span>
            <span className="rule-cost">
              {rule.cost === 0 ? 'FREE' : `$${rule.cost.toFixed(2)}`}
            </span>
          </div>
        ))}
        {specialOffers.map((offer) => (
          <div key={offer.code} className="rule-item">
            <span>{offer.title}</span>
            <span className="rule-cost" style={{ color: '#34d399' }}>
              50% off 2nd
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
