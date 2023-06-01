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
                label="Search Customer Name/Email, Description, Amount"
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
                  :items="statuses"
                  item-text="text"
                  item-value="id"
                  label="Payment Status"
                  required
                  v-model="status"
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
        <template v-slot:item.payment_gateway="{ item }">
          <div @click="payment_gateway=item.payment_gateway">{{item.merchant.name}}</div>
        </template>
        <template v-slot:item.updated_at="{ item }">
          {{item.updated_at_formatted}}
        </template>
        <template v-slot:item.merchant_transaction_id="{ item }">
          {{item.merchant_transaction_id}}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status==0" class="ma-2" color="red" text-color="white" small>
            Pending
          </v-chip>
          <v-chip v-if="item.status==1" class="ma-2" color="green" text-color="white" small>
            Paid
          </v-chip>
          <v-chip v-if="item.status==2" class="ma-2" color="red" text-color="white" small>
            Failed: {{ item.failed_reason }}
          </v-chip>
          <v-chip v-if="item.status==3" class="ma-2" color="teal" text-color="white" small>
            Opened: {{ item.failed_reason }}
          </v-chip>
          <v-chip v-if="item.status==4" class="ma-2" color="orange" text-color="white" small>
            Waiting for Approval
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip v-if="item.status!=4" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="warning" fab x-small dark @click="paymentLink(item.crypt_key)">
                <v-icon>mdi-form-dropdown</v-icon>
              </v-btn>
            </template>
            <span>Invoice Link</span>
          </v-tooltip>
          <v-tooltip v-if="user.role_id==1||user.role_id==4" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="teal" fab x-small dark @click="updatePaymentStatus(item)">
                <v-icon>mdi-state-machine</v-icon>
              </v-btn>
            </template>
            <span>Update Payment Status</span>
          </v-tooltip>
          <v-tooltip bottom v-if="item.status!=1">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="info" fab x-small dark @click="recheckMerchantStatus(item)">
                <v-icon>mdi-sync</v-icon>
              </v-btn>
            </template>
            <span>Recheck Status From Merchant (Stripe Only)</span>
          </v-tooltip>
          <v-btn
            color="info"
            fab
            x-small
            dark
            :to="{ name: 'auth.payments.edit', params: { id: item.id } }"
            v-if="permissions.indexOf('payment-edit') >= 0&&(item.status==0||item.status==2||item.status==3)"
          >
            <v-icon>mdi-pencil-plus</v-icon>
          </v-btn>
          <v-btn v-if="permissions.indexOf('payment-delete') >= 0&&item.status==0" color="error" fab x-small dark @click="deleteuser(item.id)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="statusChangePopup"
      >
        <template>
          <v-card :loading="popForm.loading">
            <v-toolbar color="primary" dark>Update Payment Status</v-toolbar>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-select
                    :items="statuses"
                    item-text="text"
                    item-value="id"
                    label="Payment Status"
                    required
                    v-model="popForm.status"
                  ></v-select>
                </v-col>
                <v-col col="6">
                  <v-text-field v-if="popForm.status==2" v-model="popForm.failed_reason" label="Failed Reason"></v-text-field>
                  <v-text-field v-if="popForm.status==1" v-model="popForm.merchant_transaction_id" label="Merchant Transaction ID"></v-text-field>
                  <v-text-field v-if="popForm.status==3" v-model="popForm.failed_reason" label="IP Opened From"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text color="success" @click="updatePaymentStatusApi">Update Status</v-btn>
              <v-btn text @click="statusChangePopup = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </template>
  <script>
  import Swal from "sweetalert2";
  import service from "@services/auth/default";
  import otherrequestservice from "@services/auth/otherrequests";
  const itemtypeservice = new service('payments')
  const userservice = new service('user')
  const brandservice = new service('brands')
  const merchantservice = new service('merchants')
  export default {
    name: "auth.payments.listing",
    data() {
      return {
        statusChangePopup: false,
        popForm:{
          failed_reason: '',
          merchant_transaction_id: '',
          status: 0,
          payment_id: 0,
          loading: false,
        },
        search: "",
        users: [],
        brands: [],
        merchants: [],
        status: '',
        statuses: [
          {id: '', text: 'All'},
          {id: 0, text: 'Pending'},
          {id: 1, text: 'Paid'},
          {id: 2, text: 'Failed'},
          {id: 3, text: 'Opened'},
          {id: 4, text: 'Waiting for Approval'},
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
            text: "Sales Email",
            align: "start",
            sortable: true,
            value: "sales_email"
          },
          {
            text: "Customer Email",
            align: "start",
            sortable: true,
            value: "customer_email",
          },
          {
            text: "Customer Name",
            align: "start",
            sortable: true,
            value: "customer_name",
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
            value: "payment_gateway",
          },
          {
            text: "Status",
            align: "start",
            sortable: true,
            value: "status",
          },
          {
            text: 'Last Activity',
            align: "start",
            sortable: true,
            value: "updated_at",
          },
          {
            text: 'Transaction ID',
            align: "start",
            sortable: true,
            value: "merchant_transaction_id",
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
      status(){
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
      paymentLink(key){
        var url = process.env.MIX_BASE_URL+'/invoice/'+key
        window.prompt("Terminal URL", url);
      },
      updatePaymentStatus(item){
        this.statusChangePopup = true
        this.popForm.merchant_transaction_id = ''
        this.popForm.failed_reason = ''
        this.popForm.status = item.status
        this.popForm.payment_id = item.id
      },
      async updatePaymentStatusApi(){
        this.popForm.loading = true
        var formData = new FormData();
        formData.append('merchant_transaction_id', this.popForm.merchant_transaction_id)
        formData.append('status', this.popForm.status)
        formData.append('failed_reason', this.popForm.failed_reason)
        await otherrequestservice.post(`payments/c/${this.popForm.payment_id}/update-status`, formData)
        this.popForm.loading = false
        this.statusChangePopup = false
        this.getDataFromApi();
      },
      async recheckMerchantStatus(item){
        await otherrequestservice.post(`payments/c/${item.id}/recheck-merchant`).then(e=>{
          this.getDataFromApi();
        })
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
        query += "&user_id=" + this.user_id;
        query += "&brand_id=" + this.brand_id;
        if(this.payment_gateway>0){
          query += "&payment_gateway=" + this.payment_gateway;
        }
        if(parseInt(this.status)>=0){
          query += "&status=" + this.status;
        }
        return itemtypeservice.getlist(query);
      },
    },
  };
  </script>