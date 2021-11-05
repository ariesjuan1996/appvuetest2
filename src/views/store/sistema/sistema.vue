<template>
    <div>
      <v-card>
        <breadcurmbs :rutas="this.$route.matched[this.$route.matched.length-1].props.default.rutas"/>
      </v-card>
      <v-card class="content-page">
        <span><strong>Datos Sistema</strong></span>
        <v-container class="grey lighten-5">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
             <v-text-field
                v-model="datosSistema.nombreTienda"
                label="Nombre tienda"
                required
                ></v-text-field>
                <v-text-field
                v-model="datosSistema.messenger"
                label="Mesenger"
                required
                ></v-text-field>

                <v-text-field
                v-model="datosSistema.correo"
                label="Correo"
                required
                ></v-text-field>
                <v-text-field
                v-model="datosSistema.telefono"
                label="Telefono"
                required
                ></v-text-field>
                <v-text-field
                v-model="datosSistema.youtube"
                label="Youtube"
                required
                ></v-text-field>
                <v-text-field
                v-model="datosSistema.instagram"
                label="Instagram"
                required
                ></v-text-field>
                <v-text-field
                 v-model="datosSistema.facebook"
                label="Facebook"
                required
                ></v-text-field>
                <v-btn
                color="success"
                class="mr-4"
                @click="validate"
                >
                Guardar
                </v-btn>
            </v-form>
        </v-container>
      </v-card>
    </div >

</template>

<script>
import { requestApi } from "@/api";
import breadcurmbs from '@/components/header/breadcurmbs.vue'
export default {
  name:"datosSistema",
  components: {
      breadcurmbs
  },
  data() {
    return {
      datosSistema:{},
      valid:false
    };
  },
  methods: {
    async validate(){
        this.$store.dispatch("global/LOADEROPENORCLOSE", true);
        try {
          let respon=await requestApi(
            `sistema/registrarActualizar`,
            {
              "messenger":this.datosSistema.messenger,
              "correo":this.datosSistema.correo,
              "telefono":this.datosSistema.telefono,
              "youtube":this.datosSistema.youtube,
              "instagram":this.datosSistema.instagram,
              "facebook":this.datosSistema.facebook,
              "nombreTienda":this.datosSistema.nombreTienda
            },
            "POST"
          );
          const {data}=respon;
          if(data.estado){
            this.$notify({
              position:"top",
              group: 'foo',
              type:"success",
              title: 'Sistema',
              text: data.mensaje
            });
          }else{
            this.$notify({
              position:"top",
              group: 'foo',
              type:"error",
              title: 'Sistema',
              text:  data.mensaje
            });
          }     
          console.log("data",data);
        } catch (error) {
            console.log("error",error);
        }finally {
          this.$store.dispatch("global/LOADEROPENORCLOSE", false);
        }
    },
    async cargarDatosSistema(){
      try {
         let respon=await requestApi(
            `sistema/cargarDatosSistema`,
            {},
            "GET"
          );
          let dataFiltro=respon.data.estado ? respon.data.data[0] : {};
          this.datosSistema=dataFiltro;
          console.log("this.datosSistema",this.datosSistema);
          } catch (error) {
              console.log("error",error);
          }
    }
  },
  async mounted() {
    await this.cargarDatosSistema();
    
  }
}

</script>