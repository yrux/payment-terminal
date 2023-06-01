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
                <form id="stripe-form" method="POST" action="{{route('paymentStripe', $payment)}}">
                @csrf
                    <h3>Card Holder's Details</h3>
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
                            <input required autocomplete="false" type="email" name="email" value="{{old('email')}}" class="form-control" placeholder="Email">
                        </div>
                        <div class="col">
                            <input autocomplete="false" required type="text" name="phone" value="{{old('phone')}}" class="form-control" placeholder="Phone Number">
                        </div>
                    </div>
                    <h3>Billing Details</h3>
                    <div class="row mb-3">
                        <div class="col">
                            <input required autocomplete="false" type="text" name="address" value="{{old('address')}}" class="form-control" placeholder="Street Address">
                        </div>
                        <div class="col">
                            <input autocomplete="false" type="text" name="address_two" value="{{old('address_two')}}" class="form-control" placeholder="Street Address 2 (Optional)">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <input required autocomplete="false" type="text" value="{{old('city')}}" name="city" class="form-control" placeholder="City">
                        </div>
                        <div class="col">
                            <input maxlength="3" required autocomplete="false" type="text" value="{{old('state')}}" name="state" class="form-control" placeholder="State">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <input required autocomplete="false" type="text" name="zip_code" value="{{old('zip_code')}}" class="form-control" placeholder="Zip/Postal Code">
                        </div>
                        <div class="col">
                            <select class="form-control" name="country_id" required>
                                <option value="">Select Country</option>
                                @foreach($countries as $country)
                                <option {{old('country_id')?($country->id==old('country_id')?'selected':''):''}} value="{{$country->id}}">{{$country->country_name}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <h3>Card Details</h3>
                    <input type="hidden" name="token_id" id="token_id" value="" />
                </form>
                <div class="mt-3 mb-3" id="card-element"></div>
                <div id="card-errors" class="bg-danger mt-3 p-1 text-white d-none"></div>
                <div class="row mt-2">
                    <div class="col-md-12">
                        <p class="badge bg-warning text-dark d-block">This charge will appear on your statement as “{{$payment->merchant->name}}”</p>
                    </div>
                </div>
                <div class="checkbox mt-2">
                    <input onchange="termsTgl(this)" checked type="checkbox" name="terms_and_conditions" id="terms_and_conditions" />
                    <label for="terms_and_conditions">I agree with the <a href="https://{{$payment->brand->terms_and_conditions}}" target="_blank">Terms and Conditions</a></label>
                </div>
                <button id="paybtn" type="button" onclick="handleStripe()" class="btn mt-4">Pay ${{number_format($payment->amount, 2)}}</button>
            </div>
        </div>
    </div>
</div>
@endsection
@push('js')
<script src="https://js.stripe.com/v3/"></script>
<script>
var stripe = Stripe('<?=$stripePK?>');
var elements = stripe.elements();
var paymentElement = elements.create('card', {
    style: {
        base: {
            // color: '#000000',
            // fontWeight: '500',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '18px',
            fontSmoothing: 'antialiased',
        }
    },
});
var displayError = document.getElementById('card-errors');
paymentElement.mount('#card-element')
paymentElement.on('change', function(event) {
  if (event.error) {
    $(displayError).removeClass('d-none')
    displayError.textContent = event.error.message;
  } else {
    $(displayError).addClass('d-none')
    displayError.textContent = '';
  }
});
function handleStripe(){
    $('#paybtn').prop('disabled', true)
    stripe.createToken(paymentElement).then(function(result) {
        // Handle result.error or result.token
        if(result.error){
            displayError.textContent = result.error.message;
            $('#paybtn').prop('disabled', false)
        }else{
            // console.log(result)
            $('#token_id').val(result.token.id)
            $('#stripe-form')[0].submit()
        }
    });
}
function termsTgl(obj){
    var check = $(obj).prop('checked')
    if(!check){
        $('#paybtn').prop('disabled', true)
    }else{
        $('#paybtn').prop('disabled', false)
    }
}
</script>
@endpush
@push('css')
<style>
</style>
@endpush