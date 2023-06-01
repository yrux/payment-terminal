<template>
    <div class="mb-10 no-print" v-if="loggedIn">
        <v-app-bar color="primary" dense dark>
            <v-toolbar-title>Payment Terminal</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn plain>
                Paypal
            </v-btn>
            <v-btn plain>
                Mercury
            </v-btn>
            <v-btn plain>
                UBL
            </v-btn>
            <v-btn plain>
                Others
            </v-btn>
            <v-btn plain @click="overlay = !overlay">
                <v-icon>mdi-calculator</v-icon>
                USD TO PKR Calculator
            </v-btn> -->
            <v-btn @click="logoutauthparent" color="red">
                Logout
            </v-btn>
            <v-menu left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-show="item.permission_name?permissions.indexOf(item.permission_name) >= 0:true" v-for="(item, itemKey) in items" :key="itemKey" link :to="{ name: item.link }">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>
<script>
export default {
    name: "headercomponent",
    components: {
    },
    data: () => ({
        drawer: false,
        overlay: false,
        collapseOnScroll: true,
        items: [
            { title: '+ User', link: 'auth.users.add', permission_name: 'users-create' },
            { title: '+ Brand', link: 'auth.brands.add', permission_name: 'brands-create' },
            { title: '+ Brief Form', link: 'auth.briefforms.add', permission_name: 'briefforms-create' },
            { title: '+ Setting', link: 'auth.settings.add', permission_name: 'm_flag-create' },
            { title: '+ Payment Link', link: 'auth.payments.add', permission_name: 'payment-create' },
            { title: '+ Merchant', link: 'auth.merchants.add', permission_name: 'merchants-create' },
            { title: '+ Refund/Chargeback', link: 'auth.paymentrefunds.add', permission_name: 'paymentrefund-create' },
            { title: '+ Brand Query', link: 'auth.brandformsubmissions.add', permission_name: 'brandformsubmissions-create' },
            { title: '+ Marketing Expense', link: 'auth.marketingexpenses.add', permission_name: 'marketingexpenses-create' },
        ],
    }),
    methods: {
        logoutauthparent() {
            this.$store.commit("setLoginStatus", false);
            this.$store.commit("setAuthToken", "");
            this.$store.commit("setloggedInUser", {});
            this.$router.push({ name: "auth.login" });
        },
    },
    computed: {
        user() {
            return this.$store.getters.loggedInUser;
        },
        loggedIn() {
            return this.$store.getters.loggedIn;
        },
        permissions() {
            return this.$store.getters.getPermissions;
        },
    },
    watch:{
       
    },
    mounted(){
    },
};
</script>
