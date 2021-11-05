<template>
    <div id="menu" >
        <input id="menuCheck" type="checkbox" style="display: none;" v-model="abrirPrincipal" />
        <input id="menuCheck-categoria" type="checkbox" style="display: none;" v-model="abrirListCategoria" />
        <input id="menuCheck-tipoproducto" type="checkbox" style="display: none;" v-model="abrirTipoProducto" />
    
        <v-card
          color="grey lighten-4"
          flat
          height="auto"
          tile
      >
  
        <v-toolbar dense>
          <div class="content-head">
            <v-avatar style="width: 40px;" size="40" class="itemMenu" color="indigo" @click="redirectPrincipal" >
              <v-img  src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"/>
            </v-avatar>
          
            <v-app-bar-nav-icon class="itemMenu" v-if="!openMenu" @click="openOrMenu(true)"></v-app-bar-nav-icon>
            <v-app-bar-nav-icon v-else class="itemMenu"  @click="openOrMenu(false)"></v-app-bar-nav-icon>

            <v-toolbar-title class="title-menu span-icon" @click="openOrMenu(true)">
              <span class="span-menutitle">Menú</span> 
              <span class="span-menutitle"> de categorias</span> </v-toolbar-title>
            <autocomplate/>
            <login/>
            <shoppingCart class="itemMenu" :countProduct="countProduct" :key="1"/>
         
        </div>
    </v-toolbar>
    
  </v-card>
  
        <headerBodyMobil
          class="head-mobil-menu" 
          
          :mostrarMenu="true"
          @accionPrincipal="openOrMenu(false)"
          @accionListCategoria="abrirListCategoria=!abrirListCategoria"
          @accionTipoProducto="abrirTipoProducto=!abrirTipoProducto"
          :abrirPrincipal="openMenu"  
          :abrirListCategoria="abrirListCategoria" 
          :abrirTipoProducto="abrirTipoProducto"
          :dataMenu="dataCategorias"
          
          /> 
          <headerBodyOrdinary
            class="head-ordinary-menu" 
            :mostrarMenu="openMenu"
            :dataMenu="dataCategorias"
            @cerrarMenu="openOrMenu(false)"
          
          />
    </div>
</template>

<script>

import headerBodyMobil from '@/views/header/headerBodyMobil.vue';
import headerBodyOrdinary from '@/views/header/headerBodyOrdinary.vue';
import shoppingCart from '@/components/cart/shoppingCart.vue';
import login from '@/components/login/login.vue';
import autocomplate from '@/components/header/autocomplate.vue';
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';

export default {
name: 'headerMobil',
data() {
  return {
    storage: window.localStorage,
    anchoPantalla:screen.width,
    scrollTop:0,
    listCategorias:[],
    abrirPrincipal:null,
    abrirListCategoria:null,
    abrirTipoProducto:null,
    categoriaSelect:null,
    subCategoriaSelect:null
}
},

 components: {
   'headerBodyMobil':headerBodyMobil,
   'headerBodyOrdinary':headerBodyOrdinary,
    'shoppingCart':shoppingCart,
    'login':login,
    'autocomplate':autocomplate
  },
  computed:{
    ...mapGetters({
            dataCategorias: 'products/categoriayHijos',
    }), 
    ...mapGetters('products', ['listCarProduct']),
    ...mapState('products', ['products']),
    ...mapState('global', ['openMenu']),
    ...mapState('global', ['valueSearch']),
    countProduct(){
       let count=0;
     
       if(this.products.length){
        count=0; 
        let cars=this.storage.cats ? JSON.parse(this.storage.cats) :[];
        cars.map((value)=>{
            count=count+parseInt(value.cantidadProducto);
        });
       }else{
        count=0; 
         let cars=this.storage.cats ? JSON.parse(this.storage.cats) :[];
         cars.map((value)=>{
            count=count+parseInt(value.cantidadProducto);
        });
       }
       return count;
     }
  },
  watch:{
    openMenu(newVal){
      if(!newVal){
         window.removeEventListener('scroll', this.disableScroll);
       }else{
         window.addEventListener('scroll', this.disableScroll);  
       }
    
    },
    dataCategorias(newVal){
      this.listCategorias=newVal;
    }
  },
  methods: {
    async redirectPrincipal(){
      if(this.$route.path!="/"){
       await this.$router.push('/');
      }
    },
    disableScroll(){  
      window.scrollTo(0, 0);
    },
    async openOrMenu(valueBool){
      this.$store.dispatch("global/OPENORCLOSEMENU", valueBool);
    },
    posicionarMenu() {
    this.scrollTop=window.scrollY;
    },
    cambiarTamanio(){
      this.anchoPantalla=screen.width;
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.posicionarMenu);
    window.addEventListener("resize", this.cambiarTamanio);
  }
}
</script>

<style>
  .itemMenu,.icon-search,.title-menu{
     margin: auto;
     color:#000 !important;
  }
  .itemMenu{
    cursor:pointer !important;

  }
  header{
    background-color:#fff !important;
  }
  #search{
    margin:auto;
  }
  .title-menu{
    margin:auto;
  }
  .span-icon{
  
    font-size: 14px;
    font-family:arial;
  }
  #menu{
    position: fixed;
    width: 100%;
    background: #ffffff; 
    z-index: 999;
  }
  .headerMenuContent{
    color: black;
    width: 100%;
    display: block;
    position: fixed;
    height: 0px !important;
  }
  .contenMenu ul{
    list-style:none;
  }
  #menu .contenMenu{
     /* overflow-y: scroll;*/
      height: 100%;
      position: fixed;
      width: 100%;
      background: #fff;
      top: 0px;
      text-align: left;
  }
  #menu .headerMenuContent .btn-close-menu{
    text-align: right;
    margin-right:20px;
    margin-top:7px;
  }
  .contenMenu  .optionMenu label p{
    margin-left: 10px;

  }
  .contenMenu  .optionMenu{
      padding-top: 20px;
      padding-bottom: 10px;
   }
   .contenMenu . .optionMenu{
       
        box-sizing: border-box;
   }
   .contenMenu  .optionMenu:last-child{
       
        box-sizing: border-box;
   }
  #abrir{
        background-color: #ffffff;
        transform: translate(0%,0%);
        transition-duration: 0.5s;
        position: fixed;
        width: 100%;
        top: 0px;
    }
  .contenMenu-subcategoria{
    position: fixed;
    top: 0px;
    background: #fff;
  }
  .cerrarMenu{
    animation-duration: 0.5s;
    animation-name: cerrarMenu;
    animation-fill-mode:forwards;
   }
  .abrirMenu{
    animation-duration: 0.5s;
    animation-name: abrirMenu;
    animation-fill-mode:forwards;
   }
  .cerrarMenuCategoria{
    animation-duration: 0.5s;
    animation-name: cerrarMenu;
    animation-fill-mode:forwards;
   }
  .abrirrMenuCategoria{
    animation-duration: 0.5s;
    animation-name: abrirMenu;
    animation-fill-mode:forwards;
   }
   .abrirMenuTipoProducto{
     animation-duration: 0.5s;
    animation-name: abrirMenu;
    animation-fill-mode:forwards;
   }
   .ocultoNormal{
     animation-name: cerrarMenu;
    animation-fill-mode:forwards;
   }
   .headerMenuContent .btn-close-menu{
     float:right;
     margin-right: 10px;
   }
    .headerMenuContent .btn-atras{
      float: left;
      margin-left: 10px !important;
      margin-top:07px;
   }
   .btn-atras:before{
     content:"<"
   }
   .headerMenuContent{
     padding: 10px 0px 40px 0px;
     background: #70578b;
     color:#fff;
   }

  .cerrarMenuTipoProducto{
    animation-duration: 0.5s;
    animation-name: cerrarMenu;
    animation-fill-mode:forwards;
   }
   @keyframes abrirMenu {
    from {
      margin:0 auto;
      transform: translate(-100%,0%);
      
      position: fixed;
      width: 100%;
      top: 0px;
    }

    to {
      margin:0 auto;
      transform: translate(0%,0%);
    
      position: fixed;
      width: 100%;
      top: 0px;
    }
}
   @keyframes cerrarMenu {
    from {
      margin:0 auto;
      transform: translate(0%,0%);
      transition-duration: 1.0s;
      position: fixed;
      width: 100%;
      top: 0px;
    }

    to {
      margin:0 auto;
      transform: translate(-100%,0%);
      transition-duration: 1.0s;
      position: fixed;
      width: 100%;
      top: 0px;
    }
}
   .contenMenu  .optionMenu .itemrow{
     float:right;
     margin-left:15.5px;
     width: 20px !important;
   }
   .listarTodo{  
    clear: both;
     color:red;
   }
 
   /*menu*/
   #menu #header-menu .container-header{
     display:flex;
     border-bottom: 1px solid #CCCCCC;
     overflow: auto;
     height: 75px;
     overflow-y: hidden;
     background: #ffff;
     justify-content: center;
    /* justify-content: center;*/
   }
   #menu #header-menu .container-header .colHeader{
      padding-top: 12px;
      width: 20%;
      padding-left:10px;
      padding-right: 10px;
   }
 
  
   #buscador i{
      float: right;
      position: relative;
      margin-left: -0px;
      margin-top: 0px;
      left: 0px;
      top: -30px;
   }
    #buscador input{
      width: 100%;
      height: 20px;
      border-radius: 20px;
      
      border-radius: 20px;
      padding-top: 8px;
      border: 0px solid #fff;
      background: #F1F1F1;
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
   #buscador{
      margin: auto !important;
      position: relative;
   }
   .colBuscador{
       width: 100%;

      overflow-y: hidden;

   }
   input:focus, input.form-control:focus {

    outline:none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}

.cursor-pointer{
    cursor:pointer;
}
#logo-menu{
  display:block;
}
 @media (min-width: 769px) {

    #logo-menu-mobile{
      display:none;
    }
      #menu #header-menu .container-header .colHeader{
      padding-top: 15px;
      width: 90px;
      padding-left: 15px;
      padding-right: 15px;
      float:left;
      
    }
    .headcheckout{
      width:50px;
    }
    /*LOGO ESTILOS*/
    .logo{
        width: 100px !important;
        height: 100px !important;
        margin: 0px !important;
        position: relative;
        top: 0px;
        width: 165px;
        height: 100% !important;
        left :0px;
   }
   .headcheckout{
      padding-top: 15px;
      width: 150px !important;
      
      padding-left: 20px;
      padding-right: 20px;
      float: left;
   }
   .card-header{
     width:120px !important;
     background: #ffffff;
   }
 

 }
  @media (max-width: 769px) {
    .iconFirstUser{
      display:none;
    }
    .inputSearch{
       display:none;
    }
    #searchInput{
      width: 100% !important;
    }
    .span-icon{
      display:none;
    }
    #logo-menu{
      display:none;
    }
    #logo-menu-mobile{
      display:block;
    }
    .b-icon{
      font-size: 24px;
    }
    .logo{
        width: 100px !important;
        height: 100px !important;
        margin: 0px !important;
        position: static;
        top: 0px;
        width: 165px;
        height: 100% !important;
        left :80px;
   }
   #menu #header-menu .container-header .colHeader{
      padding-top: 15px;
      width: 20%;
      padding-left: 20px;
      padding-right: 20px;
      margin:auto;
    }
    #buscador input{
      display:none;
    }
    #buscador i{
      float: right !important;
      position: relative !important;

      top: -5px;
    }
    #buscador {
     clear: both;
     top: 10px !important;
          /* top: -8px !important; */
     position: relative;
     padding-left: 0px !important;
     padding-right: 10px !important;
     
    }
    #header-menu .colHeader i{
      font-size: 24px;
     }
    .colHeader label{
      font-size: 10px !important;
    }
    .iconFirstUser{
      display:none;
    }
  }
  .colHeader{
    background:#ffffff !important; 
    border: none;
  }
  /*ESTILOS DEL LOGO*/


  /*ESTILOS PARA VUETYFY*/
 .icons-size{
   font-size:24px;
 }
 .v-toolbar__content{
    width: 95%;
    margin: auto;
 }
 .title-menu{
   cursor:pointer;

   padding-right:0px !important;
   margin-right:0px !important;
   width:120px !important;
   font-family:arial;
   font-size:10px;
 }
 .icons-close{
   background:red;
    border-radius: 50%;
    width: 40px;
    text-align: center;
    height: 40px;
    line-height: 40px !important;
    margin-left: 20px;
    margin-right: 6px;
    color: #fff;
    cursor:pointer;
 }
.numberItems{
  width:30px;
  height:30px;
  line-height:30px;
  color:#fff;
  background:red;
  display:block;
  border-radius:50%;
}

.span-menutitle{
    display: block;
    line-height: 13px;
    font-size: 13px!important;
}

.span-menutitle{
  font-weight:bold !important; 
}

.icons-close{
      width: 40px;
    height: 40px;
    border-radius: 50%;
}
.inputSearch{
    color: #333;
    max-width: 100%;
    width: 80% !important;
    width: calc(100% - 350px) !important;
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
    margin: 0px;
   
}
.content-head{
  width:100%;
  background:transparent !important;
  display: flex;
  margin:auto;
}
/*ESTILOS PARA EL SEARCH BUSCADO FIXED*/
 @media (min-width: 900px) {
   .head-ordinary-menu{
     display:block;
   }
   .head-mobil-menu{
     display:none;
   }
 }
 @media (max-width: 900px) {
   .head-ordinary-menu{
     display:none;
   }
   .head-mobil-menu{
     display:block;
   }
 }
</style>
