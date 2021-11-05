<template>
  <v-container style="width:100% !important;padding: 0px;" fluid>
 
    <div
        style="width:100% !important;"
     
    >Bolsa de Compras</div>
    <v-container fluid class="listaProductosAnadidos">
    
      <v-row>
        <v-col lg="9" cols="12">
          <v-container style="padding: 0px !important; " fluid>
            <v-card class=" container--fluid" :key="index" v-for="(item,index) in items">
              <v-row>
                  <div 
                    class="col-lg-2  col-sm-3 col-xs-1 col-md-6  col-xs-2"
                    >
                  <v-img
                    class="btncarrito"
                    max-height="80%"
                    max-width="80%"
                    :src="item.img"
                      ></v-img>
                
                  </div>
                  <div 
                    class="col-lg-4 col-sm-4 col-md-6  col-xl-6 col-xs-4"
                  >
                      <p><strong> {{item.marca}}</strong></p>
                      <p>{{item.titulo}}</p>
                      <a>Eliminar</a>
                  </div>
                  <div 
                    class="col-lg-3 col-sm-4 col-md-3  col-xl-6 col-xs-4"
                  >
                    <span class="txt-precio">{{logoMoneda}} {{ (parseFloat(item.precioVenta)*(1-parseFloat(item.porcentajeDescuento)/100) ).toFixed(2) }}</span>
                    <span class="txt-precio-original" v-if="(parseFloat(item.precioVenta)*(1-parseFloat(item.porcentajeDescuento)/100) ).toFixed(2)!=item.precioVenta">{{logoMoneda}} {{item.precioVenta}}</span> 

                  </div>
                 <div 
                    class="col-lg-3 col-sm-12 col-md-6  col-xl-6 col-xs-12"
                  >
                    <div class="inputbtncantidad" >
                      <span class="btn-accion btn-menos" @click="sumarCantidadProducto(item,-1)">{{item.editProducto ? 'Cancelar' : '-' }}  </span>
                        <v-text-field disabled type="text" class="inputCantidad" v-model="item.cantidadProducto" :data-idProducto="item.id" :data-stock="item.stock" @focus="onFocus(item)"  />
                        <span class="btn-accion btn-mas" @click="sumarCantidadProducto(item,1)">{{item.editProducto ? 'Aceptar' : '+' }}</span>
                    </div>
                  </div>
              </v-row></v-card>
          </v-container></v-col>
        <v-col class="contentResumen" lg="3" cols="12">
          <h2>Resumen de tu orden</h2>
          <p >Sub-total productos </p>
          <p>Descuento Oportunidad Única </p>
            <div class="contentIrComprar">
              <v-btn  color="success" dark class="btnIrComprar" @click="irComprar">Ir a Despacho</v-btn></div>
          
        </v-col>
      </v-row>
    </v-container>
    </v-container>
</template>
<script>
export default {
  
   components: {},
   props:{
      items:Array
   },
   data: () => ({
    logoMoneda:"S./",
    abrirDialog:false,   
   }),
   methods: {
      async cambiarDialogo(abrirDialog){
        this.abrirDialog=abrirDialog;
      },
      async irComprar(){
        this.$emit("irComprar");
      },
      async sumarCantidadProducto(producto,cantidad){
        if(producto.editProducto && cantidad==-1){
          await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto : {id :producto.id},cantidad:1} );
          await this.$forceUpdate();
          await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto : {id :producto.id},cantidad:producto.tempCantidad} );
          await this.$forceUpdate();
          return false;
        }

        if(producto.editProducto){
          console.log("producto:",parseFloat(producto.stock)>=parseFloat(producto.cantidadProducto));
          if(parseFloat(producto.stock)>=parseFloat(producto.cantidadProducto)){
            await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto,cantidad:producto.cantidadProducto});
            await this.$forceUpdate();  
          }else{
            console.log("producto.stock",producto.stock);          
            await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto,cantidad:1});
            await this.$forceUpdate();
            await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto,cantidad:producto.stock});
            await this.$forceUpdate();
          }
          
          return false;
        }else{
          await this.$store.dispatch("products/SUMARCANTIDADPRODUCTO", {producto,cantidad});
          await this.$forceUpdate();
        }
        await this.sumarCantidad({producto,cantidad:cantidad});
     },
      async sumarCantidad(object){
        this.$emit("sumarCantidad",object);
      },
    },

  }
</script>
<style>
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
.v-stepper__content{
  padding: 0px;
}
.contentResumen p{
margin-bottom:8px !important;
}
.contentIrComprar{
  width:100% !important;

}
.contentIrComprar .btnIrComprar{
  width:100% !important;
}
.inputbtncantidad{
  display: flex;
  top: 28px !important;
  position: relative;
}
.btn-accion{
    text-align: center;
    cursor: pointer;
    font-weight: 500;
    font-size: 18px !important;
    color :#fff;
    height: 34px !important;
    float: none;
    width: 42.65px !important;
    display: inline-block;
    vertical-align: middle;
    /* position: static; */
    background-color: #333;
    border-radius: 50%;
    line-height: 34px;
    top: 20px
}
.btn-mas{
  position:relative;
  right:20px;
}
.btn-menos{
  top: 20px;
  position:relative;
}
.inputCantidad input{
  text-align: center;
}
@media (max-width: 1263px) and  (min-width: 500px ){
  
.contentIrComprar{
  display: flex;
  justify-content: center;
}
  .contentIrComprar .btnIrComprar{
    width:50% !important;
  }
}
.btncarrito {
  margin: auto;
}
</style>
