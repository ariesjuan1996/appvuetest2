<template>
  <v-app>
   <vue-confirm-dialog></vue-confirm-dialog>  
    <v-overlay :value="getLoader">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <notifications group="foo" position="top right" />
    <router-view />
    
</v-app>
</template>

<script>
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
            getDataStore: 'global/getDataStore',
     }), 
    ...mapGetters({
            getMostrarButtomFlotante: 'global/getMostrarButtomFlotante',
     }), 
    ...mapGetters({
            getLoader: 'global/getLoader'
    }), 
    showOnUpload(){
            return this.scrollTop<400 ? false : true;
    }
  },
  methods: {
    async posicionarMenu(){
      this.scrollTop=window.scrollY;

     }  
   
  },
  async mounted() {
  //await this.cargarCategoriasSubNiveles();
  //this.capFirstLetter();

   window.addEventListener('scroll', this.posicionarMenu);
   //await this.cargarPrueba();
  }, 
};
</script>
<style>

</style>