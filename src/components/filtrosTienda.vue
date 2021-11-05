<template>
    <v-container class="default  filter-products">
        <ul >
          <li  class="divider-departament" >
            <span >{{itemCategoria.titulo}}</span>
          </li>
          
          <h5  style="display:block;font-weight: bold;font-size:18px !important;cursor:pointer;">Categorías</h5>
          <ul >
            <li v-for="(valuesSubCategoria,indexSubNivel1)  in itemCategoria.subCategoria " v-bind:key="indexSubNivel1">
              <router-link :to="'/categoria/'+itemCategoria.titulo+'/'+valuesSubCategoria.titulo+queryMarca+queryRango" :class="categoria2==valuesSubCategoria.titulo.toLowerCase() ? 'select-active' : 'no-select' ">
              <span class="category-name"> {{valuesSubCategoria.titulo}}</span>
              <span class="quantity-icon">
                    {{valuesSubCategoria.cantidadProducto}}</span>
              </router-link>
              <ul v-if="categoria2==valuesSubCategoria.titulo.toLowerCase()">
                <li v-for="(valuesSubCategoria2,indexSubNivel2)  in valuesSubCategoria.subCategoria " v-bind:key="indexSubNivel2">
                  <router-link :to="'/categoria/'+itemCategoria.titulo+'/'+valuesSubCategoria.titulo+'/'+valuesSubCategoria2.titulo +queryMarca+queryRango" :class="categoria3==valuesSubCategoria2.titulo.toLowerCase().trim() ? 'select-active' : 'no-select' ">
                    <span class="category-name">
                      {{valuesSubCategoria2.titulo}}</span>
                    <span class="quantity-icon">
                    {{valuesSubCategoria2.cantidadProducto}}</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
            
        </ul>
        
        
    </v-container>
</template>

<script>
export default {
  name:"filtrosTienda",
  data() {
    return {
      isNumerico:/^\d+$/,
      search:' ',
      replaceWith:'_',
      activoFiltroMarca:false,
      activoFiltroPrecio:false,
      rangoPrecio:{
        minimo:"",
        maximo:""
      },
      listaFiltros:[],
      listaDataCategorias:[],
      seleccionCategoria:null
    };
  },
 components: {
 
  },
  props: {
    itemCategoria: {
      type: Object,
      default () {
        return {
          
        }
      }
    },
    titleCategory:String
  },

   methods: {

   },
    watch:{
    
    },
         
    computed:{
 
      categoria1(){
        return this.$route.params.titulocategoria1==undefined || this.$route.params.titulocategoria1==null ? "" : this.$route.params.titulocategoria1.split("-").join(" ").toLowerCase();
      },
      categoria2(){
        return this.$route.params.titulocategoria2==undefined || this.$route.params.titulocategoria2==null ? "" : this.$route.params.titulocategoria2.split("-").join(" ").toLowerCase();
      },
      categoria3(){
        return this.$route.params.titulocategoria3==undefined || this.$route.params.titulocategoria3==null ? "" : this.$route.params.titulocategoria3.split("-").join(" ").toLowerCase().trim();
      },
      queryRango(){
      return this.$route.query.precio==undefined ?  "" :("&precio="+this.$route.query.precio);
      },
      parametroMarca(){
        return this.$route.query.marca==undefined || this.$route.query.marca==null ? "" : this.$route.query.marca;
      },
      queryMarca(){
        return this.$route.query.marca==undefined || this.$route.query.marca==null ? "" : ("?marca="+this.$route.query.marca) ;
      },
      pathActual(){
       return this.$route.fullPath;
     },
    },
    async mounted() {
     

    }
};
</script>

<style>
body{
  background:rgb(246,246,246);
}
.select-active{
    color: #f50 !important;
}
.filter-products .category-name{
    display: inline-block;
    width: 67%;
}
.filter-products  .quantity-icon {
    float: right;
    position: relative;
    top: 2px;
}
.filter-products a {
    color: #666;
    font-family: Arial,Roboto,"-apple-system",Helvetica,sans-serif;
    font-size: 0.9rem !important;
    font-weight: 400;
    line-height: 20px;
    text-decoration: underline;
    cursor: pointer;
    font-family: Arial,Roboto,"-apple-system",Helvetica,sans-serif;
    font-size: 12px;
    text-decoration: none;
}
.divider-departament{
    border-bottom: solid 1px #ccc;
    border-color: #f50;
    color: #f50;
    font-family: Arial,Roboto,"-apple-system",Helvetica,sans-serif;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 12px;
    padding-bottom: 8px;
    padding-top: 8px;
    text-transform: initial;
}
.item-titulo-submenu {
  width:100%;
  display: flex;
}
.items-submenu-detalle{
  border-bottom: 1px solid rgb(204, 204, 204);
  padding-bottom:8px !important;
}

.item-titulo-submenu .item-titulo-submenu-text{
  color:#f50 !important;
  width:100%;
  padding:0px !important;
}
.item-detalle-submenu{
    width: 100%;
}
.item-detalle-submenu-precio{
  width: 50%;

}
.item-detalle-submenu-text{
  width:100%;
  margin-top: 20px;
}
.items-submenu-detalle-text{
  color:#000;
  padding:10px;
  display:block;
  width:100% !important;

}
.icon-menu{
  margin-top:20px;
}
.item-list-filtro{
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 350px;
}
.price-min-value {

    padding-right: 10px;
}
.form-label {
    color: #333;
}
.form-label {
    color: #666;
    font-family: Arial,Roboto,"-apple-system",Helvetica,sans-serif;
    font-size: .9rem;
    line-height: 20px;
    margin-bottom: 0;
}
.form-control {
    border: 1px solid #ccc;
    box-shadow: none;
    color: #333;
}
.form-control-xsm {
    border-radius: 3px;
    font-size: .9rem;
    height: 28px;
    padding: 0 8px;
}
.form-control {
    font-family: Arial,Roboto,"-apple-system",Helvetica,sans-serif;
    margin-bottom: 18px;
    margin-top: 6px;
}
.price-divider {
    background-color: #aaa;
    height: 2px;
    left: 50%;
    position: absolute;
    top: 48px;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    width: 8px;
}
.price-max-value {
    padding-left: 10px;
    padding-right: 0;
}
</style>
