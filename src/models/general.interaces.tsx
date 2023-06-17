
export interface ProductsInfo {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
    [key: string]: string;
};

export interface TableProductsData {
    products: ProductsInfo[];
}

export interface TableColumns {
    name: string;
    dataKey: string;
}