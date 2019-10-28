Vue.config.devtools = true;

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
		premium: true,
		details: ["90% Satin", "5% Silk", "5% Gold"],
		cart: [],

	},
	methods: {
		addToCart(id) {
			this.cart.push(id);
		},
		removeFromCart(id) {
			let index = this.cart.indexOf(id);
			this.cart.splice(index, 1);
		},
		updateProduct(index) {
			this.selectedVariant = index;
		}
	},
});

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;