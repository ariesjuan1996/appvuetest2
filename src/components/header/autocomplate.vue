<template>
<div id="search" class="Search" >

  <div v-if="valueBuscador.length>1" class="Search__overlay"  @click="outClick"></div>
  <div class="Search__content">
    <div class="search__textBox">
       <span class="Search__icon--search icon-search"  @click="buscar"></span>  
      <input id="search_box" 
      type="text" class="Search__input" placeholder="Hola, ¿qué estás buscando?" 
       v-model="valueBuscador"  autocomplete="off"/>
    </div>
    <div v-if="mostrarBuscador" class="search_fixed">
      <span  @click="atrasBuscador" class="rowleft icon-arrow-left2"></span>
      <input id="search_box1" 
      type="text" class="Search__input" placeholder="Hola, ¿qué estás buscando?" 
       v-model="valueBuscador"  autocomplete="off"/>
    </div>
    <div v-if="valueBuscador.length>1"  class="search__result">  
     
        <half-circle-spinner
        v-if="isLoading"
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
        />
        <div class="content-scrooll" v-if="busquedaProductoLocal.length">
          <div class="conten-search">
                <itemSearch
                    v-for="(item,index) in busquedaProductoLocal"
                    :item="item"
                    v-bind:key="index"
                    @seleccionar="seleccionar"
                />
          </div>   
        </div>
        <div v-else>
            <h2 >Lo sentimos, pero no encontramos resultados para "{{valueBuscador}}".</h2>
        </div>
    </div>
</div>
</div>
</template>
<script>
import itemSearch  from "@/components/header/itemSearch.vue"
import { requestApi } from "@/api/index.js"
import { HalfCircleSpinner } from 'epic-spinners'
  export default {
    data: () => ({
      mostrarBuscador:false,
      valueBuscador:"",
      isLoading:true,
      busquedaProductoLocal:[],
       busquedaProductoLocalCopia:[],
      anchoPantalla:screen.width
    }),
    components: {  itemSearch,HalfCircleSpinner  },
    watch:{
     async mostrarBuscadorVal(newVal){
        this.mostrarBuscador=newVal;
     },
     async valueBuscador(newVal){
        if(newVal.length>1){
          this.isLoading=true;
          if(newVal.length===2){
            await this.busquedaProducto();
          }else{
            this.busquedaLocal();
              this.isLoading=false;
          }
          window.addEventListener('scroll', this.disableScroll); 
          /*if(this.anchoPantalla<=768){
            this.mostrarBuscador=true;
          }else{
            this.mostrarBuscador=false;
          }*/
        }else{

          this.busquedaProductoLocal=[];
         window.removeEventListener('scroll', this.disableScroll);  
        }

      },
    },
    computed:{
       mostrarBuscadorVal(){
        return this.anchoPantalla<=768 && this.valueBuscador.length>1 ? true : false;
      }
    },
    //Buscar
    methods:{
      seleccionar(){
        this.valueBuscador="";
      },
      atrasBuscador(){
        this.mostrarBuscador=false;
        this.valueBuscador="";
      },
      buscar(){
        if(screen.width<=768){
          this.mostrarBuscador=true;
        }else{
          this.mostrarBuscador=false;
        }
      },
      outClick(){
        this.valueBuscador="";
      },
      async busquedaLocal(){
        this.busquedaProductoLocal=this.busquedaProductoLocal.filter((value)=>{
          return (value.marca.toUpperCase().indexOf(this.valueBuscador.toUpperCase())===-1 ? false : true) ||
          (value.nombreProducto.toUpperCase().indexOf(this.valueBuscador.toUpperCase())===-1 ? false : true);
        });
        if(this.busquedaProductoLocal.length==0){
        this.busquedaProductoLocal=this.busquedaProductoLocalCopia.filter((value)=>{
          return (value.marca.toUpperCase().indexOf(this.valueBuscador.toUpperCase())===-1 ? false : true) ||
          (value.nombreProducto.toUpperCase().indexOf(this.valueBuscador.toUpperCase())===-1 ? false : true);
        });
        }
      },
      async busquedaProducto(){
        try { 
          let respon=await requestApi(
            `productos/buscarProductoPorTitulo?reqTitulo=${this.valueBuscador}`,
            {},
            "GET"
          );
          
          let response=respon.data.estado ? respon.data.data : [];   
          this.isLoading=false;    
          this.busquedaProductoLocal=response;
          this.busquedaProductoLocalCopia=response;
          } catch (error) {
              console.log("error",error);
          }
      },
      disableScroll(){  
        window.scrollTo(0, 0);
      },
      cambiarTamanio(){
        this.anchoPantalla=screen.width;
      }  
    },
    mounted(){
       window.addEventListener("resize", this.cambiarTamanio);
    }
  }
</script>
<style>
#search{
  width: calc(100% - 350px);
  
}
.Header__search .Search {
    margin-top: 0;
}

.Search__content {
    /* width: 100%; */
    z-index: 5;
}
.Search, .Search * {
    box-sizing: border-box;
    font-family: Rubik;
}
.Search__icon--search {
    cursor:pointer !important;
    top: 7px;
    right: 10px;
    position: absolute;
    color: #333;
    z-index: 2;
    width: 24px;
    height: 24px;
    font-size: 18px;
    margin-left: 5px;
}
.Search__input {
    color: #333;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    height: 32px;
    font-size: 16px;
    background: #f8f8f8;
    border: none;
    border-radius: 30px;
    padding: 5px 15px 5px 12px;
    position: relative;
    font-weight: 400;
    text-shadow: none;
}
.search__textBox {
    display: block;
    position: relative;
}
.search__result {
    position: absolute;
    left: 0;
    height: 100vh;
    width: 100%;
    padding: 20px 0 95px;
    top: 51px;
    background: #fff;
    z-index: 2;
}

.content-scrooll{
    max-height: 90vh;
    overflow-y: auto;
    width:100% !important;
    box-sizing:content-box;
    overflow-x: hidden;
}   
.conten-search{
    width: 99.9% !important;
    box-sizing: content-box;
    display: block;
    max-height: 60vh;
    overflow-y: auto;
    
    box-sizing: content-box;
    overflow-x: hidden;
}
.search_fixed{
  position: fixed;
  width: 100% !important;
  background: #fff;
  left: 0px;
  top: 0px;
  height: 56px;
  z-index: 9;
}


@media (min-width: 992px){
      .Search__overlay {
          position: fixed;
          display: block;
          width: 100%;
          height: 100vh;
          left: 0;
          top: 0;
          background: #000;
          opacity: .5;
          z-index: 5;
      }
      .Search__content {
          position: relative;
      }
    .search__result {
        max-width: 960px;
        height: auto;
        box-shadow: 0 0 5px rgba(51,51,51,.2);
        border: 1px solid #e8e8e8;
        padding: 30px 20px;
        width: 960px;
        left: auto;
        right: -106px;
        border-radius: 3px;
        top: 68px;
    }


}
@media (max-width: 992px){
    .search__result{
      right:0px !important;
    }

    .Search__content{
        width: 100%;
        left: 0;
        top: 0px !important;
    }
    /* ES LA PARTE DE BUSCADOR*/
   
}
@media (max-width: 768px){
  .content-icons{
    text-align: center;
    position: relative;
    left: -34px;
  }
    .v-list-item{
      padding-left: 5px !important;
    }
    #search{
      width:20% !important;
    }

    .search__textBox{
          text-align: left;
    }
    .icon-search{
      text-align: right !important;
      margin: auto;
      position: relative;
      position: relative;
      right: 0px !important;
      top: 2px;
    }
    #search_box1{
      position: fixed;
      top: 10px;
      margin-left: 10px;
      width: calc(100% - 80px) !important;
      margin-bottom: 0px !important;
      box-sizing: content-box;
    }
    #search_box{
      display:none;
    }
    .cardSearchProducto{
      width: 96% !important;
      padding-left:20px;
      padding-right:20px;
      margin:auto;
    }
    .conten-search{
      padding: 10px;
    }
    .content-scrooll{
      max-height: 100vh;
      height: 100vh;
    }
    .conten-search{
      max-height: 80vh;
      top: 0px;
    }
  .search__result{
    position:fixed;
        /* top: 0px; */
  }
}
@media (min-width: 768px){
  .Header__search.active .Search__content {
      width: inherit;
  }
  .search__result {
      top: 64px;
  }
}
.rowleft{
  width:100px;
  font-size:24px;
  margin-left:10px;
  line-height:50px;
  color:#000;
  cursor:pointer;
}
</style>