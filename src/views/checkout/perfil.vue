<template>
    <div>
        <headInfoProfile/>
        <v-container fluid class="content-checkoutprofile">
          <LoginDialog :abrirDialog="abrirDialog" @cambiarDialogo="cambiarDialogo"/>
          <v-stepper style="box-shadow:none;"   v-model="e1">
            <v-stepper-header>
              <v-stepper-step
                editable
                :complete="e1 > 1"
                step="1"
              >
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :editable="dataUser!=null"
                :complete="e1 > 2"
                step="2"
              >
                Despacho
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :editable="dataUser!=null && getDireccionPreferida!=null" step="3">
                Pago
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card v-if="dataUsuario"><h2>Bienvenido {{dataUsuario.usuario}}<a style="margin-left: 20px;" @click="cerrarSession">Cerrar sessión</a></h2></v-card>
                  <v-card v-else @click="abrirDialog=true"><a>Iniciar Session</a></v-card>
                <bolsaCompra :items="detalleCarro" @sumarCantidad="sumarCantidad" @irComprar="irComprar"/>
                  
              </v-stepper-content>

              <v-stepper-content step="2">
                <ubicacion @irPagar="irPagar"/>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>

                <v-btn
                  color="primary"
                  @click="e1 = 1"
                >
                  Continue
                </v-btn>

                <v-btn text>
                  Cancel
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-container>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { requestApi } from "@/api"
  import headInfoProfile from "@/views/header/headInfoProfile.vue"
  import LoginDialog from "@/components/login/loginCambio.vue";
  import bolsaCompra from "@/components/perfil/bolsaCompra.vue"
  import ubicacion from "@/components/perfil/ubicacion.vue"
//  import editorCreateProfile from "@/views/infoUser/myprofile/editorCreateProfile.vue"
//  import formadress from "@/views/infoUser/address/formadress.vue"
  import shortid from 'shortid'
  export default {
    components: {headInfoProfile,bolsaCompra,ubicacion,LoginDialog/*editorCreateProfile,formadress*/},
    data: () => ({
      detalleCarro:[],
      e1: 1,
      msg: 'PayPal Checkout Component',
      credentials:{
      sandbox: "ARrBAN8iES1k4vvxfEb8HdqlqFXFKEFvI9uNdgrl0ahAPKJFJMMOapfqoZuSZBBCYTOA4E1Syn2Wq4V8", 
      production: "AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl"},
      invoiceNumber: shortid.generate(),
       myStyleBottom: 
        {
          label: 'checkout',
          size:  'responsive',
          shape: 'pill',
          color: 'gold'
        },
      userProfile:null,
      activeEdit:false,
      contSun:0,
      editAdress:null,
      fechaEntrega:null,
      formAdrress:null,
      storage: window.localStorage,
      direccionesSelect: null,
      listAdress:[],
      dataUsuario:{},
      abrirDialog:false
        
      }),
    computed:{
      ...mapGetters({
            getDireccionPreferida: 'global/getDireccionPreferida'
      }), 
       dataUser(){
        let dataUser=this.storage.dataUser ? JSON.parse(this.storage.dataUser) :null;
        return dataUser ? dataUser : null;
      },
      subTotalCost(){
        let cars=this.storage.cats ? JSON.parse(this.storage.cats) :[];
        let subtotal=0.0;
        cars.map((value)=>{
          subtotal=subtotal+parseFloat(value.precioVenta)*parseInt(value.cantidadProducto);
        });
        return subtotal.toFixed(2);
      },
      totalCost(){
        let cars=this.storage.cats ? JSON.parse(this.storage.cats) :[];
        let subtotal=0.0;
        cars.map((value)=>{
          subtotal=subtotal+parseFloat(value.precioVenta)*parseInt(value.cantidadProducto);
        });
        return subtotal.toFixed(2);
      },
      shippingCost(){
        return (0).toFixed(2);
      },
      objectAdress(){
        let selectObj=this.listAdress.filter((item)=>{ return item.idDirecciones===this.direccionesSelect});
        return selectObj.length ? selectObj[0] : null;
       
      },
      currentDate(){
        var d = new Date();
        return d; 
      },
      currentDateFormat(){
        var year = this.currentDate.getFullYear().toString();
        var month = (this.currentDate.getMonth() + 101).toString().substring(1);
        var day = (this.currentDate.getDate() + 100).toString().substring(1);
        return year + "-" + month + "-" + day;
      },
      nextDay(){
        let currentDate= this.currentDate;
        currentDate.setDate(this.currentDate.getDate() + 1);
        var year = currentDate.getFullYear().toString();
        var month = (currentDate.getMonth() + 101).toString().substring(1);
        var day = (currentDate.getDate() + 100).toString().substring(1);
        return year + "-" + month + "-" + day;
      },
      listDetailt(){
        let cars=this.storage.cats ? JSON.parse(this.storage.cats) :[];
        return cars;
      },
      SubTotal(){
        let cars=this.storage.cats ? JSON.parse(this.storage.cats) :[];
        let subtotal=0.0;
        cars.map((value)=>{
          subtotal=subtotal+parseFloat(value.precioVenta)*parseInt(value.cantidadProducto);
        });
        return subtotal.toFixed(2);
      }
    },
  //e1
    watch:{
      e1(newVal){
        this.$store.dispatch("global/SELECCIONARPROCESOS", newVal);
         
      }
    },
    methods: {
    async irPagar(){
      this.e1=3
    },
    async cambiarDialogo(newVal){
      this.abrirDialog=newVal;
    },
    async cerrarSession(){
      await this.storage.removeItem("dataUser");
      await this.storage.removeItem("token");
      location.reload();
    },
     async irComprar(){
       this.e1 = 2;
     },
     async sumarCantidad(object){
        let cantidad=parseFloat(object.producto.cantidadProducto) +object.cantidad;
        let stock=parseFloat(object.producto.stock) ;
        if(stock>cantidad){
          await  this.$store.dispatch("products/EDITARCANTIDADPRODUCTOPAYLOAD", {
              id:object.producto.id,
              cantidadProducto:cantidad,
            });
        }else{
          await  this.$store.dispatch("products/EDITARCANTIDADPRODUCTOPAYLOAD", {
              id:object.producto.id,
              cantidadProducto:stock,
            });

        }
        await this.cargarProductoIds();
        this.$forceUpdate();
     },
     async cantidadProductoIds(){
       let datos= this.storage.carrito ? JSON.parse(this.storage.carrito) : [];
       let idsProducto=[]; 
       datos.map((value)=>{
          idsProducto.push(value.id);
       });
       return idsProducto.join(",");
      },
      cantidadProductoId(id){
       let datos= this.storage.carrito ? JSON.parse(this.storage.carrito) : [];
       let cantidadProducto=0;
       datos.filter((value)=>{
          if(value.id==id){
            cantidadProducto=value.cantidadProducto;
          }
        });
        return cantidadProducto;
      },
      async cargarProductoIds(){
        try {
         let idProductosCarrito=await this.cantidadProductoIds();
         console.log("idProductosCarrito",idProductosCarrito);
         let respon=await requestApi(
            `productos/listarProductoPorIds?reqIds=${idProductosCarrito}`,
            {},
            "GET"
          );
            this.detalleCarro=[];
            let dataFiltro=respon.data.estado ? respon.data.data : [];
            this.detalleCarro=dataFiltro;
            console.log("detalleCarro:",this.detalleCarro);
            this.detalleCarro.forEach(async(value)=>{
              let itemCantidad=this.cantidadProductoId(value.id);
              value.cantidadProducto=itemCantidad;
            });
          } catch (error) {
              console.log("error",error);
          }
      },
      setLoaded() {
        this.loaded = true;
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: this.product.description,
                    amount: {
                      currency_code: "USD",
                      value: this.product.price
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.paidFor = true;
              console.log(order);
            },
            onError: err => {
              console.log(err);
            }
          })
          .render(this.$refs.paypal);
      },
      closeEditProfile(){
        this.activeEdit=!this.activeEdit;
      },
      changeDelivery(){
        this.selectAddress=true;
        this.$forceUpdate();
      },
      editDirect(newVal){
        this.editAdress=newVal;
        this.formAdrress="new";
        this.$forceUpdate();
      },
      allowedDates(val){
        
        let valueDiff=this.daysBetween(this.dateStringFormat(val),this.currentDate);
        let diffDay=valueDiff==0 ? 0 : valueDiff;
        let maxDayPemit=3; 
        var day = new Date();
        let maximumDate=this.addDays(day,maxDayPemit);
        let countDomingo=this.countDayDate(maximumDate,new Date(),0);
        let perMit=this.currentDate.getDay()==6  ? (diffDay<=(maxDayPemit+countDomingo+1) && diffDay>=0 ? (this.dateStringFormat(val).getDay()==0 ? false : true) : false  ) : (diffDay<=(maxDayPemit+countDomingo) && diffDay>=0 ? (this.dateStringFormat(val).getDay()==0 ? false : true) : false  );
        return  perMit;
      },
      dateStringFormat(string){
        let mydate = new Date(string);
        mydate.setDate(mydate.getDate() + 1);
        return mydate;
      },
      addDays(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
      },
      dateFormat(fecha){
        let year = fecha.getFullYear().toString();
        let month = (fecha.getMonth() + 101).toString().substring(1);
        let day = (fecha.getDate() + 100).toString().substring(1);
        return year + "-" + month + "-" + day;
      },
      countDayDate(date1,date2,daySem){
        let diff=this.daysBetween(date1,date2);
        let cont=0;
        for(let i=0;i<diff;i++){
          const dateFormat=this.dateStringFormat(this.dateFormat(this.addDays(date2,i)));
          if(this.dateStringFormat(dateFormat).getDay()==daySem){
            cont=cont+1;
          }
        }
        return cont;
      },
      daysBetween(date1, date2) {
        // The number of milliseconds in one day
        var ONE_DAY = 1000 * 60 * 60 * 24;
        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();
        // Calculate the difference in milliseconds
        var difference_ms =(date1_ms - date2_ms);

        // Convert back to days and return
        return Math.round(difference_ms/ONE_DAY);

      },
      async continuarPagos(){
        this.selectAddress=false;
      },
      async cerrarFormAdress(newData){
       
        if(!(newData==null || newData==undefined)){
          await this.loadAddress();
         let itemSelect= this.listAdress.filter((item,index) =>{
          
            return item.idDirecciones==newData ? index : null;
         });
         this.direccionesSelect=itemSelect ? itemSelect[0].idDirecciones : null;
        }
        this.formAdrress=null;
        this.editAdress=null;
      },
      async newProduct(){
        this.formAdrress="new";
        
      },
      async redirectPage(url){
        await this.$router.push(url);
      },
      closeSession(){
        alert("close sesssion");
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
        } catch (error) {
            console.log("error",error);
        }finally {
          // I’ll fire either way
          this.$store.dispatch("global/LOADEROPENORCLOSE", false);
        }
      },
      async cargarUsuario(){
        try {
          let respon=await requestApi(
            `clientes/usuarioCliente`,
            {},
            "GET"
          );
          this.dataUsuario=respon.data.estado ? respon.data.data : null;
          console.log("dataUsuario",this.dataUsuario);
          } catch (error) {
              console.log("error",error);
          }
      },

  },
  async mounted() {
    await this.loadAddress();
    await this.cargarUsuario();
    await this.cargarProductoIds();
    this.$store.dispatch("global/SELECCIONARPROCESOS", this.e1);

   /*let externalScript = document.createElement('script')
   //https://www.paypalobjects.com/api/checkout.js
    externalScript.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id=AabjIIn0aPTHN7zS30rg0SG_Ok5Yzi2R430oMVfFTjT4d8lQOT1PuGcXzoDGTgT9ap0dD86VAkdt9l8o')
    document.head.appendChild(externalScript);*/
/*
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AaWPbZcqvAtYj6DPHuolAF81c45GCPKkBxzKUyx60Xwg4QSnpsecha7GURHMoMBp0HYCdfvHovl7psnZ";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
*/


  }
  }
</script>
<style>
.btn-edit{
 color: #2A73C5;
 font-size:18px;
}
.btn-new-adress{
   width:100% !important;
   margin-bottom:10px;
}
.btn-continuar{
  width:100% !important;
  background: red !important;
  color:#fff !important;
}
.list-address{
  margin: auto;
    width: 100%;
    border: 0px solid transparent;
    padding: 0px;
}
.list-address li{
  margin-top:10px;
  margin:auto !important;
  width:100%;
}
.v-application ul, .v-application ol{
  padding-left:0px !important;
}
.content-checkoutprofile{
  margin-top:70px;
}

.negrita{
    font-weight: bold;
}
.btn100{
  width:100% !important;

}
.data-datapinker {
 display: flex;
  justify-content: center;
}
.card-user-edit{
  width:100%;
  display:flex;
}
.card-user-edit-edit{
  cursor:pointer;
  line-height: 31px;
}
.titleAdress{
  font-weight:bold;
  font-size:24px;
  display:flex;
}

.img-icon{
  width:50px !important;
   height: 50px  !important;
}
.itemPurchase{
    display: flex;
    border-bottom:1px solid rgba(0, 0, 0, 0.38);

}
.listPurchase{
    display: inline-block;
    height: 350px;
    margin-right: 20px;
    max-height: 100%;
    
    vertical-align: top;
    padding: 3px;
    overflow: auto; 
}
.footer-detail-purchase{
    height: auto;
    margin-right: 20px;
    padding: 3px;
}
.descripcionDetailt{
  width:100%;
  font-weight:bold;
  margin-left:20px;
}
.footer-find-cost{
  display:flex;
}

.footer-find-cost-header,.footer-find-cost-value{
  width:50% ;
}
.footer-find-cost-header{
  text-align:right;
  font-weight:bold;
}
.footer-find-cost-value{
  text-align:right;
}
.border1{
  border-top: 1px solid rgb(200, 200, 200);
}
.colorgriss{
  color:#969696 !important;
}
.card-head{
  width:100%;
  display:flex;
}
.circle-number{
  width:50px;
  height:50px;
  display:block;
  border-radius: 50%;
  text-align:center;
  color:#fff;
  line-height:50px;
  background-color: #969696;
}
.content-span-value{
  width:90%;
  line-height:50px;
  margin-left:5px;
}
.btns-events{
  display: flex;
}
.btns-events button{
  margin-left:20px !important;
}
.list-address{
  max-height: 450px;
  overflow-y:auto;
}
.listPurchase{
  width: 100% !important;
}
.card-deail-co{
  max-width: 100% !important;
  width:100%;
  box-sizing: content-box;
  padding: 20px;
}
.descripcionDetailt{
  box-sizing: content-box;
  padding: 10px !important;
  margin-right: 5px;
}
.v-stepper {

}
</style>