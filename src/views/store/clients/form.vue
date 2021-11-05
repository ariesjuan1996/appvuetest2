<template>
 <div class="content-categories">
 <div  class="btn-back" @click="redirect">Ir a caracteristicas</div>
  <v-card >
   <v-container>
    <h2 v-if="this.$route.params.edit!=undefined">actualizar Cliente -{{dataRegistroCliente.tipoCliente ? dataRegistroCliente.tipoCliente.id :null}} {{dataRegistroCliente.numeroDocumento}} </h2>
    <h2 v-else>new Client</h2>
    <h2 >Personal Information</h2>
    <v-form
      v-model="validRegistrarCliente"
      ref="formRegistrarCliente"
      lazy-validation
      class="form-content"
    >
      <v-row>
      <v-col cols="6">
          <v-text-field
            class="obligatorioControl"
            v-model="dataClient.firstName"
            label="first Name"
            required
            autocomplete="off"
            v-mask="nombreCompletosTokens"
            :rules="nombreCompletosRules"
            :counter="300"
            max="300"     
          ></v-text-field></v-col>
        <v-col cols="6">
          <v-text-field
            class="obligatorioControl"
            v-model="dataClient.lastName"
            label="last Name"
            required
            autocomplete="off"
            v-mask="nombreCompletosTokens"
            :rules="nombreCompletosRules"
            :counter="300"
            max="300"     
          ></v-text-field></v-col>
          <v-col
        cols="12"
        lg="6"
      >
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              label="Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
        <p>Date in ISO format: <strong>{{ date }}</strong></p>
      </v-col>
       <v-col cols="6">
        <v-menu
          ref="dateDob"
          v-model="datedob"
          :close-on-content-click="false"
          :return-value.sync="dataClient.dob"
          transition="scale-transition"
          offset-y
          min-width="290px"

        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="DOB*"
              readonly
              :value="computedFechaDesdeFormattedMomentjs"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>


          </template>
          <v-date-picker
            v-model="dataClient.dob"
            no-title
            scrollable
            :min="nowDate"
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="datedob = false"
            >
              cerrar
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateDob.save(dataClient.dob)"
            >
              seleccionar
            </v-btn>
          </v-date-picker>
        </v-menu> 
      </v-col>
        
      <v-col cols="6">
          <v-text-field
            class="obligatorioControl"
            v-model="dataClient.phone"
            label="Phone"
            required
            autocomplete="off"
            v-mask="nombreCompletosTokens"
            :rules="nombreCompletosRules"
            :counter="300"
            max="300"     
          ></v-text-field></v-col>
        <v-col cols="6">
          <v-text-field
            class="obligatorioControl"
            v-model="dataClient.email"
            label="Email"
            required
            autocomplete="off"
            v-mask="nombreCompletosTokens"
            :rules="nombreCompletosRules"
            :counter="300"
            max="100"     
          ></v-text-field></v-col>
          <v-col cols="6">
          <v-text-field
            class="obligatorioControl"
            v-model="dataClient.address"
            label="Address"
            required
            autocomplete="off"
            v-mask="nombreCompletosTokens"
            :rules="nombreCompletosRules"
            :counter="300"
            max="100"     
          ></v-text-field></v-col>
            
      </v-row> 
       <h2 >Payments</h2>
       <div >
          <v-btn style="position: absolute;right: 10px;margin-top: -20px;" color="blue" dark @click="guardarCliente">
           +
          </v-btn>
        </div> 
       <v-row>
        <v-col cols="6">
          <v-text-field
              class="obligatorioControl"
              v-model="payment.transaction"
              label="Transaction"
              required
              autocomplete="off"
              v-mask="nombreCompletosTokens"
              :rules="nombreCompletosRules"
              :counter="300"
              max="300"     
            ></v-text-field></v-col>
          <v-col cols="6">
          <v-text-field
              class="obligatorioControl"
              v-model="payment.amount"
              label="Amount"
              required
              autocomplete="off"
              v-mask="nombreCompletosTokens"
              :rules="nombreCompletosRules"
              :counter="300"
              max="300"     
            ></v-text-field></v-col>
                 <v-col cols="6">
            <v-menu
              ref="menuDate"
              :close-on-content-click="false"
            
              v-model="menuDate"
              transition="scale-transition"
              offset-y
              min-width="290px"

            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Date*"
                  readonly
                  :value="computedFechaDesdeFormattedMomentjs"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>


              </template>
              <v-date-picker
                v-model="payment.date"

                no-title
                scrollable
                :min="nowDate"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menuDate = false"
                >
                  cerrar
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuDate.save(payment.date)"
                >
                  seleccionar
                </v-btn>
              </v-date-picker>
        </v-menu> 
      </v-col>  
            
          </v-row>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
      <v-row>
       <v-col cols="12">
          <v-btn color="blue" dark @click="guardarCliente">
           {{textButton}}
          </v-btn>
        </v-col> 
      </v-row>
    </v-form>
     
   </v-container>
  </v-card>

 </div>
</template>
<script>
import { requestApi } from "@/api"
import {  mapMutations } from 'vuex'
import { mapGetters } from 'vuex';

import moment from 'moment';
  export default {
  components: {
        
    },
    data: vm => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
            validRegistrarCliente:false,
      fechaDesde:null,
      menuFechaDesde:false,
      menuDate:false,
      datedob:false,
      nowDate: new Date().toISOString().slice(0,10),

      lazy:false,
      valid:false,
      opcionesTipoDocumento:[],

        headers: [
          {
            text: 'Traslation ID',
            align: 'start',
            sortable: false,
            value: 'traslationId',
          },
          { text: 'Amount', value: 'amount' },
          { text: 'Date', value: 'date' }
         
        ],
        desserts: [
          {
            traslationId: 'Frozen Yogurt',
            amount: 159,
            date: 6.0
          }
        ],

      dataClient:{
        firstName:null,
        lastName:null,
        dob:new Date().toISOString().slice(0,10),
        phone:null,
        email:null,
        address:null
      },//pdate
      payment:{
        transaction:null,
        amount:null,
        date:null
      },
      tipoDocumentoRules: [
        v => !!v || 'El tipo de documento es requerido.',
      ],
      errorArrayNumeroDocumento:[],
      numeroDocumentoRules:[],
      numeroTokens: {
        tokens: {
            'C': {
                pattern:  /[0-9]/,
                transform: function(v) {
                    return v.toLowerCase();
                }
            }
        }
      },
      nombreCompletosTokens: {
          tokens: {
              'C': {
                  pattern: /^[a-z\d\sÑáéíóúÁÉÍÓÚ]+$/i,
                  transform: function(v) {
                      return v.toLowerCase();
                  }
              }
          }
      },
      nombreCompletosRules: [
        v => !!v || 'El nombre completo es requerido.',
        v => (v && v.length <= 300) || 'El nombre completo debe tener menos de 300 caracteres.',
      ],
      numeroTelefonicoTokens: {
          tokens: {
              'C': {
                  pattern:  /[0-9]/,
                  transform: function(v) {
                      return v.toLowerCase();
                  }
              }
          }
      },
      direccionTokens: {
        tokens: {
            'C': {
                pattern: /^[a-z\d\sÑáéíóúÁÉÍÓÚ]+$/i,
                transform: function(v) {
                    return v.toLowerCase();
                }
            }
        }
      },
      opcionesUbigeo:[],  
      errorArrayCorreo:[],
    }),
    
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      ...mapMutations({
          setEditCrudt: 'global/SET_EDITCRUDT',
      }),
      async verificarDocumento(){
        if((this.idRegistro==undefined || this.idRegistro=="" || this.idRegistro==null)){
          if(this.dataRegistroCliente.tipoCliente==null || this.dataRegistroCliente.tipoCliente===""){
            alert("Seleccione tipo de documento");
            return false;
          }

          let respon=await requestApi(
            `clientes/verificarCodigoCliente?idTipoDocumento=${this.dataRegistroCliente.tipoCliente.id}&numeroDocumento=${this.dataRegistroCliente.numeroDocumento}`,
            {
            },
            "get"
          );
          const {data}=respon;
          let errorVerificacionCodigo=data.estado ? data.mensaje : null; 
          if(errorVerificacionCodigo){
            this.errorArrayNumeroDocumento=[];
            this.errorArrayNumeroDocumento.push(errorVerificacionCodigo);
            //this.dataRegistroCliente.numeroDocumento=null;
          }else{
            this.errorArrayNumeroDocumento=[];
          }  
        }
        
        
      },
      async redirect(){
      await this.setEditCrudt(null);
       this.$router.push("/admin/clients");
      },
      async cargarDatosEdicion(){
        try {
          let respon=await requestApi(
            `clientes/editarCliente?idCliente=${this.idRegistro}`,
            {},
            "GET"
          );
          let data=respon.data.estado ? respon.data.data[0] : null;
          if(data!=null){
            this.dataRegistroCliente.numeroDocumento=data.documento;
            this.dataRegistroCliente.nombreCompleto=data.nombresCompletos;
            this.dataRegistroCliente.direccion=data.direccion;
            this.dataRegistroCliente.numeroTelefono=data.telefono;
            this.dataRegistroCliente.correo=data.correo;
            this.dataRegistroCliente.estado=data.estado;
            let idTipoDocumento=data.idTipodocumento;
             console.log("this.opcionesUbigeo",this.opcionesTipoDocumento);
            let tipoDocumentoSelect=this.opcionesTipoDocumento.filter((value)=>{
              return value.id==idTipoDocumento;
            });
            let ubigeoSelect=this.opcionesUbigeo.filter((value)=>{
              return value.value==data.idUbigeo;
            });
           
            if(tipoDocumentoSelect.length>0){
              this.dataRegistroCliente.tipoCliente=tipoDocumentoSelect[0];
            }
            if(ubigeoSelect.length>0){
              this.dataRegistroCliente.ubicacionGeo=ubigeoSelect[0];
            }
          }
       
        } catch (error) {
            console.log("error",error);
        }
      }, 
      async guardarCliente(){
        await this.$refs.formRegistrarCliente.validate();
        console.log("formRegistrarCliente",this);
        if(!this.validRegistrarCliente){
          this.$notify({
            position:"top",
            group: 'foo',
            type:"alert",
            title: 'Registrar Cliente.',
            text:   "Algún dato es requerido o está mal escrito."
          });
          return false;
        }
        let typePeticion="post";
        let urlPeticion=`clientes/registrarCliente`;
         if(this.idRegistro!=undefined && this.idRegistro!="" && this.idRegistro!=null){
           typePeticion="put";
           urlPeticion=`clientes/actualizarCliente`;
         }
        let respon=await requestApi(
          urlPeticion,
          {
            "idTipoDocumento":this.dataRegistroCliente.tipoCliente.id,
            "numeroDocumento":this.dataRegistroCliente.numeroDocumento,
            "idCliente":this.idRegistro,
            "telefono":this.dataRegistroCliente.numeroTelefono,
            "idUbigeo":this.dataRegistroCliente.ubicacionGeo!=null ? this.dataRegistroCliente.ubicacionGeo.value : null,
            "nombreCompletos":this.dataRegistroCliente.nombreCompleto,
            "direccion":this.dataRegistroCliente.direccion,
            "correo":this.dataRegistroCliente.correo,
            "estado":this.dataRegistroCliente.estado 
          },
          typePeticion
        );
        const {data}=respon;
        if(data.estado){

          this.$notify({
            position:"top",
            group: 'foo',
            type:data.estado ? "success" : "error",
            title: 'Registro Cliente.',
            text:   data.mensaje
          });
          this.dialogAbrirDialogCliente=false;
          if(!(this.idRegistro!=undefined && this.idRegistro!="" && this.idRegistro!=null)){
            await this.$refs.formRegistrarCliente.reset();
          }
          
        }else{
          this.$notify({
            position:"top",
            group: 'foo',
            type:"error",
            title: 'Busqueda Numero Documento.',
            text:  data.mensaje
          });
        }
        },
      },
    watch:{
     
      async getEditCrud(newVal){
        if(newVal=='SAVE'){
          if(this.valid){
            this.guardarProveedor();
            this.setEditCrudt(null);
          }else{
             this.$refs.form.validate();
          }
        }
        if(newVal=='DISCAR'){
          if(this.valid){
            this.discarChange();
            
            this.setEditCrudt(null);
            //await this.loadCategoryEdit();
            
          }else{
             this.$refs.form.validate();
          }
         
        }
      },
      tituloCategoria(newVal){
        if(!newVal){
          this.errorArrayMessage=[];
        }
      },
      getChangeDetect(newData){
        this.setEditCrudt(newData ? "EDIT" :null);
      }
    },
    
    computed:{
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      computedFechaDesdeFormattedMomentjs () {
        return this.fechaDesde ? moment(this.fechaDesde).format('YYYY-MM-DD') : '';
      },
     
      ...mapGetters({
            getEditCrud: 'global/getEditCrud',
      }), 
      idRegistro(){
        return this.$route.params.edit;
      },
      textButton(){
        return (this.idRegistro!=undefined && this.idRegistro!="" && this.idRegistro!=null) ? "Save" : "Save";
      }
    },
    async mounted() {
      this.numeroTokens.mask=this.limitToken('C',15);
      this.nombreCompletosTokens.mask=this.limitToken('C',300);
      this.numeroTelefonicoTokens.mask=this.limitToken('C',15);
      this.direccionTokens.mask=this.limitToken('C',300);
      if(this.idRegistro!=undefined && this.idRegistro!="" && this.idRegistro!=null){
        await this.cargarDatosEdicion();
      }
    }
  }
</script>
<style>
.btn-export,.btn-import{
  margin-left:20px !important;
}
.btn-action-content{
  display: flex;
}
.btn-right{
  position: absolute;
  right: 8px;
}
.content-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom:20px !important;
}
.btn-back{
    cursor:pointer;
}
.btn-back:before{
  content:"<";
  font-weight: bold;
}
.errorImg{
  margin-top:10px;
}
.fileImg{
  display:none !important;
}
.vue-notification-group,.vue-notification-wrapper,.vue-notification-template,.vue-notification{
  z-index:99999999999 !important;
}
</style>