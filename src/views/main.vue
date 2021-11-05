<template>
  <v-app class="main-ecommerce">
      <router-view/>
  </v-app>
</template>

<script>

import { requestApi } from "@/api/index.js"
import { mapGetters } from 'vuex'
export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    scrollTop:window.scrollY,
  }),

  computed:{
    ...mapGetters({
            getMostrarButtomFlotante: 'global/getMostrarButtomFlotante'
    }), 
    ...mapGetters({
            getDataStore: 'global/getDataStore'
    }), 
    showOnUpload(){
            return this.scrollTop<400 ? false : true;
    },
    ...mapGetters({
            dataCategorias: 'products/categoriayHijos',
    }), 
  },
  methods: {
    goUp(){
        window.scrollTo(0,0);
    },
    async posicionarMenu(){
      this.scrollTop=window.scrollY;

     },  
    async cargarCategoriasSubNiveles(){
      try {
        let respon=await requestApi(
          `productos/listarCategoriasPadres`,
          {},
          "GET"
        );
        
        let data=respon.data.estado ? respon.data.data : [];    
        console.log("data",data);   
        this.$store.dispatch("products/AGREGAR_CATEGORIASHIJOS", data);
        
        } catch (error) {
            console.log("error",error);
        }
    }    
  },
 async mounted() {
   await this.cargarCategoriasSubNiveles();
   window.addEventListener('scroll', this.posicionarMenu);
  }, 
};
</script>
<style>
  .main-ecommerce{
    background: #F1F1F1 !important;
  }
  .v-icon-flotante{
    background: #F0F0F0 !important;
  }
</style>