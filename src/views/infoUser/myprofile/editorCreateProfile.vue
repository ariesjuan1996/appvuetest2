<template>
    <v-card  class="mx-auto editCarddd" max-width="100%"
        tile >
      <v-card-text>
        <v-form ref="form" class="form-infouser" v-model="valid"  @submit="actualizarUsuario" >
            <v-card-title class="titleActive">
            Datos personales
           
            </v-card-title>
            <v-row>
            <v-col cols="6">
                <v-text-field
                type="email"
                :disabled="true"
                v-model="infoUser.usuario"
                :rules="emailRules"
                label="Correo"
                required
                autocomplete="off"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-select
                :disabled="!activeEditUser"
                :items="listTypeDocument"
                :rules="tipoDocumentoRules"
                v-model="typeDocumentSelect"
                item-text="titulo"
                item-value="id"
                label="tipo de documento"
                return-object
                required
                ></v-select>
            </v-col>
            <v-col cols="6">
                <v-text-field 
                :disabled="!activeEditUser"
                :rules="numeroDocumentoRules"
                label="Numero de documento" 
                type="text" 
                v-mask="'#########'" 
                v-model="infoUser.documento"
                required></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field 
                :disabled="!activeEditUser"
                label="Nombres" 
                :rules="nombresRules"
                v-model="infoUser.nombresCompletos" 
                autocomplete="off"
                required>
                </v-text-field>
            </v-col>


            <v-col cols="6">
                <v-text-field 
                :disabled="!activeEditUser"
                label="Numero telefonico o celular"
                :rules="telefonoRules" 
                required 
                autocomplete="off"
                v-model="infoUser.telefono"></v-text-field>
            </v-col>
            <v-col v-if="activeEditUser" cols="12">
                <v-list >
                <v-list-group >
                    <template  v-slot:activator>
                        <v-list-item-content >
                            <v-list-item  >
                            <v-list-item-title>
                                <h2> Datos de facturacion</h2>
                            </v-list-item-title>
                            </v-list-item>
                        </v-list-item-content>
                    </template>
                    <v-list-item>
                            <v-row>
                            <v-col
                                lg="6"
                                cols="12"
                                md="4"
                            >
                                <v-text-field
                                label="ruc"
                                :disabled="!activeEditUser"
                                v-mask="'###########'" 
                                required
                                v-model="infoUser.ruc"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                lg="6"
                                cols="12"
                                md="4"
                            >
                                <v-text-field
                                :disabled="!activeEditUser"
                                label="Nombre corporativo"
                                required
                                v-model="infoUser.razonSocial"
                                ></v-text-field>
                            </v-col>
                            </v-row>
                    </v-list-item>
                </v-list-group>
                </v-list>
            </v-col>
            </v-row>
            <div class="btns-events">
              <v-btn class="btn-edit" @click="actualizarUsuario" color="primary" > {{activeEditUser ? 'GUARDAR CAMBIOS'  :  'EDITAR' }}</v-btn>
              <v-btn style="margin-left:20px;" class="btn-edit" v-if="activeEditUser" text large color="error" @click="cancelarEdicion">CANCELAR</v-btn>
            </div>
        </v-form>
        </v-card-text>   
    </v-card>
  
</template>

<script>
  import { requestApi } from "@/api"
   
  export default {
    components: {},
    props:{
      activeEdit:{
        type:Boolean,
        default: null
      }
    },
    data: () => ({
      valid:false,
      snackbarMessage:false,
      overlay:false,
      activeEditUser:false,
      listTypeDocument:[],
      typeDocumentSelect:null,
      tieneContraseniaUs:false,
      infoUser:{
        documento:'',
        tipoDocumento:'',
        nombres:'',
        apellidoPaterno:'',
        apellidoMaterno:'',
        usuario:'',
        telefono:'',
        tieneContrasenia:false,
        nombreCorporativo:'',
        telefonoCorporativo:''
      },
      infoUserCopy:{
        documento:'',
        tipoDocumento:'',
        nombres:'',
        apellidoPaterno:'',
        apellidoMaterno:'',
        usuario:'',
        telefono:'',
        tieneContrasenia:false,
        nombreCorporativo:'',
        telefonoCorporativo:''
      },
      typeDocument:'',
      tipoDocumentoRules: [
        v => !!v || 'El  tipo de documento es requerido.',
      ],
      numeroDocumentoRules: [
        v => !!v || 'El  numero de documento es requerido.',
       // v => v.length <= 40 || 'El numero de documento sobrepasa la longitud maxima.',
      ],
       nombresRules: [
        v => !!v || 'El  nombre del usuario requerido.',
      //  v => v.length <= 80 || 'El nombre  sobrepasa la longitud maxima.',
      ],
       apellidosPaRules: [
        v => !!v || 'El  apellido paterno del usuario requerido.',
      //  v => v.length <= 80 || 'El apellido paterno  sobrepasa la longitud maxima.',
      ],
      telefonoRules: [
        v => !!v || 'Se requiere de número telefónico.',
       // v => v.length <= 80 || 'El apellido materno  sobrepasa la longitud maxima.',
      ],
      apellidosMaRules: [
        v => !!v || 'El  apellido materno del usuario requerido.',
       // v => v.length <= 80 || 'El apellido materno  sobrepasa la longitud maxima.',
      ],
      emailRules: [
        v => !!v || 'Correo electronico es requerido.',
        v => /.+@.+/.test(v) || 'El email debe ser válido.',
      //  v => v.length <= 80 || 'El correo sobrepasa la longitud maxima.',
       // v => v.length >80 || 'El nombre debe tener hasta de 80 caracteres',
      ],
      mask: '/^[a-z][0-9]+(-[a-z][0-9]+)*$/',
      hexTokensNumDocumento: {
        F: {
          pattern: /[0-9]/,
          transform: v => v.toLocaleUpperCase()
        }
      }
    }),
    computed:{
     
    },
    watch:{
      activeEdit(newVal){
        if(newVal!=null){
          this.activeEditUser=newVal;
        }
      }
    },
    methods: {
      async actualizarUsuario(){
       
        if(this.activeEditUser){
            this.$refs.form.validate();
        }else{
            this.$refs.form.resetValidation();
        }
      
        if(this.activeEditUser && this.valid){
 
        this.$store.dispatch("global/LOADEROPENORCLOSE", true);
         setTimeout(async()=>{
            try{
 
              if(this.valid){
                let urlPeticion=`seguridad/actualizarDatosCliente`;
                console.log("this.typeDocumentSelect",this.typeDocumentSelect);
                let respon=await requestApi(
                urlPeticion,
                  {
                      "tipoDocumento":this.typeDocumentSelect.id,
                      "documento":this.infoUser.documento,
                      "ruc":this.infoUser.ruc,
                      "nombres":this.infoUser.nombresCompletos,
                      "telefono":this.infoUser.telefono,
                      "nombreCorporativo":this.infoUser.nombreCorporativo,
                      "telefonoCorporativo":this.infoUser.telefonoCorporativo,
                  },
                "POST"
                );
                const {data}=respon;
                if(data.estado){
                  this.snackbarMessage=true;
                  let mensaje=data.mensaje; 
                  this.activeEditUser=false;
                   
                
                  this.$notify({
                    group: 'foo',
                    type:"success",
                    title: 'mi perfil',
                    text: mensaje
                  });
                  this.$emit("closeEditProfile");
                }else{
                  if(this.activeEdit==null){
                    this.infoUser.documento=this.infoUserCopy.documento;
                    this.infoUser.nombreCorporativo=this.infoUserCopy.nombreCorporativo;
                    this.infoUser.telefonoCorporativo=this.infoUserCopy.telefonoCorporativo;
                    this.infoUser.ruc=this.infoUserCopy.ruc;
                    this.infoUser.nombresCompletos=this.infoUserCopy.nombresCompletos;
                    this.infoUser.usuario=this.infoUserCopy.usuario;
                    this.infoUser.telefono=this.infoUserCopy.telefono;
                    this.infoUser.tieneContrasenia=this.infoUserCopy.tieneContrasenia;
                    this.typeDocumentSelect=this.infoUserCopy.tipoDocumento;                    
                    this.activeEditUser=false;
                  }

                   this.$notify({
                    group: 'foo',
                    type:"error",
                    title: 'mi perfil',
                    text: "no actualizado error interno"
                  });
                }                
              }

             this.$store.dispatch("global/LOADEROPENORCLOSE", true);
            }catch(e){
              console.log(e);
            }
         },3000);
        }else{
            this.activeEditUser=true;
        }
      },
      async cancelarEdicion(){
        
          this.activeEditUser=false;
          this.infoUser.documento=this.infoUserCopy.documento;
          this.infoUser.nombreCorporativo=this.infoUserCopy.nombreCorporativo;
          this.infoUser.ruc=this.infoUserCopy.ruc;
          this.infoUser.nombresCompletos=this.infoUserCopy.nombres;
         
          this.infoUser.usuario=this.infoUserCopy.usuario;
          this.infoUser.telefono=this.infoUserCopy.telefono;
          this.infoUser.tieneContrasenia=this.infoUserCopy.tieneContrasenia;
          this.typeDocumentSelect=this.infoUserCopy.tipoDocumento;
            this.$emit("closeEditProfile");
      },
      async cargarTipoDocumento(){
        try {
          let respon=await requestApi(
            `global/cargarTipoDocumento`,
            {},
            "GET"
          );
          this.listTypeDocument=respon.data.estado ? respon.data.data : []; 
          } catch (error) {
              console.log("error",error);
          }
      },
      async cargarUsuario(){
        try {
          let respon=await requestApi(
            `seguridad/getUsuario`,
            {},
            "GET"
          );
          let objectUser=respon.data.estado ? respon.data.data : null;
           if(objectUser===null){
            this.infoUser.documento=null;
            this.infoUser.tipoDocumento=null;
            this.infoUser.ruc=null;
            this.infoUser.razonSocial=null;
            this.infoUser.nombresCompletos=null;
            this.infoUser.usuario=null;
            this.infoUser.telefono=null;
            this.typeDocumentSelect=null;
            this.infoUser.tieneContrasenia=false;
            this.infoUser.razonSocial=null;

            this.infoUserCopy.documento=null;
            this.infoUserCopy.tipoDocumento=null;
            this.infoUserCopy.nombresCompletos=null;
            this.infoUserCopy.usuario=null;
            this.infoUserCopy.telefono=null;
            this.infoUserCopy.ruc=null;
            this.infoUserCopy.razonSocial=null;
            this.infoUserCopy.tieneContrasenia=false;
            this.tieneContraseniaUs=false;
           }else{
           
            let tipoDocumento=objectUser.tipoDocumento;
            let selectTipoDocumento=this.listTypeDocument.filter((value)=>{
              return value.id===tipoDocumento;
            });
            this.typeDocumentSelect=selectTipoDocumento.length ? selectTipoDocumento[0] : null;
            this.infoUser.usuario=objectUser.usuario;
            this.infoUser.documento=objectUser.documento;
            this.infoUser.ruc=objectUser.ruc;
            this.infoUser.razonSocial=objectUser.razonSocial;
            this.infoUser.nombresCompletos=objectUser.nombresCompletos;
            this.infoUser.telefono=objectUser.telefono;
            this.infoUserCopy.telefono=objectUser.telefono;


            this.infoUserCopy.usuario=objectUser.usuario;
            this.infoUserCopy.documento=objectUser.documento;
            this.infoUserCopy.ruc=objectUser.ruc;
            this.infoUserCopy.razonSocial=objectUser.razonSocial;
            this.infoUserCopy.nombresCompletos=objectUser.nombresCompletos;
            this.infoUserCopy.telefono=objectUser.telefono;
            this.infoUserCopy.tipoDocumento=this.typeDocumentSelect;
            console.log(" this.infoUserCopy.nombresCompletos", this.infoUserCopy.nombresCompletos);
            /*
            this.infoUser.nombresCompletos=objectUser.nombresCompletos;
            this.infoUser.apellidoPaterno=objectUser.apellidoPaterno;
            this.infoUser.apellidoMaterno=objectUser.apellidoMaterno;
            this.infoUser.infoUser=objectUser.infoUser;
            this.infoUser.tieneContrasenia=objectUser.tieneContrasenia;
            this.tieneContraseniaUs=objectUser.tieneContrasenia;
            this.infoUser.nombreCorporativo=objectUser.nombreCorporativo;
            this.infoUser.telefonoCorporativo=objectUser.telefonoCorporativo;*/

           /* this.infoUserCopy.documento=objectUser.documento;
            this.infoUserCopy.nombreCorporativo=objectUser.nombreCorporativo;
            this.infoUserCopy.telefonoCorporativo=objectUser.telefonoCorporativo;
            this.infoUserCopy.ruc=objectUser.ruc;
            this.infoUserCopy.nombres=objectUser.nombres;
            this.infoUserCopy.apellidoPaterno=objectUser.apellidoPaterno;
            this.infoUserCopy.apellidoMaterno=objectUser.apellidoMaterno;
            this.infoUserCopy.correo=objectUser.correo;
            
            this.infoUserCopy.tieneContrasenia=objectUser.tieneContrasenia;
            this.infoUserCopy.nombreCorporativo=objectUser.nombreCorporativo;
            this.infoUserCopy.telefonoCorporativo=objectUser.telefonoCorporativo;
            this.infoUserCopy.tipoDocumento=selectTipoDocumento.length ? selectTipoDocumento[0] : null;*/
           }
          } catch (error) {
              console.log("error",error);
          }
      }
  },
  async mounted() {
    
    await this.cargarTipoDocumento();  
    await this.cargarUsuario();
    this.$refs.form.resetValidation();
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