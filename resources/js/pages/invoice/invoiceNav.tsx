import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Link, usePage } from '@inertiajs/react';

const navigationMenuItems = [
    { title: 'New Invoice', href: '/invoice' },
    { title: 'Print Invoice', href: '/invoice/show' },
];

export default function CategoryNav() {
    const page = usePage();

    return (
        <div className="mb-6 flex justify-center border-b pb-4">
            <NavigationMenu>
                <NavigationMenuList className="flex space-x-4">
                    {navigationMenuItems.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            <Link
                                href={item.href}
                                className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 
                                    ${item.href === page.url 
                                        ? 'bg-blue-600 text-white shadow-sm' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                {item.title}
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
