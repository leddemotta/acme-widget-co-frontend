import { useState, useEffect, useCallback } from 'react';
import type { BasketBreakdown, Product, DeliveryRule, SpecialOffer, TestPreset } from './types';
import { fetchCatalog, calculateBasketApi } from './services/api';
import { Header, ProductGrid, TestPresets, RulesCard, Basket } from './components';

const APP_VERSION = '1.0.5';
const FREE_SHIPPING_THRESHOLD = 90.0;

const TEST_PRESETS: TestPreset[] = [
  { id: 'p1', name: 'Example 1', codes: ['B01', 'G01'], expectedTotal: 37.85 },
  { id: 'p2', name: 'Example 2', codes: ['R01', 'R01'], expectedTotal: 54.37 },
  { id: 'p3', name: 'Example 3', codes: ['R01', 'G01'], expectedTotal: 60.85 },
  {
    id: 'p4',
    name: 'Example 4',
    codes: ['B01', 'B01', 'R01', 'R01', 'R01'],
    expectedTotal: 98.27,
  },
];

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [deliveryRules, setDeliveryRules] = useState<DeliveryRule[]>([]);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [backendSource, setBackendSource] = useState<'api' | 'fallback'>('fallback');
  const [basketCodes, setBasketCodes] = useState<string[]>([]);
  const [breakdown, setBreakdown] = useState<BasketBreakdown>({
    items: [],
    subtotal: 0,
    discount: 0,
    delivery: 0,
    total: 0,
  });
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Carrega catálogo inicial da API PHP
  useEffect(() => {
    let isMounted = true;

    async function loadCatalog() {
      const result = await fetchCatalog();
      if (isMounted) {
        setProducts(result.data.products);
        setDeliveryRules(result.data.deliveryRules);
        setSpecialOffers(result.data.specialOffers);
        setBackendSource(result.source);
      }
    }

    loadCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateBasket = useCallback(async (codes: string[]) => {
    setBasketCodes(codes);
    const result = await calculateBasketApi(codes);
    setBreakdown(result.breakdown);
    setBackendSource(result.source);
  }, []);

  // Manipuladores de cesta
  const handleAddProduct = (code: string) => {
    setActivePreset(null);
    const updated = [...basketCodes, code];
    updateBasket(updated);
  };

  const handleRemoveProduct = (code: string) => {
    setActivePreset(null);
    const index = basketCodes.lastIndexOf(code);
    if (index === -1) return;
    const copy = [...basketCodes];
    copy.splice(index, 1);
    updateBasket(copy);
  };

  const handleClearBasket = () => {
    setActivePreset(null);
    updateBasket([]);
  };

  const handleApplyPreset = (preset: TestPreset) => {
    setActivePreset(preset.id);
    updateBasket([...preset.codes]);
  };

  // Agrupa itens para exibição na lista do carrinho
  const groupedItems = products
    .map((product) => {
      const count = basketCodes.filter((c) => c === product.code).length;
      return { product, count };
    })
    .filter((entry) => entry.count > 0);

  // Cálculo de desconto e subtotal para Frete Grátis
  const subtotalAfterDiscount = Math.max(0, breakdown.subtotal - breakdown.discount);

  return (
    <div className="app-container">
      <Header backendSource={backendSource} version={APP_VERSION} />

      <div className="main-grid">
        <div className="catalog-column">
          <ProductGrid products={products} onAdd={handleAddProduct} />

          <TestPresets
            presets={TEST_PRESETS}
            activePreset={activePreset}
            currentTotal={breakdown.total}
            onApplyPreset={handleApplyPreset}
          />

          <RulesCard
            deliveryRules={deliveryRules}
            specialOffers={specialOffers}
          />
        </div>

        <Basket
          groupedItems={groupedItems}
          totalItemsCount={basketCodes.length}
          breakdown={breakdown}
          subtotalAfterDiscount={subtotalAfterDiscount}
          freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
          onAddProduct={handleAddProduct}
          onRemoveProduct={handleRemoveProduct}
          onClearBasket={handleClearBasket}
        />
      </div>
    </div>
  );
}

export default App;