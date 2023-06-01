@extends('layouts.main')
@section('content')
<div class="loginPg">
    <!-- HEADER -->
    <div class="container-fluid">
        <div class="loginBox">
            <div class="logoarea">
                <img class="img-fluid" src="{{$payment->brand->image_url}}" alt="" />
            </div>
            <div class="formbox">
                <div class="row">
                    <div class="col">
                        <h1>${{number_format($payment->amount, 2)}}</h1>
                    </div>
                    <div class="col industry-icon">
                        <i class="fa fa-industry"></i>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td class="text-black-50">To</td>
                                    <td>{{$payment->customer_name}}</td>
                                </tr>
                                <tr>
                                    <td class="text-black-50">From</td>
                                    <td>{{$payment->sales_email}}</td>
                                </tr>
                                <tr>
                                    <td class="text-black-50">Memo</td>
                                    <td style="white-space:pre-wrap;">{{$payment->description}}</td>
                                </tr>
                                <tr>
                                    <td class="text-black-50">Services</td>
                                    <td>
                                        {{implode(', ',explode(',', $payment->services))}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="anothercarddiv" class="formbox">
                <div id="paypal-button-container"></div>
                <form id="paypal-form" method="POST" action="{{route('paymentPaypal', $payment)}}">
                    @csrf
                    <input type="hidden" name="orderID" id="orderID" value="" />
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
@push('js')
<script src="https://www.paypal.com/sdk/js?client-id={{$paypalCId}}"></script>
<script>
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '{{number_format($payment->amount, 2)}}'
                }
            }]
        });
    },
  onApprove(data) {
    // This function captures the funds from the transaction.
    $('#orderID').val(data.orderID);
    $('#paypal-form')[0].submit()
    // return fetch("/my-server/capture-paypal-order", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     orderID: data.orderID
    //   })
    // })
    // .then((response) => response.json())
    // .then((details) => {
    //   // This function shows a transaction success message to your buyer.
    //   alert('Transaction completed by ' + details.payer.name.given_name);
    // });
  }
}).render('#paypal-button-container');
//This function displays payment buttons on your web page.
</script>
@endpush
@push('css')
<style>
</style>
@endpush