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

	ADD_PARENTCATEGORIESANDPRODUCTS(state, payload) {
    state.parentCategoriesandProducts= payload;
    state.products=[];
    state.parentCategoriesandProducts.map((value)=>{
      let amountProduct=0;
      let addedProducts=localStorage.getItem('cats') ? JSON.parse(localStorage.getItem('cats')) :[] ;
      let tempProduct={};
      addedProducts.map((valueLocalStorage)=>{
        if(value.idProducto===valueLocalStorage.idProducto){
          amountProduct=valueLocalStorage.cantidadProducto;
        }
      });
      tempProduct=value;
      tempProduct.cantidadProducto=amountProduct;
      state.products.push(tempProduct);

    });

  },

  ADD_PRODUCTSELECT(state, payload) {
    const objetoClonado = Object.assign({}, payload);
		state.productSelectWatch= objetoClonado;
  },	
  AGREGAR_CATEGORIASHIJOS(state, payload) {
    state.categoriayHijos= payload;
    console.log("state.categoriayHijos",state.categoriayHijos);
  },	
  REMOVE_CARITEM( state,payload) {
    let listCar=localStorage.getItem('cats') ? JSON.parse(localStorage.getItem('cats')) :[] ;
    let removeElement=listCar.filter(item=> item.idProducto!=payload.idProducto);
    console.log("removeElement",removeElement);
    localStorage.setItem('cats',JSON.stringify(removeElement));
  },
  ADD_CARITEM( state,payload) {
  
    let listCar=localStorage.getItem('cats') ? JSON.parse(localStorage.getItem('cats')) :[] ;
    let band=false;
    let position=-1;
    listCar.map((value,index)=>{
      if(value.idProducto===payload.idProducto){
        band=true;
        position=index;
      }
    });
    if(!band){
       let itemData={};
       itemData.stockProducto=payload.otrosDetalles.stockProducto;
       itemData.idProducto=payload.idProducto;
       itemData.cantidadProducto=payload.cantidadProducto;
       itemData.nombreProducto=payload.otrosDetalles.nombreProducto;
       itemData.img=payload.otrosDetalles.img;
       itemData.marca=payload.otrosDetalles.marca;
       itemData.precioVenta=payload.otrosDetalles.precioVenta;
      // this.$store.dispatch("products/ADD_PRODUCTSELECT", itemData);
      let objetoClonado = Object.assign({}, itemData);
      state.productSelectWatch= objetoClonado;
      listCar.push(itemData);
     
    }else{
      if(payload.cantidadProducto>0){
        listCar[position].cantidadProducto=payload.cantidadProducto;
        let objetoClonado = Object.assign({}, listCar[position]);
        state.productSelectWatch= objetoClonado;
      }else{
        listCar.splice(position, 1);
      }
    }
    
    localStorage.setItem('cats',JSON.stringify(listCar));
    //state.productsCar=listCar;
  
    state.products=[];
    state.parentCategoriesandProducts.map((value)=>{
      let amountProduct=0;
      let addedProducts=localStorage.getItem('cats') ? JSON.parse(localStorage.getItem('cats')) :[] ;
      let tempProduct={};
      addedProducts.map((valueLocalStorage)=>{
        if(value.idProducto===valueLocalStorage.idProducto){
          amountProduct=valueLocalStorage.cantidadProducto;
        }
      });
      tempProduct=value;
      tempProduct.cantidadProducto=amountProduct;

      state.products.push(tempProduct);

    });
  },
  //MUTACION ACTUALIZADO
  SET_PRODUCTO(state, payload) {
    let productoAgregadosCarrito= payload;
    state.productosDisponibles=[];
    productoAgregadosCarrito.map((value)=>{
      let amountProduct=0;
      let productoAgregados=localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) :[] ;
      let tempProduct={};
      productoAgregados.map((valueLocalStorage)=>{
        if(value.id==valueLocalStorage.id){
          amountProduct=valueLocalStorage.cantidadProducto;
        }
      });
      tempProduct=value;
      tempProduct.cantidadProducto=amountProduct;
      state.productosDisponibles.push(tempProduct);
    });

  },
  CAMBIAR_CARRITO(state, payload) {
    state.actualizarCarrito=payload;
  },
  async ANADIR_PRODUCTO( state,payload) {
    let existeProducto=false;
    let productoAgregados=localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) :[] ;
    await state.productosDisponibles.forEach(async (value)=>{
      if(value.id==payload.id){
        //let existeProducto=false;
        productoAgregados.forEach((valueAgregado)=>{
           if(valueAgregado.id==payload.id){
            existeProducto=true;
            valueAgregado.cantidadProducto=1;
           }
        });
        if(!existeProducto){
          value.cantidadProducto=1;
        }
        
      }
    });
    if(!existeProducto){
     
     await productoAgregados.push({
         id:payload.id,
         cantidadProducto:1,
      });
    }
    await localStorage.setItem('carrito',JSON.stringify(productoAgregados));

    state.actualizarCarrito=true;
  },
  async SUMAR_CANTIDAD_PRODUCTO(state,payload){
    let notVer=false;
    await state.productosDisponibles.forEach(async (value)=>{
      if(value.id==payload.producto.id){
        let productoAgregados=localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) :[] ;
        let existeProducto=false;
        productoAgregados.forEach(async (valueAgregado)=>{
          if(valueAgregado.id==payload.producto.id){
            existeProducto=true;
            valueAgregado.id=payload.producto.id;
            if(parseFloat(value.stock)>=(parseFloat(value.cantidadProducto) +parseFloat(payload.cantidad)) ){
              valueAgregado.cantidadProducto= parseFloat(valueAgregado.cantidadProducto) +parseFloat(payload.cantidad);
            }
           }
        });
        if(!existeProducto){
          productoAgregados.push({
             id:payload.producto.id,
             cantidadProducto:parseFloat(payload.producto.cantidadProducto) +parseFloat(payload.cantidad),
          });
        }
        await localStorage.setItem('carrito',JSON.stringify(productoAgregados));
        if(parseFloat(value.stock)>=(parseFloat(value.cantidadProducto) +parseFloat(payload.cantidad)) ){  
          value.cantidadProducto=parseFloat(value.cantidadProducto) +parseFloat(payload.cantidad);
          if( value.cantidadProducto==0){
            let productoAgregados=localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) :[] ;
            productoAgregados=await productoAgregados.filter(  (valueFiltro)=>{
              return valueFiltro.cantidadProducto>0;
            });
            await localStorage.setItem('carrito',JSON.stringify(productoAgregados));

          }
        }else{
          value.cantidadProducto=parseFloat(value.stock);
        }

        value.editProducto=false;
      }
      notVer=true;
    });
   
    if(!notVer){
      console.log("payloadpayload",payload);
      let nuevaCantidad=parseFloat(payload.cantidad)+parseFloat(payload.producto.cantidadProducto);
      let productoAgregados=localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) :[] ;
      let tempCarrito=[];
      //let siexiste=false;
      productoAgregados.forEach(async (value)=>{
        if(payload.producto.id==value.id){
          if(parseFloat(payload.producto.stock)>=nuevaCantidad){
            value.cantidadProducto=nuevaCantidad;
            if(nuevaCantidad>0){
              tempCarrito.push(value);
            }
          }else{
            value.cantidadProducto=value.stock;
            tempCarrito.push(value);
          }
        }

      });
      await localStorage.setItem('carrito',JSON.stringify(tempCarrito));
     
    }
    state.actualizarCarrito=true;
    
  },
  async ONFOCUS(state,payload){
    state.productosDisponibles.forEach(async (value)=>{
        if(value.id==payload.producto.id){
          value.editProducto=true;
          value.tempCantidad=payload.producto.tempCantidad;
        }
    });
  },
  async EDITAR_CANTIDAD_PRODUCTO(state,payload){
    if(payload.cantidad>0){
      state.productosDisponibles.forEach(async (value)=>{
        if(value.id==payload.producto.id){
          let productoAgregados=localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) :[] ;
          let existeProducto=false;
          productoAgregados.forEach((valueAgregado)=>{
            if(valueAgregado.id==payload.producto.id){
              existeProducto=true;
              valueAgregado.id=payload.producto.id;
              valueAgregado.cantidadProducto= parseFloat(payload.cantidad);
  
             }
          });
          if(!existeProducto){
            productoAgregados.push({
               id:payload.producto.id,
               cantidadProducto:parseFloat(payload.cantidad),
            });
          }
          await localStorage.setItem('carrito',JSON.stringify(productoAgregados));
          if(parseFloat(value.stock)>=(parseFloat(payload.cantidad)) ){
            if(payload.cantidad>0){
              value.cantidadProducto=parseFloat(payload.cantidad);
  
            }
          }else{
            value.cantidadProducto=parseFloat(value.stock);
          }
          value.editProducto=false;
        }
      });

    }else{
      let productoAgregados=localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) :[] ;
      productoAgregados=productoAgregados.filter((value)=>{
        return value.id!=payload.producto.id;
      });
      await localStorage.setItem('carrito',JSON.stringify(productoAgregados)); 
    }
    state.actualizarCarrito=true;

  },
  async EDITAR_CANTIDAD_PRODUCTOPAYLOAD(state,payload){
    let productoAgregados=localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) :[] ;
    productoAgregados.map(async (value)=>{
      if(value.id==payload.id){
        value.cantidadProducto=payload.cantidadProducto;
        let tempArray=[];
        await state.productosDisponibles.forEach(async (valueFiltro)=>{
          if(valueFiltro.id==payload.id){
            valueFiltro.cantidadProducto=payload.cantidadProducto;
          }
          //if(parseFloat(valueFiltro.cantidadProducto)>0){
            tempArray.push(valueFiltro);
          //}
          
        });
        state.productosDisponibles=await tempArray;
      }
    });
    productoAgregados=productoAgregados.filter((value)=>{
        return value.cantidadProducto>0;
    });
    await localStorage.setItem('carrito',JSON.stringify(productoAgregados));
    state.actualizarCarrito=true;
  },
  async ELIMINAR_ITEMCARRITO(state,payload){
    let productoAgregados=localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) :[] ;
    let arrayProducto=[];
    await productoAgregados.map(async (value)=>{
      if(value.id!=payload.id){
        arrayProducto.push(value);

      }else{
        let tempArray=[];
        await state.productosDisponibles.forEach(async (valueFiltro)=>{
          if(valueFiltro.id==payload.id){
            valueFiltro.cantidadProducto=0;
            console.log("valueFiltro",state.productosDisponibles);
          }
          tempArray.push(valueFiltro);
        });
        state.productosDisponibles=tempArray;
      }
    });
    
    await localStorage.setItem('carrito',JSON.stringify(arrayProducto)); 
    state.actualizarCarrito=true;
  }

}
