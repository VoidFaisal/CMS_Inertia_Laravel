import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import CategoryNav from './categoryNav';

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
            <CategoryNav/>
            <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
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
                        {data.map(category=>(<tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800" key={category.id}>
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white" >
                                {category.name}
                            </th>
                            <td className="px-6 py-4"><Link href={`category/${category.id}/edit`} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Edit</Link>
                            <Link href={`category/${category.id}`} method='delete' className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={()=>confirm()}>Delete</Link></td>
                            
                        </tr>)
                       )}
                         
                    </tbody>
                </table>
            </div>
                
        </AppLayout>
    );
}
