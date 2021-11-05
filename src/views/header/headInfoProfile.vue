<template>
    <v-toolbar >
      <v-container>
       
        
         <h2  style="line-height: 58px;" class="logo-company img-header-logo" @click="redirect('/')">Mi market</h2>
      
      </v-container>
      <v-spacer></v-spacer>
      <p style="text-align: center;margin-top: 20px;">Tu compra es 100% Segura</p>
      <i class="iconshowping fas fa-shopping-bag" @click="redirect('/checkout/#/cart')"></i>
    </v-toolbar>
</template>
<script>

export default {
  
watch:{
 
},
 props:{
  
 },
  components: {
  },
  data() {
      return {


      };
  },
  methods: {
    redirect(url){
        this.$router.push(url); 
    }
  },
    computed:{
   
  },
  async mounted(){

  }
  }
</script>
<style>

  header{
    position: fixed !important;
    width: 100%;
    z-index: 999;
    background:#fff !important;
  }
  .img-header-logo{
     width:150px !important;
     height: 65px !important;
  }
  .iconshowping{
    font-size:28px !important;
    color:#000; 
    cursor:pointer !important;
  }
  .logo-company{
    cursor:pointer;
  }
</style>
