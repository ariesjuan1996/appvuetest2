<template>
    <header id="menuHeaderComputed" >
 
        <div id="contenMenu" style="height: 100%;"  v-bind:class="[abrirPrincipal===null ? 'contenMenu ocultoNormal'  :(abrirPrincipal===true ? 'contenMenu abrirMenu'  : 'contenMenu cerrarMenu' ) ]">
            <div class="headerMenuContent">
                <label for="menuCheck" class="btn-close-menu" style="float: right;width: 90%;cursor: pointer"><span style="font-size: 14px;
                    font-size: 14px;line-height: 2;width:60px"   @click=" $emit('accionPrincipal')">Cerrar X</span></label>

            </div>
            <div  class="contentcategorias" style="height: 100%; ">
                <ul class="listMenu" >
                    <li class="optionMenu"  v-for="(item,index) in listCategorias" @click="selectCategoria(item)" v-bind:key="index" > <label style="width: 100%;" for="menuCheck-categoria">
                    <p >{{item.titulo}}<span class="itemrow" >></span></p> </label></li>

                </ul>
            </div>
        </div>
        <div id="contenMenu-subcategoria" style="height: 100%;"  v-bind:class="[abrirListCategoria===null ? 'contenMenu ocultoNormal'  :(abrirListCategoria===true ? 'contenMenu abrirrMenuCategoria' : 'contenMenu cerrarMenuCategoria'  ) ]">
            <div class="headerMenuContent">
               <label class="btn-atras" for="menuCheck-categoria"><span style="width: calc(100% - 20px);">  atras</span></label>
               
               <label for="menuCheck-categoria" class="btn-close-menu"  v-on:click="$emit('accionPrincipal');/*false*/"><span>cerrar X</span></label>
            </div>

            <div class="contentcategorias" style="height: 100%; ">

                <ul class="listMenu" >

                <li class="optionMenu optionPrincipal"  >
                    <label   style="width: 100%;height: 40px;margin-bottom: 0px important;padding: 0px;margin: 0px;" >
                    <p style="margin-left:10px;width: 98% !important;text-align: left;font-weight: bold;"  @click="redirectPage('/'+categoriaSelect.titulo)">{{categoriaSelect ? categoriaSelect.titulo : null}}  <span class="listarTodo">listar todo</span></p> </label>
                </li>

                <li class="optionMenu"   v-for="(item,index) in (categoriaSelect ? categoriaSelect.subCategorias : [])" v-bind:key="index">
                    <label   style="width: 100%;height: 40px;margin-bottom: 0px important;padding: 0px;margin: 0px;" >
                    <p style="margin-left:10px;width: 98% !important;text-align: left;" @click="seleccionarTipo(item)" >{{item.titulo}}<span class="itemrow">></span></p> </label>
                </li>

                </ul>
            </div>
        </div>
        <div id="contenMenu-tipoProducto" style="height: 100%;"  v-bind:class="[abrirTipoProducto===null ? 'contenMenu ocultoNormal'  :(abrirTipoProducto===true ? 'contenMenu abrirMenuTipoProducto' : 'contenMenu cerrarMenuTipoProducto'  ) ]">
            <div class="headerMenuContent">
               <label class="btn-atras" for="menuCheck-tipoproducto" ><span style="width: calc(100% - 20px);"> atras</span></label>
               <label for="menuCheck-tipoproducto" class="btn-close-menu"  v-on:click=" $emit('accionPrincipal')/*false*/;$emit('accionListCategoria');/*false*/"><span style="text-aling:rigth">cerrar X</span></label>
            </div>

            <div  class="contentcategorias" style="height: 100%; ">
              <ul class="listMenu" >
                <li class="optionMenu optionPrincipal" style="border-bottom: 1px solid #dedede;"  >
                    <label   style="width: 100%;height: 40px;margin-bottom: 0px important;padding: 0px;margin: 0px;" >
                    <p style="margin-left:10px;width: 98% !important;text-align: left;font-weight: bold;" @click="redirectPage('/'+categoriaSelect.titulo+'/'+subCategoriaSelect.titulo)">{{subCategoriaSelect ? subCategoriaSelect.titulo : null}}<span class="listarTodo" style="color:red;">listar todo</span></p> </label>
                </li>
                <li  @click="redirectPage('/'+categoriaSelect.titulo+subCategoriaSelect.titulo+'/'+item.titulo)" class="optionMenu" style="border-bottom: 1px solid #dedede;"  v-for="(item,index) in (subCategoriaSelect ? subCategoriaSelect.subCategorias : [])" v-bind:key="index">
                    <label   style="width: 100%;height: 40px;margin-bottom: 0px important;padding: 0px;margin: 0px;" >
                    <p style="margin-left:10px;width: 98% !important;text-align: left;" >{{item.titulo}}</p> </label>
                </li>
              </ul> 
            </div>
        </div>
    </header>
</template>

<script>
import { requestApi } from "./../../api"

export default {
name: 'headerMobil',
data() {
  return {
    anchoPantalla:screen.width,
    activeBuscador:false,
    scrollTop:0,
    listCategorias:[],
    datos:[],
    categoriaSelect:null,
    subCategoriaSelect:null,
    selectIndexTipo:null
}
},
 props:{

   abrirTipoProducto:{
     type:Boolean,
     default:null
  },
  abrirListCategoria:{
     type:Boolean,
     default:null
   },
  abrirPrincipal:{
     type:Boolean,
     default:null
   },
   dataCategorias:{
      type: Array,
      default:() => ([

        ])
   }
 },
 components: {

  },
  watch:{
    abrirPrincipal(newVal){
      if(newVal){
        document.body.className  = "scrollnone";
        document.getElementById("app").classList.add("scrollnone");
        document.getElementById("app").classList.remove("scroll");
      }else{
        document.body.className  = "scroll";
        document.getElementById("app").classList.add("scroll");
        document.getElementById("app").classList.remove("scrollnone");
      }
    },
    anchoPantalla(newVal){
      
      if(newVal>900){
        this.activeBuscador=false;
      }
    },
    dataCategorias(newVal){
      this.listCategorias=newVal;
    }
  },
  methods: {
    async redirectPage(newVal){
      let redirecValue=newVal.split(" ").join("+");
      window.location.href ='/categoria'+redirecValue;
    },
    async abrirVentana(){
      if(screen.width<=900){
        this.activeBuscador=true;
      }else{
          this.activeBuscador=false;
      }
      console.log("this.activeBuscador",screen.width);
    },
    async cargarDataProductos(){
     try {
        let respon=await requestApi(
          `productos/listarCategoriasPadres`,
          {},
          "GET"
        );
        
        this.listCategorias=respon.data.estado ? respon.data.data : [];
      
        } catch (error) {
            console.log("error",error);
        }
    },
    posicionarMenu() {

    this.scrollTop=window.scrollY;

    },
    seleccionarTipo(newVal){

      //this.abrirTipoProducto=true;
      this.$emit("accionTipoProducto");
      //console.log("abrirTipoProducto",this.abrirTipoProducto)
      this.subCategoriaSelect=newVal;

    },
    cerrarTodo(){
      /*this.abrirListCategoria=true;
      this.abrirPrincipal=true;*/
      this.$emit('accionPrincipal');
      this.$emit('accionListCategoria');
      
    },
    selectCategoria(item){
     this.categoriaSelect=item;
    },
    cambiarTamanio(){
      this.anchoPantalla=screen.width;

    }
  },
  async mounted() {
    window.addEventListener('scroll', this.posicionarMenu);
    this.cargarDataProductos();
    window.addEventListener("resize", this.cambiarTamanio);
  }
}
</script>

<style>

html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

  .contenMenu ul{
    list-style:none;
  }
  .contentcategorias{
    width:100%;
  }
  .contentcategorias ul{
    list-style:none;
  }
    .contentcategorias ul li{
      text-align:left;
    }
    #menuHeaderComputed .contenMenu{
      height: 100%;
      position: fixed;
      width: 100%;
      background: #fff;
      top: 0px;
      text-align: left;
  }
  #menuHeaderComputed .headerMenuContent .btn-close-menu{
    text-align: right;
    margin-right:20px;
    height: 10px;
  }
  .contenMenu  .optionMenu label p{
    margin-left: 10px;

  }
  .contenMenu  .optionMenu{
      padding-top: 20px;
      padding-bottom: 10px;
      box-sizing: border-box;
   }
   .contenMenu . .optionMenu{
        border-top: 1px solid #e8e8e8;
      
        box-sizing: border-box;
   }
   .contenMenu  .optionMenu{
        border-bottom: 1px solid #e8e8e8;
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
      margin:0 auto;
      transform: translate(-100%,0%);

      position: fixed;
      width: 100%;
      top: 0px;
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
      width: 100%;
      display: block;
      z-index: 9;
   }

  .cerrarMenuTipoProducto{
    animation-duration: 0.5s;
    animation-name: cerrarMenu;
    animation-fill-mode:forwards;
   }
   #contenMenu-subcategoria .optionPrincipal{
     
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
   .contentcategorias li{
     list-style:none;
   }
   .contentcategorias li span{
     margin-left:15px;
   }
   /*menu*/


  
   input:focus, input.form-control:focus {

    outline:none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}
.listMenu{
    overflow-y: scroll;
    top: 50px !important;
    box-sizing: border-box;
    position: relative;

}
.contentcategorias{
  height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-bottom: 80px;

}
.scroll{
  /*    overflow-y: scroll;
*/}
.scrollnone{
    /*  overflow-y: hidden;
*/}
  @media (max-width: 769px) {
    
    

  
   
  }
</style>
