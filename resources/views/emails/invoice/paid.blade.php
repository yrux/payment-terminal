@component('mail::message')
# Hello {{$payment->customer_name}}

Thank you for the Payment, Here's the attached PDF receipt.

@component('mail::button', ['url' => $url])
Download PDF
@endcomponent

Thanks,<br>
{{ucwords($payment->brand->name)}}
@endcomponent