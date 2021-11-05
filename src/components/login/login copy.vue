<template>
  <v-row justify="center" class="itemLogin">

    <div class="itemMenu"  @click="selecionarUsarioIniciarRegistrar">

      <v-menu offset-y>
       <template v-slot:activator="{ on, attrs }">
         <div class="iconuser"           
            v-bind="attrs"
            v-on="on">
            <i 
            icon
  
            class="icons-size far fa-user"></i>
            <span v-if="firstLetter" class="iconFirstUser">         
                <v-avatar color="red" size="36">
                    <span class="white--text headline">{{firstLetter}}</span>
                </v-avatar>
                
            </span>
         </div>
         <span class="text-flecha-abajo" style="/* transform: translateY(21px); */transform: rotate(90deg);font-weight: bold;"> ></span>

        </template>


          <v-list>
            <v-list-item-content>
                <v-list-item
                class="itemSession"
                @click="selecionarUsarioIniciarRegistrar"
                >
                    <v-list-item-title  v-if="dataUser" @click="redirectPage">  {{ dataUser.correo }} </v-list-item-title>
                    
                    <v-list-item-title  v-else>  Iniciar sesión / Regístrate </v-list-item-title>

                </v-list-item>
             </v-list-item-content>

            <v-list-item
              class="itemSession"
               v-if="dataUser"
            >
                <v-list-item-title>Mis Pedidos </v-list-item-title>
            </v-list-item>
            <v-list-item
              class="itemSession"
              v-if="dataUser"
            >
                <v-list-item-title>Sigue tu pedido</v-list-item-title>
            </v-list-item>
            <v-list-item
              class="itemSession"
              v-if="dataUser"
              @click="cerrarSession"
            >
            <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
      </v-list>
      </v-menu>
    </div>
    <v-dialog class="dialogAutenticacion" v-model="dialog"  max-width="600px" color="red">
      <v-card class="v-cardAutenticacion" v-if="tipoForm==='AUTENTICACION'">
        <div class="head-login">
        <v-card-title>
          <span class="headline">Confirmación de cuenta</span>
        </v-card-title>
        <span class="close-modal" @click="dialog = false">X</span>
        </div>
          <v-form v-model="valid" ref="form">

              <v-text-field 
                :outlined="false"
                :rounded="false"
                :rules="emailRules" 
                v-model="dataSession.usuario"
                label="correo*" 
                autocomplete="off"
                required ></v-text-field>
              <a @click="tipoForm='ESTABLECERORESTABLECERUSUARIO';restablecer=true;">Olvidé mi contraseña</a>
          
              <v-text-field 
                :rules="contraRules" 
                label="contrasenña*" 
                type="password" 
                v-model="dataSession.contasenia" 
                autocomplete="off" 
                required></v-text-field>
              <a @click="tipoForm='ESTABLECERORESTABLECERUSUARIO';restablecer=false;">No sabe o no recuerda cuál? Registrala ahora</a>
              <v-alert v-if="!(errorSession=='' || errorSession==null)" type="warning">
              {{errorSession}}
              </v-alert>
                
              <v-card-actions class="divfooter">
                  <v-col><a class="volver" @click="tipoForm='TIPOAUTENTICACION'">Atrás</a></v-col>  
                  <v-col> 
                  <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4 btn-ingresar"
                      @click="validateIniciar"
                  >
                      Iniciar
                  </v-btn>
                  </v-col>
              </v-card-actions>  
          </v-form>
          

  
      </v-card>
      <v-card class="v-cardAutenticacion" v-if="tipoForm==='TIPOAUTENTICACION'">
        <div class="head-login">
          <v-card-title>
              <span class="headline">Confirmar tu identidad</span>
              <span class="span-subtitle">Elija una de las opciones para confirmar su identidad</span>
          </v-card-title>
          <span class="close-modal" @click="dialog = false">X</span>
        </div>
        <div class="card-autenticacion">
        
          <facebook-login v-if="credencialesFacebook==null ? false : true" class="btn-social btn-facebook  v-btn v-btn--contained theme--light v-size--large primary"
            :appId="credencialesFacebook.clavepublica"
            loginLabel="Continuar con facebook"
            @login="onLogin"
            @logout="onLogout"
            @sdk-loaded="sdkLoaded" >
          </facebook-login>
         
          <v-btn v-if="credencialesGoogle==null ? false : true"  class="btn-social btn-google" large  color="red" @click="loguearGooogle">Ingresar con Google</v-btn>
          <v-btn class="btn-social btn-google" large  color="warning" @click="tipoForm='AUTENTICACION'">Ingresar con mail y contraseña</v-btn>

        </div>
        
      </v-card>
      <v-card class="v-cardAutenticacion" v-if="tipoForm==='ESTABLECERORESTABLECERUSUARIO'">
        <v-form class="formRestablecer" v-model="valid" @submit="verificarCorreo"  ref="form">
          <div class="head-login">
            <v-card-title>
              <span class="headline">Por favor ingrese su correo <br> {{ restablecer ? 'para restablecer contraseña' : 'para registrar usuario' }}</span>
            </v-card-title>
            <span class="close-modal" @click="dialog = false">X</span>
          </div>
          <v-container>
            <v-text-field 
              :rules="emailRules" 
              label="correo*" 
              v-model="correo" required autocomplete="off"></v-text-field>

              <v-alert v-if="!(errorValidCorreo=='' || errorValidCorreo==null)" type="warning">
                    {{errorValidCorreo}}
              </v-alert>
 
             
              

          </v-container>
          <v-card-actions>
              <v-col><a class="volver" @click="tipoForm='TIPOAUTENTICACION'">Atrás</a></v-col>  
              <v-btn long 
                :disabled="!valid"
                color="primary" 
                @click="verificarCorreo">Verificar correo</v-btn>
              
          </v-card-actions> 
        </v-form>  
      </v-card>
      <v-card class="v-cardAutenticacion" v-if="tipoForm==='VERIFICARCODIGOSEGURIDAD'">
        <v-form v-model="valid" @submit="confirmarCodigo"  ref="form">
            <div class="head-login">
              <span class="headline">Por favor verifique su correo</span>
              <span class="close-modal" @click="dialog = false">X</span>
            </div>
            <v-container>
              <v-row>
                <v-col cols="11">
                  <label>Ahora necesita informar el código que fue recibido a través su {{correo}}</label>
                  <v-text-field :rules="codeRules"   required autocomplete="off" v-model="codigoVerificacionValue"></v-text-field>
                </v-col>
                <v-col v-if="!(errorValidcode=='' || errorValidcode==null)" cols="12">
                  <v-alert type="warning">
                        {{errorValidcode}}
                  </v-alert>
                </v-col>
              </v-row>
              
            </v-container>

            <v-card-actions>
                <v-col><a class="volver" @click="tipoForm='TIPOAUTENTICACION'">Atrás</a></v-col>  
                <v-col> <v-btn  
                :disabled="!valid" class="btn-ingresar"  
                @click="confirmarCodigo" color="primary">Confirmar</v-btn></v-col>
            </v-card-actions>
        </v-form>   
      </v-card>
      <v-card  class="v-cardAutenticacion" v-if="tipoForm==='REGISTRARCONTRASENIA'">
         <v-form v-model="valid" @submit="actualizarContrasenia"  ref="form">
            <div class="head-login">
            
              <span class="headline">nueva contraseña <br> {{correo}}</span>
              <span class="close-modal" @click="dialog = false">X</span>
            </div>
           
            <v-card-text>
             
                <v-col cols="11">
                  <v-text-field
                    :append-icon="showPassport ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[contraReglasRules.required, contraReglasRules.min]"
                    :type="showPassport ? 'text' : 'password'"
                    name="input-10-2"
                    label="Nueva contraseña"
                    hint="At least 8 characters"
                  
                    class="input-group--focused"
                    v-model="passRegisFirst"
                    @click:append="showPassport = !showPassport"
                  ></v-text-field>
                  <v-text-field
                    :append-icon="showPassportConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[contraReglasRules.required, contraReglasRules.min]"
                    :type="showPassportConfirm ? 'text' : 'password'"
                    name="input-10-2"
                    label="Nueva contraseña"
                    hint="At least 8 characters"
                  
                    class="input-group--focused"
                    v-model="passRegisConfirm"
                    @click:append="showPassportConfirm = !showPassportConfirm"
                  ></v-text-field>
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
                <v-col cols="12">
                  <v-alert v-if="!(errorValidPassport==='' || errorValidPassport===null)" type="warning">
                    {{errorValidPassport}}
                  </v-alert>
                </v-col>
              
            </v-card-text>

            
            <v-card-actions>
                <v-col><a class="volver" @click="tipoForm='TIPOAUTENTICACION'">Atrás</a></v-col>  
                <v-col>
                <v-btn long color="primary" class="btn-ingresar"  @click="actualizarContrasenia">Actualizar</v-btn></v-col>
            </v-card-actions>
       </v-form>
      </v-card>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-dialog>

  </v-row>
</template>
<script>
import { requestApi } from "@/api/index.js"
import { verifyPass } from "@/assets/img/svg/verifyPass.svg"
import facebookLogin from 'facebook-login-vuejs';
import { mapState } from 'vuex'
import GAuth from 'vue-google-oauth2'
import Vue from 'vue'
  export default {
    components: { facebookLogin },
    data: () => ({
     personaId:null,
     emailSocial:null,
     nameSocial:null,
     isConnected:false,
     FB: {},
     model: {},
     verifyPass:verifyPass,
     restablecer:false,
     storage: window.localStorage,
     showPassport: false,
     showPassportConfirm: false,
     codigoVerificacionValue:"",
     overlay:false,
     errorSession:"",
     errorValidPassport:"",
     errorValidcode:"",
     errorValidCorreo:"",
     errorRegistrarUsuario:"",
     dialog: false,
     valid:false,
     dataSession:{
          usuario:"",
          contasenia:"",
          isSocial:false,
          isFacebook:false,
          isGoogle:false,
          accessToken:null
      },
      
      emailRules: [
        v => !!v || 'Correo electronico es requerido',
        v => /.+@.+/.test(v) || 'El Correo debe ser válido',
      ],
      contraRules: [
        v => !!v || 'La contraseña es requerida',

      ],
      codeRules: [
        v => !!v || 'El codigo es requerido',

      ],
      contraReglasRules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
      },
      passRegisFirst:"",
      passRegisConfirm:"",
      tipoForm:'TIPOAUTENTICACION',
      correo:""
    }),
    computed:{
      ...mapState([
        'global'
      ]),
      credencialesFacebook(){
        let credFace={};
         this.global.dataStore.credencialesSociales.map((value)=>{
          if(value.codigo=="CODFACEBOOK"){
            credFace=value.credenciales;
          }
        });
        return credFace;
      },
      credencialesGoogle(){
        let credFace={};
         this.global.dataStore.credencialesSociales.map((value)=>{
          if(value.codigo=="CODGOOGLE"){
            credFace=value.credenciales;
          }
        });
        return credFace;
      },
 
      passportMinDigitos() {     
        let valor=(this.passRegisFirst.length>=8 &&
        this.passRegisConfirm.length>=8  ) ;
        return valor;   
      },
      passwordAtLeast() {     
        let valor=(this.passRegisFirst.split("").filter((val)=>{return/^\d+$/.test(val) }).length &&
        this.passRegisConfirm.split("").filter((val)=>{return/^\d+$/.test(val) }).length  ) ;
        return valor;   
      },
      passportMayusc() {     
        let valor=(this.passRegisFirst.split("").filter((val)=>{return /[A-Z-Ñ]+$/.test(val) }).length &&
        this.passRegisConfirm.split("").filter((val)=>{return /[A-Z-Ñ]+$/.test(val) }).length  ) ;
        return valor;   
      },
      passportMinus() {     
        let valor=(this.passRegisFirst.split("").filter((val)=>{return /[a-z-ñ]+$/.test(val) }).length &&
        this.passRegisConfirm.split("").filter((val)=>{return /[a-z-ñ]+$/.test(val) }).length  ) ;
        return valor;   
      },
      passwordConfirmationRule() {       
        return (this.passRegisFirst === this.passRegisConfirm) ? true : false;     
      },
      tokenUsuario(){
            let tokenUser=this.storage.token ? this.storage.token :null;
            return tokenUser;
      },
      firstLetter(){
        let dataUser=this.storage.dataUser ? JSON.parse(this.storage.dataUser) :null;
        return dataUser ? dataUser.correo.substring(0,1) : null ;
      },
      dataUser(){
        let dataUser=this.storage.dataUser ? JSON.parse(this.storage.dataUser) :null;
        return dataUser ? dataUser : null;
      }
    },
    watch:{
     async emailSocial(){
        if(!(this.emailSocial==="" || this.emailSocial===null) && 
        (this.isSignIn===true || this.isConnected===true) && 
        localStorage.getItem("token")===null){
          if(this.isConnected){
           
            this.getUserDataFacebook();

          }
          if(this.isSignIn){
            await this.loguearGooogle();
            await this.$gAuth.signOut();
            //this.isSignIn = this.$gAuth.isAuthorized;
          }
        } 
      }
    },
    methods: {
      async redirectPage(){
          this.$router.push({ path: '/inforUser' })
      },
      async loguearSocial(){
          try{
            let respon=await requestApi(
              `seguridad/iniciarSessionCliente`,
              this.dataSession,
              "POST"
            );
          
            let stateResponse=respon.data.estado;
            let stateMessage=respon.data.mensaje;    
            if(!stateResponse){
                this.errorSession=!stateResponse ? stateMessage : "";  
            }else{
              let dataResponse=respon.data.data;
            
              localStorage.setItem("token", respon.data.token);
              localStorage.setItem("dataUser", JSON.stringify(dataResponse));
              this.errorSession="";  
              this.dialog=false;
              this.isConnected = false;
              }
          }catch(e){
            return e;
          }

        return "ok;"
      },
      async loguearGooogle(){
        try{
          const googleUser = await this.$gAuth.signIn();
          if(this.$gAuth.isAuthorized){
            this.emailSocial=googleUser.getBasicProfile().bu;
            this.dataSession.accessToken=googleUser.getAuthResponse().access_token;
            this.dataSession.isGoogle=true;
            this.dataSession.isFacebook=false;
            this.dataSession.isSocial=true;
            await this.loguearSocial();
            location.reload();
          }
          
        }catch(error){
          console.log("error",error);
        }
        

      },
      async getUserDataFacebook() {
        try {
          this.FB.getLoginStatus(async(dataStatus)=>{
            if(dataStatus.status==="connected"){
                this.dataSession.isSocial=true;
                this.dataSession.isFacebook=true;
                this.dataSession.isGoogle=false;
                this.dataSession.accessToken=dataStatus.authResponse.accessToken;
                this.dialog=false;
                this.isConnected = false;
                this.loguearSocial().then(async ()=>{
                  this.FB.api('/me/permissions', 'delete', null, async () => {
                    this.FB.logout();
                    await location.reload();
                  });
                  
                });
                

              }
          });
          } catch (error) {
              this.overlay=false;
              console.log("error",error);
          }
      },
      async iniciarSessionFacebook(){
          this.FB.api('/me', 'GET', { fields: 'id,name,email' },
            userInformation => {
              this.emailSocial = userInformation.email;
            }
              
            );
          return this.emailSocial;
        },
      async onLogin() {
            this.isConnected = true,
            await this.iniciarSessionFacebook();
    
          },
          onLogout() {
            this.isConnected = false;
            this.FB.getLoginStatus(function() {

              });
            
          },
          sdkLoaded(payload) {
            this.isConnected = payload.isConnected;
            this.FB = payload.FB;  
          },
          async confirmarCodigo(e){
            e.preventDefault();
            this.overlay=true;
            if(this.valid){
              try {

                let respon=await requestApi(
                `seguridad/verificarCorreo?correo=${this.correo}&codigoVerificacion=${this.codigoVerificacionValue}&restablecer=${this.restablecer ? 'true' : 'false' }`,
                {},
                "GET"
                );
                const {data}=respon;
                if(!data.estado){
                  this.errorValidcode=data.mensaje;
                }else{
                  this.tipoForm="REGISTRARCONTRASENIA";
                  await this.resetContrasenia();
                }
              } catch (err) {
                alert("error inesperado");              
              }
            }
            this.overlay=false;
          },
          async verificarCorreo(e){
            e.preventDefault();
            this.overlay=true;
            if(this.valid){
              try {
                let respon=await requestApi(
                `seguridad/enviarCorreo`,
                {
                  "correo": this.correo,
                  "restablecer":this.restablecer
                },
                "POST"
                );
                const {data}=respon;
                if(data.estado){
                  this.tipoForm='VERIFICARCODIGOSEGURIDAD';
                  await this.resetVerificacionCodigo();
                  
                }else{
                  this.errorValidCorreo=data.mensaje;
                }
                
              } catch (error) {
                
                alert("error inesperado");              
              }
            }
            this.overlay=false;
          },
          async actualizarContrasenia(e){
            e.preventDefault();
            this.overlay=true;
            this.$refs.form.resetValidation();
            if(this.valid){
              if(this.passwordConfirmationRule){
                  try {
                    let urlPeticion=!this.restablecer ? `seguridad/registrarUsuarioCliente` :  `seguridad/actualizarContrasenia`;
                    let respon=await requestApi(
                    urlPeticion,
                    {
                      "correo":this.correo,
                      "contasenia":this.passRegisFirst,
                      "codigoVerificacion":this.codigoVerificacionValue
                    },
                    "POST"
                    );
                    const {data}=respon;
                    if(!data.estado){
                      this.errorRegistrarUsuario=data.mensaje;
                    }else{
                      let dataResponse=data.data;
                      localStorage.setItem("token", data.token);
                      localStorage.setItem("dataUser", JSON.stringify(dataResponse));
                      this.errorSession="";  
                      this.dialog=false;
                      location.reload();
                      this.$forceUpdate();
                    }
                } catch (error) {
                  console.log(error);
                    alert("error inesperado");              
                }
              }else{
                  this.errorValidPassport="Las contraseñas no son iguales.";
              }
            }
            this.overlay=false;
          },
          async resetLogin(){
            this.dataSession.usuario="";
            this.dataSession.contasenia="";
            this.errorSession="";
            this.$refs.form.resetValidation();
          },
          async resetVerificacionCodigo(){
            this.errorValidcode="";
            this.$refs.form.resetValidation();
          },
          async resetContrasenia(){
            this.passRegisFirst="";
            this.passRegisConfirm="";
            this.errorValidCorreo="";
            this.$refs.form.resetValidation();
          },
          async cerrarSession(){
            await this.storage.removeItem("dataUser");
            await this.storage.removeItem("token");
            location.reload();
          },
          async selecionarUsarioIniciarRegistrar(){
          if(!this.dataUser){
              this.dialog=true;
          }
          },
          async login(){
            try {
              this.dataSession.isSocial=false;
              this.dataSession.isFacebook=false;
              this.dataSession.accessToken=null;
              let respon=await requestApi(
              `seguridad/iniciarSessionCliente`,
              this.dataSession,
              "POST"
              );
              let stateResponse=respon.data.estado;
              let stateMessage=respon.data.mensaje;
              if(!stateResponse){
                  this.errorSession=!stateResponse ? stateMessage : "";  
              }else{
                let dataResponse=respon.data.data;
              
                localStorage.setItem("token", respon.data.token);
                localStorage.setItem("dataUser", JSON.stringify(dataResponse));
                this.errorSession="";  
                this.dialog=false;
                location.reload();
                this.$forceUpdate();
              }
              this.overlay=false;
              } catch (error) {
                  this.overlay=false;
                  console.log("error",error);
              }
          },
          async validateIniciar(){
            this.overlay=true;
            this.$refs.form.resetValidation();
            setTimeout(this.login,2000)
            
          },
          atras(){
            
          } 
    },
    async mounted() {
      if(this.credencialesGoogle!=null){
        Vue.use(GAuth, {
          clientId: this.credencialesGoogle.clavepublica, 
          scope: 'email', prompt: 'select_account', fetch_basic_profile: false
        });
      }

      }, 
   }
</script>
<style>
.headline{
    text-align: center !important;
    font-weight: bold !important;
    width:100%;
}
.head-login .v-card__title{
    width: 100%;
}
.close-modal{
    font-weight: bold;
    font-size:28px;
    cursor:pointer;
    padding: 18px;
}
.head-login{
    display: flex;
}
.btn-ingresar{

    color:#fff !important; 
    float: right;
}
.btn-social{
    width:80% !important;
    margin:auto !important;
    margin-left:20px !important;
    margin-top:10px !important;
    color:#fff !important;

}
.v-cardAutenticacion{
    padding-bottom: 21px !important;
}
.span-subtitle{
    text-align:center !important;
    width:100% !important;
    display:block;
}
.span-title{
    margin-left:20px !important;
    padding-top:10px !important;
    padding-bottom:10px !important;
    display:block;
    font-weight:bold;
    font-size:24px !important;
    text-align:center;
}
.volver:before{
    content:"<"
}
.spancorreo{
    width:100%;
    text-align:center;
}
.itemSession{
    width: 260px !important;
    cursor:pointer;
}
.iconuser{
    display:flex;
    cursor:pointer;
}
.icons-size{
  margin-right:0px;
}
.btn-social  button {
 background: transparent !important;
 width:100% !important;
}
.btn-social  button:focus { outline:0 !important; }
.itemLogin{
  margin-left:0px;
}
.v-cardAutenticacion {
  right: 0;
  left: 0;
  background: red;
  position: fixed;
  top: 50px;
  max-width: 700px;
  justify-content: center;
  margin: auto;
  padding: 10px;
  box-sizing: content-box;
}
.divfooter{
  background-color:#F5F5F5;
  position: relative;
  left: -9px;
  top: 20px;
  width:100% !important;
}
.formRestablecer{
  position: relative;
  left: -10px;
}

@media (max-width: 756px)
{
.card-autenticacion{
  position: relative;
  left: -10px;
}
.btn-facebook{
  width:74% !important;
  height: 44px !important;
}
.card-autenticacion .btn-facebook{
  padding-left: 46px !important;
 }
}
.itemMenu{
  display: flex;
}
.text-flecha-abajo{
  font-weight: bold;
  transform: rotate(90deg);
}
</style>
