<template>
	<li class="cart__item product">
		<div class="product__pic">
			<img
				:src="item.product.image"
				width="120"
				height="120"
				:alt="item.product.title"
			/>
		</div>
		<h3 class="product__title">
			{{ item.product.title }}
		</h3>
		<span class="product__code"> Артикул: {{ item.product.id }} </span>

		<product-amount
			class="product__counter"
			:icon-size="10"
			v-model.number="amount"
		></product-amount>

		<b class="product__price">
			{{ (item.amount * item.product.price) | numberFormat }} ₽
		</b>

		<button
			class="product__del button-del"
			type="button"
			aria-label="Удалить товар из корзины"
			@click.prevent="deleteProduct(item.product.id)"
		>
			<svg width="20" height="20" fill="currentColor">
				<use xlink:href="#icon-close"></use>
			</svg>
		</button>
	</li>
</template>

<script>
import { mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import ProductAmount from './ProductAmount.vue';

export default {
	components: { ProductAmount },
	props: ['item'],
	computed: {
		amount: {
			get() {
				return this.item.amount;
			},
			set(value) {
				this.$store.dispatch('updateCartProductAmount', {
					productId: this.item.productId,
					amount: value,
				});
			},
		},
	},
	methods: {
		...mapActions({ deleteProduct: 'deleteCartProduct' }),
	},
	filters: {
		numberFormat,
	},
};
</script>

<style>
.product__del {
	cursor: pointer;
}
</style>
