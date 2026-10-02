import type { BasketBreakdown, CatalogResponse, Product } from '../types';

const API_BASE_URL = 'http://localhost:7575';

const DEFAULT_PRODUCTS: Product[] = [
    { code: 'R01', name: 'Red Widget', price: 32.95 },
    { code: 'G01', name: 'Green Widget', price: 24.95 },
    { code: 'B01', name: 'Blue Widget', price: 7.95 },
];

/**
 * Log condicional visível apenas em ambiente de desenvolvimento local.
 */
export const devLog = (...args: unknown[]): void => {
    if (import.meta.env.DEV) {
        console.log('[Acme Widget Co]', ...args);
    }
};

/**
 * Cálculo local de fallback com as mesmas regras do PHP
 * para garantir resiliência caso o servidor PHP esteja offline.
 */
export const calculateLocalBasket = (codes: string[]): BasketBreakdown => {
    const items: Product[] = [];
    const catalogMap = new Map(DEFAULT_PRODUCTS.map((p) => [p.code, p]));

    for (const code of codes) {
        const item = catalogMap.get(code);
        if (item) {
            items.push(item);
        }
    }

    const subtotal = Number(items.reduce((sum, item) => sum + item.price, 0).toFixed(2));

    // Regra de oferta: "Buy one red widget, get the second half price"
    const redCount = items.filter((item) => item.code === 'R01').length;
    const redPairs = Math.floor(redCount / 2);
    const discountPerSecond = Number((32.95 / 2).toFixed(2)); // 16.48
    const discount = Number((redPairs * discountPerSecond).toFixed(2));

    const subtotalAfterDiscount = Math.max(0, subtotal - discount);

    // Regras de frete: <$50 -> $4.95, <$90 -> $2.95, >=$90 -> 0.00
    let delivery = 0;
    if (items.length > 0) {
        if (subtotalAfterDiscount < 50) {
            delivery = 4.95;
        } else if (subtotalAfterDiscount < 90) {
            delivery = 2.95;
        } else {
            delivery = 0.0;
        }
    }

    const total = Number((subtotalAfterDiscount + delivery).toFixed(2));

    return {
        items,
        subtotal,
        discount,
        delivery,
        total,
    };
};

/**
 * Busca o catálogo oficial e regras de negócio da API PHP.
 */
export const fetchCatalog = async (): Promise<{
    data: CatalogResponse;
    source: 'api' | 'fallback';
}> => {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = (await response.json()) as CatalogResponse;
        devLog('Catalog loaded from PHP API:', data);
        return { data, source: 'api' };
    } catch (error) {
        devLog('PHP API unreachable, falling back to local catalog:', error);
        return {
            data: {
                status: 'success',
                version: '1.0.3',
                products: DEFAULT_PRODUCTS,
                deliveryRules: [
                    { description: 'Orders under $50.00', cost: 4.95, threshold: 50 },
                    { description: 'Orders under $90.00', cost: 2.95, threshold: 90 },
                    { description: 'Orders of $90.00 or more', cost: 0.0, threshold: null },
                ],
                specialOffers: [
                    {
                        code: 'BUY_ONE_RED_GET_SECOND_HALF_PRICE',
                        title: 'Red Widget Special Offer',
                        description: 'Buy one red widget (R01), get the second half price!',
                        targetProduct: 'R01',
                        discountRate: 0.5,
                    },
                ],
            },
            source: 'fallback',
        };
    }
};

/**
 * Envia os códigos de produto para a API em PHP calcular o total oficial.
 */
export const calculateBasketApi = async (
    codes: string[]
): Promise<{ breakdown: BasketBreakdown; source: 'api' | 'fallback' }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ items: codes }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const json = await response.json();
        devLog('Basket calculated by PHP API:', json);
        return { breakdown: json.data, source: 'api' };
    } catch (error) {
        devLog('PHP API unreachable, calculating basket locally:', error);
        return { breakdown: calculateLocalBasket(codes), source: 'fallback' };
    }
};
