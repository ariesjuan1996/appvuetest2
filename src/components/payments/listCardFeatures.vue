<template>
    <div class="container-detait container">
        <div class="card card100"  v-for="(item,index) in listaCaracteristicas" v-bind:key="index">
            <div class="card-body">
                <h5 :class="!item.abierto ? 
                'card-title title-features title-features-mas' : 
                'card-title title-features title-features-menos' " 
                 @click="openOrClose(index)">{{item.tituloCaracteristicas}}</h5>
                <div v-if="!item.abierto"
                class="card-text "
                >
                  <div  class="item-detail"  v-for="(itemDetalles,indexDetalles) in item.detallesCaracteristicas"
                  v-bind:key="indexDetalles">
                    <div v-if="item.tipo==='DESCRIPCION' && (itemDetalles.titulo!=undefined && itemDetalles.titulo!='' && itemDetalles.titulo!='')" class="card-title-features-features text-bold text-center">
                        {{itemDetalles.titulo}}                         
                    </div>
                    <div v-if="item.tipo==='DESCRIPCION' && (itemDetalles.descripcion!=undefined && itemDetalles.descripcion!='' && itemDetalles.descripcion!='')" class="card-title-features-description text-justify">
                        {{itemDetalles.descripcion}}                         
                    </div>
                    <div v-if="item.tipo==='DESCRIPCION' && (itemDetalles.img!=undefined && itemDetalles.img!='' && itemDetalles.img!='')" class="card-title-features-img">
                      <v-img-lazy class="img-width100"  :src="itemDetalles.img" alt="Image 1"></v-img-lazy>                     
                    </div>
                     <div v-if="item.tipo==='CARACTERISTICAS'">
                        {{itemDetalles}}                         
                    </div>
                     <div v-if="item.tipo==='ESPECIFICACIONES' && (itemDetalles.titulo!=undefined && itemDetalles.titulo!='' && itemDetalles.titulo!='') ">
                        {{itemDetalles.titulo}}                         
                    </div>
                     <div v-if="item.tipo==='ESPECIFICACIONES' && (itemDetalles.descripcion!=undefined && itemDetalles.descripcion!='' && itemDetalles.descripcion!='') ">
                        {{itemDetalles.descripcion}}                         
                    </div>    
                  </div>
               </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
   name: 'car-features',
   data () {
    return {
      foo: 'bar'
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
</style>