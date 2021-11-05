<template>
  <div class="contentDirecciones">
   <v-row>
    <v-col lg="8" cols="12">
      <seleccionarDireccion @irPagar="irPagar"/>
    </v-col>
    <v-col lg="4" cols="12">
    <div>
      <p>Resumen de tu orden</p>
      <v-container style="padding: 0px !important; " fluid>
        <v-card class=" container--fluid" :key="index" v-for="(item,index) in detalleCarro">
          <v-row>
              <div 
                class="col-lg-5 col-6 "
                >
              <v-img
                class="btncarrito"
                max-height="150px"
                max-width="150px"
                :src="item.img"
                  ></v-img>
            
              </div>
              <div 
                class="col-lg-7 col-6"
              >
                  <p><strong> {{item.marca}}</strong></p>
                  <p>{{item.titulo}}</p>
                  <span class="txt-precio">{{logoMoneda}} {{ (parseFloat(item.precioVenta)*(1-parseFloat(item.porcentajeDescuento)/100) ).toFixed(2) }}</span>
              </div>
          </v-row>
        </v-card>
          </v-container>
    </div></v-col></v-row>
  </div>
</template>

<script>
import { requestApi } from "@/api/index.js"

 import seleccionarDireccion from "@/components/perfil/seleccionarDireccion.vue"
export default {
   components: {seleccionarDireccion},
   props:{

   },
   data: () => ({
    tabTipoEnvio:0,  
    logoMoneda:"S./",    
    direccion:"", 
    opcionPaises:[],
    opcionesNivelesPais:[],
    detalleCarro:[],
    opcionesDepartamento:[],
    opcionesProvincia:[],
    opcionesDistrito:[],
    paisSeleccionado:null,
    departamentoSeleccionado:null,
    provinciaSeleccionado:null,
    distritoSeleccionado:null,
    storage: window.localStorage, 
   }),
   computed:{

   },
   watch:{

    },
    methods: {
     async irPagar(){
       this.$emit("irPagar");
     } ,
     async cantidadProductoIds(){
       let datos= this.storage.carrito ? JSON.parse(this.storage.carrito) : [];
       let idsProducto=[]; 
       datos.map((value)=>{
          idsProducto.push(value.id);
       });
       return idsProducto.join(",");
      },
      async cantidadProductoId(id){
       let datos= this.storage.carrito ? JSON.parse(this.storage.carrito) : [];
       let cantidadProducto=0;
       datos.filter((value)=>{
          if(value.id==id){
            cantidadProducto=value.cantidadProducto;
          }
        });
        return cantidadProducto;
      },
      async cargarProductoIds(){
        try {
         let idProductosCarrito=await this.cantidadProductoIds();
         let respon=await requestApi(
            `productos/listarProductoPorIds?reqIds=${idProductosCarrito}`,
            {},
            "GET"
          );
            this.detalleCarro=[];
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

    },
    async mounted() {
      await this.cargarProductoIds();
    }
}
</script>