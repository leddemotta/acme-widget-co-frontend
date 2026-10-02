export interface Product {
    code: string;
    name: string;
    price: number;
}

export interface BasketBreakdown {
    items: Product[];
    subtotal: number;
    discount: number;
    delivery: number;
    total: number;
}

export interface DeliveryRule {
    description: string;
    cost: number;
    threshold: number | null;
}

export interface SpecialOffer {
    code: string;
    title: string;
    description: string;
    targetProduct: string;
    discountRate: number;
}

export interface CatalogResponse {
    status: string;
    version: string;
    products: Product[];
    deliveryRules: DeliveryRule[];
    specialOffers: SpecialOffer[];
}

export interface TestPreset {
    id: string;
    name: string;
    codes: string[];
    expectedTotal: number;
}