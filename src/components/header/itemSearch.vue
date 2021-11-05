<template>

    <div
      class="cardSearchProducto"
     >
     <div class="itemSearch-img">
        <v-img  class="img-circle-car-search" :src="item.imgs[0]"></v-img>         
     </div>
     <div class="itemSearch-text">
        <div class="overline mb-4 text-branch">{{item.marca}}</div>
        <h1 class="card-title-search">{{limitText(item.titulo)}}</h1>
        <div class="overline mb-4 text-salePrice">S./ {{item.precioVenta}}</div>
        <div class="watchProduct"  @click="redirect(item.url)">Ver producto</div>
     </div>
  
    </div>
</template>
<script>
export default {
  name: 'item-search',
  props: {
   item: {
       type:Object,
       default: ()=>{return {} }
    }
  },
    methods: {
      limitText(valueText){
        return  (valueText.length>50 ? (valueText.substring(0,50)+"...") : valueText);
      },
     async redirect(urlRedirect){

        let rut="/"+this.$store.state.products.ver+"/"+urlRedirect;
        if(this.$route.path!=rut){
          await this.$router.push(rut);
          location.reload();
        }
      }
    }
}
</script>
<style>

.content-result-search .v-card{
  display:flex;
}
.img-circle-car-search{
   max-width:6em;
   max-width:6em;
}
.cardSearchProducto .v-list-item__title{
  font-size:16px !important;
}
.itemSearch-text{
    width: 100%;
    height: 160px;
}
.itemSearch-text .overline{
    width: 100% !important;
    margin: 0px !important;
    font-size: 16px !important;
}
.text-salePrice{
  color:red !important;
}
.card-title-search{
    font-size: 14px;
    min-height: 50px;
    color: #333;
    margin-bottom: 5px;
}
.watchProduct{
  cursor:pointer;
  color:red;
  float: right;
}


.cardSearchProducto{
    margin:0px !important;
    width:50% !important;
    box-sizing:content-box;
    padding:20px !important;
    border: 1px dashed #e6e6e6;
    min-height: 50px;
    float:left;
    padding-bottom: 0px !important;
}
</style>