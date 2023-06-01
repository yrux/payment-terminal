@extends('layouts.main')
@section('content')
<div class="loginPg">
    <!-- HEADER -->
    <div class="container-fluid">
        <div class="loginBox brief-box">
            <div class="logoarea">
                <img class="img-fluid" src="{{$userSubmission->brand->image_url}}" alt="" />
            </div>
            <div class="formbox">
                <div class="row">
                    <h4 class="text-center">{{$userSubmission->briefform->name}}</h4>
                    <hr>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td class="text-black-50">Name</td>
                                <td>{{$userSubmission->name}}</td>
                            </tr>
                            <tr>
                                <td class="text-black-50">Email</td>
                                <td>{{$userSubmission->email}}</td>
                            </tr>
                            <tr>
                                <td class="text-black-50">Phone/Mobile Number</td>
                                <td>{{$userSubmission->phone}}</td>
                            </tr>
                            <tr>
                                <td class="text-black-50">Industry</td>
                                <td>{{$userSubmission->industry_name}}</td>
                            </tr>
                            @if($userSubmission->name_to_appear)
                            <tr>
                                <td class="text-black-50">Word/Name IF you want to appear (type in exactly as you wanted)</td>
                                <td>{{$userSubmission->name_to_appear}}</td>
                            </tr>
                            @endif
                            @if($userSubmission->brief_description)
                            <tr>
                                <td class="text-black-50" width="200px">Please provide a brief description of your business.</td>
                                <td style="white-space:pre-line;">{{$userSubmission->brief_description}}</td>
                            </tr>
                            @endif
                        </tbody>
                    </table>
                    <hr>
                    @foreach(json_decode($userSubmission->formData) as $formData)
                        <div class="col-{{$formData->grid}} border-bottom mb-2">
                            <div class="text-black-50 impcls"><?php print $formData->placehoolder; ?> </div>
                            @if($formData->type=='multiselect'||$formData->type=='multiselectothers')
                            <div>
                                @foreach($formData->value as $val)
                                {{$val}}, 
                                @endforeach
                            </div>
                            @endif
                            @if($formData->type=='select'||$formData->type=='selectother'||$formData->type=='text'||$formData->type=='number'||$formData->type=='color'||$formData->type=='textarea')
                            <div style="{{$formData->type=='textarea'?'white-space:pre-line;':''}}">
                                {{$formData->value}}
                            </div>
                            @endif
                            @if($formData->type=='tags')
                            <div>N/A</div>
                            @endif

                        </div>
                    @endforeach
                    
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