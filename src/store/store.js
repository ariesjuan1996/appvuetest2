import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import products from './products/index.js'
import global from './global/index.js'


export default new Vuex.Store({
	modules: {
		products: products,
		global:global
	},

	//strict: process.env.NODE_ENV !== 'production'
})
