import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/product',
    },
];
type Category = {
    id: any;
    name: string;
};
type Props = {
    category: Category[];
};
export default function Category({ category }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        stock: '',
        price: '',
    });
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    console.log(errors);

    // Handle input changes
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('name', e.target.value);
    };

    // handle select change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as 'name' | 'category_id' | 'stock' | 'price', value);
};
// Handle category select change
const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setData('category_id', value);
};


    // Handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        post('/product', {
            onSuccess: () => {
                setData({ name: '', category_id: '', stock: '', price: '' });
                setSelectedCategory('');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <div className="flex w-full content-center justify-center">
                <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center rounded px-8 pt-6 pb-8">
                    {/* Category Select (already exists) */}
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-2xl">
                            <SelectValue placeholder="Select a Category" className='text-white' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                {category.map((cat) => (
                                    <SelectItem key={cat.id} value={String(cat.id)}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.category_id && <p className="text-sm text-red-500">Please Select Category</p>}

                    {/* Product Name */}
                    <Input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={data.name}
                        onChange={handleChange}
                        className={`focus:shadow-outline mt-2 w-2xl appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${errors.name && '!ring-red-500'}`}
                    />
                    {errors.name && <p className="text-sm text-red-500">Please Enter Product Name</p>}

                    {/* Stock Input */}
                    <Input
                        type="number"
                        name="stock"
                        placeholder="Stock Quantity"
                        min="0"
                        value={data.stock}
                        onChange={handleChange}
                        className={`mt-2 w-2xl rounded border px-3 py-2 text-gray-700 shadow focus:outline-none ${errors.stock && '!ring-red-500'}`}
                    />
                    {errors.stock && <p className="text-sm text-red-500">Please Enter Stock Quantity</p>}

                    {/* Price Input */}
                    <Input
                        type="number"
                        name="price"
                        placeholder="Price"
                        min="0"
                        step="0.01"
                        value={data.price}
                        onChange={handleChange}
                        className={`mt-2 w-2xl rounded border px-3 py-2 text-gray-700 shadow focus:outline-none ${errors.price && '!ring-red-500'}`}
                    />
                    {errors.price && <p className="text-sm text-red-500">Please Enter Price</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="focus:shadow-outline mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:cursor-wait disabled:bg-slate-400"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} Add Product
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
