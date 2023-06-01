@component('mail::message')
# New Brief Form

Click to View brief Form

@component('mail::button', ['url' => route('brief.view', $userSubmission)])
View Brief
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
