<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItems extends Model
{
    // /** @use HasFactory<\Database\Factories\InvoiceFactory> */
    protected $fillable = [
        'invoice_id',
        'product_id',
        'quantity',
        'unit_price',
        
    ];
    use HasFactory;
    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'invoice_id');
    }

    /**
     * Get the product associated with the item.
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
    

