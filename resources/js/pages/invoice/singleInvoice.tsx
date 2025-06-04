import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
// import html2canvas from 'html2canvas';
import html2canvas from 'html2canvas-pro';

import jsPDF from 'jsPDF';
import React, { useRef } from 'react';
import AppLayout from '@/layouts/app-layout';

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
    unit_price: number; // Stored as string (e.g., "1200.00")
    discount: number;
    total: string; // Stored as string (e.g., "50700.00")
    customer_name: string;
};
type GroupedInvoice = {
    invoice: number;
    customer_name: string;
    customer_contact: number;
    created_at: Date;
    discount: number;
    total: string;
    products: InvoiceProduct[];
};
export default function singleInvoice({ invoiceData }: any) {
    const invoiceRef = useRef<HTMLDivElement>(null);

    const groupedInvoices: GroupedInvoice[] = [];
    const map = new Map<number, GroupedInvoice>();

    for (const item of invoiceData) {
        if (!map.has(item.invoice)) {
            const newGroup: GroupedInvoice = {
                invoice: item.invoice,
                customer_name: item.customer_name,
                customer_contact: item.contact,
                created_at: new Date(item.created_at), // 👈 ensures toLocaleDateString works

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
    const invoiceGroup = groupedInvoices[0];

    const handleDownload = async () => {
        const element = invoiceRef.current;
        if (!element) {
            return;
        }

        const canvas = await html2canvas(element, {
            scale:2,
        });
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'letter',
        });

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice.pdf`);
    };
    const handlePrint = async () => {
        const element = invoiceRef.current;
        if (!element) {
            return;
        }

        const canvas = await html2canvas(element, {
            scale: 2,
        });
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'letter',
        });

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.autoPrint();
        window.open(pdf.output('bloburl'), '_blank');
    };
    return (
    <>
    
            <Head title="Print Invoice" />
            <div className="flex justify-end gap-4 p-4 bg-white text-black  w-full">
                <Button variant="outline" className="hover:bg-emerald-300 bg-white" onClick={handleDownload}>
                    Download PDF
                </Button>
                <Button variant="outline" className="hover:bg-lime-300 bg-white" onClick={handlePrint}>
                    print
                </Button>
            </div>
            <React.Fragment>
                <div ref={invoiceRef} id="print-section" className="bg-white text-black p-6 w-full flex flex-col min-h-screen">
                    <header className="flex items-center justify-between p-6 ">
                        <div className="flex gap-2 text-justify">
                            {/* <MountainIcon className="h-16 w-16" /> */}
                            <img src="/images/sss.png" alt="Logo" className='relative bottom-6 '/>
                            <div>
                                <h1 className="text-2xl font-bold">Samir Solar Solutions</h1>
                                <p>Tel: 0995259100</p>
                                <p className='flex mb-1 mt-1'>Whatsapp: 03112244118</p>
                                <p>Email: samirsolarsolutions@gmail.com</p>
                              
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">Invoice # {invoiceGroup.invoice}</h2>
                            <p className=" ">
                                Date:{' '}
                                {new Date(invoiceGroup.created_at).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: 'long', // 👈 shows full month name like "May"
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    </header>
                    <main className="p-6 ">
                        <Card className="bg-white text-black p-6 w-full">
                            <CardHeader>
                                <CardTitle>Customer Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p>{invoiceGroup.customer_name}</p>
                                <p>{invoiceGroup.customer_contact}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white text-black p-6 w-full mt-6">
                            <CardHeader>
                                <CardTitle>Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table >
                                    <TableHeader >
                                        <TableRow >
                                            <TableHead className="text-black">Description</TableHead>
                                            <TableHead className="text-black">Quantity</TableHead>
                                            <TableHead className="text-black">Unit Price</TableHead>
                                            <TableHead className="text-black">Flat Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoiceGroup.products.map((product, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{product.product_name}</TableCell>
                                                <TableCell>{product.quantity}</TableCell>
                                                <TableCell>
                                                    {Number(product.unit_price).toLocaleString('en-PK', {
                                                        style: 'currency',
                                                        currency: 'PKR',
                                                    })}
                                                </TableCell>
                                                <TableCell>
                                                    {(product.quantity * product.unit_price).toLocaleString('en-PK', {
                                                        style: 'currency',
                                                        currency: 'PKR',
                                                    })}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </main>
                    <footer className="p-6">
                        <Card className="bg-white text-black p-6 w-full">
                            <CardHeader>
                                <CardTitle>Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex items-center">
                                    <div>Subtotal</div>
                                    <div className="ml-auto">
                                        {(parseFloat(invoiceGroup.total) + invoiceGroup.discount).toLocaleString('en-PK', {
                                            style: 'currency',
                                            currency: 'PKR',
                                        })}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div>Discount</div>
                                    <div className="ml-auto">
                                        {invoiceGroup.discount.toLocaleString('en-PK', {
                                            style: 'currency',
                                            currency: 'PKR',
                                        })}
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center font-medium">
                                    <div>Total</div>
                                    <div className="ml-auto">
                                        {parseFloat(invoiceGroup.total).toLocaleString('en-PK', {
                                            style: 'currency',
                                            currency: 'PKR',
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </footer>
                    <h1 className='text-center mt-auto pt-8 text-sm text-gray-600'>We appreciate your business and look forward to serving you again.</h1>
                </div>
            </React.Fragment>
       </>
    );
}
