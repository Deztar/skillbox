<template>
	<router-link
		class="header__cart"
		aria-label="Корзина с товарами"
		:to="{ name: 'cart' }"
	>
		<svg width="30" height="21" fill="currentColor">
			<use xlink:href="#icon-cart"></use>
		</svg>
		<span class="header__count" aria-label="Количество товаров">
			<span v-show="!$store.state.isLoading">
				{{ $store.getters.cartTotalProductAmount }}
			</span>
			<span v-show="$store.state.isLoading">
				<img
					src="https://c.tenor.com/hQz0Kl373E8AAAAi/loading-waiting.gif"
					width="7"
					height="7"
				/>
			</span>
		</span>
	</router-link>
</template>
