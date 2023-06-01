const { createApp } = Vue
// const apiUrl = 'http://localhost:8000/feedbackform';
const apiUrl = 'https://payment.secure-terminal.com/feedbackform';


const app = createApp({
	data() {
		return {
			chatOpen: false,
		}
	},
	methods: {
		maintainChatStatus(chatOpen) {
			this.chatOpen = chatOpen
		},
	},
	mounted() {
		setInterval(() => {
			var data = {
				width: (document.getElementsByClassName('chat-popup')[0].clientWidth + 35),
				height: (app.height = document.getElementsByClassName('chat-popup')[0].clientHeight + 28),
				chatOpen: this.chatOpen,
				btnHeight: (app.height = document.getElementsByClassName('open-button')[0].clientHeight + 30),
				btnWidth: (app.height = document.getElementsByClassName('open-button')[0].clientWidth + 35),
			}
			var event = new CustomEvent('cieloChatDimensions', { detail: data })
			window.parent.document.dispatchEvent(event)
		})
	}
})
app.component(
	'chatStep2',
	{
		data() {
			return {
				ticket: '',
				form: {
					name: '',
					email: '',
					message: '',
				},
				errors: {
					name: [],
					email: [],
					message: [],
					
					ticket: [],
				},
				hasError: false,
				resolutions: {
					'Warranty Claim': 1,
					'Tech Support': 2,
					'Parts': 3,
				}
			}
		},
		methods: {
			async goNext() {
				if (this.selection != 'Follow Up') {
					let resolution = this.resolutions[this.selection]
					const body = this.form
					body.resolution = resolution
                    
					await fetch(apiUrl, {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(body)
					}).then(e => e.json()).then(e => {
						if (e.errors) {
							this.hasError = true
							if (e.errors.name) {
								this.errors.name = e.errors.name
							}
							
							if (e.errors.email) {
								this.errors.email = e.errors.email
							}
							if (e.errors.message) {
								this.errors.message = e.errors.message
							}
							
						} 
					})
					await this.$nextTick()
					if (this.hasError === false) {
						this.$emit('goNext')
					}
				}
				// else{
				// 	this.$emit('goNext')
				// }

				

			}
		},
		props: {
			step: {
				type: String,
				default: 'step2'
			},
			selection: {
				type: String,
				default: '',
			},
			baseUrl: {
				type: String,
				default: 'https://service.curtiscss.com',
			}
		},
		template: `
        <div v-if="selection!='Follow Up'&&selection!='Warranty Claim'&&selection!='Parts'" class="steps-wrapper">
            <label for="name"><b>Name</b></label>
            <input v-model="form.name" type="text" placeholder="Full Name" name="name" required />
			<span class="cielo-errors">{{errors.name.join(',')}}</span>
            <label for="email"><b>Email</b></label>
            <input v-model="form.email" type="text" placeholder="Email" name="email" required />
			<span class="cielo-errors">{{errors.email.join(',')}}</span>
            <label for="serial"><b>Serial#</b></label>
            <textarea class="message-field" v-model="form.message" type="text" placeholder="Message" name="message" required ></textarea>
			<span class="cielo-errors">{{errors.message.join(',')}}</span>
            <button @click="goNext()" type="button" class="btn">Submit</button>
        </div>
		
      `,
	}
)
app.component(
	'chatStep3',
	{
		data() {
			return {

			}
		},
		methods: {
			goNext() {
				this.$emit('goNext')
			}
		},
		props: {
			step: {
				type: String,
				default: 'step2'
			},
			selection: {
				type: String,
				default: '',
			},
			baseUrl: {
				type: String,
				default: '',
			}
		},
		template: `
        <div v-if="selection!='Follow Up'&&selection!='Tech Support'" class="steps-wrapper">
            <p>For us to help you better, please email the following information to - support@curtiscs.com</p>
        </div>
        <div v-if="selection=='Follow Up'" class="steps-wrapper">
            <p>To Track your progress against Ticket, please follow this link: <a :href="baseUrl" target="_blank">{{baseUrl}}</a></p>
        </div>
        <div v-if="selection=='Tech Support'" class="steps-wrapper">
            <p>Thank You! for your Input We will get back to you</p>
        </div>
      `,
	}
)
app.component(
	'chatPopupButton',
	{
		template: `
            <div class="cielo-chat-container">
                <button class="open-button" @click="openForm()">Feedback</button>
                <div class="chat-popup" id="myForm" :class="(chatOpened==true?'active':'')">
					<form class="form-container">                    
						<h1>Chat</h1>
						<label v-if="step=='step1'" for="msg"><b>Hi, Please what do you need today?</b></label>
						<ul v-if="step=='step1'">
							<li @click="updateSelection(selection)" v-for="(selection, selectionk) in selections" :key="selectionk">{{selection}}</li>
						</ul>
						<chat-step-2 @goFollowupNext="goFollowupNext" @goFollowupError="goFollowupError" :baseUrl="baseUrl" :selection="selection" @goNext="step='step3'" :step="step" v-if="step=='step2'"/>
						<chat-step-3 :baseUrl="ticket_followup_url" :selection="selection" :step="step" v-if="step=='step3'"/>
						<button type="button" class="btn cancel" @click="closeForm()" v-if="step!='step2'">Close</button>
						<button type="button" class="btn cancel" @click="back()" v-else>Back</button>
					</form>
                </div>
            </div>
        `,
		props: {
			baseUrl: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				chatOpened: false,
				selections: ['Tech Support'],
				selection: '',
				step: 'step1',
				ticket_followup_url: '',
			}
		},
		methods: {
			openForm() {
				this.chatOpened = true
				this.step = 'step1';
				this.selection = '';
				this.$emit('chatopened', this.chatOpened)
			},
			closeForm() {
				this.chatOpened = false
				this.$emit('chatopened', this.chatOpened)
			},
			updateSelection(selection) {
				this.selection = selection
				this.step = 'step2'
			},
			back() {
				this.step = 'step1'
			},
			goFollowupNext(ticket_id) {
				this.ticket_followup_url = this.baseUrl + '/ticket-activity/' + ticket_id
				this.step = 'step3'
			},
			goFollowupError() {
				this.step = 'followuperror'
			},
		}

	}
)
app.mount('#app')