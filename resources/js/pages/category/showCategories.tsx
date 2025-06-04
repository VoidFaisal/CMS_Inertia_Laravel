import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import ConfirmAlert from '@/components/confirm-alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Categories',
        href: '/showcategories',
    },
];
type Category = {
  id: number;
  name: string;
};
type Props = {
  data: Category[];
};


export default function ShowCategories({ data }:Props) {
    //  const { delete } = useForm();
    console.log(useForm());

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
          
            <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm  rtl:text-right ">
                    <thead className=" uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Category name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(category=>(<tr className="border-b border-gray-200" key={category.id}>
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap " >
                                {category.name}
                            </th>
                            <td className=" flex px-6 py-4 gap-1"><Link href={`category/${category.id}/edit`}  className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:green-600 /20 mx-1 inline-flex items-center justify-center gap-2 rounded-md bg-green-700 px-6 text-sm font-medium whitespace-nowrap text-white shadow-xs transition-[color,box-shadow] outline-none hover:bg-green-800/90 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-green-800/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">Edit</Link>
                        
                             <ConfirmAlert onConfirm={() => router.delete(`category/${category.id}`)} /></td>
                           
                        </tr>)
                       )}
                         
                    </tbody>
                </table>
            </div>
                
        </AppLayout>
    );
}
