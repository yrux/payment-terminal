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
        show-select
        class="elevation-1"
        item-key="id"
        :single-select="false"
        v-model="selected"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item.image_url="{ item }">
          <v-img
              :lazy-src="item.image_url"
              max-height="100"
              max-width="100"
              :src="item.image_url"
          ></v-img>
        </template>
      </v-data-table>
    </div>
  </template>
  <script>
  import Swal from "sweetalert2";
  import service from "@services/auth/default";
  const brandservice = new service('brands')
  const countryservice = new service('brief-forms')
  import otherrequestservice from "@services/auth/otherrequests";
  export default {
    name: "auth.countries.assign",
    data() {
      return {
        search: "",
        selected: [],
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
          },
          {
            text: "Assign",
            to: { name: "auth.briefforms.assign" },
            disabled: true,
            exact: true,
          },
        ],
        items: [],
        loading: true,
        totalRecords: 0,
        options: {

        },
        headers: [
            {
                text: "ID",
                align: "start",
                sortable: true,
                value: "id",
            },
            {
                text: "Image",
                align: "start",
                sortable: true,
                value: "image_url",
            },
            {
                text: "Name",
                align: "start",
                sortable: true,
                value: "name",
            },
            {
                text: "URL",
                align: "start",
                sortable: true,
                value: "url",
            },
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
    },
    async mounted() {
        await countryservice.get(this.$route.params.id).then(e=>{
            this.selected = e.brands
            // .map(e=>{
            //     return e.id
            // })
        })
        this.getDataFromApi();
    },
    methods: {
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
        return brandservice.getlist(query);
      },
    },
    watch: {
      options: {
        handler() {
          this.getDataFromApi();
        },
        deep: true,
      },
      search() {
        this.getDataFromApi();
      },
      selected(){
        // if(this.selected.length>0)
        // {
            const formData = new FormData();
            for(let i = 0; i < this.selected.length; i++){
                formData.append('products['+i+']', this.selected[i].id)
            }
            otherrequestservice.post(`brief-forms/assign/${this.$route.params.id}`, formData).then(e => e.data)
        // }
      }
    },
  };
  </script>