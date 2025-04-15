import * as React from 'react';
import { useContext, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail
} from '@/components/ui/searchfilter-sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ProductsFilterContext, {
    FilterUpdate
} from '@/store/ProductsFilterContext';

// This is sample data.
const data = {
    navMain: [
        {
            title: 'Category',
            url: '#',
            items: [
                {
                    id: 'electronics',
                    label: 'Electronics'
                },
                {
                    id: 'consumables',
                    label: 'Consumables'
                },
                {
                    id: 'storage',
                    label: 'Storage'
                }
            ]
        },
        {
            title: 'Recycle Method',
            url: '#',
            items: [
                {
                    id: 'paper',
                    label: 'Paper'
                },
                {
                    id: 'metal',
                    label: 'Metal'
                },
                {
                    id: 'compostable',
                    label: 'Compostable'
                },
                {
                    id: 'glass',
                    label: 'Glass'
                }
            ]
        }
    ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const formRef = useRef(null);
    const { updateFilters } = useContext(ProductsFilterContext);

    function filterProducts(event: React.FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const filters: FilterUpdate = {
            search: Array.from(formData.entries())
                .filter(([key]) => key === 'search')[0][1]
                .toString(),
            categories: Array.from(formData.entries())
                .filter(([key]) => key === 'Category')
                .map(([_, val]) => val.toString()),
            recycleMethods: Array.from(formData.entries())
                .filter(([key]) => key === 'Recycle Method')
                .map(([_, val]) => val.toString())
        };

        updateFilters(filters);
    }

    return (
        <Sidebar {...props}>
            <form ref={formRef} onSubmit={filterProducts}>
                <SidebarHeader>
                    <div className="pt-16"></div>

                    <SidebarGroup className="py-0">
                        <SidebarGroupContent className="relative">
                            <Label htmlFor="search" className="sr-only">
                                Search
                            </Label>
                            <input
                                name="search"
                                placeholder="Search products..."
                                data-slot="sidebar-input"
                                data-sidebar="input"
                                className="bg-background h-8 w-full shadow-none pl-8"
                            />
                            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarHeader>
                <SidebarContent className="gap-0">
                    {/* We create a collapsible SidebarGroup for each parent. */}
                    {data.navMain.map(category => (
                        <Collapsible
                            key={category.title}
                            title={category.title}
                            defaultOpen={false}
                            className="group/collapsible"
                        >
                            <SidebarGroup>
                                <SidebarGroupLabel
                                    asChild
                                    className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                                >
                                    <CollapsibleTrigger>
                                        {category.title}{' '}
                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarMenu className="p-2">
                                            {category.items.map(item => (
                                                <label key={item.id}>
                                                    <SidebarMenuItem
                                                        key={item.id}
                                                        className="border-2 flex gap-2 overflow-hidden
                          rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding]
                          hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2
                          active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none
                          disabled:opacity-50 text-ellipsis overflow-clip"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={item.id}
                                                            name={
                                                                category.title
                                                            }
                                                            value={item.id}
                                                        />
                                                        {item.label}
                                                    </SidebarMenuItem>
                                                </label>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    ))}
                    <div className="p-2 border-t-2 border-b">
                        <Button
                            type="submit"
                            data-sidebar="trigger"
                            data-slot="sidebar-trigger"
                            variant="outline"
                            size="icon"
                            className={cn(
                                'bg-green-600 hover:bg-green-700 font-bold w-2/5 gap-2 p-2'
                            )}
                        >
                            Filter
                        </Button>
                    </div>
                </SidebarContent>
                <SidebarRail />
            </form>
        </Sidebar>
    );
}
