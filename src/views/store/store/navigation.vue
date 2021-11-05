<template>
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
        v-for="subItem in item.items"
        :key="subItem.title"
        v-bind:style="{background: (subItem.active ? '#948BF4' :'transparent' ),color: (subItem.active ? '#fff' :'#000' ) }" 
      >
        <v-list-item-content   >
          
        <router-link :to="{ path: subItem.url}"  > <v-list-item-title  v-bind:style="{background: (subItem.active ? '#948BF4' :'transparent' ),color: (subItem.active ? '#fff !important' :'#000' ) }"  v-text="subItem.title" ></v-list-item-title></router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>
<script>
  export default {
    name:"navigation",
    data () {
      return {
        items: [
          {
            title: 'Gestion de Productos',
            active: false,
            items: [
              { title: 'Departamento',url:'/admin/departament',active:false },
              { title: 'categoria',url:'/admin/category',active:false },
              { title: 'sección',url:'/admin/section',active:false },
              { title: 'Productos',url:'/admin/products',active:false },
              { title: 'Marcas',url:'/admin/trademarks',active:false },
              
            ],
          },
          {
            title: 'Compras',
            active: false,
            items: [
            { title: 'Compras',url:'/admin/shopping',active:false },
            { title: 'Proveedor',url:'/admin/provider',active:false }

            ],
          },
          {
            title: 'Clientes',
            active: false,
            items: [

              { title: 'Gestion de clientes',url:'/admin/clients',active:false },
            ],
          },
          {
            title: 'Comprobantes de pago',
            active: false,
            items: [
              { title: 'listado',url:'/admin/venta/listado',active:false },
              { title: 'Factura',url:'/admin/venta/factura',active:false },
              { title: 'Boletas',url:'/admin/venta/boleta',active:false },
            ],
          },
         {
            title: 'Pedido',
            active: false,
            items: [
              { title: 'Procesar',url:'/admin/pedido',active:false },
            ],
          },
          {
            title: 'Reportes',
            active: false,
            items: [
              { title: 'listado',url:'/admin/reporte/kardex',active:false },
            ],
          },
          {
            title: 'Sistema',
            active: false,
            items: [
              { title: 'datos del sistema',url:'/admin/sistema/datosSistema',active:false },
            ],
          }
        ],
      }
    },
    computed:{
      path(){
        return this.$route.path;
      },
      pathSegundoNivel(){
        if(this.$route.path.split("/").length>=3){
          let tempRuta=this.$route.path.split("/").filter((value,index)=>{
            if(index<3){
              return value;
            }
            return false;
          });
          return "/"+tempRuta.join("/");
        }else{
          return "";
        } 
        
      },
      pathTercerNivel(){
        if(this.$route.path.split("/").length>=3){
          let tempRuta=this.$route.path.split("/").filter((value,index)=>{
            if(index==3){
              return value;
            }
            return false;
          });
          return "/"+tempRuta.join("/");
        }else{
          return "";
        } 
        
      }
    },
    watch:{
      path(){
        this.establecerMenuActivo();
      }
    },
    methods: {
      establecerMenuActivo(){
        this.items.forEach((value,index)=>{
          let valueSelect=value.items.filter((valueItem)=>{
            return valueItem.url==this.pathSegundoNivel;
          });
          let seleccionadoIndex=-1;
          value.items.filter((valueItem,indexItem)=>{
            if(valueItem.url==this.pathSegundoNivel){
              seleccionadoIndex=indexItem;
            }else{
              this.items[index].items[indexItem].active=false;  
            }
          });
          if(valueSelect.length){
            this.items[index].active=true;
            this.items[index].items[seleccionadoIndex].active=true;
          }else{
            this.items[index].active=false;
          }
        });
      }
    },
    mounted(){
      console.log("this.$route",this.pathTercerNivel);
      this.establecerMenuActivo();
    }
  }
</script>
<style>
.v-list-item{
  cursor:pointer;
}


.v-list-item__icon{
   margin-right: 10px !important;
}
</style>