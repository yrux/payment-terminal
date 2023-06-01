@component('mail::message')
# Hello {{$payment->customer_name}}

New Invoice has been generated by {{$payment->sales_email}}, To View the Invoice Click button below

@component('mail::button', ['url' => $url])
Pay Now
@endcomponent

Thanks,<br>
{{ucwords($payment->brand->name)}}
@endcomponent