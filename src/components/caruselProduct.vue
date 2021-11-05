<template>
    <div class="mycaruselProduct" >
     
      <VueSlickCarousel class="carusel-app" v-bind="setting">
        <div  class="card-col"   @click="redirectPage(item.url)"   v-for="(item,index) in listItem" :key="index"> 
          <v-img
            class="mx-auto my-12 imgproducto"
            :src="item.img"
            sytle="height: 331px !important;"
          >
          
          </v-img>
          <div class="text-content-item">
            <div class="descuento-text" v-if="item.porcentajeDescuento!=null">{{parseFloat(item.porcentajeDescuento).toFixed(2)}} %<span class="nameDescuento">DSCT</span> </div>
            <div class="marca-text">{{item.marca}}</div>
            <div class="producto-text">{{item.titulo}}</div>
          </div>
          </div>
       
      </VueSlickCarousel>
      <div class="content-products">
        <v-row >
          <v-col lg="3" class="card-col" v-for="(item,index) in listItem" :key="index">
            <div  @click="redirectPage(item.url)"  class="mx-auto card-producto"  > 
              <v-img

                class="mx-auto my-12"
                :src="item.img"
              ></v-img>
              <div class="text-content-item">
                <div class="descuento-text" v-if="item.porcentajeDescuento!=null">{{parseFloat(item.porcentajeDescuento).toFixed(2)}} %<span class="nameDescuento">DSCT</span> </div>
                <div class="marca-text">{{item.marca}}</div>
                <div class="producto-text">{{item.titulo}}</div>
              </div>
                
            </div>
          </v-col>
          </v-row>
      </div>
    </div>
</template>
<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  export default {
    name:"caruselProduct",
    components: { VueSlickCarousel },
    props:{
      setting:Object,
      listItem:Array
    },
    data() {
      return {
        logoMoneda:"S./"
      }
    },
    methods: {
    async redirectPage(url){
      let rut=this.$store.state.products.ver;
      await this.$router.push(rut+url);
      location.reload();
    },
    }
  }
</script>

<style>
  .mycarusel .img-carusel{
    width:100%;
  }
  .content-products .v-image__image{
    background-position: center center;
    height: 150px !important;
    margin-top:0px !important;
  }
  .text-content-item{
    position: relative;
    top:-120px;
  }
  .v-responsive__sizer{
    padding-bottom: 100% !important;
  }
  /* IMAGEN ESTABLECER TAMAÑO*/
  .card-producto{
    box-sizing:content-box !important;
    height: auto;
    background: #fff;
    padding-left:10px !important;
    padding-right:10px !important;
    cursor:pointer;
    position: relative;
    height: 300px;
  }
  
  .card-producto .v-responsive__content{
    width: 1000px !important;

  }
  .card-producto .v-responsive{
    margin-top: 0px !important;
    margin-bottom: 0px !important;
  }
  .marca-text{
    font-weight:bold;
  }
  .marca-text,.producto-text{
    font-size:15px;
    text-align: center;
    height: 23px !important;
  }
  .producto-precio{
    color: #ffffff !important;
    font-size:18px !important;
    text-align: center;
    display: block;
    margin: auto;
    background: #00A1E7;
    width: 120px !important;
    position: absolute;
    left: 0px !important;
   
  }

  .btn-ver-producto{
    width:100% !important;
    padding: 0px !important;
    margin-top:10px;
    color:#fff !important;
    background:#70578B !important;
  }
  .btn-3 {
  background: lighten( #0cf, 3%);  
  border: 1px solid darken( #0cf, 4%);
  box-shadow: 0px 2px 0 darken( #0cf, 5%), 2px 4px 6px darken( #0cf, 2%);
  font-weight: 900;
  letter-spacing: 1px;
  transition: all 150ms linear;
}

.btn-3:hover {
  background: darken( #0cf, 1.5%);
  border: 1px solid rgba(#000, .05);
  box-shadow: 1px 1px 2px rgba(#fff, .2);
  color: lighten( #0cf, 18%); 
  text-decoration: none;
  text-shadow: -1px -1px 0 darken( #0cf, 9.5%);
  transition: all 250ms linear;
}
  @media (max-width: 1000px) {
    .content-products{
      display:none;
    }
    .imgproducto .v-responsive__content{
      height: 131px !important;
      
    }
  }

  @media (max-width: 1000px) {
    .carusel-app{
      display:block;
    }
    .marca-text,.producto-text{
      font-size:12px;
      text-align: center;
      height: 25px !important;
    }
    .text-content-item{
        position: relative;
        top: -34px !important;
    }
    .descuento-text,.nameDescuento{
      font-size: 15px !important;
    }
    .text-content-item{
      position: relative;
      top: -91px !important;
    }
   .card-col{
      height: 250px !important;
      background: #fff;
    }
    .imgproducto{
      margin-top: 0px !important;
    }
    .v-application .my-12{
      margin-top: 0px !important;
    }
  }
  
  @media (min-width: 1000px) {
    .carusel-app{
      display:none !important;
    }
  }

  .mycarusel{
    width:100%;
    height:auto;
  }


  .mycarusel p{
  position: relative;
      font-size: 12px;
  }


  .mycarusel ul{
  display: block;
      position: relative;
  }
  .mycarusel {
    justify-content: center;
    display:block;
  }
  .mycarusel {
    margin:auto;
  }

  .mycaruselProduct .slick-prev:before{
      font-size:80px !important;
      color:black;
    }
  .mycaruselProduct .slick-next:before{
      font-size:80px !important;
      color:black;
    }
  .mycaruselProduct .slick-next{
      right:55px;
    }
  .mycaruselProduct .slick-prev{
      left: 0px;
      z-index: 99;
    }
 
  .card-col{
    height: 250px;
  }
  .descuento-text{
    color:red ;
    font-size:12px;
    text-align:center;
    font-weight:bold;
  }
  .nameDescuento{
    font-size:12px;
  }
  .card-producto:hover{
  background: #fff;
  padding:10px;
  transition: width 10s;
}
.slick-arrow{
  display:none !important;
}
</style>