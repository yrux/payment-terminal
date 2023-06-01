<template>
    <div>
        <v-breadcrumbs class="no-print" :items="bread">
            <template v-slot:divider>
                <v-icon>mdi-forward</v-icon>
            </template>
        </v-breadcrumbs>
        <v-row no-gutters class="pa-10 rounded elevation-10">
            <v-col class="no-print">
                <v-btn small class="mb-3 white--text" block color="blue" @click="downloadForm">Download Form</v-btn>
                <v-divider></v-divider>
            </v-col>
            <v-col class="on-print-font-change" cols="12" sm="12">
                <v-form>
                    <v-row>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-text-field v-model="form.brand.name" readonly label="Brand"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-text-field v-model="form.briefform.name" readonly label="Brand"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-text-field v-model="form.name" readonly label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-text-field v-model="form.email" readonly label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-select
                                readonly
                                :items="industry"
                                item-text="text"
                                item-value="id"
                                label="What industry your business falls into?"
                                required
                                v-model="form.industry"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-text-field v-model="form.name_to_appear" readonly label="Word/Name IF you want to appear (type in exactly as you wanted)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-textarea v-model="form.brief_description" readonly label="Please provide a brief description of your business. You may also want to list website addresses of your competitors / niche, if any."></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="12" class="pb-0">
                            <v-divider></v-divider>
                        </v-col>
                        <v-col v-for="(formD, formk) in form.formData" :key="formk" :cols="parseInt(formD.grid)" class="pb-0">                            
                            <v-text-field v-if="formD.type=='text'||formD.type=='number'||formD.type=='color'" v-model="formD.value" readonly :label="formD.placehoolder"></v-text-field>
                            <v-textarea v-if="formD.type=='textarea'" v-model="formD.value" readonly :label="formD.placehoolder"></v-textarea>
                            <v-select
                                v-if="formD.type=='multiselect'"
                                v-model="formD.value"
                                :items="formD.options.map(e=>{
                                    return e.label
                                })"
                                readonly
                                :label="formD.placehoolder"
                                multiple
                                chips
                            ></v-select>
                            <v-select
                                v-if="formD.type=='multiselectothers'"
                                v-model="formD.value"
                                :items="formD.value"
                                readonly
                                :label="formD.placehoolder"
                                multiple
                                chips
                            ></v-select>
                            <v-select
                                v-if="formD.type=='select'"
                                v-model="formD.value"
                                :items="formD.options.map(e=>{
                                    return e.label
                                })"
                                readonly
                                :label="formD.placehoolder"
                            ></v-select>
                            <v-select
                                v-if="formD.type=='selectother'"
                                v-model="formD.value"
                                :items="formD.options.map(e=>{
                                    return e.label
                                })"
                                readonly
                                :label="formD.placehoolder"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import service from "@services/auth/default";
const itemtypeservice = new service('user-submissions')
export default {
    name: "auth.usersubmissions.view",
    watch: {
    },
    async mounted() {
        if (this.$route.params.id) {
            var res = await itemtypeservice.get(this.form.id)
            this.form = {
                id: this.$route.params.id,
                name: res.name,
                email: res.email,
                name_to_appear: res.name_to_appear,
                competitors: res.competitors,
                industry: parseInt(res.industry),
                brief_description: res.brief_description,
                brand: res.brand,
                briefform: res.briefform,
                formData: JSON.parse(res.formData)
            }
            this.bread.push({
                text: "Form Detail",
                to: { name: "auth.usersubmissions.view", params: { id: this.$route.params.id } },
                disabled: false,
                exact: true,
            })
        }
    },
    methods: {
        async downloadForm(){
            this.$store.commit("updatePrintbtn", true);
            await this.$nextTick()
            window.print()
            this.$store.commit("updatePrintbtn", false);
        },
    },
    computed: {
        user() {
            return this.$store.getters.loggedInUser;
        },
    },
    data() {
        return {
            bread: [
                {
                    text: "Dashboard",
                    to: { name: "auth.dashboard" },
                    disabled: false,
                    exact: true,
                },
                {
                    text: "User Submissions",
                    to: { name: "auth.usersubmissions.listing" },
                    disabled: false,
                    exact: true,
                },
            ],
            industry: [
                {id: 1, text: 'Aerospace'},
                {id: 2, text: 'Transport'},
                {id: 3, text: 'Computer'},
                {id: 4, text: 'Telecommunication'},
                {id: 5, text: 'Agriculture'},
                {id: 6, text: 'Construction'},
                {id: 7, text: 'Education'},
                {id: 8, text: 'Pharmaceutical'},
                {id: 9, text: 'Food'},
                {id: 10, text: 'Health care'},
                {id: 11, text: 'Hospitality'},
                {id: 12, text: 'Entertainment'},
                {id: 13, text: 'News Media'},
                {id: 14, text: 'Energy'},
                {id: 15, text: 'Manufacturing'},
                {id: 16, text: 'Music'},
                {id: 17, text: 'Mining'},
                {id: 18, text: 'Worldwide web'},
                {id: 19, text: 'Electronics'},
                {id: 20, text: 'Others'},
            ],
            form: {
                id: (this.$route.params.id ? this.$route.params.id : 0),
                name: '',
                email: '',
                name_to_appear: '',
                competitors: '',
                industry: 0,
                brief_description: '',
                brand: {},
                briefform: {},
                formData: [],
            }
        };
    },
};
</script>