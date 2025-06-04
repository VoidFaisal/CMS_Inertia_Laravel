import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const currentUrl = page.url;

    // Track open dropdowns
    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

    // Open parent menus if current URL matches a child route
    useEffect(() => {
        const newOpenDropdowns: Record<string, boolean> = {};
        items.forEach(item => {
            if (item.children?.some(child => currentUrl.startsWith(child.href))) {
                newOpenDropdowns[item.title] = true;
            }
        });
        setOpenDropdowns(prev => ({ ...prev, ...newOpenDropdowns }));
    }, [currentUrl, items]);

    const toggleDropdown = (title: string) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map(item => (
                    <SidebarMenuItem key={item.title}>
                        {item.children ? (
                            <>
                                <SidebarMenuButton
                                    onClick={() => toggleDropdown(item.title)}
                                    tooltip={{ children: item.title }}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronDown
                                        className={`ml-auto h-4 w-4 transition-transform ${
                                            openDropdowns[item.title] ? 'rotate-180' : ''
                                        }`}
                                    />
                                </SidebarMenuButton>

                                {openDropdowns[item.title] && (
                                    <div className="ml-6 mt-1 space-y-1">
                                        {item.children.map(child => (
                                            <Link
                                                key={child.title}
                                                href={child.href}
                                                className={`block rounded px-2 py-1 text-sm hover:bg-gray-100/50 ${
                                                    currentUrl === child.href ? 'font-medium text-blue-600' : ''
                                                }`}
                                            >
                                                {child.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <SidebarMenuButton
                                asChild
                                isActive={item.href === currentUrl}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
