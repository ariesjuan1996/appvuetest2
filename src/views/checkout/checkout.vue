<template>
    <div>
        <headInfoProfile/>
        <v-container class="content-checkout-info">
          <div  class="content-checkout-info-head">
            <h2 style="width:100%;" class="content-checkout-title">Mi carrito</h2>
            <span class="span-seguir" @click="redirectPage('/')">seguir Comprando</span>

          </div>
          <v-row v-if="detalleCarro.length>0">
              <v-col lg="8" sm="12" md="12">
                  <v-simple-table>
                      <template v-slot:default>
                      <thead>
                          <tr>
                          <th class="text-left">PRODUCTO</th>
                          <th class="text-left">PRECIO</th>
                          <th class="text-center">CANTIDAD</th>
                          <th class="text-left">TOTAL</th>
                          </tr>
                      </thead>
                      <tbody>
                    
                          <tr v-for="(item,index) in detalleCarro" :key="index">
                            <td>{{ item.titulo }}</td>
                            <td>S./{{ item.precioVenta }}</td>
                            <td>
                              <span class="txt-precio-original">{{logoMoneda}} {{item.precioVenta}}</span> 
                              <span class="txt-precio">{{logoMoneda}} {{ (parseFloat(item.precioVenta)*(1-parseFloat(item.porcentajeDescuento)/100) ).toFixed(2) }}</span>
                            </td>
                            <td>
                              
                            <inputNumber :item="item" :disabled="true" @sumarCantidad="sumarCantidad"/></td>
                          
                            <td >
                            <div class="item-subtotal">
                              <span class="value-subtotal">S./{{ parseFloat(((parseFloat(item.precioVenta)*(1-parseFloat(item.porcentajeDescuento)/100) ).toFixed(2))*parseInt(item.cantidadProducto)).toFixed(2) }}</span>
                              <span class="delete-itemCheckout" @click="removeElement(item)">X</span>
                            </div>
                            </td>
                          </tr>
                      </tbody>
                      </template>
                  </v-simple-table>
              </v-col>
              <v-col lg="4" sm="12" md="12">
                  <v-card
                  class="mx-auto"
                  max-width="100%"
                  outlined>
               
                  <div class="content-detail">
                      <div class="content-detail-item">
                          Subtotal
                      </div>
                      <div class="content-detail-item">
                          S./ {{subTotal}}
                      </div>
                  </div>
                  <div class="content-detail">
                      <div class="content-detail-item">
                          Costo de envio
                      </div>
                      <div class="content-detail-item">
                          {{logoMoneda}} {{costoEnvio}}
                      </div>
                  </div>
                  <div class="content-detail">
                      <div class="content-detail-item negrita">
                          TOTAL
                      </div>
                      <div class="content-detail-item negrita">
                          {{logoMoneda}} {{sumaTotal}}
                      </div>
                  </div>
                    <v-btn class="btn-continuar" depressed large color="error" @click="redirectPage('/checkout/profile')">CONTINUAR</v-btn>
                  </v-card>
              </v-col>
          </v-row>
          <v-container v-else>
            <p>{{tituloVacio}}</p>
            <p>{{mensajeVacio}}</p>
                <v-btn
                  class="ma-2"
                  color="success"
                  style="width:150px;height: 45px;"
                  @click="irPrincipal"
                >
                  Eligir Producto
                </v-btn>
          </v-container>
        </v-container>    
    </div>
</template>

<script>
 import { requestApi } from "@/api/index.js"
 import headInfoProfile from "@/views/header/headInfoProfile.vue"
 import inputNumber from '@/views/checkout/inputNumber/inputNumber.vue';

 import { mapGetters } from 'vuex'
  export default {
    components: {headInfoProfile,inputNumber},
    data: () => ({
     logoMoneda:"S./",   
     storage: window.localStorage,
     detalleCarro:[],
     tituloVacio:"Su carrito está vacio",
     mensajeVacio:"Para seguir comprando, navegar por las categorías en el sitio, o busque su producto."
    }),
    computed:{
      ...mapGetters({
            listCarProduct: 'products/listCarProduct',
     }),
     subTotal(){
        let suma=0.0;
        this.detalleCarro.map((value)=>{
          suma=suma+parseFloat(value.precioVenta)*parseInt(value.cantidadProducto)*(1-parseFloat(value.porcentajeDescuento)/100) ;
        });
        return suma.toFixed(2);
      },
      sumaTotal(){
        return (parseFloat(this.subTotal)+parseFloat(this.costoEnvio));
      },     
      costoEnvio(){
        return (0).toFixed(2);
      }
    },
    watch:{
      
    },
    methods: {
      async irPrincipal(){
        this.$router.push('/');
      },
      async sumarCantidad(object){
        let cantidad=parseFloat(object.producto.cantidadProducto) +object.cantidad;
        let stock=parseFloat(object.producto.stock) ;
        if(stock>cantidad){
          await  this.$store.dispatch("products/EDITARCANTIDADPRODUCTOPAYLOAD", {
              id:object.producto.id,
              cantidadProducto:cantidad,
            });
        }else{
          await  this.$store.dispatch("products/EDITARCANTIDADPRODUCTOPAYLOAD", {
              id:object.producto.id,
              cantidadProducto:stock,
            });

        }
        await this.cargarProductoIds();
        this.$forceUpdate();
      },
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
      async removeElement(newVal){
        await this.$store.dispatch("products/ELIMINAR_ITEMCARRITO", {
            id:newVal.id
        });
        await this.cargarProductoIds();
        this.$forceUpdate();

      },
      async redirectPage(url){
        await this.$router.push(url);
      },
      async cargarProductoIds(){
        try {
         let idProductosCarrito=await this.cantidadProductoIds();
         console.log("idProductosCarrito",idProductosCarrito);
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
<style>
.body-container{
  height: 56px;
}

.content-checkout-info{
  
  width:100% !important;
  height:100px !important;
  margin-top:69px !important;
  background: #fff;
}
.content-checkout-title{
    color:red !important;
}
.btn-continuar{
    width:100% !important;
}
.content-detail{
    display:flex;
}
.content-detail-item{
    width:50% !important;
}
.negrita{
    font-weight: bold;
}
.content-checkout-info-head{
    display:flex;
}
.span-seguir{
    cursor:pointer;
    color:red;
}
.item-subtotal{
  display:flex;
}
.value-subtotal{
  width:50px;
}
.delete-itemCheckout{
  margin-left:20px;
  display:block;
  cursor:pointer;
  border-radius: 50%;
  background-color: #ee3037;
  width: 30px;
  height: 30px;
  padding: 0;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  color: #fff;
  line-height: 30px;
}
.input-count-product{
  background-color: transparent !important;
  max-width:200px !important;
}
.button-menos,.button-mas{
  height: 46px !important;
  width: 46px !important;
  background-color:#333333 !important;
  color:#fff !important;
  font-size:28px !important;
}
.text-center{
  text-align:center !important;
}
.txt-precio-original{
  color: #aaa;
  font-size: 1rem;
  line-height: 1.3rem;
  text-decoration: line-through;
  width:100% !important;
  display:block;
}
.txt-precio{
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.4rem;
    color: #ea2840;
    display:block;
}
</style>