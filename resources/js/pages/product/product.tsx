import ConfirmAlert from '@/components/confirm-alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertDestructive } from '@/components/alert-box';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Products',
        href: '/products',
    },
];

type Category = {
    id: number;
    name: string;
};
type Product = {
    id: number;
    name: string;
    category_id: number;
    stock: number;
    price: number;
};

type Flash = {
    delete?: string;
    success?: string;
};

type PageProps = {
    flash: Flash;
};
type Props = {
    category: Category[];
    product: Product[];
};

export default function Product({ category, product }: Props) {
    //  const { delete } = useForm();
    const { flash } = usePage<PageProps>().props;

    setTimeout(() => {
        flash.delete == null;
    }, 2000);

    const productsWithCategory = product.map((product_data) => {
    const category_data = category.find((cat) => cat.id === product_data.category_id);
    return {
        ...product_data,
        categoryName: category_data ? category_data.name : 'Unknown',
    };
});
    console.log(productsWithCategory);
    return (
       <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Products" />
        {flash.success && <div className="mb-4 rounded bg-green-100 px-4 py-2 text-green-800">{flash.success}</div>}

        {flash.delete && <div className="w-2xl my-2 mx-auto"><AlertDestructive variant="deleted" message={flash.delete} /></div>}

        <div className="relative overflow-x-auto">
            {productsWithCategory.length > 0 ? (
                <table className="w-full text-left text-sm ">
                    <thead className=" text-xs  uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">Product Name</th>
                            <th scope="col" className="px-6 py-3">Category Name</th>
                            <th scope="col" className="px-6 py-3">Stock</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsWithCategory.map((product_category_data) => (
                            <tr
                                className="border-b"
                                key={product_category_data.id}
                            >
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                    {product_category_data.name}
                                </th>
                                <td className="px-6 py-4">{product_category_data.categoryName}</td>
                                <td className="px-6 py-4">{product_category_data.stock}</td>
                                <td className="px-6 py-4">${product_category_data.price}</td>
                                <td className="flex py-4 gap-1">
                                    <Link
                                        href={`product/${product_category_data.id}/edit`}
                                        className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:green-600 /20 mx-1 inline-flex items-center justify-center gap-2 rounded-md bg-green-700 px-6 text-sm font-medium whitespace-nowrap text-white shadow-xs transition-[color,box-shadow] outline-none hover:bg-green-800/90 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-green-800/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                                    >
                                        Edit
                                    </Link>

                                    <ConfirmAlert onConfirm={() => router.delete(`/product/${product_category_data.id}`)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1 className="text-center text-2xl font-bold">No Products Available</h1>
            )}
        </div>
    </AppLayout>
    );
}
