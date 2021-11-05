<template>
 <v-container fluid  >
  <caruselPrincipal v-if="dataBanner.length" :items="dataBanner"/>
    <ul  :class="classMenuCategoria">
      <li v-for="(item,index) in categoriasPrimerNivel" v-bind:key="index">
        <router-link ref="menuScrool" :to="'#category'+index" :class="!cargo ? ( hasActive==('#category'+index)  ? 'acategoria acategoriaactive' : 'acategoria') : ( categoriasPrimerNivel[posicionMenu-1].id==item.id ? 'acategoria acategoriaactive' : 'acategoria')" v-scroll-to="{el: '#category'+index,offset: -105}"  >
          <img v-if="item.img!=null" class="icon-categoria" :data-src="item.img" alt="" :src="item.img"/>
          <span class="titulo-categoriaproducto">{{item.titulo}}</span>
          
        </router-link>
        
      </li>
    </ul>
    <cardCategory 
    
    v-for="(item,index) in listCategory" 
    :id="'category'+index"
    :item="item"
    v-bind:key="index" />
  <listadoMarcas :listado="listaMarca" />  
</v-container>

</template>


<script>

import { requestApi } from "@/api"
import cardCategory from '@/components/cardCategory.vue';
import caruselPrincipal from '@/components/caruselPrincipal.vue';
import listadoMarcas from '@/components/principal/listadoMarcas.vue';

import { mapGetters } from 'vuex';
export default {
 components: {
   cardCategory,
   caruselPrincipal,
   listadoMarcas,
  },
  props: {
  
  },
  data() {
    return {
      datosSistema:{},
      cargo:false,
      listaMarca:[],
      scrollTop:window.scrollY,
      categoriasPrimerNivel:[],
      listCategory:[],
      dataBanner:[],
      listadoCategoria:[],
      minimo:50,
      dimensionMovil:471,
      dimensionNoMovil:499,
      listImagePricipal:[
          {
              img:"https://plazavea.vteximg.com.br/arquivos/BANNERS-03-13-AGOSTO-DESKTOP-BODEGA.jpg"
          },
          {
              img:"https://plazavea.vteximg.com.br/arquivos/nf-MASCOTAS-D-11-19-jun-RO-10-2-100.jpg"
          },
          {
              img:"https://plazavea.vteximg.com.br/arquivos/D-PROMO-NESTLE.jpg"
          }
      ],
      
    };
  },
   methods: {
    async cargarDataProductos(){
        try {
        let respon=await requestApi(
            `productos/listarCategoriaProductoHome`,
            {},
            "GET"
        );
        
        let data=respon.data.estado ? respon.data.data : [];
        this.listCategory=data;
        this.$store.dispatch("products/ADD_PARENTCATEGORIESANDPRODUCTS", data);
       
        } catch (error) {
            console.log("error",error);
        }
    },
    async cargarCategorias(){
        try {
        let respon=await requestApi(
            `categorias/cargarCategoriaHome`,
            {},
            "GET"
        );
        
        let data=respon.data.estado ? respon.data.data : [];
        this.listadoCategoria=data;
       
        } catch (error) {
            console.log("error",error);
        }
    },
    async cargarBanner(){
        try {
        let respon=await requestApi(
            `categorias/cargarBanner`,
            {},
            "GET"
        );
        
        let data=respon.data.estado ? respon.data.data : [];
        this.dataBanner=data;
       
        } catch (error) {
            console.log("error",error);
        }
    },
    async cargarCategoriaPrimerNivel(){
      try {
         let respon=await requestApi(
            `categorias/cargarCategoriaPrimerNivel`,
            {},
            "GET"
          );
          let dataFiltro=respon.data.estado ? respon.data.data : [];
          this.categoriasPrimerNivel=dataFiltro;
          } catch (error) {
              console.log("error",error);
          }
    },
    async cargarMarca(){
      try {
         let respon=await requestApi(
            `marcas/cargarMarcasTienda`,
            {},
            "GET"
          );
          let dataFiltro=respon.data.estado ? respon.data.data : [];
          this.listaMarca=dataFiltro;
          } catch (error) {
              console.log("error",error);
          }
    },
    async cargarDatosSistema(){
      try {
         let respon=await requestApi(
            `sistema/cargarDatosSistema`,
            {},
            "GET"
          );
          let dataFiltro=respon.data.estado ? respon.data.data[0] : {};
          this.datosSistema=dataFiltro;
          } catch (error) {
              console.log("error",error);
          }
    },
    async posicionarMenu(){
      this.scrollTop=window.scrollY;
     }, 
   },
    computed:{
      posicionMenu(){
        return this.listCategory.length<parseInt(this.scrollTop/(this.minimo+this.dimensionMovil)+1) ? this.listCategory.length :parseInt(this.scrollTop/(this.minimo+this.dimensionMovil)+1);
      },
      hasActive(){
        return this.$route.hash;
      },
      ...mapGetters({
              dataCategorias: 'products/categoriayHijos',
      }), 
      classMenuCategoria(){
        if(this.scrollTop>=250){
          return "lista-categoriaproducto1 menu-categoria-fixed";
        }
        return "lista-categoriaproducto1";
      }
    },
    async mounted() {
     
     this.cargo=true;
    },
    async created(){
      await this.cargarDataProductos();
      await this.cargarCategoriaPrimerNivel();
      await this.cargarCategorias();
      await this.cargarMarca();
      this.posicionarMenu();
      await this.cargarBanner();
      window.addEventListener('scroll', this.posicionarMenu);
      if(this.$route.hash!=null){
       /*var options = {
          //container: this.$route.hash,
          easing: 'ease-in',
          lazy: false,
          offset:10,
          force: true
      }
      this.$scrollTo(this.$route.hash, 0, options);*/
    }

      
   }
};
</script>

<style lang="scss">


/*HOLA **/
 .lista-categoriaproducto1{
     display: flex;
     background:#063644 !important;
     height: 56px;
     align-items: center;
     margin: 0;
     height: 100%;
     justify-content: center;
     margin-top: 44px;
     padding-left:0px !important;
 }
 .lista-categoriaproducto1 li{
    width: 215px !important;
    display:block;
    height: 56px;
 }
 .carusel-app{
    position: relative;
    top: 40px;
 }
 .lista-categoriaproducto li:nth-child(n+1){
    cursor:pointer; 
 }
  .lista-categoriaproducto li:first-child{
    margin-left:0px;
  }
  .lista-categoriaproducto li:hover{
      background:red !important;
      cursor:pointer !important;
  }
  .lista-categoriaproducto li a:hover{
     background:red !important;
     cursor:pointer !important;
  }
    .lista-categoriaproducto li a:hover img{
       cursor:pointer;
    }
  .lista-categoriaproducto li:hover .titulo-categoriaproducto {
    color:#fff !important;
  }
  img:hover{
    cursor:pointer !important;
  }
  .titulo-categoriaproducto{
    display: block;
    font-size: 12px !important;
    width: 100% !important;
    text-align: left;
    color: #fff;
    position: relative;
    line-height: 44px;
    margin-left:10px;
  }
  .lista-categoriaproducto li a {
    text-decoration: none;
  }

  .lista-categoriaproducto li{
    width: 115px !important;
    height:56px !important;
  }
  .icon-categoria{
    height:32px !important;
    width: 28px !important;
    display: block;
    margin: auto;
    margin-left: 15px;
  }
  .lista-categoriaproducto{
    overflow-x: scroll !important;
    margin-top: 40px !important;
  }
  
  .acategoria{
    margin: auto;
    margin-left:0px !important;
    margin-top:10px;
    display: flex;
    height: 100%;
    margin: 0px;
    text-decoration: none !important;
    
  }
  .acategoriaactive{
    background:red;

  }
  .acategoriaactive .titulo-categoriaproducto{
    color:#fff !important;
    line-height: 51px;
    text-align: left;
    margin-left: 10px;
  }
  .menu-categoria-fixed{
    position:fixed;
    width: 100% !important;
    top: 49px !important;
    height: 56px !important;
    z-index:999;
    right: 0px;
    margin-top: 0px !important;
  }
  .card-col .v-image .v-image__image{
    height: 120px;
  }
  .slick-track{
    height: 250px;
  }
  .text-content-item{
    font-size:12px;
  }
  .imgproducto{
    height:150px;
  }

@media screen and (max-width: 600px) {
  .text-content-item{
    height:100px;
  }
  .text-content-item{
    position: relative;
    top: -64px !important;
  }
} 
</style>
