@component('mail::message')
# Feedback #{{$feedback->id}}

@component('mail::table')
| Key       | Value  |
| ------------- | --------:|
| Name      | {{$feedback->name}}      |
| Email      | {{$feedback->email}}      |
@endcomponent

<div>
Message: <p style="white-space: pre-wrap;">{{$feedback->message}}</p>
</div>

Thanks,<br>
{{ config('app.name') }}
@endcomponent
