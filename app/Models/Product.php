<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
      protected $fillable = [
        'name',
        'category_id',
        'stock',
        'price',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Get the invoice items for the product.
     */
    public function invoiceItems()
    {
        return $this->hasMany(InvoiceItems::class, 'product_id');
    }

}
