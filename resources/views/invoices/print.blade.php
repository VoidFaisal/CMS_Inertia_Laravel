<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice #{{ $invoiceData->first()->invoice }}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .invoice-box { max-width: 800px; margin: auto; padding: 20px; border: 1px solid #eee; }
        .invoice-box table { width: 100%; border-collapse: collapse; }
        .invoice-box table th, .invoice-box table td { padding: 10px; border: 1px solid #ddd; }
        .invoice-box table th { background-color: #f4f4f4; }
        .header { text-align: center; margin-bottom: 20px; }
        .footer { margin-top: 20px; text-align: right; }
    </style>
</head>
<body onload="window.print()">
    <div class="invoice-box">
        <div class="header">
            <h1>Invoice #{{ $invoiceData->first()->invoice }}</h1>
            <p>Customer: {{ $invoiceData->first()->customer_name }}</p>
            <p>Date: {{ now()->format('d M Y') }}</p>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($invoiceData as $item)
                    <tr>
                        <td>{{ $item->product_name }}</td>
                        <td>{{ $item->quantity }}</td>
                        <td>{{ $item->unit_price }}</td>
                        <td>{{ $item->quantity * $item->unit_price }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="footer">
            <p><strong>Subtotal:</strong> {{ $invoiceData->first()->total + $invoiceData->first()->discount }}</p>
            <p><strong>Discount:</strong> {{ $invoiceData->first()->discount }}</p>
            <p><strong>Total:</strong> {{ $invoiceData->first()->total }}</p>
        </div>
    </div>
   
</body>
</html>