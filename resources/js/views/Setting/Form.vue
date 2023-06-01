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
                            <v-text-field v-model="form.flag_type" :rules="[rules.required]"
                                :error-messages="errors.flag_type" label="Type"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-text-field v-model="form.flag_value" :rules="[rules.required]"
                                :error-messages="errors.flag_value" label="Value"></v-text-field>
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
const itemtypeservice = new service('m-flags')
export default {
    name: "auth.settings.add",
    watch: {
    },
    async mounted() {
        if (this.$route.params.id) {
            var res = await itemtypeservice.get(this.form.id)
            this.form = {
                flag_type: (res.flag_type ? res.flag_type : ''),
                flag_value: (res.flag_value ? res.flag_value : ''),
                id: this.$route.params.id,
            }
            this.bread.push({
                text: "Edit",
                to: { name: "auth.settings.edit", params: { id: this.$route.params.id } },
                disabled: false,
                exact: true,
            })
        } else {
            this.bread.push({
                text: "Add",
                to: { name: "auth.settings.add" },
                disabled: false,
                exact: true,
            })
        }
    },
    methods: {
        resetError() {
            this.errors = {
                flag_value: [],
                flag_type: [],
            }
        },
        addpermission: async function () {
            this.resetError()
            if (this.$refs.form.validate()) {
                this.btnloading = true;
                var formdata = new FormData();
                formdata.append("flag_type", this.form.flag_type);
                formdata.append("flag_value", this.form.flag_value);
                this.btnloading = false;
                if (this.form.id > 0) {
                    var res = await itemtypeservice.update(formdata, this.form.id)
                } else {
                    var res = await itemtypeservice.create(formdata)
                }
                if (!res.status) {
                    if (res.data.flag_type) {
                        this.errors.flag_type = res.data.flag_type
                    }
                    if (res.data.flag_value) {
                        this.errors.flag_value = res.data.flag_value
                    }
                    //errors here
                } else {
                    //suuccess here
                    this.$router.push({ name: "auth.settings.listing" });
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
            form: {
                id: (this.$route.params.id ? this.$route.params.id : 0),
                flag_type: '',
                flag_value: '',
            },
            errors: {
                flag_type: [],
                flag_value: [],
            },
            bread: [
                {
                    text: "Dashboard",
                    to: { name: "auth.dashboard" },
                    disabled: false,
                    exact: true,
                },
                {
                    text: "Settings",
                    to: { name: "auth.settings.listing" },
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