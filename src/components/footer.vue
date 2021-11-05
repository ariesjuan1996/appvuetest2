<template>
  <v-footer class="footer-pag">
  <v-container  fluid>
    <div class="container content-footer content-footerdespo">
          <div class="item-footer" v-for="(item,index) in this.items" v-bind:key="index">
            <span>{{item.title}}</span>
            <ul>
              <li v-for="(item1,index1) in item.items" v-bind:key="index1">
                
                <a v-if="item1.id=='chat' || item1.id=='telefono' || item1.id=='correo' || item1.id=='href'" target="_blank" 
                :href="item1.id=='telefono' ? ('tel:'+datosSistema.telefono) : ( item1.id!='correo' && item1.id!='href' ? datosSistema.messenger :  (item1.id=='href' ? item1.href : ('mailto:'+datosSistema.correo)   )   )  ">
                  <span><strong> {{item1.title}}</strong></span><br>
                  <span>{{item1.descripcion}}</span> </a>
                  <h4 v-if="item1.id!='chat' && item1.id!='telefono' && item1.id!='correo' && item1.id!='href'"  >
                 
                  <br>
                  <span><strong> {{item1.title}}</strong></span><br>
                  <a> <span >{{item1.descripcion}}</span></a></h4 >
              </li>
            </ul>  
          </div>
        
    </div>
    <div class="content-footer content-footer-mobile">
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="item1 in item.items"
            :key="item1.title"
          >
            <v-list-item-content>
              <a v-if="item1.id=='chat' || item1.id=='telefono' || item1.id=='correo' || item1.id=='href'" target="_blank" 
                :href="item1.id=='telefono' ? ('tel:'+datosSistema.telefono) : ( item1.id!='correo' && item1.id!='href' ? datosSistema.messenger :  (item1.id=='href' ? item1.href : ('mailto:'+datosSistema.correo)   )   )  ">

              <v-list-item-title v-text="item1.title"></v-list-item-title></a>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
    <hr/>
    <div class="footer-bottom">
      <div class="footer-social"> 
        <h6 class="text-footer">Síguenos en</h6>
        <div class="content-icons">
          <a class="social-href" :href="datosSistema.youtube"  target="_blank" ><span class="icon-social icon-youtube"></span></a>
          <a class="social-href" :href="datosSistema.instagram"  target="_blank" ><span class="icon-social icon-instagram"></span></a>
          <a  class="social-href" :href="datosSistema.facebook"  target="_blank" ><span class="icon-social icon-facebook1"></span></a></div>
      </div>
      <div class="footer-tienda-seguridad"> 
        <span class="icon-secure icon-lock"></span>
        <span class="icon-secure-text">Tienda 100% Segura</span>
      </div> </div>
  </v-container>
  </v-footer>
</template>

<script>
import { requestApi } from "@/api"
export default {
  data() {
    return {
      datosSistema:{},
      nombreTienda:"Oechsle" ,
      items: [
        {
          items: [
            { 
              id:"chat",
              title: 'Chatea con nosotros',
              descripcion: 'Te atendemos las 24 horas',
              
              
            },
            { 
              title: 'Escríbenos',
              descripcion: 'Estamos para ayudarte' ,
              id:"correo",
            },
            { 
              title: 'Llámanos al',
              descripcion: 'De lunes a domingo de 8:00 am a 8:00 pm' ,
              id:"telefono",
            },
            { 
              title: 'Visítanos',
              descripcion: 'Revisa aquí nuestros horarios y tiendas disponibles a nivel nacional ' ,
              id:"ubigeos"
            },
            ],
          title: 'Contactanos',
        },
        {
          active: true,
          items: [
            { title: '¿Cómo comprar en :nombretienda? ',id:"href",href:"como-comprar"  },
            { title: 'Preguntas frecuentes',id:"href",href:"Preguntas-frecuentes" },
            { title: 'Cambios y devoluciones',id:"href",href:"cambio-devoluciones" },
            { title: 'Despacho a domicilio',id:"href",href:"despacho-domicilio" },
            { title: 'Mis Pedidos',id:"href",href:"pedidos" },
            { title: 'Términos y condiciones',id:"href",href:"terminos-condiciones" },
            { title: 'Comprobante electrónico',id:"href",href:"comprobante-electronico" },
          ],
          title: 'Servicio al Cliente',
        },
        {
          active: true,
          items: [
            { title: 'Nosotros',id:"href",href:"nosotros"  },
            { title: 'Nuestras tiendas',id:"href",href:"tiendas" },
            { title: 'Trabaja con nosotros',id:"href",href:"trabaja-nosotros" },
            { title: 'Vende con nosotros',id:"href",href:"vende-nosotros" },
          ],
          title: 'Sobre :nombretienda',
        }
      ],
    };
  },
  methods: {
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
    this.items.forEach((element)=>{
      element.title=element.title.split(":nombretienda").join(this.datosSistema.nombreTienda);
      element.items.forEach((element2)=>{
        element2.title=element2.title.split(":nombretienda").join(this.datosSistema.nombreTienda);
      });
    });
    
  }
}
</script>
<style>
  .footer-pag{
    background: red !important;
    width: 100% !important;
    padding: 0px;
  }
  .content-footer{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 31px;
  }
  .content-footer ul li {
    cursor:pointer;
  }
  .content-footer span{
      color:#fff !important;
  }
  .enlace-footer{
    color: #fff !important;
  }
  .content-footer .v-list{
    width:100% !important;
  }
.footer-social{
  display:block;
  width:100% !important;
  height: 375px !important;
  display: contents;
}
.text-footer{
  color: #fff;
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 17px;
}
 .footer-bottom{
    margin-top: 30px;
    display: flex;
    padding-bottom: 142px;
 }
 
 .footer-tienda-seguridad{
   color:#fff !important;
   min-width: 200px;
   margin-top:40px;
   position: absolute;
   right: 0px;
   margin-right: 84px;
 }
@media screen and (max-width: 600px) {
  
  .text-footer{
    width: 100% !important;
    text-align: center;
  }
  .content-footerdespo{
    display:none !important;
    padding: 0px;
  }
  .content-footer{
    padding:0px !important;
  }
  .footer-social{
    display: block !important;
    width: 100% !important;
    height: auto !important;
  }
  .footer-bottom{
    display: block !important;
  }
  .content-icons{
    margin: auto;
    width: 100%;
    padding: 10px;
    text-align: center;
  }
  .footer-tienda-seguridad{
    min-width: 100%;
    width: 100%;
    margin-top: 40px;
    text-align: center;
    margin: 0px;
    
  }
}

@media screen and (min-width: 600px) {
   .content-footer-mobile{
     display:none !important;
  }
  .content-footerdespo{
    padding: 0px;
  }
  .content-footerdespo .item-footer{
    width: 33% !important;
    display: block;
    margin-left: 99px;
  }
}
.icon-social{
  font-size:60px;
  border-radius:50% !important;
  background: #fff;
  margin:20px;
  cursor:pointer;
}

 .icon-secure{
   font-size:24px;
 }
 .icon-secure-text{
   font-size:18px;
 }
 .social-href{
   color: transparent !important;
 }
</style>