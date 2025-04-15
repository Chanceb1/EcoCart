import { JSX, ReactNode, createContext, useState } from 'react';

export interface FilterUpdate {
    search: string;
    categories?: string[];
    recycleMethods?: string[];
}

interface ProductsFilter {
    search: string;
    categories: string[];
    recyclingMethods: string[];
    updateFilters: (update: FilterUpdate) => void;
}

const ProductsFilterContext = createContext<ProductsFilter>({
    search: '',
    categories: [],
    recyclingMethods: [],
    updateFilters: update => {}
});

interface ProductsFilterContextProviderProps {
    children: ReactNode;
}

export function ProductsFilterContextProvider({
    children
}: ProductsFilterContextProviderProps): JSX.Element {
    const [search, setSearch] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [recyclingMethods, setRecyclingMethods] = useState<string[]>([]);

    function updateFilters({
        search,
        categories,
        recycleMethods
    }: FilterUpdate) {
        setSearch(search);

        if (categories) {
            setCategories(categories);
        }
        if (recycleMethods) {
            setRecyclingMethods(recycleMethods);
        }
    }

    const productsFilterCtx: ProductsFilter = {
        search,
        categories,
        recyclingMethods,
        updateFilters
    };

    return (
        <ProductsFilterContext.Provider value={productsFilterCtx}>
            {children}
        </ProductsFilterContext.Provider>
    );
}

export default ProductsFilterContext;
