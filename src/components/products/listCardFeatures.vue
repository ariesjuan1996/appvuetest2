<template>
 <v-card
    class="mx-auto cardFiltro"
    width="100%"
  >

<v-expansion-panels
      :accordion="false"
      :popout="false"
      :inset="false"
      :multiple="true"
      :focusable="false"
      :disabled="false"
      :readonly="false"
      :flat="false"
      :hover="false"
      :tile="false"
    >
      <v-expansion-panel
        v-for="(item,i) in listaCaracteristicas"
        :key="i"
      >
        <v-expansion-panel-header class="negrita">{{item.tituloCaracteristicas}}</v-expansion-panel-header>
        <v-expansion-panel-content>
           <div  :class="item.tipo==='ESPECIFICACIONES' ?  'item-detail item-detail-especificaciones row': 'item-detail'"  v-for="(itemDetalles,indexDetalles) in item.detallesCaracteristicas" v-bind:key="indexDetalles">
                    <div v-if="item.tipo==='DESCRIPCION' && (itemDetalles.titulo!=undefined && itemDetalles.titulo!='' && itemDetalles.titulo!='')" class="card-title-features-features text-bold text-center negrita">
                        {{itemDetalles.titulo}}                         
                    </div>
                    <div v-if="item.tipo==='DESCRIPCION' && (itemDetalles.descripcion!=undefined && itemDetalles.descripcion!='' && itemDetalles.descripcion!='')" class="card-title-features-description text-justify">
                        {{itemDetalles.descripcion}}                         
                    </div>
                    <div v-if="item.tipo==='DESCRIPCION' && (itemDetalles.img!=undefined && itemDetalles.img!='' && itemDetalles.img!='')" class="card-title-features-img">
                      <v-img class="img-width100"  :src="itemDetalles.img" alt="Image 1"></v-img>  
                                       
                    </div>
                     <div v-if="item.tipo==='CARACTERISTICAS'">
                        {{itemDetalles}}                         
                    </div>
                     <div class="classEspecificacionesTitulo col" v-if="item.tipo==='ESPECIFICACIONES' && (itemDetalles.titulo!=undefined && itemDetalles.titulo!='' && itemDetalles.titulo!='') ">
                        {{itemDetalles.titulo}}                         
                    </div>
                     <div  class="classEspecificacionesDescripcion col" v-if="item.tipo==='ESPECIFICACIONES' && (itemDetalles.descripcion!=undefined && itemDetalles.descripcion!='' && itemDetalles.descripcion!='') ">
                        {{itemDetalles.descripcion}}                         
                    </div>  
            </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
 </v-card>
</template>

<script>
export default {
   name: 'car-features',
   data () {
      return {
        items: [
          {
  
            title: 'Attractions',
            items: [
              { title: 'List Item' },
            ],
          },
          {

            title: 'Dining',
            active: true,
            items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' },
            ],
          },
          {

            title: 'Education',
            items: [
              { title: 'List Item' },
            ],
          },
          {

            title: 'Family',
            items: [
              { title: 'List Item' },
            ],
          },
          {

            title: 'Health',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            title: 'Office',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            title: 'Promotions',
            items: [
              { title: 'List Item' },
            ],
          },
        ],
      }
    },
   props: {
    listaCaracteristicas: {
        type:Array,
        required: true,
        default: () => []

    },
  },
  methods:{
      openOrClose(index){
          this.$emit("openOrClose",index);
      }
  }   
}
</script>
<style>
.card100{
width: 100%;
}
.item-detail{
    width: 100%;
    display: block;
 
    padding-top: 20px;
}
.container-detait{
    margin-top:30px;
    margin-bottom: 100px !important;
}
.img-width100{
    width:50%;
    margin:auto;
}
.negrita{
  font-weight: bold;
  font-family:arial;
  font-size:16px;
}
.item-detail-especificaciones{
    border-bottom:1px solid #c8c8c8;
    display: flex;
}
</style>