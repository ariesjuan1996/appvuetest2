<template>
    <div class="container content-filter">
          <v-dialog
            v-if="esMobil" 
            class="dialogCategoria"
            style="z-index: 999999999999 !important;"
            v-model="esFiltroCategoria"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card >
              <div v-if="esFiltroCategoria" class="lista-categorias">
                <p class="close-filtro" style="width:auto;float: right;" @click="esFiltroCategoria=false">X</p> 
                <filtrosTienda
                  v-if="esFiltroCategoria "
                  ref="filtrosTienda"
                  :itemCategoria="filtroCategoria"/>
              </div>
            </v-card>
          </v-dialog>
          <v-dialog
            class="dialogfiltro"
            style="z-index: 999999999999 !important;"
            v-model="dialogFiltro"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card >
              <div class="filtros">
                <p class="titulo-filtro" style="width:100%">Filtros</p>
                <p class="close-filtro" style="width:auto" @click="dialogFiltro=false">X</p></div>

                <filtrosMarca
                  ref="filtros"
                  :listMarca="filtroMarca" 
                  @marcasSeleccionada="marcasSeleccionada"
                  @establecerPrecio="establecerPrecio"/>
            </v-card>
          </v-dialog>
          <v-dialog
            class="dialogfiltroOrden"
            style="z-index: 999999999999 !important;"
            v-model="dialogFiltroOrden"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card >
              <div class="filtros">
                <p class="titulo-filtro" style="width:100%" >Ordenar</p>
                <p class="close-filtro" style="width:auto" @click="dialogFiltroOrden=false">X</p></div>
                 <v-radio-group v-model="selectedTipoOrden">
                  <v-radio
                     v-for="(item,index) in tipoOrdenamiento" 
                    :key="index"
                    :label="item.titulo"
                    :value="item"
                     
                  ></v-radio>
                </v-radio-group>

            </v-card>
          </v-dialog>
          <v-snackbar
          
            v-model="openMessage"
            :multi-line="multiLine"
            >
            {{ menssage }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="#000"
                text
                v-bind="attrs"
                v-on:click="openMessage=!openMessage"
                >
                cerrar
                </v-btn>
            </template>
            </v-snackbar>
              <v-navigation-drawer
              v-model="drawer"
              absolute
              right
              temporary
              >
                <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title titlefilter">
                          FILTRAR:
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
        
       
        </v-navigation-drawer>
        <div class="nav-progress">
              <v-breadcrumbs class="list-breadcrumbs" :items="rutasCategorias">
                <template v-slot:item="{ item }">
                  <v-breadcrumbs-item
                    clas="text-v-breadcrumbs"
                    :href="'/categoria/'+item.to+queryMarca+queryRango"
                  >
                    {{ item.text.split("+").join(" ")}}
                  </v-breadcrumbs-item>
                </template>
              </v-breadcrumbs>
        </div>
      <div class="lighten-5 rowsContent fillterNormal">
         <v-row
            class="mb-12"
            no-gutters
            >
             <v-col
              :lg="3"
              :md="3"
              :sm="12"
              class="content-col-producto"
            >
            
              <filtrosTienda
                v-if="!esMobil" 
                ref="filtros"
                :itemCategoria="filtroCategoria"/>
              <filtrosMarca
                  ref="filtrosMarca"
                  v-if="!esMobil"
                  :listMarca="filtroMarca" 
                  @marcasSeleccionada="marcasSeleccionada"
                  @establecerPrecio="establecerPrecio"/>
            </v-col>
            
            <v-col
              :lg="productosDisponibles.length>0 ? 9  : 9"
              :md="9"
              :sm="12"
              :cols="12"
            >
            <v-container class="container-fluid"   >
              <v-row
                  class="mb-12"
                  no-gutters
                >
                <v-col 
                  :lg="12"
                  :md="12"
                  :sm="12" >
                    <strong style="font-size:1.5em;">{{categoriaSeleccionada.split("+").join(" ")}}</strong>
                    <v-divider/>
  
                      <v-container fluid class="content-producto">
                      <v-row  v-if="!esMobil">
                        <v-col :cols="cantidadProducto>0 ? 2 : 12">
                          <div class="content-cantidad-producto">
                            <p v-if="cantidadProducto>0">Encontramos {{cantidadProducto}}</p>
                            <p v-else>{{mensajeNoEncontrado}}</p></div>
                        </v-col>
                        <v-col cols="6"></v-col>
                          <v-col v-if="cantidadProducto>0" cols="4">
                            <div class="tipo-vistas" style="float: left;margin-top: 10px;">
                                <v-select
                                  style="width:100% !important;"
                                  v-model="selectedTipoOrden"
                                  :items="tipoOrdenamiento"
                                  label="Ordenar por"
                                  outlined
                                  item-text="titulo"
                                  item-value="codigo"
                                  return-object
                              ></v-select>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row :class="classRowFiltro"  v-else>
                          <v-col class="border-grid item-vista" cols="4" @click="esFiltroCategoria=!esFiltroCategoria;">
                            <p>Categorias</p>
                            
                          </v-col>
                          <v-col class="border-grid item-vista" cols="4"  @click="dialogFiltroOrden=true">
                              <p>Ordenar</p>
                            </v-col>
                            <v-col class="border-grid item-vista" cols="4" @click="dialogFiltro=true">
                              <img style="width:20px !important;height: 20px !important;top: 12px !important;" :src="icons.filter"/>
                              <p class="">Filtro</p>
                            </v-col>
                        </v-row>                        
                        <v-divider/>
                        <v-container  class="container-fluid">
                          <v-row>
                            <v-col  
                              v-for="(item,index) in productosDisponibles" v-bind:key="index"
                              class="itemdetalleproducto"
                              :lg="4"
                              :md="4"
                              :sm="6"
                              :cols="12">
                              <div class="detail-container">
                                <v-img class="img-producto" style="height: 250px !important;" :src="item.img" />
                                <a :href="'/producto/'+item.titulo" style="color: #000 !important;"><span class="txt-marca">{{item.marca}}</span>
                                <span class="txt-producto" >{{item.titulo}} </span></a>
                                <span class="txt-precio-original">{{logoMoneda}} {{item.precioVenta}}</span>  
                                <span class="txt-precio">{{logoMoneda}} {{(parseFloat(item.precioVenta)*(1-parseFloat(item.porcentajeDescuento)/100) ).toFixed(2) }}</span>
                                  <v-btn
                                  v-if="item.cantidadProducto==0 "
                                  depressed
                                  class="btnAgregar"
                                  color="#ee3037"
                                  style="color:#fff !important;width:100% !important;"
                                  @click="anadirProducto(item)"
                                  >
                                    Agregar
                                  </v-btn>  
                                  <div class="inputbtncantidad" v-else>
                                    <span class="btn-accion btn-menos" @click="sumarCantidadProducto(item,-1)">{{item.editProducto ? 'Cancelar' : '-' }}  </span>
                                      <v-text-field disabled type="text" class="inputCantidad" v-model="item.cantidadProducto" :data-idProducto="item.id" :data-stock="item.stock" @focus="onFocus(item)"  />
                                     <span class="btn-accion btn-mas" @click="sumarCantidadProducto(item,1)">{{item.editProducto ? 'Aceptar' : '+' }}</span>
                                  </div>
                              </div>

                            </v-col></v-row>
                        </v-container>
                        <template>
                        <div class="text-center">
                          <v-pagination
                            v-model="page"
                            :length="cantidadPaginas"
                            :total-visible="7"
                          ></v-pagination>
                        </div>
                      </template>
                      </v-container>
                                  
                    
                </v-col>   
                </v-row>
                 
                </v-container>
            </v-col>
          </v-row>
        </div>
    </div>
</template>


<script>
import filtrosMarca from "@/components/filtrosMarca.vue"

import filtrosTienda from "@/components/filtrosTienda.vue"

import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { requestApi } from "@/api/index.js"
import forSquare from "@/assets/svg/checkbox-unchecked.svg"
import grid from "@/assets/svg/grid.svg"
import menu from "@/assets/svg/menu.svg"
import filter from "@/assets/svg/filter.svg"
export default {
 name:"contentFilter",
 components: {
    filtrosTienda,
    filtrosMarca
  },
  data() {
    return {
     categoriasPrimerNivel:[],
     esNumerico:new RegExp('^\\d+$'),
     page:1,
     cantidadPaginas:1, 
     logoMoneda:"S./",
     dialogFiltroOrden:false,
     selectedTipoOrden:{
         "titulo":"(Precio) Menor Precio",
         "codigo":"price_asc"
     },
     esFiltroCategoria:false,
     esmobilTipoFiltro:"",
     scrollTop:window.scrollY, 
     dialogFiltro:false,
     isNumerico:/^\d+$/,
     multiLine:true,
     mensajeNoEncontrado:" No se encontró resultados ",
     menssage:"El producto se agregó al carrito.", 
     openMessage:false,     
     drawer:false,
     transition: 'scale-transition',
     search:' ',
     replaceWith:'+',
     titleCategory:'',
     filtroCategoria:{},
     filtroMarca:[],
     productoFocus:[],
     icons: {
      forSquare,
      grid,
      menu,
      filter
     },
     tipoOrdenamiento:[
       {
         "titulo":"(Precio) Menor Precio",
         "codigo":"price_asc"
       },
       {
         "titulo":"(Precio) Mayor Precio",
          "codigo":"price_desc"
       },
       {
         "titulo":"(Titulo) Ordenar Ascendientemente Producto",
          "codigo":"titulo_asc"
       },
       {
         "titulo":"(Titulo) Ordenar Descendentemente Producto",
          "codigo":"titulo_desc"
       }
     ],
     tipoVista:1,
     listaProductos:[],
     rangoPrecioDefault:{
       minimo:"0",
       maximo:"999999"
     },
     screenWidth:screen.width
    };
  },
  computed:{
     paginaActiva(){ 
       return !this.esNumerico.test(this.$route.query.page) ? 1 :parseInt(this.$route.query.page);
     },
     classRowFiltro(){
       return this.scrollTop<400 ? "rowfiltromobil" : "rowfiltromobil rowfiltromobilfixed";
     },
     esMobil(){
       if(this.screenWidth>756){
         return false;
       }
       return true;
     },
     itemPrecioFiltro(){
       return this.precioRango;
     },
     permitirLimpiar(){
        return !(this.precioRango=="" && this.parametroMarca=="" );
    },
    sortBy(){
      return this.$route.query.sortBy==undefined ?  "" :(this.$route.query.sortBy==null ? "" :  this.$route.query.sortBy  );
    },
    precioMinUrl(){
      return this.$route.query.precio==undefined ?  "" :(this.$route.query.precio.split("-")[0]==null ? "" : (this.isNumerico.test(this.$route.query.precio.split("-")[0]) ? this.$route.query.precio.split("-")[0] :"" )   );
    },
    precioMaxUrl(){
      if(this.$route.query.precio.split("-").length==2){
        return this.$route.query.precio==undefined ?  "" :(this.$route.query.precio.split("-")[1]==null ? "" : (this.isNumerico.test(this.$route.query.precio.split("-")[1]) ? this.$route.query.precio.split("-")[1] :"" )   );
      }else{
          return "";
      }
    },
    path(){
      return this.$route.path;
    },
    precioRango(){
      return this.$route.query.precio==undefined ?  "" :this.$route.query.precio;
    },
    marcasSeleccionadas(){
     return this.$route.query.marca==undefined || this.$route.query.marca==null ? "" : (this.$route.query.marca) ;
    },
    
    queryRango(){
      return this.$route.query.precio==undefined ?  "" :("&precio="+this.$route.query.precio);
    },
    queryMarca(){
        return this.$route.query.marca==undefined || this.$route.query.marca==null ? "" : ("?marca="+this.$route.query.marca) ;
    },
    cantidadProducto(){
      return this.listaProductos.length;
    },

    codigosMarcas(){
      return this.$route.query.marca==undefined ? "" :this.$route.query.marca ;
    },
    rutasCategorias(){
      let dataArray=[];
      if(this.categoria1!=""){
        dataArray.push({
          to:this.categoria1,
          text:this.categoria1.split("-").join(" ")
        });
      }
      if(this.categoria2!=""){
        dataArray.push( {
          to:this.categoria1+"/"+this.categoria2,
          text:this.categoria2.split("-").join(" ") 
        });
      }    
      if(this.categoria3!=""){
      
        dataArray.push( {
          text:this.categoria3.split("-").join(" "),
          to:this.categoria1+"/"+this.categoria2+"/"+this.categoria3
        } );
      }       
      return dataArray; 
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
    categoriaSeleccionada(){
        if(this.categoria3!=""){
           return this.categoria3.split("-").join(" ").toUpperCase();
        }
        if(this.categoria2!=""){
           return this.categoria2.split("-").join(" ").toUpperCase();
        }
        return this.categoria1.split("-").join(" ").toUpperCase();
    },
    parametroCategorias(){
      return this.$route.query.categoria==undefined || this.$route.query.categoria==null ? "" : this.$route.query.categoria;
    },
    parametroMarca(){
      return this.$route.query.marca==undefined || this.$route.query.marca==null ? "" : this.$route.query.marca;
    },
     pathActual(){
       return this.$route.fullPath;
     },
    ...mapState('products', ['productosDisponibles']),
    ...mapState('products', ['filters']),
    ...mapGetters({
        productFilter: 'products/productFilter'
      }),
    ...mapGetters({
            getProductSelectWatch: 'products/getProductSelectWatch'
    }), 
     parameterQuery(){
       return this.$route.params;
     }
  },
   watch:{
     page(newVal){
      //this.$router.push({ path:this.path, query: { page: this.paginaActiva } });
     
      if(newVal!=null){
        if(newVal!=this.paginaActiva){
          this.$router.push({ path:this.path,query: { page: newVal  } });
          
        }

      }
     },
     async selectedTipoOrden(newVal){
       if(newVal!=null){
          await  this.$router.push({ path:this.path,query: { marca: this.codigosMarcas,precio : this.precioRango,sortBy:newVal.codigo } });
       }else{
          await  this.$router.push({ path:this.path,query: { marca: this.codigosMarcas,precio : this.precioRango,sortBy:this.tipoOrdenamiento[0].codigo } });
       }
      this.dialogFiltroOrden=false;
      //await this.cargarProducto();

     },
     async pathActual(){
        this.esFiltroCategoria=false;
        await this.cantidadPagina();
        this.page=this.paginaActiva;
        await  this.cargarInit();
        //alert("cargar limpiar");
        this.dialogFiltro=false;
     }
    },
   methods: {
    async onFocus(newVal){
      await this.$store.dispatch("products/ONFOCUS", {producto : {id :newVal.id,tempCantidad :newVal.cantidadProducto}} );
      await this.$forceUpdate();
    },
    async  ordenar(){
       if(this.selectedTipoOrden!=null){
          this.$router.push({ path:this.path,query: { marca: this.codigosMarcas,precio : this.precioRango,sortBy:this.selectedTipoOrden.codigo } });
       }else{
          this.$router.push({ path:this.path,query: { marca: this.codigosMarcas,precio : this.precioRango,sortBy:this.tipoOrdenamiento[0].codigo } });
       }
     },
     async limpiarFiltros(){
        if(!(this.parametroMarca=="" && this.precioRango=="")){
          this.$router.push({ path:this.path,query: { marca: "",precio : "",sortBy:this.sortBy } });
        }
     },
    async establecerPrecio(precioMinMax){
      let rangePrecio=precioMinMax.join("-");
      if(!(this.precioMinUrl==precioMinMax[0] && this.precioMaxUrl==precioMinMax[1])){
        await  this.$router.push({ path:this.path,query: { marca: this.codigosMarcas,precio : rangePrecio,sortBy:this.sortBy } });
        //await location.reload();
      }
    },
    async marcasSeleccionada(listTemp){
       let path=this.$route.path;
       await this.$router.push({ path:path , query: { marca: listTemp.join(","),precio:this.precioRango,sortBy:this.sortBy } });
       //await location.reload();
     },
     limitText(valueText){
       return  (valueText.length>50 ? (valueText.substring(0,50)+"...") : valueText);
     },
     posicionarMenu(){
      this.scrollTop=window.scrollY;
     },
     async listarCategoria(){
        try {
         let respon=await requestApi(
            `categorias/cargarFiltrosCategoriasPorMarca?tituloCategoria=${this.$route.params.titulocategoria1}&idMarcas=${this.parametroMarca}&precios=${this.precioRango}`,
            {},
            "GET"
          );
          let dataFiltro=respon.data.estado ? respon.data.data[0] : [];
          this.filtroCategoria=dataFiltro;
          console.log("filtroCategoria",this.filtroCategoria);
          } catch (error) {
              console.log("error",error);
          }
     },
     async listarMarca(){
        try {
         let respon=await requestApi(
            `marcas/cargarMarcasPorCategorias?tituloCat1=${this.categoria1}&tituloCat2=${this.categoria2}&tituloCat3=${this.categoria3}&precios=${this.precioRango}`,
            {},
            "GET"
          );
          let dataFiltro=respon.data.estado ? respon.data.data : [];
          this.filtroMarca=dataFiltro;
          let arrayMarca=this.parametroMarca.split(",");
          arrayMarca.map((value)=>{
            this.filtroMarca.forEach((valueMarca)=>{
              if(valueMarca.id==value){
                valueMarca.seleccionadoMarca=parseInt(value);   
              }
            });  
          });
          } catch (error) {
              console.log("error",error);
          }
     },     
     async cargarProducto(){
      try {
         let respon=await requestApi(
            `productos/listarProductoPublico?tituloCategoria=${this.categoriaSeleccionada}&idMarcas=${this.parametroMarca}&precios=${this.precioRango}&orden=${this.selectedTipoOrden.codigo}&pagina=${this.page}`,
            {},
            "GET"
          );
          let dataFiltro=respon.data.estado ? respon.data.data : [];
          this.listaProductos=dataFiltro;
          this.$store.dispatch("products/SET_PRODUCTO", dataFiltro);
          } catch (error) {
              console.log("error",error);
          }
    },
    async cantidadPagina(){
      try {
         let respon=await requestApi(
            `productos/cantidadPaginasProductoPublico?tituloCategoria=${this.categoriaSeleccionada}&idMarcas=${this.parametroMarca}&precios=${this.precioRango}&orden=${this.selectedTipoOrden.codigo}`,
            {},
            "GET"
          );
          let dataFiltro=respon.data.estado ? respon.data.data : 1;
          this.cantidadPaginas=dataFiltro.cantidadPagina;
          } catch (error) {
              console.log("error",error);
          }
    },
    async establecerOrden(){
      await  this.$router.push({ path:this.path,query: { marca: this.codigosMarcas,precio : this.precioRango,sortBy:this.sortBy } });
      
    },
    async cargarInit(){
      this.$store.dispatch("global/LOADEROPENORCLOSE",{});
      await this.listarCategoria();
      await this.listarMarca();
      await this.cargarProducto();
       this.$store.dispatch("global/LOADEROPENORCLOSE",{});
    },
    async cambiarTamanio(){
      this.screenWidth=screen.width;
    },
    async anadirProducto(producto){
      await this.$store.dispatch("products/ANADIRPRODUCTO", producto);
      await this.$forceUpdate();
    },
    async sumarCantidadProducto(producto,cantidad){
      if(producto.editProducto && cantidad==-1){
        await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto : {id :producto.id},cantidad:1} );
        await this.$forceUpdate();
        await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto : {id :producto.id},cantidad:producto.tempCantidad} );
        await this.$forceUpdate();
        return false;
      }

      if(producto.editProducto){
        console.log("producto:",parseFloat(producto.stock)>=parseFloat(producto.cantidadProducto));
        if(parseFloat(producto.stock)>=parseFloat(producto.cantidadProducto)){
          await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto,cantidad:producto.cantidadProducto});
          await this.$forceUpdate();  
        }else{
          console.log("producto.stock",producto.stock);          
          await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto,cantidad:1});
          await this.$forceUpdate();
          await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto,cantidad:producto.stock});
          await this.$forceUpdate();
        }
        
        return false;
      }else{
        await this.$store.dispatch("products/SUMARCANTIDADPRODUCTO", {producto,cantidad});
        await this.$forceUpdate();
      }
    },
      async sumarCantidad(newVal){
        await this.$forceUpdate();
        let cantidad=newVal.cantidadProducto;
        let stock=newVal.stock;
        if(cantidad==0){
           await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto : {id :newVal.id},cantidad:0} );
           await this.$forceUpdate();
        }else{
          if(parseFloat(stock)>=parseFloat(cantidad)){
            await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto : {id :newVal.id},cantidad:cantidad} );
            await this.$forceUpdate();
          }else{
            await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto : {id :newVal.id},cantidad:stock} );
            await this.$forceUpdate();
          }
          
        }

    }, 
  },
  async mounted() {
      window.addEventListener("resize", this.cambiarTamanio);
      window.addEventListener('scroll', this.posicionarMenu);
      await this.cantidadPagina();
      this.page=this.paginaActiva;
      await this.cargarInit();
      
  }
};
</script>

<style>

.detail-container{
  background-color:#fff;
}
.content-filter{
    margin-top:55px;
}
.tipo-vistas{
    display: flex;
    justify-content: center;
    width:15em;
    float:right;
}
.icons-tipo-vistas{
  margin:5px;
  font-size:32px;
  cursor:pointer;
}

.item-vista p{
    margin-top: 0px !important;
    color:#000 !important;
    text-align: left;
}
.label-icon-vistas{
  margin-top:10px;
}
.content-cantidad-producto{
  margin-top:20px;
}

.tipo-ordenamiento{
  display:flex;
  justify-content:center;
}
.text-ordenamiento{
  width:35% !important;
  margin-top:20px;
}
.content-producto,.container{
  padding: 10px !important; 
}
.content-producto .row{
    width: 100%;

}
.content-producto .col {
  padding:0px !important;
}
.icons-tipo-vistas-active{
  color:#000 !important;
}


.imagen-text{
    display: flex;
    width:100% !important;
}
.txt-producto{
  width:100% !important;
  text-align: left;
  font-size: 1rem;
  line-height: 1.5rem;
  height: 45px !important;
  display:block;

}
.button-ver{
  width:100% ;
  color:#fff  !important ;
  background-color:#f50 !important ;
}

.txt-precio{
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.4rem;
    color: #ea2840;
    display:block;
}

.container-fluid1{
    margin-bottom: 24px;
    min-height: 150px;
    padding-bottom: 12px;
    padding-top: 24px;
}
 .detail-container{
    margin: 0 auto;
    max-width: 100% !important;
}
.detail-container{
  cursor:pointer;
}
.detail-container .txt-producto:hover{
  text-decoration-line: underline;
}
.container-fluid .img-producto{
    background-color: #eee;
    min-height: 100% !important;
    height:250px !important;
    max-width: 100% !important;
    width: 100% !important;
    cursor:pointer;

}
.txt-precio-original{
  color: #aaa;
  font-size: 1rem;
  line-height: 1.3rem;
  text-decoration: line-through;
  width:100% !important;
  display:block;
}
.lista-filtros> .lista-filtros-item{
  float:left;
}
.btnAgregar{
  border-radius:20px !important;
}
.txt-marca{
  font-weight:bold;
}
.detail-container{
  cursor:pointer;
  padding: 10px;
}
.v-main__wrap{
   background-color:#F6F6F6 !important;

}
,.rowfiltromobil img{
    position: relative;
    top: 15px;
}
.rowfiltromobil p{
    line-height: 50px !important;
    margin-left: 10px !important;
  }
@media screen and (max-width: 756px) {
  .detail-container{
    cursor:pointer;
  }
  .container-producto{
    display:block;
  }
  .filtros{
    display:flex;
  }
  .icons-tipo-vistas{
    position: absolute;
    margin-left: 0px !important;
    font-size:32px;
    cursor:pointer;
  }
  .lista-filtros::-webkit-scrollbar-thumb {
      background-color: #EEEEEE;
      border-radius: 12px;
  }
  .lista-filtros::-webkit-scrollbar{
      width: 8px;
  }
  .lista-filtros{
    display:flex;
    overflow-x: scroll;
    scrollbar-width: thin;
  }
  .rowfiltromobil{
    background: #fff;
    width: 100% !important;
    justify-content: center;
    margin: auto;
    height:50px !important;
  }
  .rowfiltromobil .border-grid{
    border-right: 1px solid #aaa;
    height: 100%;
  }
  .rowfiltromobil p{
    text-align:center;
    width: 100% !important;
  }

  .v-main {
    background-color: #F6F6F6 !important;
  }
  .detail-container{
    width: 100%;
    background: #fff;
  }
  .item-vista{
    height: 58px;
    display: flex;
    margin: auto;

  }
  .item-vista img{
    width: 20px !important;
    height: 20px !important;
    margin-left: 20px;

    position: relative;
  }
  .rowfiltromobilfixed{
    position: fixed;
    top: 48px;
    width: 100% !important;
    margin: 0px;
    padding: 0px;
    left: 0;
    z-index: 4;
  }

  .v-dialog__content--active{
        z-index: 999;
  }
  .v-dialog--active{
    top: 49px !important;
  }
  .item-vista p{
    margin-left: 0px;
    text-align: left;
  }
  .close-filtro{
    font-size: 18px;
    background: #fff;
    border-radius: 50%;
    width: 25px !important;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border: 1px solid;
    margin-right: 10px !important;
    margin-top: 10px;
  }
  .titulo-filtro{
    width: 100%;
    margin-top: 7px;
    margin-left: 20px;
    color : #FF5500;
    font-weight:bold !important;
    font-size:22px !important;
  }
  .lista-categorias{
    position: absolute;
    background: #fff;
    width: 100% !important;
    left: 0;
    padding: 0px !important;
    margin-top: 0px !important;
    height: 100vh;
    z-index: 1;
  }
  .container{
     padding: 0px !important;
  }
  .lista-categorias ul{
    padding: 4px !important;
  }
}

/* ESTILOS PARA INPUT**/
.inputCantidad {
  position: relative;
  padding: 0px !important; 
  width:100% !important;
}
.inputCantidad  input{
  text-align: center;
}

.inputbtncantidad{
  display: flex;
  top: 28px !important;
  position: relative;
}
.content-col-producto{
  background-color:#fff !important;
}
.btn-accion{
    text-align: center;
    cursor: pointer;
    font-weight: 500;
    font-size: 18px !important;
    color :#fff;
    height: 34px !important;
    float: none;
    width: 42.65px !important;
    display: inline-block;
    vertical-align: middle;
    /* position: static; */
    background-color: #333;
    border-radius: 50%;
    line-height: 34px;

}
.btn-mas{
  position:relative;
  right:20px;
}
.list-breadcrumbs li{
  font-size: 13px !important;
}
</style>
