<template>
  <div v-if="activeBuscador" class="containerBuscado" style="position:fixed">
      <div id="buscadorAmplio">
        <i  id="atrasbuscador" class="fas fa-long-arrow-alt-left" @click="$emit('closeSearch')"></i>
        <div id="search">
          <input id="inputBuscador" v-model="lookFor" autocomplete="off"  ref="lookFor" v-focus="activeBuscador==true" />
          <i id="buscardorIconoAmplio" class="icon-search"></i>
        </div>
    </div>
    <div class="containerResult" v-if="(lookFor ? lookFor : '').length>=2">

       <contentResult  :listItem="listItem" :lookFor="lookFor" :isLoader="isLoader" />
    </div>
  </div>
</template>

<script>

import contentResult from '@/views/header/contentResult.vue';
import logs from '@/assets/data/listProduct.json';
export default {
  name: 'searchProduct',
  components: {
      contentResult
      
  },
  props:{
      activeBuscador: {
      type: Boolean,
      default: false
    }
  },
  data() {
  return {
    isLoader:false,
    lookFor:"",
     listItem:[]
  }},
  methods: {
    buscarProductos(){
      
      this.listItem=logs.filter((value)=>{
       return  value.marca.toLowerCase().indexOf(this.lookForFormat)>-1 || value.producto.toLowerCase().indexOf(this.lookForFormat)>-1;
      });
      this.isLoader=false;
    }
  },
  computed:{
    lookForFormat(){
      return (this.lookFor===null ? "" : this.lookFor).toLowerCase();
    }
  },
  watch:{
      activeBuscador(){
        
      },
      lookFor(newVal){
        let lengthValue=(newVal==null ? "" :newVal).length; 
        if(lengthValue>1){
            this.isLoader=true;
            if(lengthValue===2){
              //busqueda por base de datos 
              //setTimeout(this.buscarProductos,1500);
             this.buscarProductos();
            }else{
              //busqueda por solo filtros internos
              this.buscarProductos();
              //setTimeout(this.buscarProductos,1500);
            }
        }else{
         this.listItem=[];

       }
      }
  }
}
</script>
<style>
  @media (max-width: 900px) {
    
      .containerBuscado{
        position: fixed;
        background: #fff !important;
        top: 0px !important;
        z-index: 9;
      }
      #buscadorAmplio{
        width:100%;
        background: #ffffff;
        position:fixed;
        z-index:99;
        height: 69px;
        position:fixed;
        padding-top:20px;
        display: flex;
        right: 0px;
        top: 0px !important;
    }
   
    #search{
      width: 100% !important;
      display: flex;
    }
    #search i{
      top: 10px;
      left: -40px;
      position: relative;
    }
    #inputBuscador{
        width:100%;
        border-radius: 20px;
        padding-top:8px;
        border:0px solid #fff;
        background:#F1F1F1;
        height: 32px;
        font-size: 16px;
        color: #333;    
        margin: 0 auto;
        height: 32px;
        font-size: 16px;
        background: #f8f8f8;
        border: none;
        padding: 5px 15px 5px 15px;
        position: relative;
    }
    #buscardorIconoAmplio{
        position:relative;
        left:-25px;
    }
    #atrasbuscador{
      position: relative;
      right: 0px;
      top: 8px;
      left: 5px;
      width: 35px;
    }
    #inputBuscador:focus {
    outline:none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}
 }  
 .scroll{
     /* overflow-y: scroll;*/
}
.scrollnone{
     /* overflow-y: hidden;*/
}
.containerResult{
    padding-top: 20px;
    box-sizing: border-box;
    padding-bottom: 20px;
}
</style>