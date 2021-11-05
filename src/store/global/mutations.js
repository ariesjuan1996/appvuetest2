/*=========================================================================================
  File Name: moduleTodoMutations.js
  Description: Todo Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Version: 1.1
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
	
	LOADEROPENORCLOSE(state) {
    state.loader= !state.loader;
	},
	OPENORCLOSEMENU(state,payload) {
    state.openMenu= payload;
  },
	OPENORCLOSBUTTONFLOTANTE(state,payload) {
    state.mostrarButtomFlotante= payload;
  },
  UPDATEVALUE(state,payload) {
    state.valueSearch= payload;
  },
  ADDDATASTORE(state,payload) {
    state.dataStore= payload;
  },
  SELECCIONAR_DIRECCION_PREFERIDA(state,payload) {
    state.direccionPreferida= payload;
  },
  SELECCIONAR_PROCESOS(state,payload) {
    state.tabProcesos= payload;
  },
  SET_TOOGLE_ADMIN(state,payload) {
    state.toogleAdmin= payload;
  },
  SET_EDITCRUDT(state,payload) {
    state.editCrud= payload;
  },
  ADD_IMAGE(state,payload) {
    state.imagesList.push(payload);
  },
  SET_POSITION_IMAGES(state,payload) {
    state.imagesList=state.imagesList.filter((value)=>{
      return value!=payload.value;
    });
    state.imagesList.splice(payload.key,1,payload.value);
  },
  SET_IMAGES(state,payload) {
    state.imagesList=payload
  },
  REMOVE_IMAGE_INDEX(state,payload) {
    state.imagesList=state.imagesList.filter((value,index)=>{
      return index!=payload;
    });
  }
}
