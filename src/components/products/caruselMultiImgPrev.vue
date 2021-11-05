<template>
    <div id="conten-app" class="conten-conten-app conttent-multiimg">
	<div class="container">
		<div class="content-img" >
			<zoom-on-hover class="img-carusel-active" :img-normal="slides[imgSelect]" 
			:img-zoom="slides[imgSelect]" :scale="2.8" :disabled="false"
			></zoom-on-hover>
		</div>
		<div class="carusel-slick">
			<VueSlickCarousel
				v-if="slides.length"
				ref="c2"
				:edgeFriction="0"
				v-bind="settings"
				@afterChange="beforeChange"
				:arrows="true" :dots="true">
				>
					<div v-for="(item,index) in slides" v-bind:key="index"><img class="img-carusel" :src="item" alt=""></div>
				</VueSlickCarousel>
		</div>
		
		</div>
	</div>

</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
 components: {
    VueSlickCarousel
  },
  props:{
		slides:{
		type: Array,
		default: () =>[]	
		}
 },	
 data () {
    return {
		imgSelect:0,
        settings:{
			"dots": true,
			"focusOnSelect": true,
			"infinite": true,
			"speed": 500,
			"slidesToShow": 3,
			"slidesToScroll": 3,
			"touchThreshold": 5,
			"responsive": [
				{
				"breakpoint": 1904,
				"settings": {
					"slidesToShow": 3,
					"slidesToScroll": 3,
					"infinite": true,
					"dots": true
				}
				},
				{
				"breakpoint": 600,
				"settings": {
					"slidesToShow": 1,
					"slidesToScroll": 1,
					"infinite": true,
					"dots": true
				}
				}
			]
		},
	
  }
 },
  methods: {
	onload(){
	},
	onresize(){
	},
    beforeChange(req){
		this.imgSelect=req;
	}
  },
	mounted () {
	}
}
</script>
<style   lang="scss">
.slick-active{
border: 0px solid transparent !important;
}
.slick-list,.slick-list> div{
	border: 0px solid transparent !important;
}
div:active{
	
	
}

.img-carusel{
	width:100%;
	height:100px;
}
.slick-next{
	right: 0px; 
}
.slick-prev{
	left: 0px;
	z-index:99;
}

.img-carusel-active{

}
.content-img{
	max-height:400px !important;

	padding-bottom:10px;
	
	box-sizing: content-box;
}
.carusel-slick{
	
}

.zoom{
	width:100% !important;
	height:100% !important;
}





.zoom-on-hover {
  position: relative;
  overflow: hidden;
}
.zoom-on-hover .normal {
  width: 100%;
}
.zoom-on-hover .zoom {
  position: absolute;
  opacity: 0;
  transform-origin: top left;
}
.zoom-on-hover.zoomed .zoom {
  opacity: 1;
}
.zoom-on-hover.zoomed .normal {
  opacity: 0;
}
.conten-conten-app{
	
}
@media (max-width: 600px) {
	.content-img{
		display:none;
	}
	.img-carusel{
		height:250px !important;
	}

}
@media (max-width: 599px) {
  .conttent-multiimg	.content-img{
		width:100%;
		
	}
  .conttent-multiimg	.slick-arrow:before{
		font-size:60px !important;
	
	}
	.conttent-multiimg .slick-next {
    right: 20px;
	}	
}

</style>