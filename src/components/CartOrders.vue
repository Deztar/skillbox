<template>
	<div>
		<ul class="cart__orders">
			<li v-for="item of items" :key="item.productId" class="cart__order">
				<h3>{{ item.amount }} x {{ item.product.title }}</h3>
				<b>{{ (item.amount * item.product.price) | numberFormat }} ₽</b>
				<span>Артикул: {{ item.product.id }}</span>
			</li>
		</ul>
		<div class="cart__total">
			<p>Доставка: <b>500 ₽</b></p>
			<p>
				Итого: <b>{{ totalAmount }}</b> товар{{
					declOfNum(totalAmount, ['', 'а', 'ов'])
				}}
				на сумму <b>{{ totalPrice | numberFormat }} ₽</b>
			</p>
		</div>
	</div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import declOfNum from '@/helpers/declOfNum';

export default {
	props: ['items', 'totalAmount', 'totalPrice'],
	filters: {
		numberFormat,
	},
	methods: {
		declOfNum,
	},
};
</script>
