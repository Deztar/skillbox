<template>
	<base-form-field :title="title" :error="error">
		<input
			v-model="dataValue"
			class="form__input"
			:type="type"
			:placeholder="placeholder"
		/>
	</base-form-field>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
	mixins: [formFieldMixin],
	props: {
		type: {
			default: 'text',
		},
	},
};
</script>
