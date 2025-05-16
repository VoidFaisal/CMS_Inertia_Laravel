import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import InvoiceTemp from '@/components/invoice'
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoice',
        href: '/invoice',
    },
];

export default function Invoice() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoice" />
            <InvoiceTemp/>
            
        </AppLayout>
    );
}
