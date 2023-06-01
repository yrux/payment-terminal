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
                            <v-text-field v-model.number="form.amount" :rules="[rules.required]"
                                :error-messages="errors.amount" label="Amount Spent $" step="any" type="number" min="0"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-select
                                :items="services"
                                item-text="flag_value"
                                item-value="id"
                                label="Services"
                                required
                                :error-messages="errors.service_id"
                                v-model="form.service_id"
                            ></v-select>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-select
                                :items="users"
                                item-text="email"
                                item-value="id"
                                label="Users"
                                required
                                :error-messages="errors.user_id"
                                v-model="form.user_id"
                                :disabled="user.role_id!=1"
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
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-dialog
                                ref="dialog"
                                v-model="fromMenu"
                                :return-value.sync="form.for_day"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.for_day"
                                    label="For Day"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    clearable
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="form.for_day"
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="fromMenu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialog.save(form.for_day)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col cols="12" cm="12" class="pb-0">
                            <v-file-input
                                accept="image/*"
                                v-model="form.invoice"
                                :error-messages="errors.invoice"
                                label="Invoice"
                            ></v-file-input>
                        </v-col>
                        <v-col v-if="form.id > 0 && form.invoice_url" cols="12" sm="12" class="pb-0">
                            <v-img
                                :lazy-src="form.invoice_url"
                                max-height="150"
                                max-width="250"
                                :src="form.invoice_url"
                            ></v-img>
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
const itemtypeservice = new service('marketing-expenses')
const brandservice = new service('brands')
const userservice = new service('user')
const flagservice = new service('m-flags')
export default {
    name: "auth.marketingexpenses.add",
    watch: {
    },
    async mounted() {
        this.brands = await brandservice.getlist('').then(e=>{
            return e.data
        })
        this.services = await flagservice.getlist('?flag_type=MARKETINGSOURCES').then(e=>{
            return e.data
        })
        this.users = await userservice.getlist('').then(e=>{
            return e.data
        })
        if (this.$route.params.id) {
            var res = await itemtypeservice.get(this.form.id)
            this.form = {
                amount: (res.amount ? res.amount : 0),
                brand_id: (res.brand_id?res.brand_id:0),
                user_id: (res.user_id?res.user_id:0),
                service_id: (res.m_flag_id?res.m_flag_id:0),
                invoice_url: (res.invoice_url?res.invoice_url:''),
                for_day: (res.for_day?res.for_day:''),
                id: this.$route.params.id,
            }
            this.bread.push({
                text: "Edit",
                to: { name: "auth.marketingexpenses.edit", params: { id: this.$route.params.id } },
                disabled: true,
                exact: true,
            })
        } else {
            this.bread.push({
                text: "Add",
                to: { name: "auth.marketingexpenses.add" },
                disabled: true,
                exact: true,
            })
        }
        if(this.user.role_id!=1){
            this.form.user_id = this.user.id
        }
    },
    methods: {
        resetError() {
            this.errors = {
                amount: [],
                brand_id: [],
                user_id: [],
                service_id: [],
                for_day: [],
                invoice: [],
            }
        },
        addpermission: async function () {
            this.resetError()
            if (this.$refs.form.validate()) {
                this.btnloading = true;
                var formdata = new FormData();
                formdata.append('amount',this.form.amount)
                formdata.append('brand_id',this.form.brand_id)
                formdata.append('user_id',this.form.user_id)
                formdata.append('m_flag_id',this.form.service_id)
                formdata.append('for_day',this.form.for_day)
                if (this.form.invoice) {
                    formdata.append("invoice", this.form.invoice);
                }
                this.btnloading = false;
                if (this.form.id > 0) {
                    var res = await itemtypeservice.update(formdata, this.form.id)
                } else {
                    var res = await itemtypeservice.create(formdata)
                }
                if (!res.status) {
                    if(res.data.amount){
                        this.errors.amount = res.data.amount
                    }
                    if(res.data.brand_id){
                        this.errors.brand_id = res.data.brand_id
                    }
                    if(res.data.user_id){
                        this.errors.user_id = res.data.user_id
                    }
                    if(res.data.service_id){
                        this.errors.service_id = res.data.service_id
                    }
                    if(res.data.for_day){
                        this.errors.for_day = res.data.for_day
                    }
                    if(res.data.invoice){
                        this.errors.invoice = res.data.invoice
                    }
                    //errors here
                } else {
                    //suuccess here
                    this.$router.push({ name: "auth.marketingexpenses.listing" });
                }
            }
        },
    },
    computed: {
        user() {
            return this.$store.getters.loggedInUser;
        },
    },
    data() {
        return {
            brands: [],
            users: [],
            services: [],
            fromMenu: false,
            form: {
                id: (this.$route.params.id ? this.$route.params.id : 0),
                amount: 0,
                brand_id: 0,
                user_id: 0,
                service_id: 0,
                for_day: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                invoice: undefined,
                invoice_url: '',
            },
            errors: {
                amount: [],
                brand_id: [],
                user_id: [],
                service_id: [],
                for_day: [],
                invoice: [],
            },
            bread: [
                {
                    text: "Dashboard",
                    to: { name: "auth.dashboard" },
                    disabled: false,
                    exact: true,
                },
                {
                    text: "Marketing Expenses",
                    to: { name: "auth.marketingexpenses.listing" },
                    disabled: false,
                    exact: true,
                },
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