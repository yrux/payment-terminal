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
                            <v-text-field v-model="form.name" :rules="[rules.required]"
                                :error-messages="errors.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-select
                                :items="merchant_types"
                                item-text="text"
                                item-value="id"
                                label="Merchant"
                                required
                                v-model="form.merchant_type"
                                :error-messages="errors.merchant_type"
                            ></v-select>
                        </v-col>
                        <v-col cols="5" sm="5" class="pb-0">
                            <v-text-field v-model="form.data.key1" :rules="[rules.required]"
                                :error-messages="errors.data" :label="key1"></v-text-field>
                        </v-col>
                        <v-col cols="5" sm="5" class="pb-0">
                            <v-text-field v-model="form.data.key2" :rules="[rules.required]" :label="key2"></v-text-field>
                        </v-col>
                        <v-col cols="2" sm="2" class="pb-0">
                            <v-checkbox label="Is Sandbox?" v-model="form.data.is_sandbox"></v-checkbox>
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
const itemtypeservice = new service('merchants')
export default {
    name: "auth.merchants.add",
    watch: {
    },
    async mounted() {
        if (this.$route.params.id) {
            var res = await itemtypeservice.getw(this.form.id)
            console.log(res.merchant_type)
            this.form = {
                data: (res.data ? JSON.parse(res.data) : ({key1: '', key2: '', is_sandbox: false})),
                name: (res.name ? res.name : ''),
                merchant_type: (res.merchant_type ? res.merchant_type : 2),
                id: this.$route.params.id,
            }
            this.bread.push({
                text: "Edit",
                to: { name: "auth.merchants.edit", params: { id: this.$route.params.id } },
                disabled: false,
                exact: true,
            })
        } else {
            this.bread.push({
                text: "Add",
                to: { name: "auth.merchants.add" },
                disabled: false,
                exact: true,
            })
        }
    },
    methods: {
        resetError() {
            this.errors = {
                name: [],
                merchant_type: [],
                data: [],
            }
        },
        addpermission: async function () {
            this.resetError()
            if (this.$refs.form.validate()) {
                this.btnloading = true;
                var formdata = new FormData();
                formdata.append("name", this.form.name);
                formdata.append("merchant_type", this.form.merchant_type);
                formdata.append("data", JSON.stringify(this.form.data));
                this.btnloading = false;
                if (this.form.id > 0) {
                    var res = await itemtypeservice.update(formdata, this.form.id)
                } else {
                    var res = await itemtypeservice.create(formdata)
                }
                if (!res.status) {
                    if (res.data.name) {
                        this.errors.name = res.data.name
                    }
                    if (res.data.merchant_type) {
                        this.errors.merchant_type = res.data.merchant_type
                    }
                    if (res.data.data) {
                        this.errors.data = res.data.data
                    }
                    //errors here
                } else {
                    //suuccess here
                    this.$router.push({ name: "auth.merchants.listing" });
                }
            }
        },
    },
    computed: {
        merchant_types(){
            return this.$store.getters.paymentGateways;
        },
        key1(){
            if(this.form.merchant_type==3){
                return 'Client ID'
            }
            if(this.form.merchant_type==2){
                return 'Publishable Key'
            }
            if(this.form.merchant_type==1){
                return 'Login ID'
            }
        },
        key2(){
            if(this.form.merchant_type==3){
                return 'Client Secret'
            }
            if(this.form.merchant_type==2){
                return 'Secret Key'
            }
            if(this.form.merchant_type==1){
                return 'Transaction Key'
            }
        }
    },
    data() {
        return {
            form: {
                id: (this.$route.params.id ? this.$route.params.id : 0),
                merchant_type: 2,
                name: '',
                data: {key1: '', key2: '', is_sandbox: false},
            },
            errors: {
                name: [],
                merchant_type: [],
                data: [],
            },
            bread: [
                {
                    text: "Dashboard",
                    to: { name: "auth.dashboard" },
                    disabled: false,
                    exact: true,
                },
                {
                    text: "Merchants",
                    to: { name: "auth.merchants.listing" },
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