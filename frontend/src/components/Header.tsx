import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
// import { Icons } from '@/components/icons';
import { useAuth } from '@/contexts/AuthContext.tsx';

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
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Navigate to home page after logout
    };

    const transparentNavigationMenuTriggerStyle = () => {
        return cn(
            'group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
            'bg-transparent hover:bg-accent/50'
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

                        {user?.role.includes('seller') ||
                            (user?.role.includes('admin') && (
                                <NavigationMenuItem>
                                    <Link
                                        to="/seller-dashboard"
                                        className={transparentNavigationMenuTriggerStyle()}
                                    >
                                        Seller Dashboard
                                    </Link>
                                </NavigationMenuItem>
                            ))}

                        {user?.role.includes('admin') && (
                            <NavigationMenuItem>
                                <Link
                                    to="/admin-dashboard"
                                    className={transparentNavigationMenuTriggerStyle()}
                                >
                                    Admin Dashboard
                                </Link>
                            </NavigationMenuItem>
                        )}
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
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className={transparentNavigationMenuTriggerStyle()}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className={transparentNavigationMenuTriggerStyle()}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

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
