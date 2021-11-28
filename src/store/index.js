import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config/';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		cartProducts: [],
		userAccessKey: null,
		cartProductsData: [],
		isLoading: false,
	},
	mutations: {
		updateCartProductAmount(state, { productId, amount }) {
			const item = state.cartProducts.find((a) => a.productId === productId);

			if (item) {
				item.amount = amount;
			}
		},
		updateUserAccessKey(state, accessKey) {
			state.userAccessKey = accessKey;
		},
		updateCartProductsData(state, items) {
			state.cartProductsData = items;
		},
		syncCartProducts(state) {
			state.cartProducts = state.cartProductsData.map((item) => ({
				productId: item.product.id,
				amount: item.quantity,
			}));
		},
		updateLoadingStatus(state, value) {
			state.isLoading = value;
		}
	},
	getters: {
		cartDetailProducts(state) {
			return state.cartProducts.map((item) => {
				const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);
				return {
					...item,
					product: {
						...product,
						image: product.image.file.url,
					}
				};
			});
		},
		cartTotalPrice(state, getters) {
			return getters.cartDetailProducts.reduce((acc, item) =>
				(item.product.price * item.amount) + acc, 0
			);
		},
		cartTotalProductAmount(state) {
			return state.cartProducts.reduce((acc, item) => item.amount + acc, 0);
		},
	},
	actions: {
		loadCart(context) {
			return axios
				.get(`${API_BASE_URL}/api/baskets`, {
					params: {
						userAccessKey: context.state.userAccessKey,
					}
				})
				.then((response) => {
					if (!context.state.userAccessKey) {
						localStorage.setItem('userAccessKey', response.data.user.accessKey);
						context.commit('updateUserAccessKey', response.data.user.accessKey);
					}
					context.commit('updateCartProductsData', response.data.items);
					context.commit('syncCartProducts');
				});
		},
		addProductToCart(context, { productId, amount }) {
			context.commit('updateLoadingStatus', true);
			return new Promise((resolve) => setTimeout(() => resolve(axios.post(`${API_BASE_URL}/api/baskets/products`, {
				productId,
				quantity: amount,
			},
				{ params: { userAccessKey: context.state.userAccessKey } })
				.then((response) => {
					context.commit('updateCartProductsData', response.data.items);
					context.commit('syncCartProducts');
				})
				.then(() => {
					context.commit('updateLoadingStatus', false);
				})), 1000));
		},
		updateCartProductAmount(context, { productId, amount }) {
			context.commit('updateCartProductAmount', { productId, amount });

			if (amount < 1) {
				return null;
			}

			return axios
				.put(`${API_BASE_URL}/api/baskets/products`, {
					productId,
					quantity: amount,
				}, { params: { userAccessKey: context.state.userAccessKey } })
				.then((response) => {
					context.commit('updateCartProductsData', response.data.items);
				})
				.catch(() => {
					context.commit('syncCartProducts');
				});
		},
		deleteCartProduct(context, productId) {
			console.log(productId);
			return axios
				.delete(`${API_BASE_URL}/api/baskets/products`, {
					params: { userAccessKey: context.state.userAccessKey },
					data: { productId, }
				})
				.then((response) => {
					context.commit('updateCartProductsData', response.data.items);
					context.commit('syncCartProducts');
				});
		}
	}
});
