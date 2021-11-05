<template>
    <v-card   class="mx-auto cardpassport"  max-width="100%">
        <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-card-text>
        <v-form v-if="activeEditPass && !codeSend && !infoUser.tieneContrasenia" class="form-infouser">
            <v-row>
            <v-col cols="12">
                <h2 class="v-list-item__title titleinfoUser">Enviar código de acceso a su correo electrónico</h2>
            </v-col>   
                
            <div 
                class="content-send-code">
                    <v-btn large color="primary" class="btn-edit" @click="enviarCodigoActivacion">Enviar código</v-btn>

            </div>
            </v-row>
        
        </v-form>
        <v-form v-if="activeEditPass && codeSend" class="form-infouser">
        
            <v-row>
            <v-col cols="12">
                <h2 class="v-list-item__title titleinfoUser">Cambiar de contraseña</h2>
                <v-alert v-if="!(messageUpdatePass==='' || messageUpdatePass===null) && !statePeticion && !snackbarMessage" type="error"> {{messageUpdatePass}} </v-alert>
            </v-col>     
            <v-col 
            lg="6"
            cols="12">
                
                <v-text-field 
                :disabled="false" 
                v-model="codeActivate"
                label="Codigo activación" 
                required autocomplete="off"></v-text-field>
                <v-text-field 
                :append-icon="showpassRegisConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassRegisConfirm ? 'text' : 'password'"
                :disabled="false" 
                v-model="passRegisConfirm"
                label="Nueva contraseña"
                @click:append="showpassRegisConfirm = !showpassRegisConfirm"  
                required autocomplete="off"></v-text-field>
            </v-col>
            <v-col 
            lg="6"
            cols="12">
                <v-btn text small color="primary" @click="enviarCodigoActivacion">Reenviar código</v-btn>
            </v-col>
                <v-col cols="12">
                <h2>La contraseña debe tener</h2>
                <ul>
                    <li><i v-if="passportMinDigitos" class="greenCheck fas fa-check"></i> Mínimo de 8 caracteres</li>
                    <li><i v-if="passwordAtLeast" class="greenCheck fas fa-check"></i> 1 número</li>
                    <li>  <i v-if="passportMinus" class="greenCheck fas fa-check"></i> 1 letra minúscula</li>
                    <li> <i v-if="passportMayusc" class="greenCheck fas fa-check"></i> 1 letra mayúscula</li>
                </ul>
                </v-col>
            </v-row>
            <v-btn :disabled="!(passportMinDigitos && passwordAtLeast && passportMinus && passportMayusc && !( codeActivate==null || codeActivate=='') )" color="primary" @click="establecerContrasenia">GUARDAR CONTRASEÑA</v-btn>
        </v-form>
        <v-form v-if="activeEditPass && (infoUser.tieneContrasenia && !codeSend) " class="form-infouser">
            <v-row>
            <v-col cols="12">
                <h2 class="v-list-item__title titleinfoUser">Cambiar de contraseña</h2>
                <v-alert v-if="!(messageUpdatePass==null || messageUpdatePass=='') && !statePeticion && !snackbarMessage" type="error"> {{messageUpdatePass}} </v-alert>
            </v-col>     
            <v-col 
            lg="6"
            cols="12">
                
                <v-text-field
                :append-icon="showpassPassRegisFirst ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassPassRegisFirst ? 'text' : 'password'" 
                :disabled="false" 
                v-model="passRegisFirst"
                label="Contraseña actual"
                @click:append="showpassPassRegisFirst = !showpassPassRegisFirst" 
                required autocomplete="off"></v-text-field>
            </v-col>
            <v-col 
            lg="6"
            cols="12">
                </v-col>
            <v-col 
                lg="6"
                cols="12"
            >
                <v-text-field 
                :append-icon="showpassRegisConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassRegisConfirm ? 'text' : 'password'" 
                :disabled="false" 
                v-model="passRegisConfirm"
                label="Nueva contraseña" 
                @click:append="showpassRegisConfirm = !showpassRegisConfirm"
                required autocomplete="off"></v-text-field>

            </v-col>
            <v-col 
            lg="6"
            cols="12">
                </v-col>
                <v-col cols="12">
                <h2>La contraseña debe tener</h2>
                <ul>
                    <li><i v-if="passportMinDigitos" class="greenCheck fas fa-check"></i> Mínimo de 8 caracteres</li>
                    <li><i v-if="passwordAtLeast" class="greenCheck fas fa-check"></i> 1 número</li>
                    <li>  <i v-if="passportMinus" class="greenCheck fas fa-check"></i> 1 letra minúscula</li>
                    <li> <i v-if="passportMayusc" class="greenCheck fas fa-check"></i> 1 letra mayúscula</li>
                </ul>
                </v-col>
            </v-row>
            <v-btn :disabled="!(passportMinDigitos && passwordAtLeast && passportMinus && passportMayusc)" color="primary" @click="guardarContrasenia">GUARDAR CAMBIOS</v-btn>
            <v-btn style="margin-left:20px;" class="btn-edit" text large color="error" @click="activeEditPass=false">CANCELAR</v-btn>
        </v-form>
        <v-form v-if="!activeEditPass" class="form-infouser">
            <v-row>
            <v-col cols="12">
                <h2 class="v-list-item__title titleinfoUser">Cambiar de contraseña</h2>
            </v-col>  
            <v-col cols="12">

                        
            </v-col>  
            <v-col cols="12" v-if="!infoUser.tieneContrasenia">
                <v-text-field 
                v-model="passwordUser"
                :disabled="true" 
                label="Contraseña" 
                required autocomplete="off"></v-text-field>
            </v-col>

            </v-row> 
            <div class="content-send-code">
            <v-btn class="btn-edit"  color="primary" @click="activarDefinirContrasenia">{{!infoUser.tieneContrasenia ? 'DEFINIR UNA CONTRASEÑA' : 'ACTUALIZAR CONTRASEÑA'}}</v-btn>
            </div>
        </v-form>

        </v-card-text>    
    </v-card>
</template>

<script>
  import { requestApi } from "@/api"
  export default {
    data: () => ({
      valid:false,
      showpassPassRegisFirst:false,
      showpassRegisConfirm:false,
      snackbarMessage:false,
      messageUpdatePass:null,
      statePeticion:false,
      overlay:false,
      activeEditUser:false,
      activeEditPass:false,
      codeSend:false,
      infoUser:{
        tieneContrasenia:false,
      },
      infoUserCopy:{
        tieneContrasenia:false
      },
      codeActivate:'',
      passRegisFirst:"",
      passRegisConfirm:"",
      passwordUser:"Usted todavía no tiene una contraseña definida.",
      
    }),
    props:{
     tieneContraseniaUs:Boolean,
    },
    watch:{
        tieneContraseniaUs(newVal){
            this.infoUser.tieneContrasenia=newVal;
        }
    },
    computed:{
      passportMinDigitos() {     
        return this.passRegisConfirm ? (this.passRegisConfirm.length>=8 ?  true : false ) : false;   
      },
      passwordAtLeast() {   
          
        let valor=(
        this.passRegisConfirm ? (this.passRegisConfirm.split("").filter((val)=>{return/^\d+$/.test(val) }).length) : 0
        ) ;
        return valor;   
      },
      passportMayusc() {     
        let valor=( this.passRegisConfirm ?  (this.passRegisConfirm.split("").filter((val)=>{return /[A-Z-Ñ]+$/.test(val) }).length ) : 0 ) ;
        return valor;   
      },
      passportMinus() {     
        let valor=(
          this.passRegisConfirm ? ( this.passRegisConfirm.split("").filter((val)=>{return /[a-z-ñ]+$/.test(val) }).length  )  : 0);
        return valor;   
      }
    },
    methods: {
      async establecerContrasenia(){
        this.overlay=true;
         setTimeout(async()=>{
            try{
              let urlPeticion=`seguridad/actualizarContrasenia`;
              let respon=await requestApi(
              urlPeticion,
              {
                "contasenia":this.passRegisConfirm,
                "codigoVerificacion":this.codeActivate
              },
              "POST"
              );
              const {data}=respon;
              if(data.estado){
                this.snackbarMessage=true;
                this.activeEditPass=false;
                this.messageUpdatePass=data.mensaje; 
                this.passRegisFirst=null;
                this.passRegisConfirm=null;
                this.codeActivate=null;
                this.infoUser.tieneContrasenia=true;
                
                this.codeSend=false;
              }else{
                this.snackbarMessage=false;
                this.messageUpdatePass=data.mensaje;
              }
              this.statePeticion=data.estado;
              this.overlay=false;
            }catch(e){
              this.overlay=false;
              console.log(e);
            }
         },3500);

      },     
      async guardarContrasenia(){
        this.overlay=true;
        setTimeout(async()=>{
          try {
          
          let respon=await requestApi(
          `seguridad/actualizarCredencialesCliente`,
            {
                "contaseniaActual":this.passRegisFirst,
                "contaseniaNueva":this.passRegisConfirm
            },
          "POST"
          );
          const {data}=respon;
          if(data.estado){
            this.snackbarMessage=true;
            this.activeEditPass=!this.activeEditPass;
            this.messageUpdatePass=data.mensaje; 
            this.passRegisFirst=null;
            this.passRegisConfirm=null;
           this.$notify({
              group: 'foo',
              type:"success",
              title: 'mi perfil',
              text: this.messageUpdatePass
          });
          }else{
            this.snackbarMessage=false;
            this.messageUpdatePass=data.mensaje;
          }
          this.statePeticion=data.estado;
          this.overlay=false;
        } catch (error) {
          this.overlay=false;
          alert("error inesperado");              
        }    

             
           }, 4500);
 
       
      },
      async enviarCodigoActivacion(){
        this.overlay=true;
        try {
          let respon=await requestApi(
          `seguridad/enviarCorreo`,
          {
            "restablecer":true
          },
          "POST"
          );
          
          const {data}=respon;
          if(data.estado){
            this.activeEditPass=true;
            this.menssageSendCode=data.mensaje;
            this.codeSend=true;
          }else{
            this.menssageSendCode=data.mensaje;
          }
          this.overlay=false;
        } catch (error) {
          this.overlay=false;
          alert("error inesperado");              
        }     
      },
      async activarDefinirContrasenia(){
        this.activeEditPass=!this.activeEditPass;
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

            this.infoUser.tieneContrasenia=false;
            this.infoUserCopy.tieneContrasenia=false;
           }else{
            this.infoUser.tieneContrasenia=objectUser.tieneContrasenia;
            this.activeEditPass=false;
            this.infoUserCopy.tieneContrasenia=objectUser.tieneContrasenia;
           }
          } catch (error) {
              console.log("error",error);
          }
      }
  },
  async mounted() {
  
  }
  }
</script>