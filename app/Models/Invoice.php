<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    /** @use HasFactory<\Database\Factories\InvoiceFactory> */
    protected $fillable = [
        'customer_id',
        'total',
        'discount'
    ];
    use HasFactory;
    public function customer()
    {
        return $this->belongsTo(Customers::class, 'customer_id');
    }
    public function items()
    {
        return $this->hasMany(InvoiceItems::class, 'invoice_id');
    }
}
