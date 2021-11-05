<template>
  <div class="text-center card-detalle-shoppingcar">

    <v-dialog
      :fullscreen="false" 
      v-model="dialog"
      transition="dialog-bottom-transition" 
    >
      <template v-slot:activator="{ on, attrs }">
      
        <div class="carsNumber" 
        height="45" width="45" 
        v-bind="attrs"
        v-on="on"
          > 
          <i class="iconcar fas fa-shopping-cart"></i> <i class="numberProduct">{{countProduct}}</i></div>
        
      </template>

      <v-card  class="card-carrito">
        <div class="head-card">
          <v-card-title class="headline grey lighten-2 titlecar">
            Mi Carrito
          
          </v-card-title>
          <v-card-title class="headline grey lighten-2 titleclose" @click="closeCar">
            x
          </v-card-title>
        </div>
        <v-divider></v-divider>
          <div
            max-width="400"
            class="mx-auto"
            v-if="countProduct"
          >
            <v-virtual-scroll
              :bench="benched"
              :items="detalleCarro"
              :height="countItemsCard"
              item-height="120"
            >
              <template v-slot="{ item }">
                <v-list-item :key="item.key">
                  <div class="content-button-accion">
                    <span class="mas-carrito" @click="sumarCantidad(item,1)" ></span>
                      <div class="class-valor">{{item.cantidadProducto}}</div>
                    <span class="menos-carrito" @click="sumarCantidad(item,-1)"></span>
                  </div>
                  <v-list-item-action>

                    <v-btn
                      fab
                      small
                      depressed
                      color="primary"
                    >
                    
                      <v-img class="img-circle-car" :src="item.img"></v-img>
                    </v-btn>
                    
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>
                      <strong> {{item.marca}}</strong>
                    </v-list-item-title>
                    <v-list-item-title>
                      {{item.titulo}}
                    </v-list-item-title>
                    <v-list-item-title>
                      <strong> S/. {{item.precioVenta}}</strong>
                    </v-list-item-title>
                    <v-list-item-title>
                        <div  class="content-input" >

                        </div>
                      
                    </v-list-item-title>
                  </v-list-item-content>

                    <span class="deleteItem"  @click="eliminarItem(item)"> X </span>
                </v-list-item>

                <v-divider></v-divider>
              </template>
          </v-virtual-scroll>
          </div>
         <v-card
            elevation="16"
            max-width="400"
            height="100%"
            class="mx-auto cardshooping"
            v-else
          >   
            <h2 style="text-align: center;">Tu carrito aún está vacío.
            Comienza a llenarlo.</h2>
          </v-card>
          <div  class="card-footer-global">
            <div class="monto-total-footer">
            <p class="total"><strong>Total normal</strong></p>
            <p class="cantidad-total">{{signoMonedaLocal}} {{totalCalculado}}</p></div>
            <v-btn class="btn-cerrar" large @click="dialog=false">Cerrar</v-btn>
            <v-btn class="btn-continuar-carrito" large  @click="redirect('/checkout')">CONTINUAR</v-btn>
        
          </div>  
      </v-card>
  
    </v-dialog>
  </div>
</template>

<script> 
import { requestApi } from "@/api/index.js"
import { mapState } from 'vuex'
import {  mapMutations } from 'vuex'
export default {
    data: () => ({
      screenWidth:screen.width,
      detalleCarro:[],
      storage: window.localStorage,
      benched: 0,
      dialog:false,
      multiLine: true,
      snackbar: true,
      text: 'I\'m a multi-line snackbar.',
      signoMonedaLocal:"S./"
    }),
    props:{
    
    },
    watch:{
      async actualizarCarrito(newVal){
        if(newVal){
          await this.cargarProductoIds();
          await this.meactualizarCarrito(false);
        }
      }
    },
    computed: {
      ...mapState('products', ['actualizarCarrito']),
      countProduct(){
        return this.detalleCarro.length;
      },
      totalCalculado(){
        let suma=0;
        this.detalleCarro.map((value)=>{
          suma+=value.precioVenta*value.cantidadProducto;
        });
        return suma;
      },
      productsCard(){
        let idProductos=[];
        let datos= this.storage.carrito ? JSON.parse(this.storage.carrito) : [];
        datos.map((value)=>{
            idProductos.push(value.id);
          });
          return idProductos.join(",");
      },
      items () {
        return Array.from({ length: this.length }, (k, v) => v + 1)
      },
      countItemsCard(){
        return (this.screenWidth>=770 ? 360 : 720)
      }
    },

    methods: {
     ...mapMutations({
        meactualizarCarrito: 'products/CAMBIAR_CARRITO',
     }),
     cantidadProductoId(id){
       let datos= this.storage.carrito ? JSON.parse(this.storage.carrito) : [];
       let cantidadProducto=0;
       datos.filter((value)=>{
          if(value.id==id){
            cantidadProducto=value.cantidadProducto;
          }
        });
        return cantidadProducto;
     },
     async cantidadProductoIds(){
       let datos= this.storage.carrito ? JSON.parse(this.storage.carrito) : [];
       let idsProducto=[]; 
       datos.map((value)=>{
          idsProducto.push(value.id);
       });
       return idsProducto.join(",");
     },
     async redirect(urlRedirect){
        await this.$router.push(urlRedirect);
      },
      closeCar(){
        this.dialog=false;
      },
      closeSnackBar(){
        this.$emit("closeSnackBar");
      },
      eliminarItem(newVal){
        this.$store.dispatch("global/LOADEROPENORCLOSE", true);
          this.$store.dispatch("products/ELIMINAR_ITEMCARRITO", {
            id:newVal.id
        });
        this.$store.dispatch("global/LOADEROPENORCLOSE", false);
      },
     sumarCantidad(newVal,cont){
       this.$store.dispatch("global/LOADEROPENORCLOSE", true);
       let cantidad=parseFloat(newVal.cantidadProducto) +cont;
       let stock=parseFloat(newVal.stock) ;
       if(stock>=cantidad){

          newVal.cantidadProducto=cantidad;
          this.$store.dispatch("products/EDITARCANTIDADPRODUCTOPAYLOAD", {
            id:newVal.id,
            cantidadProducto:cantidad,
          });
        
       }
        setTimeout(()=>{
          this.$store.dispatch("global/LOADEROPENORCLOSE", false);
        },500); // 3000ms = 3s
       

     },
     async cargarProductoIds(){
      try {
         let idProductosCarrito=await this.cantidadProductoIds();
         let respon=await requestApi(
            `productos/listarProductoPorIds?reqIds=${idProductosCarrito}`,
            {},
            "GET"
          );
            let dataFiltro=respon.data.estado ? respon.data.data : [];
            this.detalleCarro=dataFiltro;
            this.detalleCarro.forEach(async(value)=>{
              let itemCantidad=this.cantidadProductoId(value.id);
              value.cantidadProducto=itemCantidad;
            });
          } catch (error) {
              console.log("error",error);
          }
     },

     cambiarTamanio(){
       this.screenWidth=screen.width;
     }
    },
    async mounted() {
      window.addEventListener("resize", this.cambiarTamanio);
      this.meactualizarCarrito(true);
      await this.cargarProductoIds();
  }
  }
</script>
<style>
.card-carrito{
    top: 30px !important;
    width:30em !important;
    right: 30px;
    position: fixed !important;
    margin-top: 20px;
}

.card-carrito .v-card{
max-width: 100% !important;
}

.card-carrito i{
    cursor:pointer;
}
.deleteItem {
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background: red;
    display: block;
    border-radius: 50%;
    text-align:center;
    cursor:pointer;
}
.img-circle-car{
  width:20px;
  height:20px;
}
.iconcar{
  font-size: 30px;
  line-height: 50px !important;
}
.carsNumber{
  display:flex;
  justify-content: center;
  margin-left:20px;
}
.numberProduct{
  color: #fff;
  background: #ee3037;
  min-width: 25px;
  height: 25px;
  border-radius: 25px;
  font-size: 10px;
  font-family: Rubik,sans-serif;
  font-weight: 500;
  text-align: center;
  position: absolute;
  line-height: 25px;
  top: -8px;
  right: -10px;
  padding: 0 1px 0 0;
  transition: all .3s cubic-bezier(.13,.29,.66,1.2);
  position: relative;
  top: 4px;
  right: -4px !important;
  font-size: 14px !important;
}
.card-footer-global{
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding-bottom: 10px !important;
}
.btn-continuar-carrito{
  width:75% !important;
  color:#fff !important;
  background: #6a148e !important;
}
.card-carrito{
  top: 0px;
  height: 100vh;
  margin: 0px !important;
  padding: 0px;
  right: 0px !important;
  top: 0px !important;
}
.btn-cerrar{
  width: 25%;
  background-color: #fff !important;
}
 @media (max-width: 769px) {
   .card-carrito{
     width:100% !important;
     height:100vh;
     left:0px;
     top:0px !important;

     right:0px;
   }
   .card-carrito .v-virtual-scroll{
     height:100vh !important;
   }
   .card-carrito .card-footer-global{
     position: fixed;
     width:100%;
     bottom:0px;
   }
 }
 .head-card{
   display:flex;
 }
 .titlecar{
   width:100% !important;
 }
 .titleclose{
   width:2em !important;
   cursor:pointer;
 }
 .mas-carrito{
   display:block !important;
 }
 .mas-carrito:before{
    content: ">";
    font-size:18px !important;
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
    display:block !important;
 }
  .menos-carrito,.mas-carrito{
    display:block;
    cursor:pointer;
  }
  .menos-carrito:hover{
    font-weight:800 !important;
  }
  .menos-carrito:before{
    content: ">";
    font-size:18px !important;
    -webkit-transform: rotate(-270deg);
    -moz-transform: rotate(-270deg);
    -o-transform: rotate(-270deg);
    -ms-transform: rotate(-270deg);
    transform: rotate(-270deg);
    display:block !important;
 }
 .content-button-accion{
    padding: 20px !important;
 }
 .card-carrito  .v-list-item__content{
   margin-left: 20px !important;
 }
 .cantidad-total{
  position: absolute;
  right: 11px !important;

 }
 .monto-total-footer{
   display: flex;
 }
</style>