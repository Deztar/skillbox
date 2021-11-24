import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import { string1, string2 } from './data';
// import { displayMessage } from './func';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');

// displayMessage(string1);
// displayMessage(string2);
