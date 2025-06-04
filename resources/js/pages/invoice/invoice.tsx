import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoice',
        href: '/invoice',
    },
];
type InvoiceProduct = {
    invoice: number;
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: string; // Stored as string (e.g., "1200.00")
    discount: number;
    total: string; // Stored as string (e.g., "50700.00")
    customer_name: string;
};
type GroupedInvoice = {
    invoice: number;
    customer_name: string;
    discount: number;
    total: string;
    products: InvoiceProduct[];
};

export default function Invoice({ invoice, out_of_stock_products }: any) {
    console.log(invoice, out_of_stock_products);
    // 1. Group by invoice
    const groupedInvoices: GroupedInvoice[] = [];
    const map = new Map<number, GroupedInvoice>();

    for (const item of invoice) {
        if (!map.has(item.invoice)) {
            const newGroup: GroupedInvoice = {
                invoice: item.invoice,
                customer_name: item.customer_name,
                discount: item.discount,
                total: item.total,
                products: [],
            };
            map.set(item.invoice, newGroup);
            groupedInvoices.push(newGroup);
        }
        map.get(item.invoice)!.products.push(item);
    }

    console.log(groupedInvoices);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoice" />
            <div className="mt-6">
                {Object.values(groupedInvoices).map((group) => (
                    <div key={group.invoice} className="mb-6 flex justify-between gap-4 border p-4">
                        <h2 className="text-lg font-bold">Invoice #{group.invoice}</h2>
                        <div className="flex gap-4">
                            <Link
                                href={`invoice/${group.invoice}`}
                                method="delete"
                                as="button"
                                onClick={(e) => {
                                    if (!confirm('Do you want to delete this item?')) {
                                        e.preventDefault(); // Stop the delete request
                                    }
                                }}
                            >
                                <Button variant="outline" className="cursor-pointer hover:bg-red-600">
                                    Delete
                                </Button>
                            </Link>

                            <a href={`invoice/${group.invoice}`} target="_blank">
                                <Button variant="outline" className="cursor-pointer">
                                    View
                                </Button>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
