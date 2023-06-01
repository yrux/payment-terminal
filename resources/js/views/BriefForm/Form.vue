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
                        <v-col cols="6" sm="6" class="pb-0">
                            <v-checkbox
                                v-model="form.is_active"
                                :label="`Is Active?`"
                            ></v-checkbox>
                        </v-col>
                        <v-col cols="12">
                            <div class="text-center">
                                <v-btn class="mb-3" @click="addTextBox('text')" small color="secondary">Add TextBox</v-btn>
                                <v-btn class="mb-3" @click="addTextBox('number')" small color="secondary">Add NumberBox</v-btn>
                                <v-btn class="mb-3" @click="addTextBox('color')" small color="secondary">Add Color Picker</v-btn>
                                <v-btn class="mb-3" @click="addContent('textarea')" small color="secondary">Add TextArea</v-btn>
                                <v-btn class="mb-3" @click="addDropdown('select')" small color="secondary">Add SelectBox</v-btn>
                                <v-btn class="mb-3" @click="addDropdown('selectother')" small color="secondary">Add SelectBox With Others</v-btn>
                                <v-btn class="mb-3" @click="addDropdown('multiselect')" small color="secondary">Add MultiSelect Box</v-btn>
                                <v-btn class="mb-3" @click="addDropdown('multiselectothers')" small color="secondary">Add MultiSelect Box With Others</v-btn>
                                <v-btn class="mb-3" @click="addTextBox('tags')" small color="secondary">Add Tags Input</v-btn>
                                <v-btn class="mb-3" @click="addContent('content')" small color="secondary">Add Content</v-btn>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <v-divider></v-divider>
                        </v-col>
                        <v-col col="12">
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                Name
                                            </th>
                                            <th class="text-left">
                                                Type
                                            </th>
                                            <th class="text-left">
                                                Grid
                                            </th>
                                            <th class="text-center">
                                                Options
                                            </th>
                                            <th class="text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inp, inpk) in form.formData" :key="inpk" >
                                            <td v-html="inp.label"></td>
                                            <td>{{ inp.type }}</td>
                                            <td>
                                                <v-progress-linear :value="((inp.grid/12)*100)"></v-progress-linear>
                                            </td>
                                            <td>
                                                <v-sheet class="mx-auto" max-width="300">
                                                    <v-slide-group show-arrows>
                                                        <v-slide-item v-for="(option, optionk) in inp.options" :key="optionk">
                                                            <v-btn class="mx-2" depressed rounded>{{option.label}}</v-btn>
                                                        </v-slide-item>
                                                    </v-slide-group>
                                                </v-sheet>
                                            </td>
                                            <td>
                                                <v-btn color="error" fab x-small @click="removeRow(inpk)"><v-icon>mdi-delete-outline</v-icon></v-btn>
                                                <v-btn v-if="inpk>0" color="info" fab x-small @click="moveUp(inpk)"><v-icon>mdi-arrow-up</v-icon></v-btn>
                                                <v-btn v-if="inpk<(form.formData.length-1)" color="info" fab x-small @click="moveDown(inpk)"><v-icon>mdi-arrow-down</v-icon></v-btn>
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
        <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="contentPopup">
        <v-card>
            <v-card-text class="pa-10">
                <h4>Provide Label/Content</h4>
                <ckeditor :editor="editor" v-model="currentForm.label" :config="editorConfig"></ckeditor>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="goNextContent" text>Next</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import service from "@services/auth/default";
import Swal from "sweetalert2";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const itemtypeservice = new service('brief-forms')
export default {
    name: "auth.briefforms.add",
    watch: {
    },
    async mounted() {
        if (this.$route.params.id) {
            var res = await itemtypeservice.get(this.form.id)
            this.form = {
                name: (res.name ? res.name : ''),
                is_active: (res.is_active==1?true:false),
                formData: (JSON.parse(res.formData)),
                id: this.$route.params.id,
            }
            this.bread.push({
                text: "Edit",
                to: { name: "auth.briefforms.edit", params: { id: this.$route.params.id } },
                disabled: false,
                exact: true,
            })
        } else {
            this.bread.push({
                text: "Add",
                to: { name: "auth.briefforms.add" },
                disabled: false,
                exact: true,
            })
        }
    },
    methods: {
        async addContent(type){
            this.currentForm.type = type
            this.currentForm.label = ''
            this.currentForm.gridSize = await this.askQuestion("Provide Grid Size", 12);
            this.contentPopup = true
        },
        goNextContent(){
            this.form.formData.push({
                type: this.currentForm.type,
                placehoolder: this.currentForm.label,
                label: this.currentForm.label,
                grid: this.currentForm.gridSize,
                options: [],
            });
            this.contentPopup = false
        },
        async addTextBox(type){
            var label = await this.askQuestion(
                "Type Label of the Input",
                ''
            );
            var gridSize = await this.askQuestion("Provide Grid Size", 6);
            this.form.formData.push({
                type: type,
                placehoolder: label,
                label: label,
                grid: gridSize,
                options: [],
            });
        },
        async addDropdown(type){
            var label = await this.askQuestion(
                "Type Label of the Input",
                ''
            );
            var gridSize = await this.askQuestion("Provide Grid Size", 6);
            var numberOfOptions = await this.askQuestion("How many options you want in the Input for user to select from", 6);
            var options = [];
            if (parseInt(numberOfOptions) > 0) {
                for (let q = 0; q < parseInt(numberOfOptions); q++) {
                    var label_loop = await this.askQuestion(
                        "Provide Option " + (q + 1)
                    );
                    options.push({ label: label_loop });
                }
            }
            this.form.formData.push({
                type: type,
                placehoolder: label,
                label: label,
                grid: gridSize,
                options: options,
            });
        },
        async askQuestion(question, inputValue = "") {
            const { value: questionvalue } = await Swal.fire({
                title: question,
                input: "text",
                // inputLabel: "Your Question",
                inputValue: inputValue,
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return "You need to write something!";
                    }
                },
            });
            if (questionvalue) {
                return questionvalue;
            }
        },
        removeRow(key){
            this.form.formData.splice(key, 1);
        },
        resetError() {
            this.errors = {
                name: [],
                is_active: [],
                formData: [],
            }
        },
        addpermission: async function () {
            this.resetError()
            if (this.$refs.form.validate()) {
                this.btnloading = true;
                var formdata = new FormData();
                formdata.append("name", this.form.name);
                formdata.append("formData", JSON.stringify(this.form.formData));
                formdata.append("is_active", (this.form.is_active==true?1:0));
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
                    if (res.data.is_active) {
                        this.errors.is_active = res.data.is_active
                    }
                    if (res.data.formData) {
                        this.errors.formData = res.data.formData
                    }
                    //errors here
                } else {
                    //suuccess here
                    this.$router.push({ name: "auth.briefforms.listing" });
                }
            }
        },
        moveUp(index){
            const toIndex = (index-1)
            var data = this.form.formData.splice(index,1)
            this.form.formData.splice(toIndex, 0, data[0]);
        },
        moveDown(index){
            const toIndex = (index+1)
            var data = this.form.formData.splice(index,1)
            this.form.formData.splice(toIndex, 0, data[0]);
        }
    },
    computed: {
        user() {
            return this.$store.getters.loggedInUser;
        },
    },
    data() {
        return {
            editor: ClassicEditor,
            editorConfig: {
            },
            contentPopup: false,
            currentForm: {
                gridSize: 0,
                label: '',
                type: '',
            },
            form: {
                id: (this.$route.params.id ? this.$route.params.id : 0),
                name: '',
                is_active: true,
                formData: [],
            },
            errors: {
                name: [],
                is_active: [],
                formData: [],
            },
            bread: [
                {
                    text: "Dashboard",
                    to: { name: "auth.dashboard" },
                    disabled: false,
                    exact: true,
                },
                {
                    text: "Brief Forms",
                    to: { name: "auth.briefforms.listing" },
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