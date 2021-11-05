<template>
    <div class="content-marca" fluid>
        <p style="font-size:24px;font-weight: bold;">Marcas con que trabajamos</p>
        <v-row no-gutters>
            <v-col
                v-for="(item,index) in listado"
                :key="index"
                cols="6"
                sm="3"
                v-bind:style="{display: (item.img!=null ? 'block' :'none' ) }"
            >
                <div
                class="pa-2"
                outlined
                tile
                >
                  <img class="icono-marca" :data-src="item.img" alt="" :src="item.img"/>
                <p class="titulo-marca" >{{item.titulo}}</p>
                </div>
            </v-col>
        </v-row>
        
    </div>
</template>

<script>

  export default {
    name:"listadoMarcas",
    components: {

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
      listado:Array
    },
  }
</script>
<style>
.icono-marca{
    width: 150px !important;
    height: 150px !important;
    border-radius: 50%;
    filter: grayscale(100%);
    cursor:pointer;
}
.icono-marca:hover{
  filter: none;
}
.titulo-marca{
  text-align: center;
  font-weight: bold;
  word-wrap: break-word;
  width: 150px !important;
}
.content-marca{
  margin-top:50px;
}
</style>