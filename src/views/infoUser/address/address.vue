<template>
    <v-card class="container">
      <v-card-title class="titleActive">
       DIRECCIONES
      
      </v-card-title>
      <v-btn v-if="!selectForm" class="btn-right"  large color="error" @click="addAddress">Añadir dirección</v-btn>
      <formularioDirecciones v-if="selectForm" @cancel="cancel" :editDireccion="editDireccion"/>
      <v-row v-else class="row-address">
        <v-radio-group class="radioAgrupacion" v-model="seleccionadaPreferida">
          <v-col lg="12"  md="12"  xs="12" v-for="(item,index) in listAdress" v-bind:key="index">
            <v-radio
            :label="item==seleccionadaPreferida ? `defecto` : null"
            :value="item"
          ></v-radio>
            <v-card class="carditemdireccion" >

              <h3 class="tituloDireccion"> {{item.calle}}  {{item.numeroCalle}} ,{{item.descripcionUbicaciones}}</h3>
              <div class="buttonSeleccion">
                  <a class="eliminarDireccion" @click="eliminarDireccion(item)">Elimina esta dirección</a></div>
                  <v-btn
                  depressed
                  color="#333"
                  style="color:#fff !important;"
                  @click="editarDireccion(item)"
                  >
                  Editar
                  </v-btn>
            </v-card>
          </v-col>
        </v-radio-group>
      </v-row>
      <v-btn v-if="!selectForm" color="#1976d2" larget style="color:#fff; min-width: 188px;"  @click="cambiarPreferida">Guardar</v-btn>
    </v-card>
</template>

<script>
import { requestApi } from "@/api"
import formularioDirecciones from '@/components/direcciones/FormularioDirecciones.vue'


export default {
  components: {formularioDirecciones},
    data() {
    return {
      selectForm:false,
      listAdress:[],
      editDireccion:null,
      seleccionadaPreferida:null
    }},
    methods: {
      editarDireccion(value){
        this.editDireccion=value;
        this.selectForm=true;
      },
      async cambiarPreferida(){
        if(this.seleccionadaPreferida!=null){
          this.$store.dispatch("global/LOADEROPENORCLOSE", true);
          try {
            let respon=await requestApi(
                `clientes/actualizarDireccionPreferida`,
                {reqId:this.seleccionadaPreferida.id},
                "post"
            );
            const {data}=respon;
            let menssage=data.mensaje; 
            if(data.estado){
              this.$notify({
                group: 'foo',
                type:"success",
                title: 'Direcciones',
                text: menssage
              });
              await this.loadAddress();
            }else{
              this.$notify({
                group: 'foo',
                type:"error",
                title: 'Direcciones',
                text: menssage
              });
            }
            } catch (error) {
                console.log("error",error);
            }finally {
              // I’ll fire either way
              this.$store.dispatch("global/LOADEROPENORCLOSE", false);
            }
        }
      },
      async eliminarDireccion(value){
        console.log("value",value);
        this.$store.dispatch("global/LOADEROPENORCLOSE", true);
        try {
          let respon=await requestApi(
              `clientes/eliminarDireccionCliente`,
              {direccionCliente:value.id},
              "delete"
          );
          const {data}=respon;
          let menssage=data.mensaje; 
          if(data.estado){
            this.$notify({
              group: 'foo',
              type:"success",
              title: 'Direcciones',
              text: menssage
            });
            await this.loadAddress();
          }else{
            this.$notify({
              group: 'foo',
              type:"error",
              title: 'Direcciones',
              text: menssage
            });
          }
          } catch (error) {
              console.log("error",error);
          }finally {
            // I’ll fire either way
            this.$store.dispatch("global/LOADEROPENORCLOSE", false);
          }
      },
      addAddress(){
        this.selectForm=!this.selectForm;
      },
     async cancel(){
        this.selectForm=!this.selectForm;
        if(!this.selectForm){
          await this.loadAddress();
          this.editDireccion=null;
        }
      },
      async loadAddress(){
       this.$store.dispatch("global/LOADEROPENORCLOSE", true);
       try {
        let respon=await requestApi(
            `clientes/cargarDireccionesCliente`,
            {},
            "GET"
        );
        let data=respon.data.estado ? respon.data.data : [];
        this.listAdress=data;
        let select=this.listAdress.filter((item)=>{
          return item.preferida==true;
        });
       
        console.log("this.listAdress",select);
        if(select.length){
           this.seleccionadaPreferida=select[0];
        }else{
          this.seleccionadaPreferida=null;
        }
        } catch (error) {
            console.log("error",error);
        }finally {
          // I’ll fire either way
          this.$store.dispatch("global/LOADEROPENORCLOSE", false);
        }
      }
    },
    async mounted() {
      await this.loadAddress();
    }
}
</script>
<style>
.btn-right{
  float:right;
}
.row-address{
  margin-top:50px !important;
}
body{
    background:#F0F0F0 !important;
}
.radioAgrupacion{
  width: 100%;
}
.cambiar{
    position: relative;
    float: right;
    padding-left:20px !important;
}
.carditemdireccion{
  background-color:#eee;
  padding:20px !important;
  display: flex;
}
.direccionesSeleccionPreferida{
  padding: 20px;
  border-color:#8fca00 !important;
  border: 1px solid;
  background-color:#F9FCF7 !important;
}
.eliminarDireccion{
      display: flex;
}
.buttonSeleccion{
  width:261px !important;
  position: relative;
  left: 0px;
}
.tituloDireccion{
  width: 100% !important;

}
.siguientepasoPago{
  padding-top:20px !important;
  padding-bottom:68px !important;

}
.btnSiguientePaso{
  width:350px !important;
  top: -20px;
  padding: 25px;
}
 @media (max-width: 769px) {
   .carditemdireccion 
   {
     display:block;
   }
 }
</style>