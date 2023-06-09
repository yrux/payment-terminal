<template>
    <div>
        <v-row no-gutters>
            <v-breadcrumbs :items="bread">
                <template v-slot:divider>
                    <v-icon>mdi-forward</v-icon>
                </template>
            </v-breadcrumbs>
        </v-row>
        <v-data-table :headers="headers" :items="items" :options.sync="options" :server-items-length="totalRecords"
            :loading="loading" class="elevation-1">
            <template v-slot:top>
                <v-row class="mx-4">
                    <v-col>
                        <v-text-field v-model="search"
                            label="Search"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-select :items="paymentGateways" item-text="text" item-value="id" label="Merchant"
                            required v-model="payment_gateway"></v-select>
                    </v-col>
                </v-row>
            </template>
            <template v-slot:item.merchant_type="{ item }">
                <v-chip v-if="item.merchant_type == 1" class="ma-2" color="blue" text-color="white" small>
                    Authorize.net
                </v-chip>
                <v-chip v-if="item.merchant_type == 2" class="ma-2" color="green" text-color="white" small>
                    Stripe
                </v-chip>
                <v-chip v-if="item.merchant_type == 3" class="ma-2" color="pink" text-color="white" small>
                    Paypal
                </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn color="info" fab x-small dark :to="{ name: 'auth.merchants.edit', params: { id: item.id } }"
                    v-if="permissions.indexOf('merchants-edit') >= 0">
                    <v-icon>mdi-pencil-plus</v-icon>
                </v-btn>
                <v-btn v-if="permissions.indexOf('merchants-delete') >= 0" color="error" fab x-small dark
                    @click="deleteuser(item.id)">
                    <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import Swal from "sweetalert2";
import service from "@services/auth/default";
const itemtypeservice = new service('merchants')
export default {
    name: "auth.merchants.listing",
    data() {
        return {
            search: "",
            payment_gateway: 0,
            bread: [
                {
                    text: "Dashboard",
                    to: { name: "auth.dashboard" },
                    disabled: false,
                    exact: true,
                },
                {
                    text: "Merchants",
                    to: { name: "auth.merchants.listing" },
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
                    text: "Merchant",
                    align: "start",
                    sortable: true,
                    value: "merchant_type",
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
        payment_gateway(){
            this.getDataFromApi();
        },
    },
    async mounted() {
        this.getDataFromApi();
    },
    computed: {
        paymentGateways() {
            return [{ id: 0, text: 'All' }, ...this.$store.getters.paymentGateways];
        },
        permissions() {
            return this.$store.getters.getPermissions;
        },
    },
    methods: {
        paymentLink(key) {
            var url = process.env.MIX_BASE_URL + '/payment/' + key
            window.prompt("Terminal URL", url);
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
            if(this.payment_gateway>0){
                query += "&merchant_type=" + this.payment_gateway;
            }
            return itemtypeservice.getlist(query);
        },
    },
};
</script>