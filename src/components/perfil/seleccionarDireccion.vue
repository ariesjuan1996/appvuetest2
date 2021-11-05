<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3" style="font-size:24px !important;width: 100%;text-align: left;">
        Elige tus opciones de despacho
        </h1>
    </v-card-title>
        <v-tabs
          v-model="tabTipoEnvio"
          background-color="transparent"
          color="basil"
          grow
        >
        <v-tab
        >
            Despacho a domicilio
        </v-tab>
        <v-tab
        >
            Retira tu compra
        </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabTipoEnvio">
            <v-tab-item>
                <formularioDirecciones v-if="mostrarFormularioDireccion" @cancel="cancelarFormulario" :editDireccion="editarDireccion" @cerrarFormAdress="cerrarFormularioDireccion"/>
                <div v-if="direccionPreferida!=null && mostrarListado==false && mostrarFormularioDireccion==false">
                    <h3>Todos los despachos a domicilio serán enviados al mismo receptor.</h3>
                    <h3>Hemos seleccionado tu dirección principal para el despacho a domicilio:</h3> 
                    <v-card class="direccionesSeleccionPreferida">
                     <p>Direccion:{{direccionPreferida.calle}} {{direccionPreferida.numeroCalle}}<br/>
                        Ubicación:{{direccionPreferida.descripcionUbicaciones}}   
                      <a class="cambiar" @click="meEditarDireccion(direccionPreferida)">editar</a>
                      <a class="cambiar" @click="mostrarListado=true"> cambiar</a></p>
                    </v-card>
                </div>
                <div v-else-if="mostrarListado || (listadoDireccionesCliente.length==0) ||  direccionPreferida==null" >
                    <a @click="formularioDireccion">Ingresa una nueva dirección.</a>
                    <h2>Tus direcciones</h2>
                    <itemDireccion v-for="(item,index) in listadoDireccionesCliente" 
                      v-bind:key="index" 
                      :item="item"
                      @eliminarDireccion="eliminarDireccion" @cambiarPreferida="cambiarPreferida" />

                </div>
                <div class="siguientepasoPago">
                  <h3>Ir a pagar</h3>
                  <p>En el siguiente paso podrás seleccionar tu medio de pago</p>
                  <v-btn
                    @click="irPagar"
                    class="ma-2    btnSiguientePaso float-right"
                    color="success"
                    >
                      Ir a pagar
                </v-btn>  
                </div>
            </v-tab-item>
            <v-tab-item>
                <v-card
                color="basil"
                flat
                >
                <v-card
                  elevation="2"
                >
                 <v-subheader :inset="true">
                    <h2>Recojo en Tienda</h2>
                 </v-subheader>
                 <div class="recojoTienda">
                  <v-container justify="center" >
                  <v-row justify="left">
                    <v-dialog
                      v-model="diagloElegirTienda"
                      width="600px"
                      style="margin-top:45px;z-index:999 !important;"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <a v-bind="attrs" v-on="on">Elija tienda de recojo</a>
                      </template>
                      <v-card class="card-elegirtienda" >
                        <v-card-title>
                          <span class="headline">Detalles del punto de retiro</span>
                        </v-card-title>
                        <v-card-text>
                            <ul>
                                <li style="margin-top:20px !important;" v-for="(item,index) in listadoUbicacionesRecojo " v-bind:key="index">
                                  <v-card class="item-tienda-ubicacion">
                                      <h2 class="span-ubicacion">{{item.nombreTienda}}</h2>
                                      <span class="span-ubicacion">{{item.descripcionUbigeo}}</span>
                                      <span class="span-ubicacion">{{item.calle}}</span>
                                      <v-btn sytle="display:block;" color="primary" @click="elegirUbicacionDefecto">Elegir</v-btn>
                                  </v-card>
                                </li>
                            </ul>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-row>
                  </v-container>
                  <h2>{{tiendPorDefecto.nombreTienda}}</h2>
                  <h2>{{tiendPorDefecto.descripcionUbigeo}}</h2>
                  <h2>{{tiendPorDefecto.calle}}</h2></div>
                 <div class="recojoTiendaFecha container">
                  <h2>Fecha Recojo</h2>
                  <v-menu
                    ref="menuFechaRecojo"
                    v-model="menuFechaInicio"
                    :close-on-content-click="false"
                    max-width="290"
                  >

                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="computedDateFormattedMomentjs"
                        :clearable="false"
                        label="fecha de venta"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="tiendPorDefecto.fechaRecojo = null"
                      ></v-text-field>
                    </template>
                     <v-date-picker
                      v-model="tiendPorDefecto.fechaRecojo"
                      no-title
                      scrollable
                      :min="minimaFecha"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menuFechaInicio = false"
                      >
                        cerrar
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuFechaRecojo.save(tiendPorDefecto.fechaRecojo)"
                      >
                        seleccionar
                      </v-btn>
                    </v-date-picker></v-menu>
                      <h2>horario de recojo:</h2>
                      <span>{{horarioAtencion}}</span>
                  </div>
                </v-card>


                </v-card>
            </v-tab-item>
        </v-tabs-items>
  </v-card>
    
</template>
<script>
  import { mapActions } from 'vuex'
  import { requestApi } from "@/api/index.js"
  import formularioDirecciones from '@/components/direcciones/FormularioDirecciones.vue'
  import itemDireccion from '@/components/perfil/itemDireccion.vue'

  import moment from 'moment'
  export default {
    components: {formularioDirecciones,itemDireccion},
     data: () => ({
         tiendPorDefecto:{
           descripcionUbigeo:"",
           calle:"",
           nombreTienda:"",
           fechaRecojo:"",
           //nombreUbigeo:"",
         },
         horarioAtencion:"Del 07:00 al 20:00",
         nowDate: new Date().toISOString().slice(0,10),
         diagloElegirTienda:false,
         menuFechaInicio:false,
         tabTipoEnvio:0,
         paisSeleccionado:{},
         opcionesNivelesPais:[],
         direccion:"",
         opcionPaises:[],
         listadoUbicacionesRecojo:[],
         listadoDireccionesCliente:[],
         direccionPreferida:null,
         mostrarListado:false,
         mostrarFormularioDireccion:false,
         editarDireccion:{},
         dialogElegirTienda:false
     }),
     computed:{
       //nowDate
      minimaFecha(){
        return this.sumarDias(new Date(), 3).toISOString().slice(0,10);
        
      },
      computedDateFormattedMomentjs () {
        return this.tiendPorDefecto.fechaRecojo ? moment(this.tiendPorDefecto.fechaRecojo).format('DD-MM-YYYY') : ''
      },
     },
     watch:{
       direccionPreferida(newVal){
         this.$store.dispatch("global/SELECCIONARDIRECCIONPREFERIDA", newVal);
       }
     },
     methods: {
      elegirUbicacionDefecto(){
        alert("hola");
      },
      sumarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
      },
      async irPagar(){
        this.$emit("irPagar");
      },
      async formularioDireccion(){
        this.editarDireccion=null;
        this.mostrarFormularioDireccion=true;
      },
      async meEditarDireccion(item){
        this.editarDireccion=item;
        this.mostrarFormularioDireccion=true;
      },
      async cerrarFormularioDireccion(idDireccion){
         await this.cargarDireccionesUsuario();
         this.editarDireccion={};
          let itemSelect=this.listadoDireccionesCliente.filter((item)=>{
            return item.id==idDireccion;
          });
          this.direccionPreferida=itemSelect[0];
          this.mostrarFormularioDireccion=false;
      },
      async cancelarFormulario(){

      }, 
      async eliminarDireccion(id){
        this.$swal.fire({
        title: '¿Estás seguro que quieres eliminar esta dirección?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si,Eliminar',
        cancelButtonText: 'No,Cancelar'
      }).then(async (result) => {
        if (result.value) {
        this.$store.dispatch("global/LOADEROPENORCLOSE", true);
        
        try {
          let respon=await requestApi(
              `clientes/eliminarDireccionCliente`,
              {direccionCliente:id},
              "delete"
          );
          const {data}=respon;
          let menssage=data.mensaje; 
          if(data.estado){
            await this.cargarDireccionesUsuario();
            this.$swal.fire(
              'Eliminado!',
              menssage,
              'success'
            );

            await this.loadAddress();
          }else{
            this.$swal.fire(
              'Eliminado!',
              "Hubo un error al eliminar dirección",
              'error'
            );
            
          }
          } catch (error) {
              console.log("error",error);
          }finally {
            // I’ll fire either way
            this.$store.dispatch("global/LOADEROPENORCLOSE", false);
          }
          
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
          this.$swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
      },
      ...mapActions({
        cargarNivel: 'global/CARGARNIVEL' 
      }),
     ...mapActions({
        cargarPais: 'global/CARGARPPAIS' 
      }),
      ...mapActions({
        cargarUbigeoNivel: 'global/CARGARUBIGEONIVEL' 
      }),
      async cambiarPreferida(item){
        this.direccionPreferida=item;
        this.mostrarListado=false;
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
      async cargarOpcionesCiudades(item){
        this.cargarNNivel(item);
      },
      async cargarNNivel(itemSeleccionado){
        if(this.paisSeleccionado!=null){
           this.opcionesNivelesPais.forEach(async(nivelPais,index)=>{
            if(itemSeleccionado!=null && itemSeleccionado==nivelPais.ciudadSeleccionada && index!=this.opcionesNivelesPais.length ){
              this.opcionesNivelesPais[index+1].opcionesCiudades=await this.cargarUbigeo(nivelPais.ciudadSeleccionada.codigoUbigeo);
              await this.$forceUpdate();
            }
              
          });
        }else{
          this.opcionesNivelesPais=[];
        }
      },
      async cargarUbicacionesTienda(){
        try {
         let respon=await requestApi(
            `ubicaciones/cargarUbicacionTienda`,
            {},
            "GET"
          );
            let dataFiltro=respon.data.estado ? respon.data.data : [];
            this.listadoUbicacionesRecojo=dataFiltro;
            
          } catch (error) {
              console.log("error",error);
          }

      },
      async cargarDireccionesUsuario(){
        try {
         let respon=await requestApi(
            `clientes/cargarDireccionesCliente`,
            {},
            "GET"
          );
            let dataFiltro=respon.data.estado ? respon.data.data : [];
            this.listadoDireccionesCliente=dataFiltro;
            let direccionPreferida= this.listadoDireccionesCliente.filter((value)=>{
              return value.preferida;
            });
            if(direccionPreferida.length){
              this.direccionPreferida=direccionPreferida[0];
            }
            this.$store.dispatch("global/SELECCIONARDIRECCIONPREFERIDA", this.direccionPreferida);
            //direccionPreferida
          } catch (error) {
              console.log("error",error);
          }

      },
      async cargarPrimerNivel(){
        if(this.paisSeleccionado!=null && this.opcionesNivelesPais.length>0){
          await this.opcionesNivelesPais.forEach(async(nivelPais,index)=>{
            console.log("newval",nivelPais);
            if(index==0){
              nivelPais.opcionesCiudades=await this.cargarUbigeo(null);
              await this.$forceUpdate();
            }
          });
          
        }else{
          this.opcionesNivelesPais=[];
        }

      },
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
     },
     async mounted() {
        await this.cargarPaisVista();
        await this.cargarNivelRegionPais();
        await this.cargarPrimerNivel();
        await this.cargarDireccionesUsuario();
        await this.cargarUbicacionesTienda();
        //this.store.dispatch("global/SELECCIONARDIRECCIONPREFERIDA", data);
    }
  }
</script>

<style>
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
 .item-tienda-ubicacion{
   cursor:pointer;
   padding:30px;
 }
 .span-ubicacion{
   display:block;
   width:100% !important;

 }
</style>