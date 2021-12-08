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

			<h1 class="content__title" v-if="orderLoaded">
				Заказ оформлен <span>№ {{ orderInfo.id }}</span>
			</h1>
		</div>

		<section class="cart" v-if="orderLoaded">
			<form class="cart__form form" action="#" method="POST">
				<div class="cart__field">
					<p class="cart__message">
						Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
						письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
						в&nbsp;течение часа для уточнения деталей доставки.
					</p>

					<ul v-if="orderLoaded" class="dictionary">
						<li class="dictionary__item">
							<span class="dictionary__key"> Получатель </span>
							<span class="dictionary__value">{{ orderInfo.name }}</span>
						</li>
						<li class="dictionary__item">
							<span class="dictionary__key"> Адрес доставки </span>
							<span class="dictionary__value">{{ orderInfo.address }}</span>
						</li>
						<li class="dictionary__item">
							<span class="dictionary__key"> Телефон </span>
							<span class="dictionary__value">{{ orderInfo.phone }}</span>
						</li>
						<li class="dictionary__item">
							<span class="dictionary__key"> Email </span>
							<span class="dictionary__value">{{ orderInfo.email }}</span>
						</li>
						<li class="dictionary__item">
							<span class="dictionary__key"> Способ оплаты </span>
							<span class="dictionary__value"> картой при получении </span>
						</li>
					</ul>
				</div>

				<div class="cart__block">
					<cart-orders
						v-if="orderLoaded"
						:items="$store.getters.orderProducts"
						:totalAmount="$store.getters.orderTotalProductAmount"
						:totalPrice="$store.state.orderInfo.totalPrice"
					></cart-orders>
				</div>
			</form>
		</section>
		<div v-else>
			<img
				src="https://c.tenor.com/hQz0Kl373E8AAAAi/loading-waiting.gif"
				width="100"
				height="100"
			/>
		</div>
	</main>
</template>

<script>
import CartOrders from '@/components/CartOrders.vue';

export default {
	components: {
		CartOrders,
	},
	data() {
		return {
			orderLoaded: false,
		};
	},
	computed: {
		orderInfo() {
			return this.$store.state.orderInfo;
		},
	},
	created() {
		const { orderInfo } = this.$store.state;
		if (orderInfo && orderInfo.id === this.$route.params.id) {
			this.orderLoaded = true;
			return;
		}
		this.$store.dispatch('loadOrderInfo', this.$route.params.id).then(() => {
			this.orderLoaded = true;
		});
	},
};
</script>
