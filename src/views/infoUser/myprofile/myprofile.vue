<template>
  <div>
    <editorCreateProfile/>
    <credentialsComponent :tieneContraseniaUs="tieneContraseniaUs"/>
  </div>
</template>

<script>
  import { requestApi } from "@/api"
  import editorCreateProfile from "@/views/infoUser/myprofile/editorCreateProfile.vue"
  import credentialsComponent from "@/views/infoUser/myprofile/credentials.vue"
  export default {
    components: {credentialsComponent,editorCreateProfile},
    data: () => ({
      tieneContraseniaUs:false,
    }),
    computed:{
     
    },
    methods: {

      async cargarUsuario(){
        try {
          let respon=await requestApi(
            `seguridad/getUsuario`,
            {},
            "GET"
          );
          let objectUser=respon.data.estado ? respon.data.data : null;
           if(objectUser===null){
            this.tieneContraseniaUs=false;
           }else{
            this.tieneContraseniaUs=objectUser.tieneContrasenia;
           }
          } catch (error) {
              console.log("error",error);
          }
      }
  },
  async mounted() {
    await this.cargarUsuario();
  }
  }
</script>
<style>

 .info-title{
   font-weight: bold;
    font-size: 32px;
 }

 .span-infouser{
       width: 100%;
    text-align: left;
 }
 .form-infouser{
   background:#fff;
 }
 .info-title{
   font-weight: bold;
    font-size: 32px;
 }
  #input-usage .v-input__prepend-outer,
  #input-usage .v-input__append-outer,
  #input-usage .v-input__slot,
  #input-usage .v-messages {
    border: 1px dashed rgba(0,0,0, .4);
  }
  
  .titleinfoUser{
    color: rgba(0, 0, 0, 0.87) !important;
    font-size:24px;
  }
  .titleActive{
    color: rgba(0, 0, 0, 1.87) !important;
    font-size:40px;
  }
  .btn-edit{
    width:200px !important;
    text-align: justify;
    font-size: 11px;
    justify-content: center;
    padding:5px !important;
    box-sizing: content-box;
  }
  .content-send-code{
    justify-content: center;
    width: 100% !important;
    display: flex;
    padding-top: .75rem;
  }
  .marginform{
     padding-bottom:30px !important;
  }
  body{
      background:#F0F0F0 !important;
  }
</style>