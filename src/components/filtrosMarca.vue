<template>
    <v-container class="default  filter-products">
        <ul>
          <li>
            <div  v-if="permitirLimpiar" class="item-titulo-submenu">
              <p class="item-titulo-submenu-text" style="width:100% !important;display:block;">Filtros</p>
              <a style="width: 100%;text-align: right;color :#666;text-decoration: underline;" @click="limpiarFiltros">Limpiar Filtros</a>
            </div>
            <div  class="items-submenu-detalle">
              <div  class="items-submenu-detalle-titulo" style="display:flex;">
                <h5  class="items-submenu-detalle-text" style="display:block;font-weight: bold;font-size:18px !important;cursor:pointer;" @click="activoFiltroMarca=!activoFiltroMarca;">Marca</h5>
               <v-icon class="icon-menu">
                 {{activoFiltroMarca ? mdiChevronUp  : mdiChevronDown  }} </v-icon></div>
                  <ul v-if="activoFiltroMarca" class="item-list-filtro">
                    <li class="item-detalle-submenu" style="display:flex;width:100%;" v-for="(item,index) in listMarca" v-bind:key="index">
                      <v-checkbox
                        color="red"
                        v-model="item.seleccionadoMarca"
                        :value="item.id"
                        @click="seleccionarMarca(item.id)"
                      ></v-checkbox>
                      <span class="item-detalle-submenu-text">{{item.titulo.toUpperCase()}}  <span class="numeroDisponible">({{item.cantidadproducto}})</span></span>
                     
                     
                    </li> 
                  </ul>
              </div>
            
            <div  class="items-submenu-detalle">
              <div  class="items-submenu-detalle-titulo" style="display:flex;">
                <h5  class="items-submenu-detalle-text"  style="display:block;font-weight: bold;font-size:18px !important;cursor:pointer;"  @click="activoFiltroPrecio=!activoFiltroPrecio;">Precio</h5>
               <v-icon class="icon-menu">
                 {{activoFiltroPrecio ? mdiChevronUp  : mdiChevronDown  }}</v-icon></div>
                 <ul v-if="activoFiltroPrecio" class="item-list-filtro" >
                  
                  <div style="display:flex;" >
                      <div  style="width: calc( 50% - 10px );display:block;" >
                        <label>Desde</label>
                        <input style="border: 1px solid #ccc;width:100%;background:#F7F7F7 !important;" type="number" v-model="rangoPrecio.minimo"/>
                      </div>
                      <div style="width:20px;display:block;color :#aaa;text-align: center;font-size:20px;margin-top: 22px;">-</div>
                      <div  style="width: calc( 50% - 10px );display:block;" >
                        <label>Hasta</label>
                        <input style="border: 1px solid #ccc;width:100%;background:#F7F7F7 !important;" type="number" v-model="rangoPrecio.maximo" />
                      </div>
                    </div>
                    <li style="margin-top:7px !important;">
                      <v-btn outlined @click="establecerPrecio()">Establecer</v-btn>
                    </li>
                 </ul>
              </div>
          </li>
      
        </ul>
        
    </v-container>
</template>

<script>
import { mdiChevronDown } from '@mdi/js';
import { mdiChevronUp } from '@mdi/js';
export default {
  name:"filtrosMarca",
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
      seleccionCategoria:null,
      mdiChevronDown,
      mdiChevronUp
    };
  },
 components: {
 
  },
  props: {
    listMarca: Array
  },

   methods: {
     async limpiarFiltros(){
        if(!(this.precioRango=="" && this.parametroMarca=="" ) ){
          this.$router.push({ path:this.$route.path,query: { marca: "",precio : "" } });

        }
     },
     async establecerPrecio(){
      this.$emit("establecerPrecio",[this.rangoPrecio.minimo,this.rangoPrecio.maximo]);
     },
     seleccionarMarca(){
       let marcaSeleccionada=this.listMarca.filter((value)=>{
         return value.seleccionadoMarca!=null || value.seleccionadoMarca!=undefined;
       });
       let listId=[];
       marcaSeleccionada.map((value)=>{
         listId.push(value.id);
       });
       this.$emit("marcasSeleccionada",listId);
     }
   },
    watch:{
      pathActual(){
        this.rangoPrecio.minimo=this.precioMinUrl;
        this.rangoPrecio.maximo=this.precioMaxUrl;
      },
      parametroCategorias(newVal){
        this.seleccionCategoria=newVal;
      }
    },
         
    computed:{
      permitirLimpiar(){
        return !(this.precioRango=="" && this.parametroMarca=="" );
      },
      precioRango(){
        return this.$route.query.precio==undefined ?  "" :this.$route.query.precio;
      },
      precioMinUrl(){
        return this.$route.query.precio==undefined ?  "" :(this.$route.query.precio.split("-")[0]==null ? "" : (this.isNumerico.test(this.$route.query.precio.split("-")[0]) ? this.$route.query.precio.split("-")[0] :"" )   );
      },
      precioMaxUrl(){
        if(this.$route.query.precio==undefined){
          return "";
        }
        if(this.$route.query.precio.split("-").length==2){
          return this.$route.query.precio==undefined ?  "" :(this.$route.query.precio.split("-")[1]==null ? "" : (this.isNumerico.test(this.$route.query.precio.split("-")[1]) ? this.$route.query.precio.split("-")[1] :"" )   );
        }else{
            return "";
        }
      },
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
      this.rangoPrecio.minimo=this.precioMinUrl;
      this.rangoPrecio.maximo=this.precioMaxUrl;

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
  margin-top: 10px;
}

.items-submenu-detalle-text{
  color:#777;
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
  position: relative;
  left: -13px;
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
span{
  font-family: 'Rubik', sans-serif;
}
.numeroDisponible{
  position: absolute;
  right:0px;
}
</style>
