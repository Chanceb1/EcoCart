'use client';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
// import { Icons } from '@/components/icons';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import { ModeToggle } from './Theme/ModeToggle';

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.'
    },
    {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description:
            'For sighted users to preview content available behind a link.'
    },
    {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
    },
    {
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.'
    },
    {
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description:
            'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
    },
    {
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
    }
];

export default function Header() {
    // Add this custom function inside the component
    const transparentNavigationMenuTriggerStyle = () => {
        return cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
            "bg-transparent hover:bg-accent/50"
        );
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full px-4 py-2 bg-background/80 border-b backdrop-blur-sm">
            <div className="container mx-auto flex justify-between items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link
                                to="/"
                                className={transparentNavigationMenuTriggerStyle()}
                            >
                                Home
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/products"
                                className={transparentNavigationMenuTriggerStyle()}
                            >
                                Products
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/about"
                                className={transparentNavigationMenuTriggerStyle()}
                            >
                                About
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/seller-dashboard"
                                className={transparentNavigationMenuTriggerStyle()}
                            >
                                Seller Dashboard
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/admin-dashboard"
                                className={transparentNavigationMenuTriggerStyle()}
                            >
                                Admin Dashboard
                            </Link>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-2">
                    <Link
                        to="/account"
                        className={transparentNavigationMenuTriggerStyle()}
                    >
                        Account
                    </Link>
                    <ModeToggle />
                    <Link
                        to="/cart"
                        className={transparentNavigationMenuTriggerStyle()}
                    >
                        Cart
                    </Link>
                    <Link
                        to="/login"
                        className={transparentNavigationMenuTriggerStyle()}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
// export default function Header() {
//     return (
// <div className="flex justify-center items-center w-full px-4 py-2 border-b">
//     <NavigationMenu>
//         <NavigationMenuList>
//             <NavigationMenuItem>
//                 <NavigationMenuTrigger>
//                     Getting started
//                 </NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                     <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                         <li className="row-span-3">
//                             <NavigationMenuLink asChild>
//                                 <a
//                                     className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                                     href="/"
//                                 >
//                                     {/* <Icons.logo className="h-6 w-6" /> */}
//                                     <div className="mb-2 mt-4 text-lg font-medium">
//                                         shadcn/ui
//                                     </div>
//                                     <p className="text-sm leading-tight text-muted-foreground">
//                                         Beautifully designed components
//                                         built with Radix UI and Tailwind
//                                         CSS.
//                                     </p>
//                                 </a>
//                             </NavigationMenuLink>
//                         </li>
//                         <ListItem href="/docs" title="Introduction">
//                             Re-usable components built using Radix UI and
//                             Tailwind CSS.
//                         </ListItem>
//                         <ListItem
//                             href="/docs/installation"
//                             title="Installation"
//                         >
//                             How to install dependencies and structure your
//                             app.
//                         </ListItem>
//                         <ListItem
//                             href="/docs/primitives/typography"
//                             title="Typography"
//                         >
//                             Styles for headings, paragraphs, lists...etc
//                         </ListItem>
//                     </ul>
//                 </NavigationMenuContent>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//                 <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//                         {components.map(component => (
//                             <ListItem
//                                 key={component.title}
//                                 title={component.title}
//                                 href={component.href}
//                             >
//                                 {component.description}
//                             </ListItem>
//                         ))}
//                     </ul>
//                 </NavigationMenuContent>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//                 test
//                 {/* <Link href="/docs" legacyBehavior passHref>
//                     <NavigationMenuLink
//                         className={navigationMenuTriggerStyle()}
//                     >
//                         Documentation
//                     </NavigationMenuLink>
//                 </Link> */}
//             </NavigationMenuItem>
//             <ModeToggle />
//         </NavigationMenuList>
//     </NavigationMenu>
//     </div>
//     );
// }

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';
