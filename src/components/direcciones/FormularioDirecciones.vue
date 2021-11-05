<template>
 <v-container class="container-form" >
      <v-card>
       <v-form class="form-address" v-model="valid">
        <span v-if="isCheckout" class="titleAdress colorgriss"><span class="circle-number">02</span><span class="content-span-value"> Datos para la entrega</span></span>
         <h2 v-if="editDireccion===null">Añadir Dirección</h2>

         <h2 v-else>Editar Dirección</h2>  

          <v-row>
            <v-col
              cols="12"
              md="12"
              lg="12"
              >
              <div>
                  <v-select
                    :items="opcionPaises"
                    label="País"
                    dense
                    outlined
                    :clearable="false"
                    item-text="descripcion"
                    v-model="paisSeleccionado"
                    return-object
                    v-on:change="seleccionarCiudades(paisSeleccionado)"
                  ></v-select>
                  <div  v-for="(item,index) in opcionesNivelesPais" v-bind:key="index">
                    <v-select
                      :items="!item.opcionesCiudades ? [] : item.opcionesCiudades"
                      :label="item.descripcion"
                      dense
                      outlined
                      :clearable="false"
                      item-text="descripcion"
                      v-model="item.ciudadSeleccionada"
                      return-object
                      v-on:change="cargarOpcionesCiudades(item.ciudadSeleccionada)"
                      :rules="ciudadesRules[index]"
                      required
                    ></v-select></div>
                    <v-text-field
                      outlined
                      v-model="infoAdress.direccion"
                      :rules="direccionRules"
                      label="Direccion"
                      autocomplete="off" 
                    ></v-text-field>
              </div>
              <v-text-field
                  v-model="infoAdress.numeroDirecion"
                  :rules="numeroCalleRules"
                  label="Numero de Dirección"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="infoAdress.numeroPiso"
                  label="piso o apartamento"

              ></v-text-field>
              <v-text-field
                  v-model="infoAdress.referencia"
                  label="Referencia"
              ></v-text-field>
              <v-text-field
                  v-model="infoAdress.nombreRecibir"
                  label="Nombre del que va recibir"
              ></v-text-field>

              </v-col>
          </v-row>
          <div class="btns-events">
            <v-btn class="bnt-action" large :disabled="!valid"  color="primary" @click="anadirOrActualizarDireccion">GUARDAR DIRECCIÓN</v-btn>
            <v-btn class="bnt-action" large color="error" @click="cancel">CANCELAR</v-btn>
          </div>
        </v-form>
      </v-card>
   

 

 </v-container>
</template>
<script>
import { requestApi } from "@/api"
import { mapActions } from 'vuex'
  export default {
    name:"FormularioDirecciones",
    props: {
      editDireccion:{
        type:Object
      },
      isCheckout:{
        type:Boolean
      }
    },
    data: () => ({
      opcionPaises:[],
      opcionesNivelesPais:[],
      paisSeleccionado:null,
      direccion:null,
      nameRules:[],
      infoAdress:{
        idDireccionesUsuarioCliente:null,
        direccion:"",
        numeroDirecion:"",
        numeroPiso:"",
        nombreRecibir:"",
        referencia:""
      },
      numeroCalleRules: [
        v => !!v || 'Numero de calle es requerido.'
      ],
      direccionRules: [
        v => !!v || 'Se requiere de dirección.'
      ],
      calleRules: [
        v => !!v || 'Se requiere de calle.'
      ],
      nameReceiveRules: [
        v => !!v || 'Nombre recibir es requerido.'
      ],
      ciudadesRules:[],
      valid: false,

    }),
    watch:{
      async paisSeleccionado(newval){
        if(newval!=null){
            await this.cargarNivelRegionPais();
            await this.cargarPrimerNivel();
        }
      },
      async opcionesNivelesPais(newVal){
        this.ciudadesRules=[];
        newVal.forEach((value)=>{
          this.ciudadesRules.push([
            v => !!v || ("Se requiere "+value.descripcion+"."),
          ]);
        });
 

      }
 
    },
    computed:{
       ciudadSeleccionada(){
        if(this.opcionesNivelesPais.length>0){
          if( this.opcionesNivelesPais[this.opcionesNivelesPais.length-1].ciudadSeleccionada){
            return this.opcionesNivelesPais[this.opcionesNivelesPais.length-1].ciudadSeleccionada.id ;

          }else{
            return null;
          }
        }else{
          return null;
        }
      },
    },
    methods: {
     ...mapActions({
      cargarPais: 'global/CARGARPPAIS' 
    }),
     ...mapActions({
      cargarNivel: 'global/CARGARNIVEL' 
    }),
     ...mapActions({
      cargarUbigeoNivel: 'global/CARGARUBIGEONIVEL' 
    }),
    async cargarPaisVista(){
      try {
         let respon=await this.cargarPais();
            this.opcionPaises=respon;
            await this.opcionPaises.map((value)=>{
              if(value.codigoUbigeo=="9589"){
                this.paisSeleccionado=value;

              }
            });

          } catch (error) {
              console.log("error",error);
          }
     },
     async cargarNivelRegionPais(){
        try {
         if(this.paisSeleccionado!=null){
          let respon=await this.cargarUbigeoNivel(this.paisSeleccionado.id) 
          this.opcionesNivelesPais=respon;
         }else{
           this.opcionesNivelesPais=[];
         }
          } catch (error) {
              console.log("error",error);
          }
     },
     async cargarNNivel(itemSeleccionado){
        if(this.paisSeleccionado!=null){
           this.opcionesNivelesPais.forEach(async(nivelPais,index)=>{
            if(itemSeleccionado!=null && itemSeleccionado==nivelPais.ciudadSeleccionada && index!=this.opcionesNivelesPais.length ){
              if((index)<(this.opcionesNivelesPais.length-1)){
                let opcionesCiudades=await this.cargarUbigeo(nivelPais.ciudadSeleccionada.codigoUbigeo);
                this.opcionesNivelesPais[index+1].opcionesCiudades=opcionesCiudades;
                await this.$forceUpdate();
              }
             
            }
              
          });
        }else{
          this.opcionesNivelesPais=[];
        }
     },
     async cargarPrimerNivel(){
        let valorReturn=[];
        if(this.paisSeleccionado!=null && this.opcionesNivelesPais.length>0){
         
          this.opcionesNivelesPais[0].opcionesCiudades=await this.cargarUbigeo(null);
          await this.$forceUpdate();  
        }else{
           this.opcionesNivelesPais=[];
        }
        return valorReturn;

     },
     async cargarUbigeo(item){
        try {
          
          let respon=await this.cargarNivel({
            paisSeleccionado:this.paisSeleccionado,
            codigoUbigeo:item
          });
            return respon; 
          } catch (error) {
              console.log("error",error);
              return [];
          }
     },
     async seleccionarCiudades(){
           await this.cargarNivelRegionPais();
     },
     async cargarOpcionesCiudades(item){
      this.cargarNNivel(item);
     },
     async anadirOrActualizarDireccion(){
       this.$store.dispatch("global/LOADEROPENORCLOSE", true);
        try {
          console.log("anadirrrr:",);
          let select= this.opcionesNivelesPais[this.opcionesNivelesPais.length-1].ciudadSeleccionada.id;
          let respon=await requestApi(
              `clientes/registroActualizarDirecciones`,
              {
              "idDireccionesUsuarioCliente":this.infoAdress.idDireccionesUsuarioCliente,
              "idUbigeo":select,
              "latitud":"",
              "longitud":"",
              "calle":this.infoAdress.direccion,
              "numeroCalle":this.infoAdress.numeroDirecion,
              "numeroPiso":this.infoAdress.numeroPiso,
              "nombreRecibir":this.infoAdress.nombreRecibir,
              "referencia":this.infoAdress.referencia
            },
              "POST"
          );
          const {data}=respon;
          let menssage=data.mensaje; 
          if(data.estado){
            this.snackbarMessage=true;
          
            this.activeEditUser=false;
            this.$notify({
              group: 'foo',
              type:"success",
              title: 'Direcciones',
              text: menssage
            });
            this.$emit("cerrarFormAdress",data.idDireccion);
            this.$emit("cancel",data.idDireccion);
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
       // this.$emit("cancel");
      },
      cancel(){
            this.$emit("cancel");
            this.$emit("cerrarFormAdress");
      },
      async loadDepartment(){
       try {
        let respon=await requestApi(
            `global/consumirUbicaciones?codigo=&codigoPais=9589`,
            {},
            "GET"
        );
        let data=respon.data.estado ? respon.data.data : [];
        this.listDepartament=data;
        } catch (error) {
            console.log("error",error);
        }
      },
      async loadProvince(){
       try {
        let respon=await requestApi(
            `global/consumirUbicaciones?codigo=${this.selectDepartament.codigoubigeo}&codigoPais=9589`,
            {},
            "GET"
        );
        let data=respon.data.estado ? respon.data.data : [];
        this.listProvinces=data;
        } catch (error) {
            console.log("error",error);
        }
      },
   
      async loadEdit(){
        if(this.editDireccion!=null){
          this.infoAdress.idDireccionesUsuarioCliente=this.editDireccion.id;
          this.infoAdress.direccion=this.editDireccion.calle;
          this.infoAdress.numeroDirecion=this.editDireccion.numeroCalle;
          this.infoAdress.numeroPiso=this.editDireccion.numeroPiso;
          this.infoAdress.referencia=this.editDireccion.referencia;
          this.infoAdress.nombreRecibir=this.editDireccion.nombreRecibir;
          let paisSeleccionado=this.opcionPaises.filter((valuePais)=>{
            return valuePais.id==this.editDireccion.idPais;
          });
          this.paisSeleccionado=await paisSeleccionado[0];
          await this.cargarNivelRegionPais();
          let cargarPrimerNivel=await  this.cargarUbigeo(null); 
          this.opcionesNivelesPais[0].opcionesCiudades=cargarPrimerNivel;

           this.editDireccion.idubicaciones.split(",").map(async (valueUbicaciones,index)=>{
            let itemIdFiltro=valueUbicaciones.trim();
            if(index==0){
              let primerSeleccionado=cargarPrimerNivel.filter((valueFiltro)=>{
                return valueFiltro.codigoUbigeo==itemIdFiltro;
              });
              this.opcionesNivelesPais[index].ciudadSeleccionada=primerSeleccionado[0];
            }else{
              let opcionesCiudades=await this.cargarUbigeo(this.editDireccion.idubicaciones.split(",")[index-1].trim() );
              this.opcionesNivelesPais[index].opcionesCiudades=opcionesCiudades;
              
              let seleccionadoN=opcionesCiudades.filter((valueFiltro)=>{
                return valueFiltro.codigoUbigeo==itemIdFiltro;
              });
              this.opcionesNivelesPais[index].ciudadSeleccionada=seleccionadoN[0];
              await this.$forceUpdate();  
            }
            
          });
          
          }
        }

    },
    async mounted() {
      await this.cargarPaisVista();
      await this.cargarNivelRegionPais();
      await this.cargarPrimerNivel();
      //await this.loadDepartment();
      await this.loadEdit();
     

    }
  }
</script>
<style>
    .container-form{
        background: #fff;
    }
    .form-address{
      box-sizing:content-box;
      padding:35px !important;
      position: relative;
      right: 25px;
    }
    .bnt-action{
      margin:auto !important;
      width:200px !important;
    }
</style>