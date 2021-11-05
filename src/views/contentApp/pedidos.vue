<template>
    <div class="conten-app conten-appmargin" style="width: 100% !important;">
        <v-container>
         <v-row no-gutters>
           <v-col
            cols="12"
            sm="12"
           >
            <div>
            <h2 class="text-center"> Mis Pedidos</h2>
            <p class="text-center">Conoce el estado e historial de tus compras en Oechsle.pe</p></div>
           </v-col>
           <v-col>
            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="basil"
              grow
            >
              <v-tab
              >
                En curso
              </v-tab>
              <v-tab
              >
                Entregados
              </v-tab>
              <v-tab
              >
                Cancelados
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card
                  color="basil"
                  flat
                >
                <div  class="content-detalle" v-for="(item,index) in dataPedidosEnCurso" v-bind:key="index">
                  <v-card-text class="header-card-pedido">
                    <v-row>
                      <v-col lg="4" cols="12">
                          <span>Número de Pedido:{{item.idpedido}}</span>
                      </v-col>
                      <v-col lg="4" cols="12">
                        <span>Fecha de Compra:{{item.fechaPedido}}</span>
                      </v-col>
                      <v-col lg="4" cols="12">
                        <span>Total:{{moneda }}{{item.totalPedido}}</span>
                      </v-col>
                    </v-row>
                  </v-card-text>
                   <v-card-text class="content-detalleproducto">
                      <v-col class="content-producto"  lg="12" cols="12" v-for="(item2,index2) in item.detalles" v-bind:key="index2">
                        <v-img
                          :lazy-src="item2.img"
                          max-height="150"
                          max-width="250"
                          :src="item2.img"
                        ></v-img>
                        <div>
                        <p><strong> {{item2.producto}}</strong></p><br>
                        <p>Precio :{{moneda}} {{item2.preciounitario}}</p><br>
                        <p>cantidad: {{item2.cantidad}}</p></div>
                      </v-col>
                    </v-card-text>  
                </div>
                <h3 class="text-center" v-if="dataPedidosEnCurso.length==0">No ahy Pedidos en curso</h3>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card
                  color="basil"
                  flat
                >
                <div  class="content-detalle" v-for="(item,index) in dataPedidosEntregados" v-bind:key="index">
                  <v-card-text class="header-card-pedido">
                    <v-row>
                      <v-col lg="4" cols="12">
                          <span>Número de Pedido:{{item.idpedido}}</span>
                      </v-col>
                      <v-col lg="4" cols="12">
                        <span>Fecha de Compra:{{item.fechaPedido}}</span>
                      </v-col>
                      <v-col lg="4" cols="12">
                        <span>Total:{{moneda }}{{item.totalPedido}}</span>
                      </v-col>
                    </v-row>
                  </v-card-text>
                   <v-card-text class="content-detalleproducto">
                      <v-col class="content-producto"  lg="12" cols="12" v-for="(item2,index2) in item.detalles" v-bind:key="index2">
                        <v-img
                          :lazy-src="item2.img"
                          max-height="150"
                          max-width="250"
                          :src="item2.img"
                        ></v-img>
                        <div>
                        <p><strong> {{item2.producto}}</strong></p><br>
                        <p>Precio :{{moneda}} {{item2.preciounitario}}</p><br>
                        <p>cantidad: {{item2.cantidad}}</p></div>
                      </v-col>
                    </v-card-text>  
                </div>
                <h3 class="text-center" v-if="dataPedidosEntregados.length==0">No ahy Pedidos entregados</h3>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card
                  color="basil"
                  flat
                >
                <div  class="content-detalle" v-for="(item,index) in dataPedidosCancelados" v-bind:key="index">
                  <v-card-text class="header-card-pedido">
                    <v-row>
                      <v-col lg="4" cols="12">
                          <span>Número de Pedido:{{item.idpedido}}</span>
                      </v-col>
                      <v-col lg="4" cols="12">
                        <span>Fecha de Compra:{{item.fechaPedido}}</span>
                      </v-col>
                      <v-col lg="4" cols="12">
                        <span>Total:{{moneda }}{{item.totalPedido}}</span>
                      </v-col>
                    </v-row>
                  </v-card-text>
                   <v-card-text class="content-detalleproducto">
                      <v-col class="content-producto"  lg="12" cols="12" v-for="(item2,index2) in item.detalles" v-bind:key="index2">
                        <v-img
                          :lazy-src="item2.img"
                          max-height="150"
                          max-width="250"
                          :src="item2.img"
                        ></v-img>
                        <div>
                        <p><strong> {{item2.producto}}</strong></p><br>
                        <p>Precio :{{moneda}} {{item2.preciounitario}}</p><br>
                        <p>cantidad: {{item2.cantidad}}</p></div>
                      </v-col>
                      
                    </v-card-text>  
                    <h3 class="text-center" v-if="dataPedidosEntregados.length==0" >No ahy Pedidos Cancelados</h3>
                  </div>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
           </v-col>
          </v-row>
        </v-container>
    </div>
</template>
<script>
  import { requestApi } from "@/api";
  export default {
    name:"pedidos",
    data() {
    return {
      moneda:"S./",
      dataPedidos:[],
      dataPedidosCancelados:[],
      dataPedidosEntregados:[],
      dataPedidosEnCurso:[],
      tipoDocumento:[],
       tab: null,
        items: [
          'En Curso', 'Entregados', 'Cancelados',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
   },
   methods: {
     async listarPedido(){
        try {
         let respon=await requestApi(
            `pedidos/obtenerPedidoCliente`,
            {},
            "GET"
          );
          let dataFiltro=respon.data.estado ? respon.data.data : [];
          this.dataPedidos=dataFiltro;
          this.dataPedidos.map((value)=>{
            if(value.estadoProceso=="CANCELADO"){
              this.dataPedidosCancelados.push(value);
            }
            if(value.estadoProceso=="ENTREGADO"){
              this.dataPedidosEntregados.push(value);
            }
            if(value.estadoProceso=="ENCURSO"){
              this.dataPedidosEnCurso.push(value);
            }
          });
          //this.dataPedidosCancelados
          console.log("filtroCategoria",this.filtroCategoria);
          } catch (error) {
              console.log("error",error);
          }
     },
   },
   async mounted() {
    await this.listarPedido();
   }
  }
</script>
<style>
.conten-appmargin{
    margin-top:70px !important;
}
.text-center{
    text-align: center;
}
.header-card-pedido{
  background:rgb(58, 177, 199);
  padding: 10px;
}
.header-card-pedido span{
  color:#fff !important;
}
.content-producto{
  display: flex;
}
</style>