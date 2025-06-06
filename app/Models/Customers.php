<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customers extends Model
{
   /** @use HasFactory<\Database\Factories\InvoiceFactory> */
    protected $fillable = [
        'name',
        'contact',
        

    ];
    use HasFactory;
    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'customer_id');
    }
}
