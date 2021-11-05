<template>
<VueSlickCarousel class="carusel-pricipal" v-bind="settings">
  <v-img  v-for="(item,i) in items"
      :key="i" class="img-carusel" :src="item.img" ></v-img>
</VueSlickCarousel>

</template>
<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  export default {
   components: { VueSlickCarousel },
   props:{
      items:Array
   },
    data() {
      return {
         settings: {
            "dots": true,
            "dotsClass": "slick-dots custom-dot-class",
            "edgeFriction": 0.35,
            "infinite": false,
            "speed": 500,
            "slidesToScroll": 1
          }
      }
    }
  }
</script>
<style>
.img-carusel{
  width:100%;
  height:350px;
}

.carusel-pricipal .slick-prev:before{
  font-size:80px !important;

}
.carusel-pricipal .slick-next:before{
  font-size:80px !important;
}
.carusel-pricipal .slick-next{
  right:55px;
}
.carusel-pricipal .slick-prev{
  left: 0px;
  z-index: 99;
}
</style>