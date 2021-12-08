<template>
	<main class="content container">
		<div class="content__top">
			<ul class="breadcrumbs">
				<li class="breadcrumbs__item">
					<a class="breadcrumbs__link" href="index.html"> Каталог </a>
				</li>
				<li class="breadcrumbs__item">
					<a class="breadcrumbs__link" href="cart.html"> Корзина </a>
				</li>
				<li class="breadcrumbs__item">
					<a class="breadcrumbs__link"> Оформление заказа </a>
				</li>
			</ul>

			<h1 class="content__title">Корзина</h1>
			<span class="content__info"> 3 товара </span>
		</div>

		<section class="cart">
			<form
				class="cart__form form"
				action="#"
				method="POST"
				@submit.prevent="order"
			>
				<div class="cart__field">
					<div class="cart__data">
						<base-form-text
							v-model="formData.name"
							:error="formError.name"
							title="ФИО"
							placeholder="Введите ваше полное имя"
						/>
						<base-form-text
							v-model="formData.address"
							:error="formError.address"
							title="Адрес доставки"
							placeholder="Введите ваш адрес"
						/>
						<base-form-text
							v-model="formData.phone"
							:error="formError.phone"
							type="tel"
							title="Телефон"
							placeholder="Введите ваш телефон"
						/>
						<base-form-text
							v-model="formData.email"
							:error="formError.email"
							type="email"
							title="Email"
							placeholder="Введи ваш Email"
						/>
						<base-form-textarea
							v-model="formData.comment"
							:error="formError.comment"
							title="Комментарий к заказу"
							placeholder="Ваши пожелания"
						/>
					</div>

					<div class="cart__options">
						<h3 class="cart__title">Доставка</h3>
						<ul class="cart__options options">
							<li class="options__item">
								<label class="options__label">
									<input
										class="options__radio sr-only"
										type="radio"
										name="delivery"
										value="0"
										checked=""
									/>
									<span class="options__value">
										Самовывоз <b>бесплатно</b>
									</span>
								</label>
							</li>
							<li class="options__item">
								<label class="options__label">
									<input
										class="options__radio sr-only"
										type="radio"
										name="delivery"
										value="500"
									/>
									<span class="options__value"> Курьером <b>500 ₽</b> </span>
								</label>
							</li>
						</ul>

						<h3 class="cart__title">Оплата</h3>
						<ul class="cart__options options">
							<li class="options__item">
								<label class="options__label">
									<input
										class="options__radio sr-only"
										type="radio"
										name="pay"
										value="card"
									/>
									<span class="options__value"> Картой при получении </span>
								</label>
							</li>
							<li class="options__item">
								<label class="options__label">
									<input
										class="options__radio sr-only"
										type="radio"
										name="pay"
										value="cash"
									/>
									<span class="options__value"> Наличными при получении </span>
								</label>
							</li>
						</ul>
					</div>
				</div>

				<div class="cart__block">
					<cart-orders
						:items="$store.getters.cartDetailProducts"
						:totalAmount="$store.getters.cartTotalProductAmount"
						:totalPrice="$store.getters.cartTotalPrice"
					></cart-orders>

					<button
						v-if="!orderLoading"
						class="cart__button button button--primery"
						type="submit"
					>
						Оформить заказ
					</button>
					<div v-else>
						<img
							style="margin-top: 20px"
							src="https://c.tenor.com/hQz0Kl373E8AAAAi/loading-waiting.gif"
							width="63"
							height="63"
						/>
					</div>
				</div>
				<div v-if="formErrorMessage" class="cart__error form__error-block">
					<h4>Заявка не отправлена!</h4>
					<p>
						{{ formErrorMessage }}
					</p>
				</div>
			</form>
		</section>
	</main>
</template>

<script>
import axios from 'axios';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import CartOrders from '../components/CartOrders.vue';
import { API_BASE_URL } from '@/config';

export default {
	name: 'OrderPage',
	components: {
		BaseFormText,
		BaseFormTextarea,
		CartOrders,
	},
	data() {
		return {
			formData: {
				name: 'Ivan',
				address: 'Moscow',
				phone: '+74991234567',
				email: 'ivan@google.com',
			},
			formError: {},
			formErrorMessage: '',
			orderLoading: false,
		};
	},
	methods: {
		order() {
			this.formError = {};
			this.formErrorMessage = '';
			this.orderLoading = true;
			setTimeout(() => {
				axios
					.post(
						`${API_BASE_URL}/api/orders`,
						{
							...this.formData,
						},
						{
							params: {
								userAccessKey: this.$store.state.userAccessKey,
							},
						}
					)
					.then((response) => {
						this.$store.commit('resetCart');
						this.$store.commit('updateOrderInfo', response.data);
						this.$router.push({
							name: 'orderInfo',
							params: { id: response.data.id },
						});
					})
					.catch((error) => {
						this.formError = error.response.data.error.request || {};
						this.formErrorMessage = error.response.data.error.message;
					})
					.then(() => {
						this.orderLoading = false;
					});
			}, 1000);
		},
	},
};
</script>
