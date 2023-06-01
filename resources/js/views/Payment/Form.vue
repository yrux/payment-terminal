<template>
    <div>
        <v-breadcrumbs :items="bread">
            <template v-slot:divider>
                <v-icon>mdi-forward</v-icon>
            </template>
        </v-breadcrumbs>
        <v-row no-gutters class="pa-10 rounded elevation-10">
            <v-col cols="12" sm="12">
                <v-form ref="form" v-model="loading" lazy-validation>
                    <v-row>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-select
                                :items="pseudos"
                                @change="autofillDetails"
                                item-text="pseudo_email"
                                return-object
                                label="Select Pseudo"
                            ></v-select>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-select
                                :items="brands"
                                item-text="name"
                                item-value="id"
                                label="Brand"
                                required
                                v-model="form.brand_id"
                                disabled
                                :error-messages="errors.brand_id"
                            ></v-select>
                        </v-col>
                        <!-- <v-col cols="6" sm="6" class="pb-0">
                            <v-select
                                :items="users"
                                item-text="email"
                                item-value="id"
                                label="Sale Person"
                                required
                                v-model="form.user_id"
                                :error-messages="errors.user_id"
                            ></v-select>
                        </v-col> -->
                        <v-col cols="3" sm="3" class="pb-0">
                            <v-text-field type="number" v-model="form.subtotal" :rules="[rules.required]"
                                :error-messages="errors.subtotal" label="Amount"></v-text-field>
                        </v-col>
                        <v-col cols="3" sm="3" class="pb-0">
                            <v-checkbox
                                v-model="form.allow_tax"
                                label="Allow Tax"
                            ></v-checkbox>
                        </v-col>
                        <v-col v-if="form.allow_tax" cols="3" sm="3" class="pb-0">
                            <v-text-field type="number" v-model="form.tax_percent" :rules="[rules.required]"
                                :error-messages="errors.tax_percent" label="TAX %"></v-text-field>
                        </v-col>
                        <v-col cols="3" sm="3" class="pb-0">
                            <v-text-field disabled type="number" v-model="total" 
                                :error-messages="errors.amount" label="Total"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-combobox
                            v-model="form.services"
                            :items="services"
                            :search-input.sync="serviceSearch"
                            item-text="flag_value"
                            item-value="flag_value"
                            hide-selected
                            :error-messages="errors.services"
                            hint="Select from pre-filled services or create new"
                            label="Services"
                            multiple
                            persistent-hint
                            small-chips
                            >
                                <template v-slot:no-data>
                                    <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                        No results matching "<strong>{{ serviceSearch }}</strong>". Press <kbd>enter</kbd> to create a new one
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-combobox>
                            <!-- <v-select
                                :items="services"
                                item-text="flag_value"
                                multiple
                                item-value="flag_value"
                                label="Services"
                                required
                                v-model="form.services"
                                :error-messages="errors.services"
                            ></v-select> -->
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-text-field v-model="form.customer_email" :rules="[rules.required]"
                                :error-messages="errors.customer_email" label="Customer Email"></v-text-field>
                            <!-- <v-btn @click="getExistingCustomer" small color="primary">Existing Customer?</v-btn> -->
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-text-field v-model="form.customer_name" :rules="[rules.required]"
                                :error-messages="errors.customer_name" label="Customer Name"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-text-field v-model="form.sales_email" disabled :rules="[rules.required]"
                                :error-messages="errors.sales_email" label="Sales Email"></v-text-field>
                        </v-col>
                        <v-col v-if="form.brand_id>0" cols="6" sm="6" class="pb-0">
                            <v-select
                                :items="merchants"
                                item-text="name"
                                item-value="id"
                                label="Merchant"
                                required
                                v-model="form.payment_gateway"
                                :error-messages="errors.payment_gateway"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-textarea v-model="form.description" :error-messages="errors.description" label="Description"></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-btn color="secondary" elevation="1" large raised @click="addpermission"
                                :loading="btnloading" :disabled="btnloading">{{form.id>0?'Update':'Add'}}</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import service from "@services/auth/default";
const itemtypeservice = new service('payments')
const userservice = new service('user')
const brandservice = new service('brands')
const merchantservice = new service('merchants')
const flagservice = new service('m-flags')
export default {
    name: "auth.payments.add",
    watch: {
    },
    async mounted() {
        this.users = await userservice.getlist('').then(e=>{
            return e.data
        })
        this.brands = await brandservice.getlist('').then(e=>{
            return e.data
        })
        this.services = await flagservice.getlist('?flag_type=SERVICESTYPES').then(e=>{
            return e.data
        })
        // this.merchants = await merchantservice.getlist('').then(e=>{
        //     return e.data
        // })
        if (this.$route.params.id) {
            var res = await itemtypeservice.get(this.form.id)
            this.form = {
                brand_id: (res.brand_id ? res.brand_id : 0),
                user_id: (res.user_id ? res.user_id : 0),
                payment_gateway: (res.payment_gateway ? res.payment_gateway : 0),
                services: (res.services ? res.services.split(',') : ''),
                amount: (res.amount ? res.amount : 0),
                subtotal: (res.subtotal ? res.subtotal : 0),
                tax_percent: (res.tax_percent ? res.tax_percent : 0),
                customer_email: (res.customer_email ? res.customer_email : ''),
                customer_name: (res.customer_name ? res.customer_name : ''),
                description: (res.description ? res.description : ''),
                sales_email: (res.sales_email ? res.sales_email : ''),
                id: this.$route.params.id,
            }
            this.form.allow_tax = (res.allow_tax==1?true:false)
            this.bread.push({
                text: "Edit",
                to: { name: "auth.payments.edit", params: { id: this.$route.params.id } },
                disabled: false,
                exact: true,
            })
        } else {
            this.bread.push({
                text: "Add",
                to: { name: "auth.payments.add" },
                disabled: false,
                exact: true,
            })
        }
    },
    methods: {
        resetError() {
            this.errors = {
                brand_id: [],
                user_id: [],
                services: [],
                amount: [],
                customer_name: [],
                customer_email: [],
                payment_gateway: [],
                description: [],
                sales_email: [],
            }
        },
        addpermission: async function () {
            this.resetError()
            if(!this.btnloading){
                // this.form.user_id = this.user.id
                if (this.$refs.form.validate()) {
                    this.btnloading = true;
                    var formdata = new FormData();
                    var servicesSend = []
                    for(let i = 0; i < this.form.services.length; i++){
                        if(this.form.services[i].flag_value){
                            servicesSend.push(this.form.services[i].flag_value)
                        }else{
                            servicesSend.push(this.form.services[i])
                        }
                    }
                    formdata.append("brand_id", this.form.brand_id);
                    formdata.append("user_id", this.user.id);
                    // formdata.append("services", this.form.services);
                    formdata.append("services", servicesSend);
                    formdata.append("amount", this.total);
                    formdata.append("sales_email", this.form.sales_email);
                    formdata.append("payment_gateway", this.form.payment_gateway);
                    formdata.append("customer_email", this.form.customer_email);
                    formdata.append("customer_name", this.form.customer_name);
                    formdata.append("description", this.form.description);
                    formdata.append("subtotal", this.form.subtotal);
                    formdata.append("allow_tax", (this.form.allow_tax==true?1:0));
                    formdata.append("tax_percent", (this.form.allow_tax==true?this.form.tax_percent:0));
                    if (this.form.id > 0) {
                        var res = await itemtypeservice.update(formdata, this.form.id)
                    } else {
                        var res = await itemtypeservice.create(formdata)
                    }
                    this.btnloading = false;
                    if (!res.status) {
                        if (res.data.brand_id) {
                            this.errors.brand_id = res.data.brand_id
                        }
                        if (res.data.user_id) {
                            this.errors.user_id = res.data.user_id
                        }
                        if (res.data.services) {
                            this.errors.services = res.data.services
                        }
                        if (res.data.amount) {
                            this.errors.amount = res.data.amount
                        }
                        if (res.data.customer_email) {
                            this.errors.customer_email = res.data.customer_email
                        }
                        if (res.data.customer_name) {
                            this.errors.customer_name = res.data.customer_name
                        }
                        if (res.data.payment_gateway) {
                            this.errors.payment_gateway = res.data.payment_gateway
                        }
                        if (res.data.description) {
                            this.errors.description = res.data.description
                        }
                        if (res.data.sales_email) {
                            this.errors.sales_email = res.data.sales_email
                        }
                        if(res.data.subtotal){
                            this.errors.subtotal = res.data.subtotal
                        }
                        if(res.data.allow_tax){
                            this.errors.allow_tax = res.data.allow_tax
                        }
                        if(res.data.tax_percent){
                            this.errors.tax_percent = res.data.tax_percent
                        }
                        //errors here
                    } else {
                        //suuccess here
                        this.$router.push({ name: "auth.payments.listing" });
                    }
                }
            }
        },
        getExistingCustomer(){
            
        },
        autofillDetails(ev){
            this.form.brand_id = ev.brand_id
            this.form.sales_email = ev.pseudo_email
        }
    },
    computed: {
        total(){
            var subtotal = this.form.subtotal
            var total = 0;
            if(this.form.allow_tax==true){
                total = ((this.form.subtotal/100)*this.form.tax_percent);
            }
            return parseFloat(parseFloat(total)+parseFloat(subtotal)).toFixed(2)
        },
        user() {
            return this.$store.getters.loggedInUser;
        },
        pseudos(){
            return this.$store.getters.loggedInUser.brands;
        },
        paymentGateways(){
            return this.$store.getters.paymentGateways;
        },
        merchants(){
            if(parseInt(this.form.brand_id)>0){
                return this.brands.find(e=>e.id==this.form.brand_id).merchants
            }
            return [];
        }
    },
    data() {
        return {
            serviceSearch: null,
            brands: [],
            users: [],
            services: [],
            form: {
                id: (this.$route.params.id ? this.$route.params.id : 0),
                brand_id: 0,
                user_id: 0,
                services: [],
                amount: 0,
                payment_gateway: 0,
                customer_name: '',
                customer_email: '',
                description: '',
                sales_email: '',
                subtotal: 0,
                allow_tax: 1,
                tax_percent: 10.25,
            },
            errors: {
                brand_id: [],
                user_id: [],
                services: [],
                amount: [],
                customer_name: [],
                customer_email: [],
                description: [],
                payment_gateway: [],
                subtotal: [],
                allow_tax: [],
                tax_percent: [],
            },
            bread: [
                {
                    text: "Dashboard",
                    to: { name: "auth.dashboard" },
                    disabled: false,
                    exact: true,
                },
                {
                    text: "Payments",
                    to: { name: "auth.payments.listing" },
                    disabled: false,
                    exact: true,
                }
            ],
            loading: false,
            btnloading: false,
            rules: {
                required: (value) => !!value || "Required.",
            },
        };
    },
};
</script>