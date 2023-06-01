<template>
    <v-row v-if="user.role_id==1">
        <v-col cols="6" sm="12">
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="Filter Targets"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="date"
                type="month"
                no-title
                scrollable
                >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date)"
                >
                    OK
                </v-btn>
                </v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="6" sm="12">
            <v-select
                :items="users"
                item-text="email"
                item-value="id"
                label="BUH"
                required
                v-model="user_id"
            ></v-select>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <!-- <v-card
                class="mx-auto text-center"
                color="green"
                dark
            >
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                        <v-sparkline
                        :value="value"
                        color="rgba(255, 255, 255, .7)"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                        >
                        <template v-slot:label="item">
                            ${{ item.value }}
                        </template>
                        </v-sparkline>
                    </v-sheet>
                </v-card-text>
                <v-card-text>
                    <div class="text-h4">
                        Sales Last 7 Days
                    </div>
                </v-card-text>
            </v-card> -->
        </v-col>
        <v-col class="text-center" cols="12" sm="6" xs="12" md="3">
            <h2 class="text-center mb-2">Marketing Budget Used</h2>
            <v-progress-circular
                :value="overall.marketing_left_percent"
                :size="200"
                :width="15"
                color="purple"
                >{{ parseFloat(overall.marketing_left_percent).toFixed(2) }} %</v-progress-circular>
            </v-col>
            <v-col class="text-center" cols="12" sm="6" xs="12" md="3">
                <h2 class="text-center mb-2">Target Achieved</h2>
                <v-progress-circular
                :value="overall.target_left_percent"
                :size="200"
                :width="15"
                color="teal"
            >{{parseFloat(overall.target_left_percent).toFixed(2)}} %</v-progress-circular>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <!-- <v-card
                class="mx-auto text-center"
                color="green"
                dark
            >
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                        <v-sparkline
                        :value="value"
                        color="rgba(255, 255, 255, .7)"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                        >
                        <template v-slot:label="item">
                            ${{ item.value }}
                        </template>
                        </v-sparkline>
                    </v-sheet>
                </v-card-text>
                <v-card-text>
                    <div class="text-h4">
                        Queries Last 7 Days
                    </div>
                </v-card-text>
            </v-card> -->
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.marketing" :title="'Marketing Allocated'" />
            </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.marketing_spent" :title="'Marketing Spent'" />
            </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.target" :title="'Target'" />
            </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.net_target" :title="'Net Target'" />
            </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.achieved" :title="'Achieved'" />
            </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="0" :title="'Expense'" />
            </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.refunds" :title="'Refunds'" />
            </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.chargebacks" :title="'Chargebacks'" />
            </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.net" :title="'Net'" />
            </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.brand_queries" :title="'Form Submits'" />
            </div>
        </v-col>
        <v-col cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.lag_percentage" :title="'Lag %'" />
            </div>
        </v-col>
        <v-col v-if="parseFloat(overall.inflated_marketing_spent)>0&&user_id>0" cols="12" sm="6" xs="12" md="3">
            <div class="mb-4">
                <countWidget :loading="today_loading" :count="overall.inflated_marketing_spent" :title="'Marketing Spent Inflated'" />
            </div>
        </v-col>
    </v-row>
</template>
<script>
import otherrequestservice from "@services/auth/otherrequests";
import userservice from "@services/auth/user";
import countWidget from "@/components/counts/index.vue";
export default {
    components:{
        countWidget
    },
    data() {
        return {
            value: [
                423,
                446,
                675,
                510,
                590,
                610,
                760,
            ],
            today_loading: true,
            users: [],
            //date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date: new Date().toISOString().substr(0, 7),
            menu: false,
            modal: false,
            overall: {
                marketing: 0,
                marketing_spent: 0,
                target: 0,
                achieved: 0,
                refunds: 0,
                chargebacks: 0,
                net: 0,
                brand_queries: 0,
                lag_percentage: 0,
                inflated_marketing_spent: 0,
                marketing_left_percent: 0,
                target_left_percent: 0,
                net_target: 0,
            },
            user_id: 0,
        };
    },
    async mounted() {
        const users = await userservice.getlist('?role_id=4').then(e=>e.data)
        this.users = [{
            id: 0, 
            email: 'All BUH'
        },...users]
        this.$store.commit('setPanelFull',true);
        this.getTodayGraphs()
    },
    watch:{
        date(){
            this.getTodayGraphs()
        },
        user_id(){
            this.getTodayGraphs()
        }
    },
    methods:{
        async getTodayGraphs(){
            this.today_loading = true
            var dt = this.date+'-01'
            if(this.user.role_id==1){
                var query = '?date='+dt
                if(this.user_id>0){
                    query+='&user_id='+this.user_id
                }
                const {overall} = await otherrequestservice.get('admin/get-dashboard'+query).then(e=>e.data)
                this.overall = overall
            }
            this.today_loading = false
        }
    },
    computed: {
        user() {
            return this.$store.getters.loggedInUser;
        },
        wallets(){
            return this.$store.getters.wallets;
        }
    },
};
</script>
