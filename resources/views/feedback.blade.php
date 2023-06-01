<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link href="{{url('/front/css/chat.css')}}" rel="stylesheet">
  <title>Chat CRM</title>
</head>

<body class="">
  <div id="app">
    <chat-popup-button :baseUrl="'{{env('APP_URL')}}'" @chatopened="maintainChatStatus" />
  </div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="{{url('/front/js/chat.js')}}?t={{time()}}"></script>
</body>

</html>