<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()

    {  $category_data = Category::all();
         $product_data = Product::all();
        return Inertia::render('product/product',['category' => $category_data,'product'=>$product_data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {   
        $category_data = Category::all();
        return Inertia::render('product/addProduct',['category' => $category_data, ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $product_data = $request->validate([
            'name' => 'required',
            'category_id'=>'required',
            'stock'=>'required|numeric',
            'price'=>'required|numeric',
        ]);
        Product::create($product_data);
        return redirect('product/create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {   
       $category_data = Category::all();
        return Inertia::render('product/editProduct',['category' => $category_data,'product'=> $product ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {   
         $product_data = $request->validate([
            'name' => 'required',
            'category_id'=>'required',
            'stock'=>'required|numeric',
            'price'=>'required|numeric',
        ]);
       $product->update($product_data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect('/product')->with('delete','the post was deleted!');
    }
}
