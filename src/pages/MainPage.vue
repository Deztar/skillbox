<template>
	<main class="content container">
		<div class="content__top content__top--catalog">
			<h1 class="content__title">Каталог</h1>
			<span class="content__info"> 152 товара </span>
		</div>

		<div class="content__catalog">
			<product-filter
				:priceFrom.sync="filterPriceFrom"
				:priceTo.sync="filterPriceTo"
				:categoryId.sync="filterCategoryId"
				:color.sync="filterColor"
			></product-filter>
			<section class="catalog">
				<product-list
					:products="products"
				></product-list>
				<base-pagnation
					v-model="page"
					:count="countProducts"
					:per-page="productsPerPage"
				></base-pagnation>
			</section>
		</div>
	</main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagnation from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
	components: {
		ProductList,
		BasePagnation,
		ProductFilter,
	},
	data() {
		return {
			page: 1,
			productsPerPage: 3,
			filterPriceFrom: 0,
			filterPriceTo: 0,
			filterCategoryId: 0,
			filterColor: 0,
		};
	},
	computed: {
		filteredProducts() {
			let filteredProducts = products;
			if (this.filterPriceFrom > 0) {
				filteredProducts = filteredProducts.filter(
					(product) => product.price >= this.filterPriceFrom
				);
			}
			if (this.filterPriceTo > 0) {
				filteredProducts = filteredProducts.filter(
					(product) => product.price <= this.filterPriceTo
				);
			}
			if (this.filterCategoryId) {
				filteredProducts = filteredProducts.filter(
					(product) => product.categoryId === this.filterCategoryId
				);
			}
			if (this.filterColor) {
				filteredProducts = filteredProducts.filter((product) =>
					product.colors.includes(this.filterColor)
				);
			}
			return filteredProducts;
		},
		products() {
			const offset = (this.page - 1) * this.productsPerPage;
			return this.filteredProducts.slice(offset, offset + this.productsPerPage);
		},
		countProducts() {
			return this.filteredProducts.length;
		},
	},
	watch: {
		filteredProducts() {
			this.page = 1;
		},
	},
};
</script>
