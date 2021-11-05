
import { requestApi } from "@/api"
export default {
	LOADEROPENORCLOSE({ commit }) {
		commit('LOADEROPENORCLOSE');
	},
	OPENORCLOSEMENU({ commit },payload) {
		commit('OPENORCLOSEMENU',payload);
	},
	OPENORCLOSBUTTONFLOTANTE({ commit },payload) {
		commit('OPENORCLOSBUTTONFLOTANTE',payload);
	},
	UPDATEVALUE({ commit },payload) {
		commit('UPDATEVALUE',payload);
	},
	ADDDATASTORE({ commit },payload) {
		commit('ADDDATASTORE',payload);
	},
	//SELECCIONAR_PROCESOS
	SELECCIONARDIRECCIONPREFERIDA({ commit },payload) {
		commit('SELECCIONAR_DIRECCION_PREFERIDA',payload);
	},
	SELECCIONARPROCESOS({ commit },payload) {
		commit('SELECCIONAR_PROCESOS',payload);
	},
	//SELECCIONAR_DIRECCION_PREFERIDA
	SET_TOOGLE_ADMIN({ commit },payload) {
		commit('SET_TOOGLE_ADMIN',payload);
	},
	async CARGARPPAIS() {
        try {
			let respon=await requestApi(
				`ubicaciones/cargarPais`,
				{},
				"GET"
			);
			let opcionPaises=respon.data.estado ? respon.data.data : [];
			return  opcionPaises;
		} catch (error) {
			return [];
		}	
		
		
	},
	async CARGARNIVEL(commit,payload) {
        try {
			let respon=await requestApi(
				`ubicaciones/cargarUbigeoNivel?ubigeoPais=${payload.paisSeleccionado==null ? '' : payload.paisSeleccionado.codigoUbigeo  }&codigoUbigeo=${payload.codigoUbigeo==null ? '' : payload.codigoUbigeo}`,
				{},
				"GET"
			);
			let opcionPaises=respon.data.estado ? respon.data.data : [];
			return  opcionPaises;
		} catch (error) {
			return [];
		}	
		
		
	},
	async CARGARUBIGEONIVEL(commit,payload) {
        try {
			console.log("payload",payload);
			let respon=await requestApi(
				`ubicaciones/cargarNivelPais?ubigeoPais=${payload}`,
				{},
				"GET"
			);
			let opcionPaises=respon.data.estado ? respon.data.data : [];
			return  opcionPaises;
		} catch (error) {
			return [];
		}	
		
		
	}
}
