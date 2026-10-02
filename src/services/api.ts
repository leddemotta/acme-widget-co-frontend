import type { BasketBreakdown, CatalogResponse, Product } from '../types';

const API_BASE_URL = 'http://localhost:7575';

/**
 * Conditional log visible only in local development environment.
 */
export const devLog = (...args: unknown[]): void => {
    if (import.meta.env.DEV) {
        console.log('[Acme Widget Co]', ...args);
    }
};

/**
 * Local fallback calculation matching PHP business rules
 * to ensure resilience when the PHP server is offline.
 */
export const calculateLocalBasket = (
    codes: string[],
    catalog: Product[] = []
): BasketBreakdown => {
    const items: Product[] = [];
    const catalogMap = new Map(catalog.map((p) => [p.code, p]));

    for (const code of codes) {
        const item = catalogMap.get(code);
        if (item) {
            items.push(item);
        }
    }

    const subtotal = Number(items.reduce((sum, item) => sum + item.price, 0).toFixed(2));

    // Offer rule: "Buy one red widget, get the second half price"
    const redWidget = catalogMap.get('R01');
    const redPrice = redWidget ? redWidget.price : 32.95;
    const redCount = items.filter((item) => item.code === 'R01').length;
    const redPairs = Math.floor(redCount / 2);
    const discountPerSecond = Number((redPrice / 2).toFixed(2)); // 16.48
    const discount = Number((redPairs * discountPerSecond).toFixed(2));

    const subtotalAfterDiscount = Math.max(0, subtotal - discount);

    // Delivery rules: <$50 -> $4.95, <$90 -> $2.95, >=$90 -> 0.00
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
 * Fetches the official catalog and business rules from the PHP API.
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
        devLog('PHP API unreachable, returning empty catalog fallback:', error);
        return {
            data: {
                status: 'fallback',
                version: '1.0.8',
                products: [],
                deliveryRules: [],
                specialOffers: [],
            },
            source: 'fallback',
        };
    }
};

/**
 * Sends product codes to the PHP API to calculate the official total.
 */
export const calculateBasketApi = async (
    codes: string[],
    catalog: Product[] = []
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
        return { breakdown: calculateLocalBasket(codes, catalog), source: 'fallback' };
    }
};
