import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import ProductNav from './productNav';

import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select';
import { LoaderCircle } from 'lucide-react';

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
type Product = {
    id: number;
    category_id: number;
    name: string;
};
type Props = {
    category: Category[];
    product: Product;
};
export default function Category({ category, product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        category_id: String(product.category_id) || '',
    });
    const [selectedCategory, setSelectedCategory] = useState<string>(String(product.category_id) || '');

    console.log(errors);

    // Handle input changes
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('name', e.target.value);
    };

    // handle select change
    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        setData('category_id', value);
    };

    // Handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        put(`/product/${product.id}`, {
            onSuccess: () => {
                setData({ name: '', category_id: '' });
                setSelectedCategory('');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <ProductNav />
            <div className="flex w-full content-center justify-center">
                <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center rounded px-8 pt-6 pb-8">
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-2xl">
                            <SelectValue placeholder="Select a Category" />
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
                    <Input
                        type="text"
                        placeholder="Product Name"
                        id="product_name"
                        value={data.name}
                        onChange={handleNameChange}
                        className={`focus:shadow-outline mt-2 w-2xl appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${errors.category_id || (errors.name && '!ring-red-500')} `}
                    />
                    {errors.name && <p className="text-sm text-red-500">Please Enter Product Name</p>}
                    <button
                        type="submit"
                        className="focus:shadow-outline mt-2 rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:cursor-wait disabled:bg-slate-400 "
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Update Product
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
