<template>
	<div class="form__counter">
		<button
			type="button"
			aria-label="Убрать один товар"
			@click.prevent="updateAmount(+amount - 1)"
		>
			<svg :width="iconSize" :height="iconSize" fill="currentColor">
				<use xlink:href="#icon-minus"></use>
			</svg>
		</button>

		<input
			type="text"
			:value="amount"
			@input="updateAmount(+$event.target.value)"
			name="count"
		/>

		<button
			type="button"
			aria-label="Добавить один товар"
			@click.prevent="updateAmount(+amount + 1)"
		>
			<svg :width="iconSize" :height="iconSize" fill="currentColor">
				<use xlink:href="#icon-plus"></use>
			</svg>
		</button>
	</div>
</template>

<script>
export default {
	model: {
		prop: 'amount',
		event: 'amount-change',
	},
	props: {
		amount: null,
		iconSize: { default: 12 },
	},
	methods: {
		updateAmount(value) {
			if (value >= 0) {
				this.$emit('amount-change', value);
			} else {
				if (Number.isNaN(value)) this.$emit('amount-change', 0);
				this.$forceUpdate();
			}
		},
	},
};
</script>

<style>
.form__counter button {
	cursor: pointer;
}
</style>
