import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
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
  stock: number;
  price: number;
};

type Props = {
  category: Category[];
  product: Product;
};

export default function Category({ category, product }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name || '',
    category_id: String(product.category_id) || '',
    stock: product.stock?.toString() || '',
    price: product.price?.toString() || '',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>(String(product.category_id) || '');

  // Handle input changes for all inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  // Handle category select change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setData('category_id', value);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    put(`/product/${product.id}`, {
      onSuccess: () => {
        // Keep data after successful update
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Product" />
      <div className="flex w-full justify-center">
        <form
          onSubmit={handleSubmit}
          className="mb-4 flex flex-col items-center rounded px-8 pt-6 pb-8"
        >
          {/* Category Select */}
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
          {errors.category_id && (
            <p className="text-sm text-red-500">Please Select Category</p>
          )}

          {/* Product Name Input */}
          <Input
            type="text"
            placeholder="Product Name"
            id="product_name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className={`focus:shadow-outline mt-2 w-2xl rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
              errors.name ? '!ring-red-500' : ''
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-500">Please Enter Product Name</p>
          )}

          {/* Stock Input */}
          <Input
            type="number"
            placeholder="Stock Quantity"
            id="stock"
            name="stock"
            min="0"
            value={data.stock}
            onChange={handleChange}
            className={`mt-2 w-2xl rounded border px-3 py-2 text-gray-700 shadow focus:outline-none ${
              errors.stock ? '!ring-red-500' : ''
            }`}
          />
          {errors.stock && (
            <p className="text-sm text-red-500">Please Enter Stock Quantity</p>
          )}

          {/* Price Input */}
          <Input
            type="number"
            placeholder="Price"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={data.price}
            onChange={handleChange}
            className={`mt-2 w-2xl rounded border px-3 py-2 text-gray-700 shadow focus:outline-none ${
              errors.price ? '!ring-red-500' : ''
            }`}
          />
          {errors.price && (
            <p className="text-sm text-red-500">Please Enter Price</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="focus:shadow-outline mt-4 rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:cursor-wait disabled:bg-slate-400"
            disabled={processing}
          >
            {processing && (
              <LoaderCircle className="h-4 w-4 animate-spin mr-2 inline-block" />
            )}
            Update Product
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
