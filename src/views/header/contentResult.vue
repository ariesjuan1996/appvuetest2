<template>
    <div class="contentBusqueda"  >
         <pulse-loader v-if="isLoader" :loading="'loading'" :color="'red'" :size="'35px'"></pulse-loader>
        <cardItemProduct v-else  :item="item"  v-for="(item,index) in listItem" :key="index"  />
         <div   v-if="listItem.length===0 && lookFor!='' && !isLoader">no se encontraron resultados.</div>
    </div>
</template>
<script>

import cardItemProduct from '@/views/product/cardItemProduct.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'contentResult',
  components:{
      cardItemProduct,
      PulseLoader
  },    
  props:{
      isLoader:{
        type:Boolean,
        default:false,  
      },
      listItem:{
        type:Array,
        default: () => []
      },
      lookFor:{
          type:String,
         default: ""
      }
  },
  data() {
        return{
            
        }
    }
}
</script>
<style>
.containerResult{
    position: fixed;
    width: 100%;
    top: 66px;
    left: 10px;
    bottom: 10px;
    /* width: 180px; */
    overflow-y: scroll;
    
    background: #ffffff;
    height: 100vh;
  
}
.v-spinner{
    display:block;
}
</style>