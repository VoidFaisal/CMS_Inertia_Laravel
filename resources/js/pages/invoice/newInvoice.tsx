import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Invoices',
        href: '/invoice/create',
    },
];

// Example product list
// const productOptions = [
//     { id: '1', name: 'Product A', price: 1000 },
//     { id: '2', name: 'Product B', price: 2000 },
//     { id: '3', name: 'Product C', price: 3000 },
// ];
type ProductType = {
    id: string | number;
    name: string;
    price: number;
    [key: string]: any; // for created_at, etc.
};

export default function Invoice({ product }: { product: ProductType[] }) {
    // Add this to your form state
    // console.log(product);
    const productOptions = product.map((p) => ({
        id: String(p.id),
        name: p.name,
        price: p.price ?? 0,
        stock: p.stock,
    }));

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        contact: '',
        discount: 0,
        total: 0, // ✅ Add this
        products: [{ productId: '', quantity: 1, price: 0 }],
    });
    
    

    const addProduct = () => {
        setData('products', [...data.products, { productId: '', quantity: 1, price: 0 }]);
    };

    const handleCustomerChange = (e: any) => {
        setData(e.target.name, e.target.value);
    };

    const handleProductChange = (index: number, value: string) => {
        const selectedProduct = productOptions.find((p) => p.id === value);
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
    const calculateGrandTotal = () => {
        return data.products.reduce((total, p) => total + p.quantity * p.price, 0);
    };

    const calculateFinalTotal = () => {
        return Math.max(0, calculateGrandTotal() - Number(data.discount || 0));
    };

    const grandTotal = calculateGrandTotal();
    const finalTotal = calculateFinalTotal();
    const handleSubmit = (e: any) => {
        e.preventDefault();

        for (const item of data.products) {
            const productInfo = productOptions.find((p) => p.id === item.productId);
            if (!productInfo) {
                alert(`Product with ID ${item.productId} not found.`);
                return;
            }

            if (item.quantity > productInfo.stock) {
                alert(`Only ${productInfo.stock} units available for "${productInfo.name}". You entered ${item.quantity}.`);
                return;
            }
        }

        // Validate products
        const isValid = data.products.every((p) => p.productId && p.quantity >= 1 && p.price >= 0);
        if (!isValid) {
            alert('Please select a product and ensure quantity is at least 1 for all items.');
            return;
        }

        const grandTotal = calculateGrandTotal();
        if (grandTotal <= 0) {
            alert('The invoice total must be greater than 0. Please add valid products.');
            return;
        }

        const discount = Number(data.discount || 0);
        const finalTotal = Math.max(0, grandTotal - (isNaN(discount) ? 0 : discount));

        // Log calculations for debugging
        console.log('Grand Total:', grandTotal);
        console.log('Discount:', discount);
        console.log('Final Total:', finalTotal);
        console.log('Products:', data.products);

        // Create updated form data
        const updatedData = {
            ...data,
            total: finalTotal,
        };
        setData((data) => updatedData);
        // Log the data to be sent
        console.log('Form data which nt have been set:', updatedData);
        console.log('Form data which have been set:', data);

        // Update form state for UI consistency

        // Send the POST request with updated data
        post('/invoice');
    };
    // , {
    //         onSuccess: () => {
    //             setData({
    //                 name: '',
    //                 contact: '',
    //                 discount: 0,
    //                 total: 0, // reset
    //                 products: [{ productId: '', quantity: 1, price: 0 }],
    //             });
    //         },
    //         preserveState: false,
    //     }
console.log('errors',errors);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Invoice" />

            <div className="flex w-full justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6 rounded p-6 shadow">
                    <h2 className="text-2xl font-bold">Create Invoice</h2>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Customer Name</label>
                            <Input type="text" name="name" value={data.name} onChange={handleCustomerChange} placeholder="Enter customer name" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Customer Contact</label>
                            <Input
                                type="text"
                                name="contact"
                                value={data.contact}
                                onChange={handleCustomerChange}
                                placeholder="Enter customer Contact"
                                pattern="[0-9]{11}"
                                maxLength={11}
                                onInput={(e: any) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits
                                }}
                            />
                        </div>
                    </div>

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
                                                    <div className='grid grid-cols-1'>
                                                    <span className="  " title={p.name}>
                                                        {p.name} 
                                                    </span>
                                                    <span> {p.stock} in stock</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">Quantity</label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={product.quantity}
                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                        placeholder="Qty"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">Price</label>
                                    <Input type="text" value={product.price} disabled className="bg-gray-100" />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">Total</label>
                                    <Input type="text" value={product.quantity * product.price} disabled className="bg-gray-100" />
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
                                    onChange={(e) => setData('discount', parseFloat(e.target.value))}
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

                    {/* Submit */}
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Save Invoice
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
