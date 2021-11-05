<template>
    <div class="card-categoria-fila" >
      <div class="vertodo">   
        <p class="titleCategory">{{item.titulo}}</p>
         <a class="verTodoCategoria" :href="'/categoria/'+item.url">Ver todo</a>
      </div>
      <ul class="lista-subcategorias">
        <li v-for="(itemSub,index) in item.categorias" v-bind:key="index">
         <a  :href="'/categoria'+itemSub.url">
          <v-btn depressed class="sub-categoria-a">
           {{itemSub.titulo}} >
          </v-btn>
        </a>
         
        </li>
      </ul>
      <caruselProduct :setting="setting" :listItem="item.productos" />
   </div>
</template>
<script>
 import caruselProduct from '@/components/caruselProduct.vue';
  export default {
    name:"cardCategory",
    components: {
     caruselProduct,

    },
    data() {
      return {
      setting: { 
        "dots": true,
        "infinite": true,
        "speed": 500,
        "slidesToShow": 4,
        "slidesToScroll": 1,
        "initialSlide": 0,
        "responsive": [
            {
            "breakpoint": 1024,
            "settings": {
                "slidesToShow": 2,
                "slidesToScroll": 2,
                "infinite": true,
                "dots": true
            }
            },
            {
            "breakpoint": 600,
            "settings": {
                "slidesToShow": 2,
                "slidesToScroll": 2,
                "initialSlide": 2,
                "infinite": true,
            }
            },
            {
            "breakpoint": 480,
            "settings": {
                "slidesToShow": 2,
                "slidesToScroll": 1,
                "infinite": true,
            }
            }
        ]
        }
      }
    },
    props:{
      item:Object
    },
  }
</script>
<style>
.titleCategory{
    font-weight: bold;
    text-transform: uppercase;
    background: #FB3449;
    color: #fff !important;
    text-align: center !important;
    line-height: 40px;
    margin: 0px !important;
    height: 50px;
    padding-left:10px;
    width:150px;
    cursor:pointer;
}
.titleCategory:hover{
   text-decoration-line: underline;
}
.img-represation-category{
  width:100%;
  max-height: 250px;
  margin-top:20px;
  margin-bottom: 20px;

}

.vertodo{
  height: 50px;
  display: -webkit-inline-box;
  background: #FF4D38;
  width: 100%;
  box-sizing: content-box;
  overflow-x:auto !important;
}
/* width */
::-webkit-scrollbar {
  width: 2px !important;
}

/* Track */
::-webkit-scrollbar-track {
  background: #F1F1F1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #F1F1F1;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #F1F1F1;
}
.ver-todo-category{
  font-size: 16px;
  font-family: gilroy-bold,arial;
  color: #ff1020;
  border-bottom: 5px solid #ff1020;
  padding: 0;
  float: right;
  margin: 0;
  position: absolute;
  right: 0;
  cursor:pointer;
  height: 20px;
  border-radius: 0 10px 10px 0;
  margin-top: 2px;
  margin-right: 20px;
 
}
.card-categoria-fila{
  margin-top: 20px;
  height: 421px !important;
}
.lista-subcategorias{
  display: flex;
  margin-top: 15px; 
  padding-left: 0px !important; 
}
.lista-subcategorias li{
  padding:0px 10px 0px 10px !important;
}
.lista-subcategorias li a{
  color : #6a6a6a !important;
  font-weight:bold;
  text-decoration: none;
}
.img-categoria-primernivel{
    height: 32px !important;
    width: 28px !important;
    display: block;
    margin-left: 15px;
}
.sub-categoria-a{
      border: 2px solid black;
}
.verTodoCategoria{
    position: absolute;
    right: 20px;
    margin-top:10px;
    color:#fff !important;
    font-size:18px;
}
.imgproducto {
  margin-top: 0px !important; 
  margin-bottom: 0px !important;
}
</style>