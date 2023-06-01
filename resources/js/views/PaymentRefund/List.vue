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
                label="Search Refund ID, Notes, Amount"
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
                  label="User"
                  required
                  v-model="user_id"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  :items="merchants"
                  item-text="name"
                  item-value="id"
                  label="Merchants"
                  required
                  v-model="payment_gateway"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  :items="refund_types"
                  item-text="text"
                  item-value="id"
                  label="Refund/Chargeback Type"
                  required
                  v-model="refund_type"
              ></v-select>
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.brand_id="{ item }">
          <div @click="brand_id=item.brand_id">{{item.brand.name}}</div>
        </template>
        <template v-slot:item.user_id="{ item }">
          <div @click="user_id=item.user_id">{{item.user.name}}</div>
        </template>
        <template v-slot:item.merchant_id="{ item }">
          <div @click="merchant_id=item.merchant_id">{{item.merchant.name}}</div>
        </template>
        <template v-slot:item.updated_at="{ item }">
          {{item.updated_at_formatted}}
        </template>
        <template v-slot:item.refund_type="{ item }">
          <v-chip v-if="item.refund_type==0" class="ma-2" color="red" text-color="white" small>
            Refund
          </v-chip>
          <v-chip v-if="item.refund_type==1" class="ma-2" color="green" text-color="white" small>
            Chargeback
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            color="info"
            fab
            x-small
            dark
            :to="{ name: 'auth.paymentrefunds.edit', params: { id: item.id } }"
            v-if="permissions.indexOf('paymentrefund-edit') >= 0"
          >
            <v-icon>mdi-pencil-plus</v-icon>
          </v-btn>
          <v-btn v-if="permissions.indexOf('paymentrefund-delete') >= 0" color="error" fab x-small dark @click="deleteuser(item.id)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </template>
  <script>
  import Swal from "sweetalert2";
  import service from "@services/auth/default";
  import otherrequestservice from "@services/auth/otherrequests";
  const itemtypeservice = new service('payment-refunds')
  const userservice = new service('user')
  const brandservice = new service('brands')
  const merchantservice = new service('merchants')
  export default {
    name: "auth.paymentrefunds.listing",
    data() {
      return {
        search: "",
        users: [],
        brands: [],
        merchants: [],
        refund_type: 0,
        status: '',
        refund_types: [
          {id: 0, text: 'All'},
          {id: 1, text: 'Refund'},
          {id: 2, text: 'Chargeback'},
        ],
        user_id: 0,
        brand_id: 0,
        payment_gateway: 0,
        bread: [
          {
            text: "Dashboard",
            to: { name: "auth.dashboard" },
            disabled: false,
            exact: true,
          },
          {
            text: "Payment",
            to: { name: "auth.payments.listing" },
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
            text: "Brand",
            align: "start",
            sortable: true,
            value: "brand_id",
          },
          {
            text: "User",
            align: "start",
            sortable: true,
            value: "user_id",
          },
          {
            text: "Refund/Chargeback ID",
            align: "start",
            sortable: true,
            value: "refund_id",
          },
          {
            text: "Amount",
            align: "start",
            sortable: true,
            value: "amount",
          },
          {
            text: "Gateway",
            align: "start",
            sortable: true,
            value: "merchant_id",
          },
          {
            text: "Type",
            align: "start",
            sortable: true,
            value: "refund_type",
          },
          {
            text: "Date",
            align: "start",
            sortable: true,
            value: "refund_date",
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
      search() {
        this.getDataFromApi();
      },
      brand_id(){
        this.getDataFromApi();
      },
      user_id(){
        this.getDataFromApi();
      },
      payment_gateway(){
        this.getDataFromApi();
      },
      refund_type(){
        this.getDataFromApi()
      }
    },
    async mounted() {
      const users = await userservice.getlist('').then(e=>{
        return e.data
      })
      this.users = [{
        id: 0, 
        email: 'All Users'
      },...users]
      const merchants = await merchantservice.getlist('').then(e=>{
        return e.data
      })
      this.merchants = [{
        id: 0, 
        name: 'All Merchants'
      },...merchants]
      const brands = await brandservice.getlist('').then(e=>{
        return e.data
      })
      this.brands = [
        {id: 0, name: 'All Brands'}, ...brands
      ]
      this.getDataFromApi();
    },
    computed:{
      paymentGateways(){
        return [{id: 0, text: 'All'}, ...this.$store.getters.paymentGateways];
      },
      permissions() {
        return this.$store.getters.getPermissions;
      },
      user() {
        return this.$store.getters.loggedInUser;
      },
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
        query += "&perpage=" + this.options.itemsPerPage;
        if (this.search != "") {
          query += "&search=" + this.search;
        }
        if(this.refund_type>0){
          query += "&refund_type=" + (this.refund_type==1?0:1);
        }
        if(this.payment_gateway>0){
          query += "&merchant_id=" + this.payment_gateway;
        }
        if(this.brand_id>0){
          query += "&brand_id=" + this.brand_id;
        }
        if(this.user_id>0){
          query += "&user_id=" + this.user_id;
        }
        return itemtypeservice.getlist(query);
      },
    },
  };
  </script>