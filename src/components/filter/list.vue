<template>
  <v-card class="card-list-form">
      <v-card-title>
        {{title}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headerTable"
        :items="data"
        :search="search"
        label="Buscar"
        :show-expand="tieneDetalle"
        class="elevation-1"
        :singleExpand="true"
        :single-expand="false"
      >
        <template slot="headers" slot-scope="props">
            <tr>
                <th v-for="(header,indexHeader) in props.headers" :key="indexHeader">
                    {{ header.text }}
                </th>
            </tr>
        </template>
         <template v-if="tieneDetalle" v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
          <v-simple-table
            fixed-header
            height="auto"
            v-if="!(item.detalle==undefined)"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    producto
                  </th>
                  <th class="text-left">
                    fecha de Vencimiento
                  </th>
                  <th class="text-left">
                    precio unitario
                  </th>
                  <th class="text-left">
                    cantidad
                  </th>
                  <th class="text-left">
                    unidad base
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(itemCompra,indexDetalleTabla) in item.detalle"
                  v-bind:key="indexDetalleTabla"
                >
                  <td>{{ itemCompra.producto }}</td>
                  <td>{{ itemCompra.fechaVencimiento }}</td>
                  <td>{{ itemCompra.precioUnitario }}</td>
                  <td>{{ itemCompra.cantidad }}</td>
                  <td>{{ itemCompra.unidadBase }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          </td>
        </template>
          <template v-slot:item.logo="{ item }">
            <div class="p-2">
              <v-img :src="item.logo" :alt="item.titulo" width="50px" height="50px"></v-img>
            </div>
          </template>
          <template v-slot:item.id="{ item }">
            <div class="p-2"  v-if="item.esEditable===undefined || item.esEditable===true ">
              <router-link :to="''+path+'/'+urlAccion+'/'+item.id">
              <v-btn :style="{
                backgroundColor : colorAccion,
           }" 
           color="#388049" style="color:#fff !important;" >{{accionText}}</v-btn>
           </router-link>
            </div>
          </template>
          <template v-slot:pageText="props">
            Lineas {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
          </template>
        <v-alert slot="no-results" :value="true" color="#fff" icon="warning">
          Su búsqueda de "{{search}}" no encontró resultados.
        </v-alert>
      </v-data-table>
    </v-card>
</template>

<script>

  export default {
    data: () => ({
      search: '',
    }),
    props:{
      //path

      tieneDetalle:{
        type:Boolean,
        default:false
      },
      path:{
        type:String,
        default:""
      },
      title:{
        type:String,
        default:""
      },
      accionText:{
        type:String,
        default:"Editar"
      },
      urlAccion:{
        type:String,
        default:"edit"
      },
      colorAccion:{
        type:String,
        default:"rgb(56, 128, 73)"
      },
      headerTable:{
        type:Array,
        default:  ()=> { return [] }
      },
      data:{
        type:Array,
        default:  ()=> { return [] }
      }
    },
    methods: {
     async redirect(url){
         this.$router.push(url);
     },
    }

  };
</script>
<style>
  .card-list-form{
    margin-top:10px;
  }
</style>