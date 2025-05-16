<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Category::all();
        return Inertia::render('category/showCategories', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('category/category');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $category_data = $request->validate([
            'name' => 'required',
        ]);
        Category::Create($category_data);
        return redirect('/category/create');

    }

    /**
     * Display the specified resource.
     */
    public function show(category $category)
    {
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(category $category)
    {
        return Inertia::render('category/singleCategory',['category_data' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, category $category)
    {
         $category_data = $request->validate([
            'name' => 'required',
        ]);
        $category->update($category_data);

        return redirect('/category');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(category $category)
    {
       
        $category->delete();
        return redirect('category');
    }
}
