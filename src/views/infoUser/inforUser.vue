<template>
  <div  class="app">
  <headInfoProfile/>
  <div class="content-head-info">
  </div>
  <v-container class="content-info-computed">
      <v-row>
      <v-col lg="4" md="4" sm="6" xs="6">
        <v-card
          class="mx-left left-card"
          max-width="100%"
          tile
        >
          <ul class="ulInfoUser">
            <li :class="itemSelect==0 ? 'select-item-info': 'item-info'" @click="itemSelect=0"><v-icon left>mdi-account</v-icon> Perfil</li>
            <li :class="itemSelect==2 ? 'select-item-info': 'item-info'"  @click="itemSelect=2"> <i class="fas fa-map-marker-alt v-icon--left"></i> Direcciones</li>
            <li :class="itemSelect==1 ? 'select-item-info': 'item-info'" @click="itemSelect=1"><i class="fas fa-shopping-cart v-icon--left"></i> Pedidos</li>
            <li :class="itemSelect==3 ? 'select-item-info': 'item-info'"  @click="closeSession"> <span class="icon-exit"></span>Cerrar Session</li>
          </ul>

        </v-card>
      </v-col>
      <v-col lg="8" md="8" sm="6" xs="6">
          <div class="content">
            <myProfile v-if="itemSelect===0"/>
            <addressComponent v-if="itemSelect===2"/>
            <orders v-if="itemSelect===1"/>
          </div>
      </v-col>
      </v-row>
  </v-container>
  <v-container class="content-info-not-computed">
  <v-card color="basil">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
      >
        Mi perfil
      </v-tab>
      <v-tab>
        Direcciones
      </v-tab>
      <v-tab>
        Pedidos
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item >
        <v-card
          color="basil"
          flat
        >
          <myProfile />
        </v-card>
      </v-tab-item>
      <v-tab-item >
        <v-card
          color="basil"
          flat
        >
          <addressComponent />
        </v-card>
      </v-tab-item>
      <v-tab-item >
        <v-card
          color="basil"
          flat
        >
          <orders />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>

  </v-container>
  </div>
</template>
<script>
  import myProfile from "@/views/infoUser/myprofile/myprofile.vue"
  import addressComponent from "@/views/infoUser/address/address.vue"
  import headInfoProfile from "@/views/header/headInfoProfile.vue"
  import orders from "@/views/infoUser/orders/orders.vue"
  export default {
    components: {myProfile,addressComponent,headInfoProfile,orders},
    data: () => ({
      itemSelect:0,
      tab: null,
        items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      
      
    }),
    computed:{

    },
    methods: {
      closeSession(){
        alert("close sesssion");
      }
  },
  async mounted() {
    
  }
  }
</script>
<style>
.body-container{
  height: 56px;
}
.content-info-computed{
  margin-top: 0px;
}
.content-head-info{
  
  width:100% !important;
  height:100px !important;
  margin-top:50px !important;
  background: red;
}
.ulInfoUser{
  display:block !important;
  background:#fff !important;
  width:100% !important;
}
.ulInfoUser li{
  padding-top:20px !important;
  padding-bottom:20px !important;
  background:#fff !important;
  display:block !important;
  cursor:pointer;
}
.ulInfoUser li i{
  color:#000 !important;
}
.ulInfoUser .select-item-info:after{
   content:">";
   font-size:28px !important;
   color:red !important;
   float:right;
}
.content-info-not-computed{
  display:none !important; 
}

 @media (max-width: 800px) {
  .content-info-not-computed .v-toolbar__content{
    height:0px !important;
  }
  header{
    height:80px !important;
  }
 .content-info-not-computed{
   display:block !important; 
  }
 .content-info-computed{
   display:none !important; 
  }
}
</style>