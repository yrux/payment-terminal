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
                        @if($payment->status==0)
                            <span class="badge bg-warning text-dark">Pending</span>
                        @endif
                        @if($payment->status==3)
                            <span class="badge bg-warning text-dark">Pending</span>
                        @endif
                        @if($payment->status==1)
                            <span class="badge bg-success text-white">Paid</span>
                        @endif
                    </div>
                </div>
                <div class="row mt-4 invoice-header">
                    <div class="col">
                        <p class="text-start mb-0">Invoice #:</p>
                        {{$payment->inv_number}}
                    </div>
                    <div class="col d-flex justify-content-end">
                        <button onclick="printNow()" class="border-0 p-2 rounded-2 m-1"><i class="fa fa-print"></i></button>
                        <button onclick="downloadPDF()" class="border-0 p-2 rounded-2"><i class="fa fa-download"></i></button>
                        @if($payment->status!=1)
                            <button onclick="gotoPaymentLink()" class="border-0 p-2 text-white bg-primary rounded-2 m-1">PAY NOW</button>
                        @endif
                    </div>
                </div>
            </div>
            <div class="formbox @if($payment->status==0) pending @endif @if($payment->status==3) pending @endif @if($payment->status==1) paid @endif">
                <div class="row">
                    <div class="col">
                        <strong>{{$payment->brand->name}}</strong>
                    </div>
                    <div class="col">
                        <h2 class="text-end">Invoice</h2>
                        <p class="text-end mb-0">#{{$payment->inv_number}}</p>
                    </div>
                </div>
                <div class="row mt-4 invoice-header">
                    <div class="col"></div>
                    <div class="col text-end">
                        <p class="text-end mb-0">Balance Due</p>
                        ${{number_format($payment->amount, 2)}}
                    </div>
                </div>
                <div class="row mt-4 invoice-header">
                    <div class="col text-start">
                        <p class="text-start mb-0">Bill To</p>
                        {{ucwords($payment->customer_name)}}
                    </div>
                    <div class="col text-end">
                        <p class="text-end mb-0">Invoice Date</p>
                        {{date('Y-m-d', strtotime($payment->created_at))}}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <hr>
                        <table class="table table-bordered">
                            <thead>
                                <tr class="table-dark">
                                    <th>#</th>
                                    <th>Item & Description</th>
                                    <th>Qty</th>
                                    <th>Rate</th>
                                    <th>Tax</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{{implode(', ',explode(',', $payment->services))}}</td>
                                    <td>1</td>
                                    <td>${{number_format($payment->subtotal, 2)}}</td>
                                    <td>{{number_format($payment->tax_percent, 2)}}%</td>
                                    <td>${{number_format($payment->amount, 2)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-12">
                        <p class="badge bg-warning text-dark d-block">This charge will appear on your statement as “{{$payment->merchant->name}}”</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('js')
<script>
function gotoPaymentLink(){
    window.location.href = '{{route('payment', $id)}}'
}
function printNow(){
    window.print()
}
function downloadPDF(){
    window.location.href = '{{route('invoice', $id)}}?pdf=true'
}
</script>
@endpush
@push('css')
<style>
.invoice-header p{
    color: gray;
    font-size: 15px;
}
</style>
@endpush