<template>
    <div>
      <v-row no-gutters>
        <v-breadcrumbs :items="bread">
          <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
          </template>
        </v-breadcrumbs>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :server-items-length="totalRecords"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:top>
        <v-row class="mx-4">
            <v-col>
                <v-text-field
                    v-model="search"
                    label="Search"
                    class="mx-4"
                ></v-text-field>
            </v-col>
            <v-col>
                <v-select
                  :items="brands"
                  item-text="name"
                  item-value="id"
                  label="Brand"
                  required
                  v-model="brand_id"
              ></v-select>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialog"
                v-model="fromMenu"
                :return-value.sync="fromDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fromDate"
                    label="From Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    clearable
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fromDate"
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
                    @click="$refs.dialog.save(fromDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col>
              <v-dialog
                ref="tdialog"
                v-model="toMenu"
                :return-value.sync="toDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="toDate"
                    label="To Date"
                    clearable
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="toDate"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="toMenu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.tdialog.save(toDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
        </v-row>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            color="info"
            fab
            x-small
            dark
            v-if="permissions.indexOf('brandformsubmissions-edit') >= 0"
            @click="showDetails(item)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn v-if="permissions.indexOf('brandformsubmissions-delete') >= 0" color="error" fab x-small dark @click="deleteuser(item.id)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-row justify="space-around">
        <v-col cols="auto">
          <v-dialog
            transition="dialog-top-transition"
            max-width="600"
            v-model="showModal"
          >
            <template>
              <v-card>
                <v-toolbar color="primary" dark>Query Detail</v-toolbar>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-simple-table class="elevation-1">
                        <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>Name:</td>
                                <td>{{ currentData.name }}</td>
                              </tr>
                              <tr>
                                <td>Email:</td>
                                <td>{{ currentData.email }}</td>
                              </tr>
                              <tr>
                                <td>Phone:</td>
                                <td>{{ currentData.phone }}</td>
                              </tr>
                              <tr>
                                <td>Message:</td>
                                <td style="white-space: pre-wrap;">{{ currentData.message }}</td>
                              </tr>
                              <tr>
                                <td>Brand:</td>
                                <td>{{ currentData.brand_name }}</td>
                              </tr>
                              <tr>
                                <td>Date:</td>
                                <td>{{ currentData.created_at_formatted }}</td>
                              </tr>
                              <tr :key="other_field_key" v-for="(other_field, other_field_key) in JSON.parse(currentData.other_fields)">
                                <td>{{ other_field_key }}:</td>
                                <td>{{ other_field }}</td>
                              </tr>
                            </tbody>
                          </template>
                      </v-simple-table>
                      <h2 class="mt-2 mb-2 text-center">Notes</h2>
                      <v-simple-table class="elevation-1">
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">Comment</th>
                              <th class="text-left">Comment By</th>
                            </tr>
                          </thead>
                            <tbody>
                              <tr v-for="(note, notek) in bNotes" :key="notek">
                                <td>
                                  <v-textarea no-resize rows="2" :disabled="note.id?true:false" label="Note" v-model="note.note"></v-textarea>
                                </td>
                                <td>{{ note.user? note.user.name: 'N/A' }}</td>
                              </tr>
                              <tr>
                                <td colspan="2" class="text-right">
                                  <v-btn color="orange" @click="saveNote" small text>Save Notes</v-btn>
                                  <v-btn color="green" @click="addNote" small text>Add Row</v-btn>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    text
                    @click="showModal = false"
                  >Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
  </template>
  <script>
  import Swal from "sweetalert2";
  import service from "@services/auth/default";
  const itemtypeservice = new service('brand-form-submissions')
  import otherrequestservice from "@services/auth/otherrequests";
  const brandservice = new service('brands')
  export default {
    name: "auth.brandformsubmissions.listing",
    computed:{
      permissions() {
        return this.$store.getters.getPermissions;
      },
      user() {
        return this.$store.getters.loggedInUser;
      },
    },
    data() {
      return {
        fromDate: '',
        fromMenu: false,
        toDate: '',
        toMenu: false,
        currentData: {},
        showModal: false,
        brands: [],
        bNotes: [],
        brand_id: 0,
        search: "",
        bread: [
          {
            text: "Dashboard",
            to: { name: "auth.dashboard" },
            disabled: false,
            exact: true,
          },
          {
            text: "Brand Queries",
            to: { name: "auth.brandformsubmissions.listing" },
            disabled: false,
            exact: true,
          },
        ],
        items: [],
        loading: true,
        totalRecords: 0,
        options: {},
        headers: [
          {
            text: "ID",
            align: "start",
            sortable: true,
            value: "id",
          },
          {
            text: "Name",
            align: "start",
            sortable: true,
            value: "name",
          },
          {
            text: "Email",
            align: "start",
            sortable: true,
            value: "email",
          },
          {
            text: "Phone",
            align: "start",
            sortable: true,
            value: "phone",
          },
          {
            text: "Brand",
            align: "start",
            sortable: true,
            value: "brand_name",
          },
          {
            text: "Date",
            align: "start",
            sortable: true,
            value: "created_at_formatted",
          },
          { text: "Actions", value: "actions", sortable: false },
        ],
      };
    },
    watch: {
      $route() {
        this.getDataFromApi();
      },
      perpage() {
        this.getDataFromApi();
      },
      options: {
        handler() {
          this.getDataFromApi();
        },
        deep: true,
      },
      brand_id(){
        this.getDataFromApi();
      },
      search() {
        this.getDataFromApi();
      },
      fromDate(){
        this.getDataFromApi();
      },
      toDate(){
        this.getDataFromApi();
      },
    },
    async mounted() {
      this.getDataFromApi();
      const brands = await brandservice.getlist('').then(e=>{
        return e.data
      })
      this.brands = [
        {id: 0, name: 'All Brands'}, ...brands
      ]
    },
    methods: {
      addNote(){
        this.bNotes.push({
          note: '',
          user: {
            name: this.user.name
          }
        })
      },
      async saveNote(){
        for(let i = 0; i < this.bNotes.length; i++){
          if(!this.bNotes[i].id){
            const formData = new FormData()
            formData.append('note', this.bNotes[i].note)
            await otherrequestservice.post(`brand-form-submissions/${this.currentData.id}/notes`, formData).then(e=>e.data.data)
          }
        }
        this.showModal = false
      },
      showDetails(item){
        this.bNotes = []
        this.bNotes = item.notes
        this.currentData = item
        this.showModal = true
        this.getDataFromApi()
      },
      deleteuser: async function (id) {
        const isConfirmed = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            return true;
          }
        });
        if (isConfirmed) {
          await itemtypeservice.delete({
            id: id,
          });
          Swal.fire("Deleted!", "Your record has been deleted.", "success");
          this.getDataFromApi();
        }
      },
      async getDataFromApi() {
        var data = await this.fakeApiCall();
        this.items = data.data;
        try {
          this.totalRecords = data.meta.total;
        } catch (ex) {
          //this.totalRecords=0
        }
        this.loading = false;
      },
      fakeApiCall() {
        this.loading = true;
        var queryObj = {}
        // this.items = []
        var query = "";
        var page = this.options.page;
        query += "?page=" + page;
        queryObj['page'] = page
        if (this.options.sortBy.length > 0) {
          query += "&sortCol=" + this.options.sortBy[0];
          queryObj['sortCol'] = this.options.sortBy[0]
        }
        if (this.options.sortDesc.length > 0) {
          //if 1 then by desc else asc
          query += "&sortByDesc=" + (this.options.sortDesc[0] == true ? 1 : 0);
          queryObj['sortByDesc'] = (this.options.sortDesc[0] == true ? 1 : 0);
        }
        query += "&brand_id=" + this.brand_id;
        queryObj['brand_id'] = this.brand_id
        if(this.fromDate){
          query+='&from_date='+this.fromDate
          queryObj['from_date'] = this.fromDate
        }
        if(this.toDate){
          query+='&to_date='+this.toDate
          queryObj['to_date'] = this.toDate
        }
        query += "&perpage=" + this.options.itemsPerPage;
        queryObj['perpage'] = this.options.itemsPerPage;
        if (this.search != "") {
          query += "&search=" + this.search;
          queryObj['search'] = this.search;
        }
        return itemtypeservice.getlist(query);
      },
    },
  };
  </script>