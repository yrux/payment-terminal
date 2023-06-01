@component('mail::message')
# New Query Received on Brand | {{$brandFormSubmission->brand->name}}

Click to View Details

@component('mail::button', ['url' => route('query.view', $brandFormSubmission)])
View Details
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
