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
        <v-row class="mx-2">
            <v-col>
                <v-text-field
                    v-model="search"
                    label="Search"
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
                <v-select
                  :items="users"
                  item-text="email"
                  item-value="id"
                  label="Users"
                  required
                  v-model="user_id"
              ></v-select>
            </v-col>
            <v-col>
                <v-select
                  :items="services"
                  item-text="flag_value"
                  item-value="id"
                  label="Services"
                  required
                  v-model="service_id"
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
        <template v-slot:item.brand_id="{ item }">
          <div>{{brands.find(e=>e.id==item.brand_id).name}}</div>
        </template>
        <template v-slot:item.user_id="{ item }">
          <div>{{users.find(e=>e.id==item.user_id).name}}</div>
        </template>
        <template v-slot:item.m_flag_id="{ item }">
          <div>{{services.find(e=>e.id==item.m_flag_id).flag_value}}</div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            color="info"
            fab
            x-small
            dark
            :to="{ name: 'auth.marketingexpenses.edit', params: { id: item.id } }"
            v-if="permissions.indexOf('marketingexpenses-edit') >= 0"
          >
            <v-icon>mdi-pencil-plus</v-icon>
          </v-btn>
          <v-btn v-if="permissions.indexOf('marketingexpenses-delete') >= 0" color="error" fab x-small dark @click="deleteuser(item.id)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </template>
  <script>
  import Swal from "sweetalert2";
  import service from "@services/auth/default";
  const itemtypeservice = new service('marketing-expenses')
  const brandservice = new service('brands')
  const userservice = new service('user')
  const flagservice = new service('m-flags')
  export default {
    name: "auth.marketingexpenses.listing",
    computed:{
      permissions() {
        return this.$store.getters.getPermissions;
      },
    },
    data() {
      return {
        gettingReady: false,
        fromDate: '',
        fromMenu: false,
        toDate: '',
        toMenu: false,
        currentData: {},
        showModal: false,
        brands: [],
        users: [],
        services: [],
        brand_id: 0,
        user_id: 0,
        service_id: 0,
        search: "",
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
            disabled: true,
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
            text: "Amount",
            align: "start",
            sortable: true,
            value: "amount",
          },
          {
            text: "User",
            align: "start",
            sortable: true,
            value: "user_name",
          },
          {
            text: "Service",
            align: "start",
            sortable: true,
            value: "m_flag_id",
          },
          {
            text: "Brand",
            align: "start",
            sortable: true,
            value: "brand_id",
          },
          {
            text: "Date",
            align: "start",
            sortable: true,
            value: "for_day",
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
      user_id(){
        this.getDataFromApi();
      },
      service_id(){
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
      const brands = await brandservice.getlist('').then(e=>{
        return e.data
      })
      this.brands = [
        {id: 0, name: 'All Brands'}, ...brands
      ]
      const services = await flagservice.getlist('?flag_type=MARKETINGSOURCES').then(e=>{
        return e.data
      })
      this.services = [{
        id: 0, 
        flag_value: 'All Services'
      },...services]
      const users = await userservice.getlist('').then(e=>{
        return e.data
      })
      this.users = [{
        id: 0, 
        email: 'All Users'
      },...users]
      this.gettingReady = true
      this.getDataFromApi();
    },
    methods: {
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
        if(this.gettingReady){
          var data = await this.fakeApiCall();
          this.items = data.data;
          try {
            this.totalRecords = data.meta.total;
          } catch (ex) {
            //this.totalRecords=0
          }
          this.loading = false;
        }
      },
      fakeApiCall() {
        this.loading = true;
        // this.items = []
        var query = "";
        var page = this.options.page;
        query += "?page=" + page;
        if (this.options.sortBy.length > 0) {
          query += "&sortCol=" + this.options.sortBy[0];
        }
        if (this.options.sortDesc.length > 0) {
          //if 1 then by desc else asc
          query += "&sortByDesc=" + (this.options.sortDesc[0] == true ? 1 : 0);
        }
        query += "&brand_id=" + this.brand_id;
        query += "&user_id=" + this.user_id;
        query += "&service_id=" + this.service_id;
        if(this.fromDate){
          query+='&from_date='+this.fromDate
        }
        if(this.toDate){
          query+='&to_date='+this.toDate
        }
        query += "&perpage=" + this.options.itemsPerPage;
        if (this.search != "") {
          query += "&search=" + this.search;
        }
        return itemtypeservice.getlist(query);
      },
    },
  };
  </script>