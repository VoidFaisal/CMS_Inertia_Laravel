import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import CategoryNav from './categoryNav';
import { Input } from "../../components/ui/input"
import { LoaderCircle } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

export default function Category() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    // Handle input changes
    const handleChange = (e:any) => {
        setData({name:e.target.value});
    };

    // Handle form submission
    const handleSubmit = (e:any) => {
        e.preventDefault();
        post('/category',{
            onSuccess: () => {
                setData({name: '' }); // Reset form
            },});
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <CategoryNav/>
            <div className="flex w-full content-center justify-center">
            
                <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center rounded px-8 pt-6 pb-8">
                    <label htmlFor="first_name" className="mb-2 block text-lg font-bold">
                        Category Name
                    </label>
                    <Input type="text" placeholder="Category Name" id="product_name"
                        value={data.name}
                        onChange={handleChange}
                        className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${errors.name && '!ring-red-500'} `}/>
                    {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                    <button
                        type="submit"
                        className="focus:shadow-outline mt-2 rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:bg-slate-400 disabled:cursor-wait  w-full text-center" disabled={processing}
                    >
                       {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} Add Category
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
