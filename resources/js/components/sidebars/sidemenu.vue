<template>
    <v-card
        width="256"
        class="mx-auto"
    >
        <v-navigation-drawer permanent floating>
            <v-list dense nav>
                <v-list-item class="px-2" link :to="{ name: 'auth.profile' }">
                    <v-list-item-avatar>
                        <v-img :src="user.image_url"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-title>{{ user.name }}</v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="item in items" :key="item.title" link :to="{ name: item.link }" 
                v-show="item.permission_name?permissions.indexOf(item.permission_name) >= 0:true">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item class="px-2">
                    <v-switch
                        @change="toggleDarkTheme()"
                        label="Theme Dark"
                        color="green"
                        v-model="isNightMode"
                    ></v-switch>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        isNightMode: false,
        items: [
            { title: 'Dashboard', icon: 'mdi-view-dashboard', link: 'auth.panel' },
            { title: 'Users', icon: 'mdi-account', link: 'auth.users.listing', permission_name: 'users-list' },
            { title: 'Brands', icon: 'mdi-brain', link: 'auth.brands.listing', 
                //permission_name: 'brands-list' 
            },
            { title: 'Brief Forms', icon: 'mdi-form-select', link: 'auth.briefforms.listing', permission_name: 'briefforms-list' },
            { title: 'Brief Form Submissions', icon: 'mdi-sim', link: 'auth.usersubmissions.listing' },
            { title: 'Brand Queries', icon: 'mdi-form-dropdown', link: 'auth.brandformsubmissions.listing', permission_name: 'brandformsubmissions-list' },
            { title: 'Settings', icon: 'mdi-cog', link: 'auth.settings.listing', permission_name: 'm_flag-list' },
            { title: 'Merchants Links', icon: 'mdi-merge', link: 'auth.merchants.listing', permission_name: 'merchants-list' },
            { title: 'Payment Links', icon: 'mdi-cash', link: 'auth.payments.listing', permission_name: 'payment-list' },
            { title: 'Buh Targets', icon: 'mdi-target-account', link: 'auth.usertargets.buh', permission_name: 'usertarget-buh' },
            { title: 'Sales Targets', icon: 'mdi-target-account', link: 'auth.usertargets.sales', permission_name: 'usertarget-sales' },
            { title: 'Refunds/Chargebacks', icon: 'mdi-read', link: 'auth.paymentrefunds.listing', permission_name: 'paymentrefund-list' },
            { title: 'Marketing Expenses', icon: 'mdi-expansion-card', link: 'auth.marketingexpenses.listing', permission_name: 'marketingexpenses-list' },
            { title: 'Marketing Expenses', icon: 'mdi-expansion-card', link: 'auth.marketingexpenses.listing', permission_name: 'marketingexpenses-listmine' },
        ],
        drawer: false,
    }),
    mounted(){  
        var isDarkTheme = localStorage.getItem('is_theme_dark')
        if(isDarkTheme==='true'){
            this.isNightMode = true
        }else{
            this.isNightMode = false
        }
    },
    props: {

    },
    watch: {
        drawerState(){
            if(this.drawerState===true){
                this.drawer = this.drawerState
                setTimeout(()=>{
                    this.$store.commit("updateDrawer", false);
                },100)
            }
        }
    },
    methods: {
        async toggleDarkTheme(){
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
            this.isNightMode = this.$vuetify.theme.dark;
            await this.$nextTick()
            localStorage.setItem('is_theme_dark', this.$vuetify.theme.dark===false?'false':'true')
        },
        logoutauthparent() {
            this.$store.commit("setLoginStatus", false);
            this.$store.commit("setAuthToken", "");
            this.$store.commit("setloggedInUser", {});
            this.$router.push({ name: "auth.login" });
        },
    },
    computed: {
        drawerState() {
            return this.$store.getters.drawerState;
        },
        themeMode(){
            return this.$vuetify.theme.dark
        },
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
}
</script>
