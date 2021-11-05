export default {
	getOpenMenu: (state) => {
		return state.openMenu;
	},
	getDireccionPreferida: (state) => {
		return state.direccionPreferida;
	},
	getMostrarButtomFlotante: (state) => {
		return state.mostrarButtomFlotante;
	},
	getLoader: (state) => {
		return state.loader;
	},
	getDataStore: (state) => {
		return state.dataStore;
	},
	getToogleAdmin:(state)=>{
		return state.toogleAdmin;
	}//editCrud
	,
	getEditCrud:(state)=>{
		return state.editCrud;
	}
}

