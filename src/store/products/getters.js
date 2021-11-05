
export default {
	categoriayHijos: state => state.categoriayHijos,
	productFilter: (state) => {
		return state.products;
	},
	listCarProduct: () => { 
		return localStorage.getItem('cats') ? JSON.parse(localStorage.getItem('cats')) :[] ;
	},
	productsCar: () => { 
		return localStorage.getItem('cats') ? JSON.parse(localStorage.getItem('cats')) :[] ;
	},
	getProductSelectWatch: (state) => { 
		return state.productSelectWatch;
	},
	productosDisponibles: (state) => { 
		return state.productosDisponibles;
	},
	actualizarCarrito: (state) => { 
		return state.actualizarCarrito;
	},
}

