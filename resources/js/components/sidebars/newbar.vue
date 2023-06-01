<template>
    <sidemenu v-if="loggedIn"/>
</template>
<script>
import sidemenu from './sidemenu.vue';
export default {
    name: "sidebar",
    props: ["showsidebar"],
    components: {
        sidemenu,
    },
    data: () => ({
        drawer: false,
        overlay: false,
        collapseOnScroll: true,
        items: [
            { title: '+ Reseller', link: 'auth.resellers.add' },
            { title: '+ Switch', link: 'auth.switches.add' },
            { title: '+ Customer', link: 'auth.customers.add' },
            { title: '+ Supplier', link: 'auth.suppliers.add' },
            { title: '+ Rental Server', link: 'auth.rentalservers.add' },
            { title: '+ Subscription', link: 'auth.subscriptions.add' },
            { title: '+ Employee', link: 'auth.employees.add' },
            { title: '+ Debit', link: 'auth.transactions.debit' },
            { title: '+ Credit', link: 'auth.transactions.credit' },
        ],
        basePkr: 0,
        musd: 0,
        mpkr: 0,
    }),
    methods: {
        async getPkrtoUsd() {
            const res = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/pkr.json').then(e => e.json())
            this.basePkr = res.pkr
            this.mpkr = res.pkr
            this.musd = 1
        },
        logoutauthparent() {
            this.$store.commit("setLoginStatus", false);
            this.$store.commit("setAuthToken", "");
            this.$store.commit("setloggedInUser", {});
            this.$router.push({ name: "auth.login" });
        },
        updateDrawer() {
            this.$store.commit("updateDrawer", true);
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
        mpkr(){
            this.musd = parseFloat(this.mpkr/this.basePkr).toFixed(2)
        },
        musd(){
            this.mpkr = parseFloat(this.basePkr*this.musd).toFixed(2)
        },
    },
    mounted(){
        this.getPkrtoUsd()
    },
};
</script>
