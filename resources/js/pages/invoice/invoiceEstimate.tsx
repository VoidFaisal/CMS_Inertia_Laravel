import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';
import EstimatePDF from './EstimatePdf';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Estimate Invoice',
        href: '/invoice/estimate',
    },
];

type ProductType = {
    id: string | number;
    name: string;
    price: number;
    stock?: number;
    [key: string]: any;
};

export default function InvoiceEstimate({ product }: { product: ProductType[] }) {
    const productOptions = product.map((p) => ({
        id: String(p.id),
        name: p.name,
        price: p.price ?? 0,
        stock: p.stock,
    }));

    const [data, setData] = useState({
        discount: 0,
        products: [{ productId: '', quantity: 1, price: 0 }],
    });

    const addProduct = () => {
        setData((prev) => ({
            ...prev,
            products: [...prev.products, { productId: '', quantity: 1, price: 0 }],
        }));
    };

    const handleProductChange = (index: number, value: string) => {
        const selectedProduct = productOptions.find((p) => p.id === value);
        const updatedProducts = [...data.products];
        updatedProducts[index].productId = value;
        updatedProducts[index].price = selectedProduct ? selectedProduct.price : 0;
        setData({ ...data, products: updatedProducts });
    };

    const handleQuantityChange = (index: number, value: number) => {
        const updatedProducts = [...data.products];
        updatedProducts[index].quantity = value;
        setData({ ...data, products: updatedProducts });
    };

    const handlePriceChange = (index: number, value: number) => {
        const updatedProducts = [...data.products];
        updatedProducts[index].price = value;
        setData({ ...data, products: updatedProducts });
    };

    const calculateGrandTotal = () => {
        return data.products.reduce((total, p) => total + p.quantity * p.price, 0);
    };

    const calculateFinalTotal = () => {
        return Math.max(0, calculateGrandTotal() - Number(data.discount || 0));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const isValid = data.products.every((p) => p.productId && p.quantity >= 1 && p.price >= 0);
        if (!isValid) {
            alert('Please select a product and ensure quantity and price are valid for all items.');
            return;
        }

        const finalTotal = calculateFinalTotal();

      
    };
    const handlePrintEstimate = async () => {
           const isValid = data.products.every((p) => p.productId && p.quantity >= 1 && p.price >= 0);
    
    if (!isValid) {
        alert('Please select all products and ensure quantity and price are valid before printing.');
        return;
    }
        const enrichedProducts = data.products.map((p) => {
  const productInfo = product.find((prod) => String(prod.id) === p.productId);
  return {
    ...p,
    productName: productInfo?.name || 'Unknown',
  };
});
        const blob = await pdf(<EstimatePDF products={enrichedProducts} discount={data.discount} finalTotal={calculateFinalTotal()} />).toBlob();

        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL, '_blank');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Estimate Invoice" />

            <div className="flex w-full justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6 rounded p-6 shadow">
                    {/* Products Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Products</h3>
                        {data.products.map((product, index) => (
                            <div key={index} className="grid grid-cols-1 items-end gap-4 md:grid-cols-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Select Product</label>
                                    <Select value={product.productId?.toString()} onValueChange={(value) => handleProductChange(index, value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productOptions.map((p) => (
                                                <SelectItem key={p.id} value={p.id}>
                                                    <span title={p.name}>{p.name}</span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">Quantity</label>
                                    <Input
                                    className='selection:text-yellow-400'
                                        type="number"
                                        min="1"
                                        value={product.quantity}
                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                                        placeholder="Qty"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">Price</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={product.price}
                                        onChange={(e) => handlePriceChange(index, parseFloat(e.target.value) || 0)}
                                        placeholder="Price"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">Total</label>
                                    <Input type="text" value={(product.quantity * product.price).toFixed(2)} disabled className="bg-transparent" />
                                </div>
                            </div>
                        ))}

                        <Button type="button" onClick={addProduct} variant="outline">
                            + Add Product
                        </Button>
                    </div>

                    {/* Discount and Total Section */}
                    <div className="space-y-4 border-t pt-4">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="w-full md:w-1/3">
                                <label className="mb-1 block text-sm font-medium">Discount</label>
                                <Input
                                    type="number"
                                    name="discount"
                                    value={data.discount}
                                    min="0"
                                    onChange={(e) => setData({ ...data, discount: parseFloat(e.target.value) || 0 })}
                                    placeholder="Enter discount amount"
                                />
                            </div>

                            <div className="w-full space-y-1 text-right md:w-2/3">
                                <p>
                                    <strong>Grand Total:</strong> ₹{calculateGrandTotal().toFixed(2)}
                                </p>
                                <p>
                                    <strong>Discount:</strong> ₹{data.discount || 0}
                                </p>
                                <p className="text-lg font-semibold">
                                    <strong>Final Total:</strong> ₹{calculateFinalTotal().toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Submit and Print */}
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Button type="button" className="w-full cursor-pointer" onClick={handlePrintEstimate}>
                            Print Estimate
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
