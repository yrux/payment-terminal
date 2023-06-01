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
                                :items="brands"
                                item-text="name"
                                item-value="id"
                                label="Brand"
                                :rules="[rules.required]"
                                v-model="form.brand_id"
                                :error-messages="errors.brand_id"
                            ></v-select>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-text-field v-model="form.name" :rules="[rules.required]"
                                :error-messages="errors.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-text-field v-model="form.email" :rules="[rules.required]"
                                :error-messages="errors.email" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-text-field v-model="form.phone" :rules="[rules.required]"
                                :error-messages="errors.phone" label="Phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-textarea v-model="form.message" :error-messages="errors.message" label="Message"></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                        <th class="text-left">
                                            Name
                                        </th>
                                        <th class="text-left">
                                            Value
                                        </th>
                                        <th class="text-left">
                                            
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(item, item_key) in form.other_fields"
                                            :key="item_key"
                                        >
                                            <td>
                                                <v-text-field v-model="item.name" :rules="[rules.required]" label="Name"></v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field v-model="item.value" :rules="[rules.required]" label="Value"></v-text-field>
                                            </td>
                                            <td>
                                                <v-btn
                                                    icon
                                                    small
                                                    color="red"
                                                    @click="removeRow(item_key)"
                                                >
                                                    <v-icon>mdi-content-cut</v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" class="text-right">
                                                <v-btn
                                                color="green"
                                                small
                                                @click="addRow"
                                                >
                                                Add Row
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
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
const itemtypeservice = new service('brand-form-submissions')
const brandservice = new service('brands')
export default {
    name: "auth.brandformsubmissions.add",
    watch: {
    },
    async mounted() {
        this.brands = await brandservice.getlist('').then(e=>{
            return e.data
        })
        // this.merchants = await merchantservice.getlist('').then(e=>{
        //     return e.data
        // })
        if (this.$route.params.id) {
            var res = await itemtypeservice.get(this.form.id)
            this.form = {
                brand_id: (res.brand_id ? res.brand_id : 0),
                name: (res.name ? res.name : ''),
                email: (res.email ? res.email : ''),
                phone: (res.phone ? res.phone : ''),
                message: (res.message ? res.message : ''),
                other_fields: (res.other_fields ? JSON.parse(res.other_fields) : []),
                id: this.$route.params.id,
            }
            this.form.allow_tax = (res.allow_tax==1?true:false)
            this.bread.push({
                text: "Edit",
                to: { name: "auth.brandformsubmissions.edit", params: { id: this.$route.params.id } },
                disabled: false,
                exact: true,
            })
        } else {
            this.bread.push({
                text: "Add",
                to: { name: "auth.brandformsubmissions.add" },
                disabled: false,
                exact: true,
            })
        }
    },
    methods: {
        addRow(){
            this.form.other_fields.push({
                name: '',
                value: '',
            })
        },
        removeRow(index){
            this.form.other_fields.splice(index, 1);
        },
        resetError() {
            this.errors = {
                brand_id: [],
                name: [],
                email: [],
                phone: [],
                message: [],
                other_fields: []
            }
        },
        addpermission: async function () {
            this.resetError()
            if(!this.btnloading){
                // this.form.user_id = this.user.id
                if (this.$refs.form.validate()) {
                    this.btnloading = true;
                    var formdata = new FormData();
                    var domain = '';
                    var brand = this.brands.find(e=>e.id==this.form.brand_id)
                    formdata.append("domain", brand.url);
                    formdata.append("name", this.form.name);
                    formdata.append("email", this.form.email);
                    formdata.append("phone", this.form.phone);
                    formdata.append("message", this.form.message);
                    for(let i = 0; i < this.form.other_fields.length; i++){
                        formdata.append(this.form.other_fields[i].name, this.form.other_fields[i].value);
                    }
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
                        if (res.data.name) {
                            this.errors.name = res.data.name
                        }
                        if (res.data.email) {
                            this.errors.email = res.data.email
                        }
                        if (res.data.phone) {
                            this.errors.phone = res.data.phone
                        }
                        if (res.data.message) {
                            this.errors.message = res.data.message
                        }
                        if (res.data.other_fields) {
                            this.errors.other_fields = res.data.other_fields
                        }
                        //errors here
                    } else {
                        //suuccess here
                        this.$router.push({ name: "auth.brandformsubmissions.listing" });
                    }
                }
            }
        },
    },
    computed: {
        
    },
    data() {
        return {
            brands: [],
            form: {
                id: (this.$route.params.id ? this.$route.params.id : 0),
                brand_id: 0,
                name: '',
                email: '',
                phone: '',
                message: '',
                other_fields: []
            },
            errors: {
                brand_id: [],
                name: [],
                email: [],
                phone: [],
                message: [],
                other_fields: []
            },
            bread: [
                {
                    text: "Dashboard",
                    to: { name: "auth.dashboard" },
                    disabled: false,
                    exact: true,
                },
                {
                    text: "Brand Queries",
                    to: { name: "auth.paymenbrandformsubmissionsts.listing" },
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