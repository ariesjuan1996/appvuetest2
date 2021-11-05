<template>
    <div class="conten-app" style="width: 100% !important;">
        <div class="text-center">
            <v-snackbar
          
            v-model="openMessage"
            :multi-line="multiLine"
            >
            {{ menssage }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="red"
                text
                v-bind="attrs"
                v-on:click="openMessage=!openMessage"
                >
                cerrar
                </v-btn>
            </template>
            </v-snackbar>
        </div>      
        <v-skeleton-loader
            v-if="loaderPage"
            class="mx-auto"
            max-width="100%"
            type="article"
        ></v-skeleton-loader>
       <v-container  v-if="existeProduct & !loaderPage"  fluid>
        <v-footer
            color="lighten"
            padless
            v-if="showOnUpload"
            :fixed="true"
            class="footer-addproduct"
        >
            <v-row
            justify="center"
            no-gutters
            >

            <v-col
                class="col-footer white--text"
                cols="12"
            >
              <span class="nameproduct">  {{productoDetalle ? productoDetalle.titulo : null}}</span>
               <inputNumber :item="productoDetalle" :disabled="true" @sumarCantidad="sumarCantidad"/>
            </v-col>
            </v-row>
        </v-footer>
        <v-row >
                <v-col lg="6" md="6" sm="6" xs="12" cols="12">
                    <div class="content-galeri-img">
                        <div class="list-thumbs">
                            <caruselMultiImgPrev :slides="productoDetalle.imgs"/>
                        </div>

                    </div>
                </v-col>
                <v-col lg="6" md="6"  sm="6" xs="12"  cols="12">
                    <div class="content-data" >
                        <h3 class="title-brand">{{productoDetalle.marca}}</h3>
                        <h3 class="product-title">{{productoDetalle.titulo}}</h3>
                        <h3 class="product-price"><span>  precio :</span><strong>S/ {{productoDetalle.precioVenta}}</strong></h3>
                        <v-btn
                        v-if="productoDetalle.cantidadProducto==0 "
                        depressed
                        class="btnAgregar"
                        color="#ee3037"
                        style="color:#fff !important;width:100% !important;"
                        @click="anadirProducto(productoDetalle)"
                        >
                        Agregar
                        </v-btn>  
                        <div class="inputbtncantidad" v-else>
                        <span class="btn-accion btn-menos" @click="sumarCantidadProducto(productoDetalle,-1)">{{'-' }}  </span>
                            <v-text-field disabled type="text" class="inputCantidad" v-model="productoDetalle.cantidadProducto" :data-idProducto="productoDetalle.id" :data-stock="productoDetalle.stock" @focus="onFocus(productoDetalle)"  />
                            <span class="btn-accion btn-mas" @click="sumarCantidadProducto(productoDetalle,1)">{{'+' }}</span>
                        </div>
                        <listPaypements v-if="this.productoDetalle"/>
                    </div>
                </v-col>
        </v-row>
     
        <listCardFeatures v-if="productoDetalle.detalles.length && existeProduct" :listaCaracteristicas="productoDetalle.detalles" @openOrClose="openOrClose"/>

        </v-container>

        <v-container v-if="!this.productoDetalle & !loaderPage">
                <div class="content-error-search-product" >
                <img class="img-not-found-search" :src="imgNotSearch"/>
                    Lo sentimos, pero no encontramos resultados para <strong class="text-bold">{{nombreProducto}}</strong> 
                      <v-btn variant="danger" @click="goTheMain">Ir a la pagina principal</v-btn>
                </div>
        </v-container>
 
    </div>
</template>

<script>
import listPaypements from "@/components/payments/listPaypements.vue"
import caruselMultiImgPrev from "@/components/products/caruselMultiImgPrev.vue"
import listCardFeatures from "@/components/products/listCardFeatures.vue"
import inputNumber from '@/views/checkout/inputNumber/inputNumber.vue';
import { mapGetters } from 'vuex'
import { requestApi } from "@/api"
import { mapState } from 'vuex'
import {  mapMutations } from 'vuex'
export default {
 name:"verProducto",
 components: {
   listPaypements,
   caruselMultiImgPrev,
   listCardFeatures
   ,inputNumber
  },
  data() {
   return {
     storage: window.localStorage,
     productoDetalle:null,
     loaderPage:true,
     transition: 'scale-transition',
     openMessage:false,
     multiLine:true,
     imgNotSearch:"/img-pagos/error.png",
     search:' ',
     replaceWith:'+',
     productSelect:null,
     slides: [],
     scrollTop:window.scrollY,
     listaCaracteristicas:[],
     menssage:"El producto se agregó al carrito."
    }
  },
 computed:{
    ...mapState('products', ['actualizarCarrito']),
    existeProduct(){
        return this.productoDetalle!=null ? true : false;
    } ,
    urlActual(){
        return this.$route.path;
    },
    showOnUpload(){
        return this.scrollTop<400 ? false : true;
    },
    ...mapGetters({
            getProductSelectWatch: 'products/getProductSelectWatch'
    }), 
 
    styleIcon(){
      
        return this.productSelect!=null ? this.productSelect.cantidadProducto==1 ? 'icon-bin subtract' : 'icon-minus subtract' : null;
    },
     nombreProducto(){
       
      return this.$route.params.nombreProducto ? this.$route.params.nombreProducto.split(this.replaceWith).join(this.search) :
       "";
     }

  },
  watch:{
   async urlActual(){
      await this.getProduct();
   },
   async getProductSelectWatch(newVal){
     //console.log(newVal.length);
     if(newVal.length==0){
          this.productSelect.cantidadProducto=0;
      }else{
        this.productSelect.cantidadProducto=(this.productSelect.idProducto===newVal.idProducto ? newVal.cantidadProducto :this.productSelect.cantidadProducto);
      }
      await  this.$forceUpdate();
    },
    async actualizarCarrito(newVal){
        if(newVal){
        
          await this.cargarProductoIds();
          await this.meactualizarCarrito(false);
        }
   }
  },
  methods: {
    async anadirProducto(producto){
      await this.$store.dispatch("products/ANADIRPRODUCTO", producto);
      await this.$forceUpdate();
    }
    /*,
    async sumarCantidad(object){
        let cantidad=parseFloat(object.producto.cantidadProducto) +object.cantidad;
        let stock=parseFloat(object.producto.stock) ;
        if(stock>cantidad){
          await  this.$store.dispatch("products/EDITARCANTIDADPRODUCTOPAYLOAD", {
              id:object.producto.id,
              cantidadProducto:cantidad,
            });
        }else{
          await  this.$store.dispatch("products/EDITARCANTIDADPRODUCTOPAYLOAD", {
              id:object.producto.id,
              cantidadProducto:stock,
            });

        }
        await this.cargarProductoIds();
        this.$forceUpdate();
    }*/
    ,
    async sumarCantidadProducto(producto,cantidad){
      if(/*producto.editProducto && */cantidad==-1){
        /*await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto : {id :producto.id},cantidad:1} );
        await this.$forceUpdate();
        await this.$store.dispatch("products/EDITARCANTIDADPRODUCTO", {producto : {id :producto.id},cantidad:producto.tempCantidad} );
        await this.$forceUpdate();*/
        console.log("producto",producto);
        await this.$store.dispatch("products/EDITARCANTIDADPRODUCTOPAYLOAD", {
            id:producto.id,
            cantidadProducto:producto.cantidadProducto+cantidad,
        });
        return false;
      }
      if(producto.stock>=(producto.cantidadProducto+cantidad)){
            
            await this.$store.dispatch("products/SUMARCANTIDADPRODUCTO", {producto,cantidad});
            await this.$forceUpdate();
      }
     
    },
    cantidadProductoId(id){
       let datos= this.storage.carrito ? JSON.parse(this.storage.carrito) : [];
       let cantidadProducto=0;
       datos.filter((value)=>{
          if(value.id==id){
            cantidadProducto=value.cantidadProducto;
          }
        });
        return cantidadProducto;
    },
    ...mapMutations({
        meactualizarCarrito: 'products/CAMBIAR_CARRITO',
    }),
    closeSnackBar(){
      this.openMessage=!this.openMessage;
    },
    goUp(){
        window.scrollTo(0,0);
    },
     goTheMain(){
      this.$router.push('/');
     },
     openOrClose(index){
         this.listaCaracteristicas[index].abierto=!this.listaCaracteristicas[index].abierto;
     },
     async sumarCantidad(newVal){
       console.log("sumarCantidad",newVal);
       let cantidad=parseFloat(newVal.producto.cantidadProducto) +newVal.cantidad;
       let stock=parseFloat(newVal.producto.stock) ;
       if(stock>=cantidad){
          await this.$store.dispatch("products/EDITARCANTIDADPRODUCTOPAYLOAD", {
            id:newVal.producto.id,
            cantidadProducto:cantidad,
          });
        
       }  
     },
     metOpenMessage(){
       this.openMessage=true;
     },
     /*
     actualizarCantidad(newVal){
       let value={}; 
       if(this.productSelect.stockProducto<newVal){

          value.cantidadProducto=this.productSelect.stockProducto;
          value.idProducto=this.productSelect.idProducto;
          this.productSelect.cantidadProducto=parseInt(value.cantidadProducto);
          
          if(newVal<0){
              value.cantidadProducto=0;
          } 
          value.otrosDetalles=this.productSelect;
          this.$store.dispatch("products/ANADIRITEMCARD", value);
          this.$forceUpdate();
          //Vue.set(this.productSelect, 'cantidadProducto', this.productSelect.cantidadProducto);
       }else{
          
          value.idProducto=this.productSelect.idProducto;
          value.cantidadProducto=parseInt(this.productSelect.stockProducto);
          if(newVal<0 || newVal===0 || newVal===""){
              this.productSelect.cantidadProducto=0;
          }else{
              this.productSelect.cantidadProducto=parseInt(newVal);
          }
         
          this.$store.dispatch("products/ANADIRITEMCARD", {
              idProducto:this.productSelect.idProducto,
              cantidadProducto:parseInt(this.productSelect.cantidadProducto),
              otrosDetalles:this.productSelect
          });
           
          this.$forceUpdate();
       }

     },*/
     async cargarProductoIds(){
        try {
          
         let tituloCategoria=this.nombreProducto ? this.nombreProducto.split("+").join(" ") : "";
         let respon=await requestApi(
            `productos/listarProductoPorTitulo?reqTitulo=${tituloCategoria}`,
            {},
            "GET"
          );
          let datos=respon.data.estado ? respon.data.data[0] : null; 
          this.productoDetalle=datos;
          let itemCantidad= this.cantidadProductoId(datos.id);
          this.productoDetalle.cantidadProducto=itemCantidad;
          this.loaderPage=false;
          } catch (error) {
              this.loaderPage=false;
              console.log("error",error);
          }
     },
      moverImagen(cont){
          this.activeImgGalery=this.activeImgGalery+cont;
     },
     posicionarMenu(){
      this.scrollTop=window.scrollY;
     },    
   
  },
   async mounted() {
       this.$store.dispatch("global/OPENORCLOSBUTTONFLOTANTE", false);
       await this.cargarProductoIds();
       window.addEventListener('scroll', this.posicionarMenu);
    
   } 
}
</script>
<style>
.ul-thumbs{
    transform: translate3d(0px, 0px, 0px);
    transition: all 0s ease 0s;
    width: 1971px;
}
.ejemplo {
   transform: rotate(90deg);
   -webkit-transform: rotate(90deg);
   -moz-transform: rotate(90deg);
   -o-transform: rotate(90deg);
}
.ul-thumbs li{
    width: 75px!important;
    height: 100%;
    margin: 0 24.46px;
    text-align: center;
}
.img-item-galery{
    width:650px !important;
    height:120px !important;
}
.ul-thumbs{
    display:flex;
}
/*BUTTON PAYPENS*/
.product-title-fixed{
    text-align:left;
    margin-left:0em;
    width:100%;
}
.container-footer-add-product{
    width:100%;
    display:flex;
    
}
.content-footer-input-quantity{
    background: #fff;
    height:auto;
    width:100%;
    padding-top:20px;
    border-top:1px solid #CFCFCF;

}

.title-features{
    font-weight:bold;
    text-align:left;
    font-size:24px;
     cursor:pointer;
}
.title-features-mas:after{
    content: "+";
    font-size: 28px;
    color: #505050;
    position: absolute;
    right: 24px;
    top: 14px;
}
.title-features-menos:after{
    content: "+";
    font-size: 28px;
    color: #505050;
    position: absolute;
    right: 24px;
    top: 14px;
}
.img-active-galery{
    width:100% !important;
    height:300px !important;
}
.title-brand{
    text-align: left;
    padding-top:10px;
    padding-bottom: 10px;
    font-weight:bold;
    font-size:24px;
}
.product-title{
    padding-top:10px;
    padding-bottom:5px;
    margin:0px !important;
    text-align:left;
    font-family:arial;
    margin-left:20px !important;
    display:block;
}
.product-price{
    text-align:left;
    padding-top:20px;
    padding-bottom: 20px;
    color:red;
    font-size:24px;
}
.btn-add-product{
    float:left;
    margin-bottom:20px;
    display: inline-block;
    font-size: 14px;
    padding: 0;
    text-align: center;
    color: #fff;
    border-radius: 22.5px;
    background-color: #ee3037;
    margin-top: 10px;
    font-family: gilroy-bold,arial;
    width: 100%;
    max-width: 201px;
    height: 48px;
    line-height: 48px;
}
@media (max-width: 992px){
    .product-title-fixed{
        display:none;
        margin: auto;
        margin-bottom: 10px
    }
    .btn-add-product{
        margin: auto;
        margin-bottom: 10px
    }
}

/*TRANSICCIONES*/
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
 .amountProduct{
  width:20em ;
  justify-content: space-between;
  background-color: #dedede;
  text-align:center;
  border:5px solid transparent;
  border-radius: 20px;  
}
.icon-bin,.increase{
    cursor:pointer;
}
.content-input i{
    cursor: pointer;
    width: 35px;
    height: 35px;
    display: inline-block;
    border-radius: 50%;
    font-size: 21px;
    text-align: center;
    line-height: 35px;
}
.content-input{
    display:flex;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
.content-error-search-product{
    width:90%;
    margin-top:40px !important;
}
.img-not-found-search{
    width:50px;
    height:50px;
    display: block;
    margin: auto
}
.carusel-slick .slick-prev:before, .carusel-slick .slick-next:before{
    color: #adadad !important;
}
.carusel-slick .slick-next:before{
    content: '>';
}
.carusel-slick .slick-prev:before{
    content : '<';
}
.footer-addproduct .content-input{
    justify-content:center;
}
.fa-trash-alt:before{
       color: #000;
}
.footer-addproduct{
    border-top: 1px solid #e8e8e8;
    padding: 5px 0;
}
.content-data .button-menos,.content-data .button-mas,.footer-addproduct .button-menos,.footer-addproduct .button-mas {
    color: #000 !important;
    font-size:20px;
    background: transparent !important;
}
.footer-addproduct  .button-menos{
    transform: translateX(64px) !important;
}
.footer-addproduct .button-mas{
    transform: translateX(-64px) !important;
}
.nameproduct{
    color:#000 !important;
    font-weight: bold;
    width: 100% !important;
    box-sizing: border-box !important;
    display: block;
    text-align:center !important;
    margin-top: 20px;
}

.col-footer{
    display:block !important;
}
@media (max-width: 662px){
    .col-footer{
        display: block !important;
    }
    .nameproduct{
        margin-top:0px !important;
    }
}

.content-img .normal{
max-height: 350px;
}
@media (max-width: 403px){
   .footer-addproduct .content-input .amountProduct{
       width:100% !important;
    }
}
.button-mas,.theme--light.v-btn.v-btn--disabled{
    color: #ffffff !important;
}
.inputbtncantidad{
  display: flex;
  top: 28px !important;
  position: relative;
  width: 75%;
  margin: auto;
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
    background-color: #333;
    border-radius: 50%;
    line-height: 34px;
    top: 20px !important;

}
.btn-mas{
  position:relative;
  right:20px;
  
}
.btn-menos{
  position:relative;
 top: 20px !important;   
}
.inputCantidad input{
    text-align: center;
}

</style>