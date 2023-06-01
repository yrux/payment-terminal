<template>
    <div>
        <v-row>
            <v-col cols="4">
                <v-date-picker full-width @change="getTargets" v-model="picker" type="month"></v-date-picker>
            </v-col>
            <v-col cols="8">
                <v-col v-if="buhHasTarget" cols="12">
                    <v-chip class="ma-2" color="green" text-color="white">
                        <strong>${{ targetLeftToAssign }}</strong> <span class="ml-3">Target Left to Assign/Left for you</span>
                    </v-chip>
                </v-col>
                <v-col v-else>
                    <v-chip class="ma-2" color="red" text-color="white">
                        Target Not Yet Assigned to you
                    </v-chip>
                </v-col>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Name
                                </th>
                                <th class="text-left">
                                    Target
                                </th>
                                <th class="text-left">
                                    Achieved
                                </th>
                                <th class="text-left">
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="!loader">
                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.name }}</td>
                                <td>{{ user.target? user.target.amount: 0 }}</td>
                                <td>{{ user.achieved }}</td>
                                <td>
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" color="info" fab x-small dark @click="assignTarget(user.id)">
                                            <v-icon>mdi-target</v-icon>
                                        </v-btn>
                                        </template>
                                        <span>Assign/Update Target</span>
                                    </v-tooltip>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr v-for="k in 10" :key="k">
                                <td class="pa-0" colspan="3">
                                    <v-skeleton-loader type="list-item"></v-skeleton-loader>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-row v-if="showForm">
                    <v-col cols="12">
                        <v-divider></v-divider>
                    </v-col>
                    <v-col cols="6">
                        <v-select
                            :items="users"
                            item-text="name"
                            item-value="id"
                            label="User"
                            required
                            v-model="selectUserId"
                        ></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field type="number" v-model="target" step="any" label="Input Target Amount $"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn :loading="targetSaving" :disabled="targetSaving" @click="assignTargetRequest" color="teal" elevation="1" large raised block >
                            Assign Target
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import otherrequestservice from "@services/auth/otherrequests";
export default {
    name: "auth.usertargets.buh",
    watch: {
    },
    computed:{
        buhHasTarget(){
            if(this.currentBuhTarget?.id){
                return true
            }
            return false
        }
    },
    data() {
        return {
            picker: '',
            users: [],
            loader: false,
            selectUserId: 0,
            target: 0,
            showForm: false,
            targetSaving: false,
            currentBuhTarget: {},
            targetLeftToAssign: 0,
        }
    },
    mounted() {
        var date = new Date()
        var month = (date.getMonth() + 1);
        month = (month < 10) ? ('0' + month) : month
        this.picker = date.getFullYear() + '-' + month
        this.getTargets()
    },
    methods: {
        async getTargets() {
            this.loader = true
            this.showForm = false
            var date = this.picker + '-01';
            var formData = new FormData()
            formData.append('role_id', 3)
            formData.append('date', date)
            await otherrequestservice.post(`user-targets`, formData).then(e => e.data).then(e => {
                this.users = e.users
                this.currentBuhTarget = e.currentBuhTarget
                this.targetLeftToAssign = e.targetLeftToAssign
            })
            this.loader = false
        },
        assignTarget(uid){
            if(this.buhHasTarget){
                this.showForm = true
                this.selectUserId = uid
            }else{
                this.$store.commit("setNotification", 'Target has not been assigned to you by Admin, Please wait for Admin to assign the target on you');
            }
        },
        async assignTargetRequest(){
            this.targetSaving = true
            var date = this.picker + '-01';
            var formData = new FormData()
            formData.append('role_id', 3)
            formData.append('user_id', this.selectUserId)
            formData.append('for_month', date)
            formData.append('amount', this.target)
            await otherrequestservice.post(`set-targets`, formData).then(e => e.data)
            this.targetSaving = false
            this.getTargets()
        }
    }
}
</script>