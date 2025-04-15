import ItemList from '../components/ItemList';
import { AppSidebar } from '@/components/searchfilter-app-sidebar';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/searchfilter-sidebar';
import { CartContextProvider } from '@/store/CartContext';
import ProductsFilterContext, {
    ProductsFilterContextProvider
} from '@/store/ProductsFilterContext';

export default function ProductsPage() {
    return (
        <div className="container mx-auto py-8 align-middle text-center">
            <SidebarProvider>
                <ProductsFilterContextProvider>
                    <AppSidebar />
                    <SidebarTrigger className="-ml-0 -mt-6" />
                    <SidebarInset className="ml-4">
                        <h1 className="text-2xl font-bold mb-6">
                            Our Products
                        </h1>
                        <ItemList />
                    </SidebarInset>
                </ProductsFilterContextProvider>
            </SidebarProvider>
        </div>
    );
}
