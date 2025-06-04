<?php

namespace App\Http\Controllers;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use App\Models\Customers;
use App\Models\Invoice;
use App\Models\InvoiceItems;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $threshold = 5;
        $products = [];

        $checkThreshold = Product::select("stock", "id")->get();

        foreach ($checkThreshold as $check) {
            if ($check->stock < $threshold) {
                $products[] = Product::find($check->id);
            }
        }

       
        $invoiceData = DB::table('invoice_product_summary')->orderBy('invoice', 'desc')->get();
        return Inertia::render('invoice/invoice', ['invoice' => $invoiceData,'out_of_stock_products'=>$products]);

    }
    public function estimate(){
         $product = Product::all();
        return Inertia::render('invoice/invoiceEstimate', ['product' => $product]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $product = Product::all();
        return Inertia::render('invoice/newInvoice', ['product' => $product]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'required|string|min:11|max:11',
            'discount' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'products' => 'required|array|min:1',
            'products.*.productId' => 'required|integer|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.price' => 'required|numeric|min:0',
        ]);
        $customer = Customers::create([
            'name' => $request->name,
            'contact' => $request->contact,
        ]);

        $lastInsertedIdCustomer = $customer->id;
        $total = 0;
        foreach ($request->products as $product) {

            $total = $total + $product['quantity'] * $product['price'];

        }
        $discount = $request->discount ?? 0;
        $total = $total - $discount;
        $invoice = Invoice::create([
            'customer_id' => $lastInsertedIdCustomer,
            'total' => $total,
            'discount' => $request->discount ?? 0,
        ]);

        foreach ($request->products as $product) {
            $invoice_item = InvoiceItems::create([
                'invoice_id' => $invoice->id,
                'product_id' => $product['productId'],
                'quantity' => $product['quantity'],
                'unit_price' => $product['price'],
            ]);
            Product::where('id', $product['productId'])->decrement('stock', $product['quantity']);

        }

        // Redirect to the print route with the invoice ID
        return redirect('/invoice');
    }
    public function show(Invoice $invoice)
    {
        $invoiceData = DB::table('invoice_product_summary')->where('invoice', $invoice->id)->get();
        return Inertia::render('invoice/singleInvoice', ['invoiceData' => $invoiceData]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
         $invoice->delete();
        return redirect('/invoice')->with('delete','the invoice was deleted!');
    }
}
