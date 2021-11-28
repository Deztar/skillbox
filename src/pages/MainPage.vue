<template>
	<main class="content container">
		<div class="content__top content__top--catalog">
			<h1 class="content__title">Каталог</h1>
			<span class="content__info">
				{{ countProducts }} товар{{ declOfNum(countProducts, ['', 'а', 'ов']) }}
			</span>
		</div>

		<div class="content__catalog">
			<product-filter
				:priceFrom.sync="filterPriceFrom"
				:priceTo.sync="filterPriceTo"
				:categoryId.sync="filterCategoryId"
				:color.sync="filterColor"
			></product-filter>
			<div v-if="productsLoading">Загрузка товаров...</div>
			<div v-if="productsLoadingFailed">
				Произошла ошибка при загрузке товаров.
				<button @click.prevent="loadProducts">Попробовать еще раз</button>
			</div>
			<section class="catalog">
				<product-list :products="products"></product-list>
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
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import BasePagnation from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import declOfNum from '@/helpers/declOfNum';
import { API_BASE_URL } from '@/config/';

export default {
	components: {
		ProductList,
		BasePagnation,
		ProductFilter,
	},
	data() {
		return {
			page: 1,
			productsPerPage: 6,

			productsData: null,
			productsLoading: false,
			productsLoadingFailed: false,

			filterPriceFrom: 0,
			filterPriceTo: 0,
			filterCategoryId: 0,
			filterColor: 0,
		};
	},
	computed: {
		products() {
			if (this.productsData) {
				return this.productsData.items.map((product) => ({
					...product,
					image: product.image.file.url,
				}));
			}
			return [];
		},
		countProducts() {
			return this.productsData ? this.productsData.pagination.total : 0;
		},
	},
	watch: {
		page() {
			this.loadProducts();
		},
		filterPriceFrom() {
			this.filterChange();
		},
		filterPriceTo() {
			this.filterChange();
		},
		filterCategoryId() {
			this.filterChange();
		},
		filterColor() {
			this.filterChange();
		},
	},
	methods: {
		declOfNum,
		filterChange() {
			this.page = 1;
			this.loadProducts();
		},
		loadProducts() {
			this.productsLoading = true;
			this.productsLoadingFailed = false;
			clearTimeout(this.loadProductsTimer);
			this.loadProductsTimer = setTimeout(() => {
				axios
					.get(`${API_BASE_URL}/api/products`, {
						params: {
							page: this.page,
							limit: this.productsPerPage,
							categoryId: this.filterCategoryId,
							minPrice: this.filterPriceFrom,
							maxPrice: this.filterPriceTo,
							colorId: this.filterColor,
						},
					})
					.then((response) => {
						this.productsData = response.data;
					})
					.catch(() => {
						this.productsLoadingFailed = true;
					})
					.then(() => {
						this.productsLoading = false;
					});
			}, 0);
		},
	},
	created() {
		this.loadProducts();
	},
};
</script>
