<template>
	<div>
		<v-row no-gutters class="pa-10 rounded elevation-10">
			<v-col cols="12" sm="12">
				<v-form ref="form" v-model="loading" lazy-validation>
					<v-row>
						<v-col cols="12" sm="12" class="pb-0">
							<v-text-field
								v-model="name"
								:rules="[rules.required]"
								:error-messages="errors.name"
								label="Full Name"
							></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" class="pb-0">
							<v-text-field
								v-model="email"
								:rules="[rules.required]"
								:error-messages="errors.email"
								label="Email"
							></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" class="pb-0">
							<v-text-field
								v-model="password"
								:error-messages="errors.password"
								label="Password"
								type="password"
								autocomplete="new-password"
							></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" class="pb-0">
							<v-file-input
								show-size
								v-model="image"
								:error-messages="errors.file"
								accept="image/png, image/jpeg, image/bmp"
								label="Title Image"
								:rules="[rules.required]"
								truncate-length="15"
							></v-file-input>
							<v-img
								:lazy-src="imageurl"
								max-height="100"
								max-width="150"
								contain
								:src="imageurl"
							></v-img>
						</v-col>
						<v-col cols="12" sm="12" class="pb-0">
							<v-btn
								color="secondary"
								elevation="1"
								large
								raised
								@click="addbrand"
								:loading="btnloading"
								:disabled="btnloading"
								>Save</v-btn
							>
						</v-col>
					</v-row>
				</v-form>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import loginservice from "@services/auth/login";
export default {
	name: "auth.company.edit",
	mounted() {
		this.startProfile();
	},
	methods: {
		async trackLocation(){

		},
		async startProfile() {
			this.id = this.$route.params.id;
			var res = await loginservice.me();
			this.name = res.name;
			this.email = res.email;
			this.password = "";
			this.imageurl = res.image_url;
		},
		resetError() {
			this.errors = {
				name: [],
				password: [],
				email: [],
				file: [],
			};
		},
		addbrand: async function () {
			this.resetError();
			if (this.$refs.form.validate()) {
				this.btnloading = true;
				var formdata = new FormData();
				formdata.append("name", this.name);
				formdata.append("email", this.email);
				if (this.password) {
					formdata.append("password", this.password);
				}
				if (this.image.size) {
					formdata.append("file", this.image);
				}
				this.btnloading = false;
				var res = await loginservice.updateProfile(formdata, this.id);
				if (!res.status) {
					if (res.data.name) {
						this.errors.name = res.data.name;
					}
					if (res.data.email) {
						this.errors.email = res.data.email;
					}
					if (res.data.password) {
						this.errors.password = res.data.password;
					}
					if (res.data.file) {
						this.errors.file = res.data.file;
					}
					//errors here
				} else {
					//suuccess here
					if (this.image.size) {
						var fileData = new FormData();
						fileData.append("ref_id", res.data.id);
						fileData.append("table_name", "users");
						fileData.append("type", "1");
						fileData.append("attachements[0]", this.image);
						// await fileservice.create(fileData);
					}
					this.startProfile();
				}
			}
		},
	},
	data() {
		return {
			name: "",
			id: 0,
			email: "",
			password: "",
			imageurl: "",
			errors: {
				name: [],
				email: [],
				password: [],
				file: [],
			},
			image: {},
			loading: false,
			btnloading: false,
			rules: {
				required: (value) => !!value || "Required.",
			},
		};
	},
};
</script>
