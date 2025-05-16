import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import InvoiceNav from "./invoiceNav";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: '/invoice',
    },
];

// Example product list
const productOptions = [
    { id: '1', name: 'Product A', price: 1000 },
    { id: '2', name: 'Product B', price: 2000 },
    { id: '3', name: 'Product C', price: 3000 },
];

export default function Invoice() {
   // Add this to your form state
const { data, setData, post, processing, errors } = useForm({
    customerName: '',
    customerContact: '',
    discount: 0,
    products: [{ productId: '', quantity: 1, price: 0 }],
});


    const addProduct = () => {
        setData('products', [...data.products, { productId: '', quantity: 1, price: 0 }]);
    };

    const handleCustomerChange = (e: any) => {
        setData(e.target.name, e.target.value);
    };

    const handleProductChange = (index: number, value: string) => {
        const selectedProduct = productOptions.find(p => p.id === value);
        const updatedProducts = [...data.products];
        updatedProducts[index].productId = value;
        updatedProducts[index].price = selectedProduct ? selectedProduct.price : 0;
        setData('products', updatedProducts);
    };

    const handleQuantityChange = (index: number, value: number) => {
        const updatedProducts = [...data.products];
        updatedProducts[index].quantity = value;
        setData('products', updatedProducts);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post('/invoice', {
            onSuccess: () => {
                setData({
                    customerName: '',
                    customerContact: '',
                    discount:0,
                    products: [{ productId: '', quantity: 1, price: 0 }],
                });
            },
        });
    };
const calculateGrandTotal = () => {
    return data.products.reduce((total, p) => total + (p.quantity * p.price), 0);
};

const calculateFinalTotal = () => {
    return Math.max(0, calculateGrandTotal() - Number(data.discount || 0));
};

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Invoice" />
<InvoiceNav/>
            <div className="flex w-full justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6 rounded bg-white p-6 shadow">
                    <h2 className="text-2xl font-bold">Create Invoice</h2>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Customer Name</label>
                            <Input
                                type="text"
                                name="customerName"
                                value={data.customerName}
                                onChange={handleCustomerChange}
                                placeholder="Enter customer name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Customer Contact</label>
                            <Input
                                type="number"
                                name="customerContact"
                                value={data.customerContact}
                                onChange={handleCustomerChange}
                                placeholder="Enter customer email"
                            />
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Products</h3>
                        {data.products.map((product, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Select Product</label>
                                    <Select
                                        value={product.productId}
                                        onValueChange={(value) => handleProductChange(index, value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productOptions.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Quantity</label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={product.quantity}
                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                        placeholder="Qty"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Price</label>
                                    <Input
                                        type="text"
                                        value={product.price}
                                        disabled
                                        className="bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Total</label>
                                    <Input
                                        type="text"
                                        value={product.quantity * product.price}
                                        disabled
                                        className="bg-gray-100"
                                    />
                                </div>
                            </div>
                        ))}

                        <Button type="button" onClick={addProduct} variant="outline">
                            + Add Product
                        </Button>
                    </div>
{/* Discount and Total Section */}
<div className="border-t pt-4 space-y-4">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium mb-1">Discount</label>
            <Input
                type="number"
                name="discount"
                value={data.discount}
                min="0"
                onChange={(e) => setData('discount', parseFloat(e.target.value))}
                placeholder="Enter discount amount"
            />
        </div>

        <div className="text-right w-full md:w-2/3 space-y-1">
            <p><strong>Grand Total:</strong> ₹{calculateGrandTotal().toFixed(2)}</p>
            <p><strong>Discount:</strong> ₹{data.discount || 0}</p>
            <p className="text-lg font-semibold"><strong>Final Total:</strong> ₹{calculateFinalTotal().toFixed(2)}</p>
        </div>
    </div>
</div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Save Invoice
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
