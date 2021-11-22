<template>
	<li class="catalog__item">
		<a
			class="catalog__pic"
			href="#"
			@click.prevent="gotoPage('product', { id: product.id })"
		>
			<img :src="product.image" :alt="product.title" />
		</a>

		<h3 class="catalog__title">
			<a href="#"> {{ product.title }} </a>
		</h3>

		<span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

		<ul class="colors colors--black">
			<li class="colors__item" v-for="color in product.colors" :key="color">
				<label class="colors__label">
					<input
						class="colors__radio sr-only"
						type="radio"
						:value="color"
						v-model="currentColor"
					/>
					<span
						class="colors__value"
						:style="{ 'background-color': color }"
						:class="{ 'dim-border': color.toLowerCase() === '#fff' }"
					>
					</span>
				</label>
			</li>
		</ul>
	</li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
	props: ['product'],
	data() {
		return {
			currentColor: this.product.colors[0],
		};
	},
	methods: {
		gotoPage,
	},
	filters: {
		numberFormat,
	},
};
</script>

<style>
.colors__value.dim-border {
	border: 1px solid #e0e0e0;
}
</style>
