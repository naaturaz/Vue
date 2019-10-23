Vue.config.devtools = true;

Vue.component('product-review', {
	template: `
		<form class="review-form" @submit.prevent="onSubmit">
		
			<p v-if="errors.length">
				<b>Please correct:</b>
				<ul>
					<li v-for="error in errors">{{ error }}</li>
				</ul>
			</p>

			<p>
				<label for="name">Name:</label>
				<input id="name" v-model="name">
			</p>
		
			<p>
				<label for="review">Review:</label>
				<textarea id="review" v-model="review"></textarea>
			</p>
		
			<p>
				<label for="rating">Rating:</label>
				<select id="rating" v-model.number="rating">
					<option>5</option>
					<option>4</option>
					<option>3</option>
					<option>2</option>
					<option>1</option>
				</select>
			</p>

			<p>
				<input type="submit" value="Submit">
			</p>
		
		</form>
	`,
	data () {
		return {
			 name: null,
			 review: null, 
			 rating: null,
			 errors: [],
		};
	},
	methods: {
		onSubmit() {
			if(this.name && this.review && this.rating) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating,
				};
				this.$emit('review-submitted', productReview);
				this.name = null;
				this.review = null;
				this.rating = null;
				this.errors = [];
			}
			else {
				if(!this.name) this.errors.push("Name is required");
				if(!this.review) this.errors.push("Review is required");
				if(!this.rating) this.errors.push("Rating is required");
			}
		}
	}
});

Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		},
		details: {
			default: ["80% cotton", "20% polyesters", "Gender-neutral"],
		},
	},
	template: `
	<div class="product">

		<div class="product-image">
			<img v-bind:src="image">
		</div>

		<div class="product-info">
			<h1>{{ title }}</h1>
			<p v-if="inventory > 10">In Stock</p>
			<p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
			<p v-else :class="{ textDecorationLineThrough : inventory == 0}">Ouf of Stock</p>

			<p style="height: 30px;" v-show="onSale">On Sale</p>
			<p style="height: 30px;" v-show="onSale">{{ onSaleDetails }}</p>

			<p>Shipping: {{ shipping }}</p>

			<ul>
				<li v-for="detail in details">{{ detail }}</li>
			</ul>

			<div v-for="(variant, index) in variants" 
				:key="variant.variantId"
				class="color-box"
				:style="{ backgroundColor: variant.variantColor }"
				@mouseover="updateProduct(index)">
			</div>

			<p>Sizes</p>
			<ul>
				<li v-for="size in sizes">{{ size }}</li>
			</ul>

			<button v-on:click="addToCart" 
				:disabled="inventory == 0"
				:class="{ disabledButton: inventory == 0 }"
				>Add to Cart</button>
			
			<button v-on:click="removeFromCart" :disabled="inventory == 0">Remove From Cart</button>

		</div>

		<a :href="href">Home</a>

		<div>
			<h2>Reviews</h2>
			<p v-if="!reviews.length">There are no reviews yet.</p>
			<ul>
				<li v-for="review in reviews">
					<p>Name: {{ review.name }}</p>
					<p>Review: {{ review.review }}</p>
					<p>Rating: {{ review.rating }}</p>
				</li>
			</ul>
		</div>

		<product-review @review-submitted="addReview"></product-review>

	</div>
	`,
	data () {
		return  {
			brand: "K Goods S",
			message: 'Hello Vue!',
			product: 'Kite',
			selectedVariant: 0,
			href: '#app',
			onSale: true,
			variants:[
				{
					variantId: 2234, 
					variantColor: "green",
					variantImage: './assets/vmSocks-green-onWhite.jpg',
					variantQuantity: 0, 
				},
				{
					variantId: 2235, 
					variantColor: "blue",
					variantImage: './assets/vmSocks-blue-onWhite.jpg',
					variantQuantity: 5, 
				},
			],
			sizes: ["7", "8", "9"],
			reviews: [],
		};
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.id);
		},
		removeFromCart() {
			this.$emit('remove-from-cart', this.id);
		},
		updateProduct(index) {
			this.selectedVariant = index;
		},
		addReview(productReview){
			this.reviews.push(productReview);
		}

	},
	computed: {
		title() {
			return this.brand + ' ' + this.product;
		},
		id () { 
			return this.variants[this.selectedVariant].variantId;
		},
		image () { 
			return this.variants[this.selectedVariant].variantImage;
		},
		inventory () {
			return this.variants[this.selectedVariant].variantQuantity;
		},
		onSaleAndQuantity() {
			return this.onSale && this.inventory > 0;
		},
		onSaleDetails () {
			return this.title + ' on Sale';
		},
		shipping() {
			if(this.premium)return "Free";
			return 2.99;
		}
	}

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