<template>
  <div>
    <v-breadcrumbs :items="bread">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template></v-breadcrumbs
    >
<v-row no-gutters  class="pa-10 rounded elevation-10">
<v-col
cols="12"
sm="12"
>
<v-form
ref="form"
v-model="loading"
lazy-validation
>

<v-row>
<v-col
  cols="12"
  sm="12"
  class="pb-0"
>
  <v-text-field
    v-model="name"
    :rules="[rules.required]"
    :error-messages="errors.name"
    label="Name"
  ></v-text-field>
</v-col>


<v-col
  cols="12"
  sm="12"
  class="pb-0"
>
  <v-text-field
    v-model="email"
    :rules="[rules.required]"
    :error-messages="errors.email"
    label="Email"
  ></v-text-field>
</v-col>

<v-col
  cols="12"
  sm="12"
  class="pb-0"
>
<v-select
    :items="roles"
    item-text="name"
    item-value="id"
    label="Role*"
    required
    v-model="role_id"
    :error-messages="errors.role_id"
></v-select>
</v-col>


<v-col
  cols="12"
  sm="12"
  class="pb-0"
>
  <v-text-field
    v-model="password"
    :error-messages="errors.password"
    label="Password"
    type="password"
    autocomplete="new-password"
  ></v-text-field>
</v-col>
{{image}}
<v-col cols="12" cm="12" class="pb-0">
<v-file-input
    accept="image/*"
    v-model="image"
    :error-messages="errors.image"
    label="Image"
  ></v-file-input>
</v-col>
<v-col v-if="image_url" cols="12" cm="12" class="pb-0">
  <v-img
    :lazy-src="image_url"
    max-height="150"
    max-width="250"
    :src="image_url"
  ></v-img>
</v-col>
<v-col cols="12" cm="12" class="pb-0">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Brand
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user_brand, user_brand_key) in userbrands"
          :key="user_brand_key"
        >
          <td>
            <v-select
                :items="brands"
                item-text="name"
                item-value="id"
                label="Brand"
                required
                v-model="user_brand.brand_id"
            ></v-select>
          </td>
          <td>
            <v-text-field
              label="Name"
              v-model="user_brand.pseudo_name"
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              label="Email"
              v-model="user_brand.pseudo_email"
            ></v-text-field>
          </td>
          <td>
            <v-btn
              icon
              small
              color="red"
              @click="removeRow(user_brand_key)"
            >
              <v-icon>mdi-content-cut</v-icon>
            </v-btn>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="text-right">
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
 <v-col
  cols="12"
  sm="12"
  class="pb-0"
>
<v-btn
    color="secondary"
    elevation="1"
    large
    raised
    @click="addbrand"
    :loading="btnloading"
    :disabled="btnloading"
  >Update</v-btn>
</v-col>

</v-row>

</v-form>
</v-col>
</v-row>
  </div>
</template>

<script>
import service from "@services/auth/default";
import userervice from "@services/auth/user";
import rolesservice from "@services/auth/roles";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const brandservice = new service('brands')

export default {
  name: "auth.users.add",
  async mounted(){
    this.id = this.$route.params.id
    var res = await userervice.get(this.id)
    this.name = res.name
    this.email = res.email
    this.password = res.password
    this.role_id = res.role_id
    this.image_url = res.image_url
    this.userbrands = res.brands
    rolesservice.getlist('').then(e=>{
      this.roles=e.data
    })
    this.brands = await brandservice.getlist('').then(e=>{
      return e.data
    })
  },
  methods: {
    resetError(){
        this.errors = {
          name:[],
          email: [],
          password: [],
          role_id: [],
          image: [],
      }
    },
    addbrand: async function () {
        this.resetError()
      if (this.$refs.form.validate()) {
        this.btnloading = true;
        var formdata = new FormData();
        formdata.append("name", this.name);
        formdata.append("email", this.email);
        if(this.password!=''){
          formdata.append("password", this.password);
        }
        formdata.append("role_id", this.role_id);
        if(this.image){
          formdata.append("image", this.image);
        }
        for(let i = 0; i < this.userbrands.length; i++){
          formdata.append("user_brands["+i+"][brand_id]", this.userbrands[i].brand_id);
          formdata.append("user_brands["+i+"][pseudo_name]", this.userbrands[i].pseudo_name);
          formdata.append("user_brands["+i+"][pseudo_email]", this.userbrands[i].pseudo_email);
        }
        this.btnloading = false;
        var res = await userervice.update(formdata, this.id)
        if(!res.status){
            if(res.data.name){
                this.errors.name = res.data.name
            }
            if(res.data.email){
                this.errors.email = res.data.email
            }
            if(res.data.password){
                this.errors.password = res.data.password
            }
            if(res.data.role_id){
                this.errors.role_id = res.data.role_id
            }
            if(res.data.image){
                this.errors.image = res.data.image
            }
            //errors here
        }else{
            //suuccess here
            this.$router.push({ name: "auth.users.listing" });
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
      brands: [],
      userbrands: [],
      editorConfig: {},
      editor: ClassicEditor,
      name: '',
      email: '',
      password: '',
      role_id: '',
      roles: [],
      image: null,
      image_url: '',
      id: 0,
      errors: {
          name:[],
          email: [],
          password: [],
          role_id: [],
          image: [],
      },
      bread: [
        {
          text: "Dashboard",
          to: { name: "auth.dashboard" },
          disabled: false,
          exact: true,
        },
        {
          text: "User",
          to: { name: "auth.users.listing" },
          disabled: false,
          exact: true,
        },
        {
          text: "Add",
          to: { name: "auth.users.edit", params: {id: this.$route.params.id} },
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
