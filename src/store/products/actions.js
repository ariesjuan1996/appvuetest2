
export default {
	ADD_PARENTCATEGORIESANDPRODUCTS({ commit }, payload) {

		commit('ADD_PARENTCATEGORIESANDPRODUCTS', payload);
	},
	
	AGREGAR_CATEGORIASHIJOS({ commit }, payload) {
		commit('AGREGAR_CATEGORIASHIJOS', payload);
	},
	ANADIRITEMCARD({ commit }, payload) {
	
		commit('ADD_CARITEM', payload);
	},
	ANADIRPRODUCTO({ commit }, payload) {
		commit('ANADIR_PRODUCTO', payload);
	},


	ADD_PRODUCTSELECT({ commit }, payload) {
		commit('ADD_PRODUCTSELECT', payload);
	},
	REMOVE_CARITEM({ commit }, payload) {
		console.log("REMOVE_CARITEM");
		commit('REMOVE_CARITEM', payload);
	},

	//ACTUAL REALIZADO CARRITO
	SET_PRODUCTO({ commit }, payload) {
		commit('SET_PRODUCTO', payload);
	},
	SUMARCANTIDADPRODUCTO({ commit }, payload) {
		commit('SUMAR_CANTIDAD_PRODUCTO', payload);
	},
	EDITARCANTIDADPRODUCTO({ commit }, payload) {
		commit('EDITAR_CANTIDAD_PRODUCTO', payload);
	},
	ONFOCUS({ commit }, payload) {
		commit('ONFOCUS', payload);
	},
	EDITARCANTIDADPRODUCTOPAYLOAD({ commit }, payload) {
		
		commit('EDITAR_CANTIDAD_PRODUCTOPAYLOAD', payload);

	},
	ELIMINAR_ITEMCARRITO({ commit }, payload) {
		
		commit('ELIMINAR_ITEMCARRITO', payload);
	},
	
}
