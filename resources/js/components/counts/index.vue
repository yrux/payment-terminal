<template>
    <div>
        <v-sheet v-if="loading" :color="`lighten-5`" class="pa-3">
            <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
        </v-sheet>
        <v-card v-else class="mx-auto">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h5">
                        {{title}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-card-text>
                <v-row align="center">
                    <v-col class="text-h3" cols="12">
                        {{count}}
                    </v-col>
                    <!-- <v-col cols="6">
                        <v-icon v-if="icon!=''" color="indigo" size="55"> {{icon}} </v-icon>
                    </v-col> -->
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() { },
    props: {
        title: {
            type: String,
            default: "",
        },
        loading: {
            type: Boolean,
            default: true,
        },
        'count': null
    },
    computed: {

    }
};
</script>