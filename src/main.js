import Vue from 'vue';
import App from './App.vue';

import { string1, string2 } from './data';
import { displayMessage } from './func';

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App),
}).$mount('#app');

displayMessage(string1);
displayMessage(string2);
