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
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-text-field v-model="form.name" :rules="[rules.required]"
                                :error-messages="errors.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-text-field v-model="form.url" :rules="[rules.required]"
                                :error-messages="errors.url" label="URL"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-text-field v-model="form.terms_and_conditions" :rules="[rules.required]"
                                :error-messages="errors.terms_and_conditions" label="Terms and Conditions URL"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-text-field v-model="form.brief_notification_emails" :rules="[rules.required]"
                                :error-messages="errors.brief_notification_emails" label="Brief Form Notification Emails (comma separated)"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                            <v-select
                                :items="merchants"
                                item-text="name"
                                item-value="id"
                                label="Merchants"
                                multiple
                                v-model="merchant_ids"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" cm="12" class="pb-0">
                            <v-file-input
                                accept="image/*"
                                v-model="form.image"
                                :error-messages="errors.image"
                                label="Image"
                            ></v-file-input>
                        </v-col>
                        <v-col v-if="form.id > 0 && form.image_url" cols="12" sm="12" class="pb-0">
                            <v-img
                                :lazy-src="form.image_url"
                                max-height="150"
                                max-width="250"
                                :src="form.image_url"
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
const itemtypeservice = new service('brands')
const merchantservice = new service('merchants')
export default {
    name: "auth.brands.add",
    watch: {
    },
    async mounted() {
        await rolesservice.getlist('').then(e=>{
            this.roles=e.data
        })
        this.brands = await brandservice.getlist('').then(e=>{
            return e.data
        })
        this.users = await userervice.getlist('').then(e=>{
            return [{id: 0, email: 'No Reporting Line'},...e.data]
        })
        if(this.user.role_id==4){
            this.reporting_user_id = this.user.id
            this.role_id = 3
        }
        
        if (this.$route.params.id) {
            var res = await userervice.get(this.form.id)
            this.form = {
                name: (res.name ? res.name : ''),
                email: (res.email ? res.email : ''),
                role_id: (res.role_id ? res.role_id : ''),
                image_url: (res.image_url ? res.image_url : ''),
                userbrands: (res.userbrands ? res.userbrands : []),
                id: this.$route.params.id,
            }
            this.bread.push({
                text: "Edit",
                to: { name: "auth.users.edit", params: { id: this.$route.params.id } },
                disabled: false,
                exact: true,
            })
        } else {
            this.bread.push({
                text: "Add",
                to: { name: "auth.users.add" },
                disabled: false,
                exact: true,
            })
        }
    },
    methods: {
        resetError() {
            this.errors = {
                name:[],
                email: [],
                password: [],
                role_id: [],
                image: [],
                reporting_user_id: [],
            }
        },
        addpermission: async function () {
            this.resetError()
            if (this.$refs.form.validate()) {
                this.btnloading = true;
                var formdata = new FormData();
                formdata.append("name", this.form.name);
                formdata.append("url", this.form.url);
                formdata.append("terms_and_conditions", this.form.terms_and_conditions);
                formdata.append("brief_notification_emails", this.form.brief_notification_emails);
                if (this.form.image) {
                    formdata.append("image", this.form.image);
                }
                if(this.merchant_ids.length>0){
                    for(let i = 0; i < this.merchant_ids.length; i++){
                        formdata.append('merchant_ids['+i+']', this.merchant_ids[i])
                    }
                }
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
                    if (res.data.url) {
                        this.errors.url = res.data.url
                    }
                    if (res.data.terms_and_conditions) {
                        this.errors.terms_and_conditions = res.data.terms_and_conditions
                    }
                    if (res.data.brief_notification_emails) {
                        this.errors.brief_notification_emails = res.data.brief_notification_emails
                    }
                    //errors here
                } else {
                    //suuccess here
                    this.$router.push({ name: "auth.brands.listing" });
                }
            }
        },
        addRow(){
            this.userbrands.push({
                brand_id: 0,
                pseudo_name: '',
                pseudo_email: '',
            })
        },
        removeRow(index){
            this.userbrands.splice(index, 1);
        }
    },
    computed: {
        user() {
            return this.$store.getters.loggedInUser;
        },
    },
    data() {
        return {
            users: [],
            brands: [],
            userbrands: [],
            roles: [],
            form: {
                id: (this.$route.params.id ? this.$route.params.id : 0),
                reporting_user_id: 0,
                name: '',
                email: '',
                password: '',
                role_id: '',
                image: undefined,
                image_url: '',
                brief_notification_emails: '',
            },
            errors: {
                name:[],
                email: [],
                password: [],
                role_id: [],
                image: [],
                reporting_user_id: [],
            },
            bread: [
                {
                    text: "Dashboard",
                    to: { name: "auth.dashboard" },
                    disabled: false,
                    exact: true,
                },
                {
                    text: "Users",
                    to: { name: "auth.users.listing" },
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