<template>
    <v-col
    :lg="4"
    :md="4"
    :sm="6"
    
    >
    <div class="item-product">
        <v-card
            class="pa-md-4 mx-lg-auto cardProducto"
            outlined
            :style="styleCardPadding"
            
        >
       
          <div class="card-body">

              <v-img class="img-card" :src="item.img" fluid alt="Responsive image" @click="redirect(item.urlProduct)"></v-img>
              <label class="brand-product">{{item.marca}}</label>
              <label class="name-product">  {{limitText(item.nombreProducto)}}</label>
              <label class="price-product">{{item.precioVenta}}</label>
              <v-btn v-if="item.cantidadProducto===0" class="btn-agregar" color="danger" 
              @click="anadirItemCard(item)">VER PRODUCTO</v-btn>

              <div v-else class="content-input content-item-product"   @blur="actualizarCantidad(item,item.cantidadProducto)">
              <v-btn  rounded class="button-menos"  @click="sumarCantidad(item,-1)">-</v-btn>
              <input class="input-count-product" v-model="item.cantidadProducto" @blur="actualizarCantidad(item,item.cantidadProducto)" />
              <v-btn  rounded class="button-mas"  @click="sumarCantidad(item,1)">+</v-btn>
              </div>
          </div>
        
        </v-card>
    </div>
 </v-col>
</template>
<script>
import { mapGetters } from 'vuex'


export default {
  name:"card-product-item",
  data: () => ({

 }),
  watch:{
    item(){
      alert("asas");
    }
  },

 props: {

 item: {
     type:Object,
      default: ()=>{}
    },
  },

  computed:{
    ...mapGetters({
        productFilter: 'products/productFilter'
    }), 
    styleCardPadding(){
      return  this.item.cantidadProducto===0 ? 'padding-bottom: 40px;' : '';
    }
   
    },
  methods: {
     limitText(valueText){
       return  (valueText.length>50 ? (valueText.substring(0,50)+"...") : valueText);
     },
     async redirect(urlProduct){
       
        let rut=this.$store.state.products.ver;
        await this.$router.push("/"+rut+"/"+urlProduct);
        location.reload();
      },
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
          
          this.$store.dispatch("products/ANADIRITEMCARD", value);
          
       }
       this.$forceUpdate();
 
     },
     sumarCantidad(newVal,cont){
       let value={}; 
       value.cantidadProducto=parseInt(newVal.cantidadProducto) +cont;
       if(newVal.stockProducto>= value.cantidadProducto){
          value.idProducto=newVal.idProducto;
          this.item.cantidadProducto=value.cantidadProducto;
          value.otrosDetalles=newVal;
          this.$store.dispatch("products/ANADIRITEMCARD", value);
          this.$forceUpdate();
       }

     },
     anadirItemCard(newVal){
    
       let value={}; 
       value.cantidadProducto=1;
       value.idProducto=newVal.idProducto;
       this.item.cantidadProducto=parseInt(value.cantidadProducto);
       value.otrosDetalles=newVal;
       this.$store.dispatch("products/ANADIRITEMCARD", value);
       this.$forceUpdate();
       
     },
  }
}
</script>
<style>
    .img-card{
        width:100%;
        height:220px !important;
        cursor:pointer;
    }
    .cardProducto{
         height:400px !important;
    }
    .btn-agregar{
        width:100% !important;
    }
    .name-product{
       text-align: left;
        display:block;
        height:50px !important;
        padding: 5px;
        font-size: 15px;
    }
    .price-product{
        font-weight: bold;
        width:100%;
        display:block;
        font-size:24px;
        padding-left: 10px;
    }
    .brand-product{
        
        height:20px !important;
    }
    .brand-product{
            font-weight: bold;
    }
    .content-input{
        display: flex;
    }
    .input-count-product{
      text-align:center;
      justify-content: space-between;
      background-color: #dedede;
      text-align: center;
      border: 5px solid transparent;
      border-radius: 20px;
    }
    .item-product{
      box-sizing: content-box;
      padding: 5px;
    }
    .button-menos,.button-mas{
      background: #dedede !important;
    }
</style>