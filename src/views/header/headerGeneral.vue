<template>
  <div class="contenMenu">
      <headerMobil1 :dataCategorias="dataCategorias"/>
</div>

</template>
<script>



import headerMobil1 from '@/views/header/headerMobil1.vue';
export default {
watch:{
  dataCategorias(newVal){
    this.listCategorias=newVal;
  }
},
 props:{
   dataCategorias:{
      type: Array,
      default:() => ([

        ])
   }
 },
  components: {
    'headerMobil':headerMobil1
  },
  data() {
      return {
        widthBody:screen.width,
        menuPosFixed:true,
        mostrarPos:false,
        mostrarItemMenu:-1,
        mostrarMenu:false,
        indexCategorias:0,
        categoriaSelect:{},
        titleApp:"Tienda virtual",
        listCategorias:[],

      };
  },
  methods: {
    async urlRedirect(url){
      let urlRegex=url.replace(/\s/g,"_");
      await this.$router.push("/"+urlRegex);
      this.mostrarMenuMetodo();
      this.$emit("actualizarFiltro");
    },
    reducirItem(index){
      if(screen.width<=991){
          if(this.mostrarItemMenu!=index){
              this.mostrarPos=true;
          }
          if(this.mostrarItemMenu==index){
            this.mostrarPos=!this.mostrarPos;
          }
        this.mostrarItemMenu=index;
      }
    },
    mostrarMenuMetodo(){
      this.mostrarMenu=!this.mostrarMenu;
    },
    seleccionar(index){

      this.indexCategorias=index;
      this.categoriaSelect=this.listCategorias[index];
    },
    eventScrool(){
      this.widthBody=screen.width;
    }
  },
  async mounted(){

    //await this.cargarDataProductos();
    //this.categoriaSelect=this.listCategorias[this.indexCategorias];
      window.addEventListener('resize', this.eventScrool);
  }
  }
</script>
<style>
#header-menu{
  height: 42px;
}
@media (max-width: 769px) {

}
@media (min-width: 769px) {

}
</style>
