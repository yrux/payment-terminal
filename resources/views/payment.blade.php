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
                                    <td>{{$payment->brand->name}} | {{$payment->user->name}}</td>
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
            @if(count($cards))
                @if(isset($_GET['admin']))
                    <div class="formbox">
                        <h3>Previous Cards</h3>
                        <div class="accordion" id="accordionExample">
                            @foreach($cards as $cardk => $card)
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne{{$cardk}}">
                                    <button class="accordion-button {{$cardk==0?'':'collapsed'}}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne{{$cardk}}" aria-expanded="{{$cardk==0?'true':'false'}}" aria-controls="collapseOne{{$cardk}}">
                                        {{$card['cardDigits']}} | {{$card['expiry']}}
                                    </button>
                                </h2>
                                <div id="collapseOne{{$cardk}}" class="accordion-collapse collapse {{$cardk==0?'show':''}}" aria-labelledby="headingOne{{$cardk}}" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Type</td>
                                                    <td>{{$card['cardType']}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Number</td>
                                                    <td>{{$card['cardDigits']}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Number</td>
                                                    <td>{{$card['expiry']}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button onclick="payusing({{$card['profileid']}}, {{$customerDb->authorize_id}})" class="btn btn-success">Pay ${{number_format($payment->amount, 2)}}</button>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                            <button onclick="addAnotherCard()" class="btn btn-success mt-4">Add Another Card</button>
                        </div>
                    </div>
                @endif
            @endif
            <div id="anothercarddiv" class="formbox {{count($cards)>0?'d-none':''}}">
                @if($payment->merchant->merchant_type==1)
                <form action="{{route('payment.charge', $payment)}}" method="POST">
                    <h3>Billing Information</h3>
                    <div class="row mb-3">
                        <div class="col">
                            <input required autocomplete="false" type="text" name="first_name" value="{{old('first_name')}}" class="form-control" placeholder="First Name">
                        </div>
                        <div class="col">
                            <input required autocomplete="false" type="text" name="last_name" value="{{old('last_name')}}" class="form-control" placeholder="Last Name">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <input required autocomplete="false" type="text" name="address" value="{{old('address')}}" class="form-control" placeholder="Street Address">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <input autocomplete="false" type="text" name="address_two" value="{{old('address_two')}}" class="form-control" placeholder="Street Address 2 (Optional)">
                        </div>
                        <div class="col">
                            <input autocomplete="false" required type="text" name="phone" value="{{old('phone')}}" class="form-control" placeholder="Phone Number">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <select class="form-control" name="country_id" required>
                                <option value="">Select Country</option>
                                @foreach($countries as $country)
                                <option {{old('country_id')?($country->id==old('country_id')?'selected':''):''}} value="{{$country->id}}">{{$country->country_name}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col">
                            <input required autocomplete="false" type="text" value="{{old('city')}}" name="city" class="form-control" placeholder="City">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <input maxlength="3" required autocomplete="false" type="text" value="{{old('state')}}" name="state" class="form-control" placeholder="State">
                        </div>
                        <div class="col">
                            <input required autocomplete="false" type="text" name="zip_code" value="{{old('zip_code')}}" class="form-control" placeholder="Zip/Postal Code">
                        </div>
                    </div>
                    <h3>Card Information</h3>
                    @csrf
                    <div class="mb-3">
                        <input required autocomplete="false" type="text" name="card_name" class="form-control" placeholder="Card Holder Name" value="{{old('card_name')?old('card_name'):$payment->customer_name}}">
                    </div>
                    <div class="mb-3">
                        <input required autocomplete="false" type="text" name="card_number" value="{{old('card_number')}}" class="form-control" placeholder="1234 1234 1234 1234">
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <select class="form-control" name="mm" required>
                                <option value="">MM</option>
                                @for($i=1; $i<13;$i++)
                                <option value="{{$i<=9?('0'.$i):$i}}">{{$i<=9?('0'.$i):$i}}</option>
                                @endfor
                            </select>
                        </div>
                        <div class="col">
                            <select class="form-control" name="yy" required>
                                <option value="">YY</option>
                                @for($i=date('Y'); $i<(date('Y')+20);$i++)
                                <option value="{{$i}}">{{$i}}</option>
                                @endfor
                            </select>
                        </div>
                        <div class="col">
                            <input required autocomplete="false" type="text" name="cvc" class="form-control" placeholder="CVC">
                        </div>
                    </div>
                    <button class="btn">Pay ${{number_format($payment->amount, 2)}}</button>
                </form>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
@push('js')
<script>
function addAnotherCard(){
    $('#anothercarddiv').removeClass('d-none')
    var scrollDiv = document.getElementById("anothercarddiv").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
}
function payusing(cppid,cpid){
    window.location.href = '{{url('/payment/authorize')}}/{{$payment->id}}/'+cppid+'/'+cpid
}
</script>
@endpush
@push('css')
<style>
</style>
@endpush