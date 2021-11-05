<template>

    <div class="content-search itemMenu">
      <v-dialog v-model="dialogInput"  max-width="100%">
        <div class="content-search1" >
          <i class="fas fa-long-arrow-alt-left"></i>
          <input
            id="searchInput"
            class="inputSearch inputSearchDialog"
            label="Solo12"
            solo
            :value="valueSearch"
            @input="updateValue"
            ref="inputSearch"
            autofocus
          />
            <i class="iconSearch fas fa-search" style="bacgraund:red !important;"></i>
        </div>
      </v-dialog>
      <v-dialog v-model="dialog"  max-width="100%">
        <v-card class="result-searcher">

              <div class="content-result-search">
                  <half-circle-spinner
                    v-if="isLoading"
                    :animation-duration="1000"
                    :size="60"
                    color="#ff1d5e"
                  />
                  <v-row v-if="busquedaProductoLocal.length || valueSearch.length==0" no-gutters>
                    <itemSearch
                      v-for="(item,index) in busquedaProductoLocal"
                      :item="item"
                      v-bind:key="index"
                    />
                  </v-row>
                  <div v-else>
                      <h2 >Lo sentimos, pero no encontramos resultados para "{{valueSearch}}".</h2>
                  </div>
              </div>
  
        </v-card>

      </v-dialog>

    </div>
</template>
<script>
import { HalfCircleSpinner } from 'epic-spinners'
import { requestApi } from "@/api"
import { mapState } from 'vuex'
import itemSearch  from "@/components/header/itemSearch.vue"

export default {
name: 'seacher',
components: { HalfCircleSpinner,itemSearch   },
data() {
  return {
    dialogInput:true,
    anchoPantalla:screen.width,
    focusInput:true,
    dialog:false,
    isLoading: false,
    fullPage: false,
    listResultSearch:[]
  }},
 watch:{
  async dialog(newVal){
    if(!newVal){
      this.$store.commit('global/UPDATEVALUE',"");
    }else{
      this.focusInput=true;
    }
  },
  async valueSearch(newVal){
    if(newVal.length>1){
      this.dialog=true;
      if(newVal.length>=2){
        this.isLoading=true;
        await this.busquedaProducto();
      }
    }else{
      this.dialog=false;
      this.listResultSearch=[];
    }

  }
},
computed:{
  ...mapState('global', ['valueSearch']),
  busquedaProductoLocal(){
    let response= this.listResultSearch.filter((value)=>{
        return (value.nombreProducto.toLowerCase().includes(this.valueSearch.toLowerCase()) ||
        value.marca.toLowerCase().includes(this.valueSearch.toLowerCase()))
    });
    return response;
  } 
},
 methods: {
  updateValue(e){
    this.$store.commit('global/UPDATEVALUE', e.target.value);
  },
  async busquedaProducto(){
      try { 
        let respon=await requestApi(
          `productos/busquedaProducto?reqFiltro=${this.valueSearch}`,
          {},
          "GET"
        );
        
        let response=respon.data.estado ? respon.data.data : [];   
        this.isLoading=false;    
        this.listResultSearch=response;
        } catch (error) {
            console.log("error",error);
        }
  }  
 }, 
  async mounted() {
     
  }
}

</script>

<style>
.content-search1{
  width:100%;
  display:flex;
  transform: translateY(0px) !important;
  display: flex;
  box-sizing: content-box;
  padding-left: 10px;
  padding-right: 10px;
}
.content-search{
  width:100% !important;
  display:flex;
  transform: translateY(0px) !important;
  z-index: 9;
}
.inputSearch{
    color: #333;
    max-width: 100%;
    width: 100% !important;
    margin: 0 auto;
    height: 32px;
    font-size: 16px;
    background: #f8f8f8;
    border: none;
    border-radius: 30px;
    padding: 5px 15px 5px 12px;
    position: relative;
    font-weight: 400;
    text-shadow: none;
    margin: 0px;
   
}
#menu .iconSearch{
   cursor:pointer;
   transform: translate(-25px, 10px);

}
.result-searcher{
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    width:80% !important;
    margin:auto;

}
.result-searcher .fa-long-arrow-alt-left{
  display:none;
}
.result-searcher .iconSearch{
    transform: translate(-25px,10px) !important;
  }
  .content-search{
    width:100% !important;
  }
  .content-result-search{
    margin-top:20px !important;
  }
  .content-search1 .fa-long-arrow-alt-left{
      cursor:pointer;
  }
.content-search1{
  display:none;
}
 @media (max-width: 769px) {
   .content-icon{
      width:100% !important;
      text-align: center;
    }
    .itemMenu{
      width:20% !important;
    }
    .content-search1{
      display:block;
      margin-top:20px !important;
    }

    #menu .iconSearch{
      transform: translate(0px, 0px);
    }
    .inputMenuHead{
   
    }
   .result-searcher{
      position: fixed;
      top: 0px;
      right: 0px;
      left: 0px;
      width:100% !important;
    }
  .content-search1 .iconSearch{
      transform: translate(-25px,10px) !important;
   }
   .content-search1 .fa-long-arrow-alt-left{
     transform: translate(-5px,10px) !important;
   
     font-size: 24px;
     margin-right: 10px;
   }
   /*CONTENEDOR SEARCH*/
   .content-result-search{
      width: 100%;
      height: 100vh;
      background: #FFF;
      margin-top: 20px !important;
   }
 }


</style>