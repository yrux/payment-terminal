@extends('layouts.main')
@section('content')
<div class="loginPg">
    <!-- HEADER -->
    <div class="container-fluid">
        <div class="loginBox brief-box">
            <div class="logoarea">
                <img class="img-fluid" src="{{$brandFormSubmission->brand->image_url}}" alt="" />
            </div>
            <div class="formbox">
                <div class="row">
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td class="text-black-50">Name</td>
                                <td>{{$brandFormSubmission->name}}</td>
                            </tr>
                            <tr>
                                <td class="text-black-50">Email</td>
                                <td>{{$brandFormSubmission->email}}</td>
                            </tr>
                            <tr>
                                <td class="text-black-50">Phone/Mobile Number</td>
                                <td>{{$brandFormSubmission->phone}}</td>
                            </tr>
                            <tr>
                                <td class="text-black-50">Submitted@</td>
                                <td>{{$brandFormSubmission->created_at_formatted}}</td>
                            </tr>
                            <tr>
                                <td class="text-black-50">Message</td>
                                <td style="white-space: pre-wrap;">{{$brandFormSubmission->message}}</td>
                            </tr>
                            @foreach(json_decode($brandFormSubmission->other_fields) as $k=>$v)
                                <tr>
                                    <td class="text-black-50">{{$k}}</td>
                                    <td style="white-space: pre-wrap;">{{$v}}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    
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
.impcls > * {
    text-align: left !important;
}
</style>
@endpush