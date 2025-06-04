import Card from '@/components/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
type HrefLink = {
    link:String;
    heading:String;
}
const links: HrefLink[] = [
    {
        link:'/invoice',
        heading:'Invoice'
    },
    {
        link:'/category',
        heading:'Category'
    },
    {
        link:'/product',
        heading:'Product'
    },
   
]
export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {links.map((link,index)=>(
                    <div key={index} className="group border-sidebar-border/70 dark:border-sidebar-border hover:border-black/70 hover:border-4 dark:hover:border-white  relative aspect-video overflow-hidden rounded-xl border  ">
                        <Card heading={link.heading} link={link.link}/>
                    </div>
                    ))}
                  
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
