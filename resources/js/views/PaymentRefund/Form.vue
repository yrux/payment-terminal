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
                        <v-col cols="4" sm="4" class="pb-0">
                            <v-select
                                :items="brands"
                                item-text="name"
                                item-value="id"
                                label="Brand"
                                required
                                v-model="form.brand_id"
                                :error-messages="errors.brand_id"
                            ></v-select>
                        </v-col>
                        <v-col cols="4" sm="4" class="pb-0">
                            <v-select
                                :items="users"
                                item-text="email"
                                item-value="id"
                                label="Sale Person"
                                required
                                v-model="form.user_id"
                                :error-messages="errors.user_id"
                            ></v-select>
                        </v-col>
                        <v-col cols="4" sm="4" class="pb-0">
                            <v-select
                                :items="refund_types"
                                item-text="text"
                                item-value="id"
                                label="Refund/Chargeback Type"
                                required
                                v-model="form.refund_type"
                            ></v-select>
                        </v-col>
                        <v-col cols="4" sm="4" class="pb-0">
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="form.refund_date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.refund_date"
                                    label="Refund Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="form.refund_date"
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
                                    @click="$refs.menu.save(form.refund_date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="4" sm="4" class="pb-0">
                            <v-text-field type="number" v-model="form.amount" 
                                :error-messages="errors.amount" label="Total"></v-text-field>
                        </v-col>
                        <v-col cols="4" sm="4" class="pb-0">
                            <v-text-field v-model="form.refund_id" :rules="[rules.required]"
                                :error-messages="errors.refund_id" label="Refund ID"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-select
                                :items="merchants"
                                item-text="name"
                                item-value="id"
                                label="Merchant"
                                required
                                v-model="form.merchant_id"
                                :error-messages="errors.merchant_id"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-textarea v-model="form.notes" :error-messages="errors.notes" label="Notes"></v-textarea>
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
const itemtypeservice = new service('payment-refunds')
const userservice = new service('user')
const brandservice = new service('brands')
const merchantservice = new service('merchants')
export default {
    name: "auth.paymentrefunds.add",
    watch: {
    },
    async mounted() {
        this.users = await userservice.getlist('').then(e=>{
            return e.data
        })
        this.brands = await brandservice.getlist('').then(e=>{
            return e.data
        })
        this.merchants = await merchantservice.getlist('').then(e=>{
            return e.data
        })
        if (this.$route.params.id) {
            var res = await itemtypeservice.get(this.form.id)
            this.form = {
                brand_id: (res.brand_id ? res.brand_id : 0),
                user_id: (res.user_id ? res.user_id : 0),
                merchant_id: (res.merchant_id ? res.merchant_id : 0),
                refund_type: (res.refund_type ? res.refund_type : 0),
                amount: (res.amount ? res.amount : 0),
                notes: (res.notes ? res.notes : ''),
                refund_date: (res.refund_date?res.refund_date: ''),
                refund_id: (res.refund_id ? res.refund_id : ''),
                id: this.$route.params.id,
            }
            this.bread.push({
                text: "Edit",
                to: { name: "auth.paymentrefunds.edit", params: { id: this.$route.params.id } },
                disabled: false,
                exact: true,
            })
        } else {
            this.bread.push({
                text: "Add",
                to: { name: "auth.paymentrefunds.add" },
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
                amount: [],
                notes: [],
                merchant_id: [],
                refund_id: [],
                refund_type: [],
                refund_date: [],
            }
        },
        addpermission: async function () {
            this.resetError()
            if(!this.btnloading){
                // this.form.user_id = this.user.id
                if (this.$refs.form.validate()) {
                    this.btnloading = true;
                    var formdata = new FormData();
                    formdata.append("brand_id", this.form.brand_id);
                    formdata.append("user_id", this.form.user_id);
                    formdata.append("merchant_id", this.form.merchant_id);
                    formdata.append("amount", this.form.amount);
                    formdata.append("refund_type", this.form.refund_type);
                    formdata.append("refund_id", this.form.refund_id);
                    formdata.append("notes", this.form.notes);
                    formdata.append("refund_date", this.form.refund_date);
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
                        if (res.data.merchant_id) {
                            this.errors.merchant_id = res.data.merchant_id
                        }
                        if (res.data.refund_type) {
                            this.errors.refund_type = res.data.refund_type
                        }
                        if (res.data.amount) {
                            this.errors.amount = res.data.amount
                        }
                        if (res.data.refund_id) {
                            this.errors.refund_id = res.data.refund_id
                        }
                        if (res.data.notes) {
                            this.errors.notes = res.data.notes
                        }
                        if (res.data.refund_date) {
                            this.errors.refund_date = res.data.refund_date
                        }
                        //errors here
                    } else {
                        //suuccess here
                        this.$router.push({ name: "auth.paymentrefunds.listing" });
                    }
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
            refund_types: [
                {id: 0, text: 'Refund'},
                {id: 1, text: 'Chargeback'},
            ],
            brands: [],
            users: [],
            merchants: [],
            menu: false,
            form: {
                id: (this.$route.params.id ? this.$route.params.id : 0),
                brand_id: 0,
                user_id: 0,
                amount: 0,
                merchant_id: 0,
                refund_id: '',
                notes: '',
                refund_type: 1,
                refund_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            },
            errors: {
                brand_id: [],
                user_id: [],
                amount: [],
                notes: [],
                refund_date: [],
                merchant_id: [],
                refund_id: [],
                refund_type: [],
            },
            bread: [
                {
                    text: "Dashboard",
                    to: { name: "auth.dashboard" },
                    disabled: false,
                    exact: true,
                },
                {
                    text: "Refund/Charbacks",
                    to: { name: "auth.paymentrefunds.listing" },
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