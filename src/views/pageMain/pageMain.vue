<template>
<div>
    <header class="head-not-found">
        <v-container>
            <span class="titleApp">Negocios online</span>
            <a  href="/login" class="link-login" x-large color="success" dark>¿Ya tienes una cuenta de tienda virtual?</a>
        </v-container>
    </header>
    <v-container class="messages-container">
      <v-row>
        <v-col lg="6" md="6" sm="12">
            <v-card v-if="!sendCode" class="container" >
                <h2 class="title-register">Comience su prueba gratuita de 14 días hoy</h2>
                <p class="description-register">Pruebe la tienda virtual de forma gratuita y explore todas las herramientas y servicios que necesita para iniciar, ejecutar y hacer crecer su negocio.</p>
                <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
                >
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Correo electronico"
                    autocomplete="off"
                    required
                    @blur="verifyEmail"
                    :error-messages="errorsEmail"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :rules="passRules"
                    label="Contraseña"
                    autocomplete="off"
                    required
                    type="password" 
                ></v-text-field>
                <v-text-field
                    v-model="nameStore"
                    :rules="nameRules"
                    label="nombre de la tienda"
                    autocomplete="off"
                    :error-messages="messageStore"
                    @input="validNameStore"
                    required
                   v-mask="customTokens"
                   
                ></v-text-field>
                <span class="success-message" v-if="statusStore">{{messageAvailable }}</span>
                <v-btn
                    color="success"
                    class="link-login-store"
                    @click="createAccount"
                    :disabled="!(validForm)"
                >
                   Crea tu cuenta
                </v-btn>
                </v-form>
            </v-card>
            <v-card v-else class="messages-container-card">
            <v-container>

              <v-text-field
                  v-model="codeValue"
                  :rules="codeValueRules"
                  label="Código de confirmación correo"
                  autocomplete="off"
                  required
              ></v-text-field>
                <v-btn
                    color="success"
                    class="link-login-store"
                    @click="activeAccount"
                    :disabled="!(codeValue)"
                >
                   Activar tu cuenta
                </v-btn>
            </v-container>
            </v-card>
        </v-col>
        <v-col lg="6" md="6" sm="6" class="col-img"> 
           <v-img class="img-logo-app" src="https://image.freepik.com/vector-gratis/caricatura-cafeteria_18591-43035.jpg"/>
        </v-col>
      </v-row>
    </v-container>
</div>
</template>
<script>
import { requestApi } from "@/api"
  export default {
    data: () => ({
      sendCode:false,
      codeValue:"",
      errorsEmail:[],
      messageStore:[],
      messageAvailable:null,
      statusStore:false,
      valid: true,
      name: '',
      password:'',
      email: '',
      nameStore: '',
      codeValueRules:[
        v => !!v || 'El codigo es requerido.',
      ],
      passRules: [
        v => !!v || 'La contraseña es requerida.',
        v => (v && v.length > 8) || 'La contraseña debe tener menos de 8 caracteres.',
      ],
      errorEmail:null,
      nameRules: [
        v => !!v || 'El nombre de la tienda es requerida.',
        v => (v && v.length >5) || 'La tienda debe tener al menos 5 caracteres.',
        v => (v && v.length <= 50) || 'La tienda no debe sobrepasar  50 caracteres.',
      ],
     
      emailRules: [
        v => !!v || 'Correo electronico es requerido.',
        v => /.+@.+\..+/.test(v) || 'El email debe ser válido.'
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
      lazy: false,
      hexTokens: {
        F: {
          pattern: /[0-9]/,
          transform: v => v.toLowerCase()
        }
      },
      customTokens: {
          tokens: {
              'C': {
                  pattern: /^[a-z\d\sÑáéíóúÁÉÍÓÚ]+$/i,
                  transform: function(v) {
                      return v.toLowerCase();
                  }
              }
          }
      }
    }),
    watch:{

      email(newVal){
        if(newVal && this.errorsEmail.length){
          this.errorsEmail=[];
        }
      },
      nameStore(newVal){
        if(newVal && this.messageStore.length){
          this.messageStore=[];
        }
      }
    },
    methods: {
     async activeAccount(){
        this.$store.dispatch("global/LOADEROPENORCLOSE", true);
        try {
          //tiendas/verificarDisponibleCorreo
          let verifyEmail=await requestApi(
            `tiendas/crearTienda`,
            {
              "correo":this.email,
              "contrasenia":this.password,
              "codigoActivacion":this.codeValue,
              "nombreTienda":this.nameStore
          },
            "POST"
          );
          const {data}=verifyEmail;
          if(data.estado){
            this.sendCode=true;
            this.$notify({
              group: 'foo',
              title:"registro de tienda",
              text: data.mensaje
            });
            let dataResponse=data.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("dataUser", JSON.stringify(dataResponse));
            location.reload();
          }else{
            this.$notify({
              group: 'foo',
              type:"error",
              title:"registro de tienda",
              text: data.mensaje
            });
          }        
        } catch (error) {
          console.log("error",error);
        }finally {
             this.$store.dispatch("global/LOADEROPENORCLOSE", false);
        }
      },
      limitToken(val,limit){
        let value="";
        for(var i=0;i<limit;i++){
          value=value+val;
        }
        return value;
     },
     async validNameStore(){
       if(this.validStore){
          this.$store.dispatch("global/LOADEROPENORCLOSE", true);
          try {
            let verifyEmail=await requestApi(
              `tiendas/disponibleNombreTienda?nombreTienda=${this.nameStore}`,
              {},
              "GET"
            );
            const {data}=verifyEmail;
            
            //let messageAvailable=data.estado ?  null : data.mensaje;
            if(!data.estado){
             this.messageStore=[];
             this.messageStore=[data.mensaje];
            }else{
              this.messageAvailable=data.mensaje;
               console.log("messageAvailable:",data.mensaje);
            }
            this.statusStore=data.estado;
          } catch (error) {
            console.log("error",error);
          }finally {
             this.$store.dispatch("global/LOADEROPENORCLOSE", false);

          }

       }
      },
     async verifyEmail(){
       this.$store.dispatch("global/LOADEROPENORCLOSE", true);
       if(this.validEmail){
          try {
            let verifyEmail=await requestApi(
              `tiendas/verificarDisponibleCorreo?correo=${this.email}`,
              {},
              "GET"
            );
            const {data}=verifyEmail;
            this.errorEmail=data.estado ?  null : data.mensaje;
            if(!data.estado){
              this.errorsEmail=[];
              this.errorsEmail=[data.mensaje];

            }
            console.log("data response verify:",data);
          } catch (error) {
              console.log("error",error);
          }finally {
             this.$store.dispatch("global/LOADEROPENORCLOSE", false);
          }
       }
     
      },
      async createAccount () {
       this.$store.dispatch("global/LOADEROPENORCLOSE", true);
        try {
          //tiendas/verificarDisponibleCorreo
          let verifyEmail=await requestApi(
            `tiendas/enviarCodigoActivacion?nombreTienda=${this.nameStore}&correo=${this.email}`,
            {},
            "GET"
          );
          const {data}=verifyEmail;
          if(data.estado){
            this.sendCode=true;
            this.$notify({
              group: 'foo',
              title: 'codigo activación de tienda',
              text: data.mensaje
            });
          }         
        } catch (error) {
            console.log("error",error);
        }finally {
          this.$store.dispatch("global/LOADEROPENORCLOSE", false);
        }
       
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
    computed:{
      validEmail(){
        return /.+@.+\..+/.test(this.email) && !!this.email;
      },
      validForm(){
        return (this.validEmail && 
        this.validStore && this.validPass && this.messageStore.length==0  && this.errorsEmail.length==0) ? true : false;
      },
      validPass(){
        return !!this.password && (this.password ? (this.password.length >=8 ?
         true : false) : false);
      },
      validStore(){
        return !!this.nameStore && (this.nameStore ? (this.nameStore.length >=5 ?
         (
           this.nameStore.length>50 ? false : true 
        ) : false) : false);
      }
    },
    created(){
     console.log("location.host",location.host);
     this.customTokens.mask=this.limitToken('C',50);
      //alert("asas");
    }
  }
</script>
<style>
.img-logo-app{
    height:400px;
}
.title-register{
    text-align:center;
    width:100% !important;
}
.link-login-store{
    width:100% !important;

}
.head-not-found{
 background: #000 !important;
 height: 70px !important;
}
.titleApp{
    color:#fff !important; 
    font-size:30px !important;
}
.link-login{
    float: right;
    height:30px;
    top:0px;
    color:#fff !important;
    margin-top:10px !important;
}
.messages-container,.messages-container-card{
    width:100%;
    height:auto;
    margin-top:20px;
    align-items: center;
    display: flex;
    justify-content: center;
}
.message{
    font-size:26px;
}
.success-message{
  color:green;
}
@media (max-width: 727px){
 .col-img{
     display:none;
 }
}
</style>