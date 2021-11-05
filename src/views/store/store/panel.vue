<template>
<div id="app">
  <v-app>
        <router-view />
  </v-app>
</div>
</template>
<script>
import { mapState } from 'vuex'
import {  mapMutations } from 'vuex'
//import navigation from "@/views/store/store/navigation.vue"
import { mapGetters } from 'vuex'
  export default {
    name:"panel",
    components: { /*navigation*/},
    data () {
      return {
        saveChange:true,
        nameApp:"openShop",
        toggle: null,
        items: [
          {
            title: 'Pedidos',
            active: true,
            items: [
              { title: 'Breakfast & brunch' },
            ],
          },
          {
            title: 'Almacen',
            active: true,
            items: [
              { title: 'categorias' },
              { title: 'productos' },
              { title: 'Sushi' },
            ],
          },
          {
            title: 'Clientes',
            active: true,
            items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' },
            ],
          }
        ],
      }
    },
    computed: {
      ...mapState('global', ['toogleAdmin']),
      ...mapGetters({
            getEditCrud: 'global/getEditCrud',
     }), 
     rutaActual(){
       return this.$route.path;
     }
    },
    watch:{
      async rutaActual(){
         await this.setEditCrudt(true);
         await this.setEditCrudt(null);
      }
    },
    methods: {
     async save(){
        await this.setEditCrudt('EDIT');
        await this.setEditCrudt('SAVE');
      },
     async discard(){
        await this.setEditCrudt('EDIT');
        await this.setEditCrudt('DISCAR');
      },
      ...mapMutations({
        setToogleAdmin: 'global/SET_TOOGLE_ADMIN',
      }),
      ...mapMutations({
        setEditCrudt: 'global/SET_EDITCRUDT',
      }),
      
      
    },
    mounted(){
      console.log("siiiiiiiiiiiii",this.$route.path);
    }
  }
</script>
<style>


.navigation-panel i{
  color:#000 !important;
}
.navigation-panel .v-list-item__title{
  color:#000 !important;
  font-size:0.9em !important;
}

.navigation-panel .item__title{
  color:#000 !important;
}
.title-change{
  width: 100%;
}
.btn-cambios{
  display: flex;
}
.content-header-change{
  display: flex;
}
@media (max-width: 432px  ){
 .content-header-change{
    display: block;
 }
 .title-change{
    text-align: center;
    font-weight: bold;
 }
 .btn-cambios{
    justify-content: center;
 }
}
</style>