import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Link, usePage } from '@inertiajs/react';

const navigationMenuItems = [
    { title: 'All Products', href: '/product' },
    { title: 'New Product', href: '/product/create' },
];

export default function ProductNav() {
    const page = usePage();
    return (
        <div className="mb-4 flex justify-around border-b p-2">
            <NavigationMenu>
                <NavigationMenuList>
                    {navigationMenuItems.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            <Link className={`px-4 py-2 ${item.href == page.url ? 'bg-gray-500 text-white' : ''}`} href={item.href}>
                                {item.title}
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
