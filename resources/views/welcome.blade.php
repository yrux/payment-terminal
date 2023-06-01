<!DOCTYPE html>
<html>
<head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    <link href="/css/app.css" rel="stylesheet">
    <link href="/css/responsive.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <title>Payment Terminal</title>
</head>

<body id="main">
    <div id="app">
        <v-app>
            <v-main>
                <headercomponent></headercomponent>
                <v-row v-if="loggedIn">
                    <v-col class="no-print" cols="2">
                        <newbar />
                    </v-col>
                    <v-col :cols="(goPrint==true?12:10)">
                        <v-card :elevation="(isPanelFull === true ? '0' : '1')"
                            :class="(isPanelFull === true ? 'transparent' : '')">
                            <router-view />
                        </v-card>
                    </v-col>
                </v-row>
                <v-container v-else>
                    <v-card class="height-100vh">
                        <router-view />
                    </v-card>
                </v-container>
            </v-main>
        </v-app>
        <notifications :notificaitontext="notificaitontext" :notificaitonstatus="notificaitonstatus" />
    </div>

    <script src="{{ mix('/js/app.js') }}"></script>
  <script src="{{url('/front/js/chat-frame.js')}}"></script>

</body>

</html>
