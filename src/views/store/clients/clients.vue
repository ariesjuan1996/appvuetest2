<template>
  <div class="content-categories">
    <v-card>
      <div class="btn-action-content">
      <div class="btn-action">
       <router-link :to="{ path: '/admin/clients/new'}"><v-btn  large  color="#304DD5" style="color:#fff !important" >new</v-btn></router-link>
        </div>               
      </div>
        <v-data-table
        :headers="headerTable"
        :items="ResultFilter"
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

          
          <template v-slot:item.id="{ item }">
            <div class="p-2"  v-if="item.esEditable===undefined || item.esEditable===true ">
              <router-link :to="'/admin/clients/edit/'+item.id">
              <v-btn :style="{
                backgroundColor : colorAccion,
           }" 
           color="#388049" style="color:#fff !important;" >{{'Editar'}}</v-btn>
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
  </div>
</template>
<script>
import { requestApi } from "@/api/index.js"
  export default {
    name: 'clients',
    components: {
    },
    data () {
      return {
        loadingFile:false,
        headerTable:[
        { text: 'Client Name', value: 'firstname',accionText:"Editar" },
        { text: 'DOB', value: 'dob' },
        { text: 'Phone', value: 'phone' },
        { text: 'Email', value: 'email' },
        { text: 'Address', value: 'address' },
        { text: 'Total', value: 'counttraslation' },
        { text: 'Acción ', value: 'id' },
        
       ],
       optionCategoryFather:[],
       ResultFilter:[]
      }
    },
    methods: {
      async listarData(){
         this.$store.dispatch("global/LOADEROPENORCLOSE", true);
        try {
          let respon=await requestApi(
            `listClient`,
            {},
            "GET"
          );
          let data=respon.data.state ? respon.data.data : [];       
          this.ResultFilter=data;
          console.log("ResultFilter",respon.data.data);
        } catch (error) {
            console.log("error",error);
        }finally {
          // I’ll fire either way
          this.$store.dispatch("global/LOADEROPENORCLOSE", false);
        }
      }
     },
    async mounted() {
       this.$store.dispatch("global/LOADEROPENORCLOSE", true);
        await this.listarData();
       this.$store.dispatch("global/LOADEROPENORCLOSE", false);        
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
.content-filter-result{

  padding-top:10px;
}
.content-btn-filter{
  margin-top: 0px;
}
</style>