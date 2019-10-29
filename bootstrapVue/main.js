Vue.config.devtools = true;

// app.js
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './custom.scss';

Vue.use(BootstrapVue);


Vue.use(PortalVue);

Vue.component('mybreadcrumb', {
	template: `
	<b-breadcrumb :items="items">
		<li v-for="item in items"><a href="{{ item.href }}" >{{ item.text }}</a></li>
	</b-breadcrumb>
	`,
	data () {
		return {
			items: [
				{
				  text: 'Admin',
				  href: '#'
				},
				{
				  text: 'Manage',
				  href: '#'
				},
				{
				  text: 'Library',
				  active: true
				}
			]
		};
	},
});

var app = new Vue({
	el: '#app',
	data: {
		name: 'BootstrapVue',
		show: true
	},
	watch: {
		show(newVal) {
			console.log('Alert is now ' + (newVal ? 'visible' : 'hidden'))
		}
	},
	methods: {
		toggle() {
			console.log('Toggle button clicked')
			this.show = !this.show
		},
		dismissed() {
			console.log('Alert dismissed')
		}
	}
});

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;