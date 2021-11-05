<template>
    <div class="content-input-template">
        <div  v-if="item.cantidadProducto==null || item.cantidadProducto=='' || item.cantidadProducto==0 ? true : false" class="content-btn">
            <v-btn class="btn-agregar" color="red darken-3" 
            @click="anadirItemCard(item)">AÑADIR PRODUCTO</v-btn>
        </div>  
        <div v-else class="content-input content-item-product"   @blur="actualizarCantidad(item,item.cantidadProducto)">
            <i v-if="(item.cantidadProducto==null || item.cantidadProducto=='' ? 0 : item.cantidadProducto)==1 ? isBtnDelete : false"   @click="sumarCantidad(item,-1)" class="button-delete rounded-circle fas fa-trash-alt"></i>
            <v-btn :disabled="!isBtnDelete ? (item.cantidadProducto===1 ? true :false) : false"  fab v-if="item.cantidadProducto===1 && item.cantidadProducto>0 ? !isBtnDelete : true " class="button-menos rounded-circle"  @click="sumarCantidad(item,-1)">-</v-btn>
            <input class="input-count-product" :style="disabled ? 'cursor: not-allowed;' : ''" :disabled="disabled" :value="item.cantidadProducto==null || item.cantidadProducto=='' ? 0 : item.cantidadProducto"  />
            <v-btn fab   :disabled="item.cantidadProducto==item.stockProducto" class="button-mas rounded-circle"  @click="sumarCantidad(item,1)"><span  >+</span></v-btn>
        </div>
    </div>
</template>

<script>
export default {
  name:"input-number-item",
  data: () => ({

 }),
  watch:{
    item(){
    }
  },

 props: {

 item: {
     type:Object,
     default: ()=>{}
    },
    disabled:{
      type:Boolean,
     default: false
    },
    isBtnDelete:{
      type:Boolean,
     default: false
    }
  },

  computed:{
   
    },
  methods: {
     actualizarCantidad(item,newVal){
       let value={}; 
       if(item.stockProducto>=newVal){
          value.cantidadProducto=parseInt(newVal);
          value.idProducto=item.idProducto;
          value.otrosDetalles=item;
          this.$store.dispatch("products/ANADIRITEMCARD", value);
         

       }else{
          if(newVal==="" || newVal===0 || newVal<-1){
            value.cantidadProducto=0;
          }else{
            value.cantidadProducto=parseInt(item.stockProducto);
            item.cantidadProducto=value.cantidadProducto;
          }
          value.idProducto=item.idProducto;
          value.otrosDetalles=item;
          //this.$emit("metOpenMessage");
          this.$store.dispatch("products/ANADIRITEMCARD", value);
          
       }
       this.$forceUpdate();
 
     },
     sumarCantidad(newVal,cantidad){
       this.$emit('sumarCantidad',{
         producto :newVal,
         cantidad:cantidad
       });


     },
    async  anadirItemCard(producto){
      await this.$store.dispatch("products/ANADIRPRODUCTO", producto);
      await this.$forceUpdate();
      this.$emit("metOpenMessage");
       
     },
  }
}
</script>
<style>
.btn-agregar{
    width:100% !important;
    color:#fff !important;
}
.content-input{
    display: flex;
}
.input-count-product{
    text-align:center;
    justify-content: space-between;
    background-color: transparent;
    text-align: center;
    border: 5px solid transparent;
    border-radius: 50px;
    width:300px;
    background-color:#DEDEDE;
    height: 52px;
}
.item-product{
    box-sizing: content-box;
    padding: 5px;
}
.button-menos,.button-mas{
  background: #ffffff !important;
  cursor:pointer;
  width: 51px;
  height: 52px !important;
}
.button-mas .v-btn__content{
  color:#000 !important;
}
.button-menos{
  transform: translate(52px,1px) !important;
  font-size: 30px !important;
  text-align: center;
}
.v-btn--fab.v-btn--contained{
  box-shadow:none;
}
.v-btn--fab.v-size--default{
   width: 51px;
  height: 51px;
}
.button-mas{
 transform: translate(-52px,0px) !important;
   width: 51px !important;
  height: 51px !important;
 
 text-align: center;
}
.v-btn:not(.v-btn--round).v-size--default{
  min-width: 0px;
}
.content-input i{
  background: transparent !important;
}
.button-delete{
   background: transparent !important;
   transform: translate(48px, 0px);
   line-height: 53px !important;
   cursor:pointer;
   z-index: 9;
}

</style>