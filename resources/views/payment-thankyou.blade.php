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
                        <h1>Thank you,</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="alert alert-success" role="alert">
                            Your transaciton have been approved. We have emailed you the invoice
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('js')
<script>

</script>
@endpush
@push('css')
<style>
</style>
@endpush