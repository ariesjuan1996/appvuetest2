<template>
  <v-card>
    <v-row
        :align="'center'"
        no-gutters
    >
      <v-col cols="6">
        <v-menu
          ref="menuFechaDesde"
          v-model="menuFechaDesde"
          :close-on-content-click="false"
          :return-value.sync="fechaDesde"
          transition="scale-transition"
          offset-y
          min-width="290px"

        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Fecha de Desde*"
              readonly
              :value="computedFechaDesdeFormattedMomentjs"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>


          </template>
          <v-date-picker
            v-model="fechaDesde"
            no-title
            scrollable
            :max="nowDate"
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menuFechaDesde = false"
            >
              cerrar
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuFechaDesde.save(fechaDesde)"
            >
              seleccionar
            </v-btn>
          </v-date-picker>
        </v-menu> 
      </v-col>
      <v-col cols="6">
        <v-menu
          ref="menuFechaHasta"
          v-model="menuFechaHasta"
          :close-on-content-click="false"
          :return-value.sync="fechaHasta"
          transition="scale-transition"
          offset-y
          min-width="290px"

        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Fecha de Hasta*"
              readonly
              :value="computedFechaHastaFormattedMomentjs"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>


          </template>
          <v-date-picker
            v-model="fechaHasta"
            no-title
            scrollable
            :max="nowDate"
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menuFechaHasta = false"
            >
              cerrar
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuFechaHasta.save(fechaHasta)"
            >
              seleccionar
            </v-btn>
          </v-date-picker>
        </v-menu> 
      </v-col>
      <v-col cols="6">
        <v-btn
          depressed
          color="primary"
          @click="filtar"
        >
          Filtrar
        </v-btn>
      </v-col>
    </v-row>
    <div class="content-table">
    <table class="table"> 
      <caption>KARDEX</caption> 
      <thead class="thead">     
        <tr> 
          <th rowspan="2">FECHA</th> 
          <th rowspan="2">PRODUCTO</th> 
          <th colspan="2">COMPRAS</th>
          <th colspan="2">VENTAS</th>
          <th rowspan="2">SALDO FINAL</th> 
        </tr> 
        <tr> 
            <th>CANTIDAD ENTRADA</th>
            <th>DINERO</th>
            <th>CANTIDAD ENTRADA</th>
            <th>DINERO</th>
        </tr>
      </thead>
      <tr v-for="(item,index) in dataFiltro" v-bind:key="index"> 
        <td>{{item.fechaOperacion}}</td> 
        <td>{{item.nombreProducto}}</td> 
        <td>{{item.cantidadTotalEntrada}}</td> 
        <td>{{ moneda}} {{item.totalNetoEntrada}}</td> 
        <td>{{item.cantidadTotalSalida}}</td> 
        <td>{{ moneda}} {{item.totalNetoSalida}}</td> 
        <td>{{ moneda}} {{item.totalNetoSalida-item.totalNetoEntrada}}</td> 
      </tr> 
    </table></div>
    <div>
      <span>TOTAL :{{stringTotal}}</span>
    </div>
    </v-card>

</template>
<script>
import moment from 'moment';
import { requestApi } from "@/api/index.js";
export default {
  data() {
    return {
      page: 1,
      moneda:"S./",
      nowDate: new Date().toISOString().slice(0,10),
      menuFechaDesde:false,
      menuFechaHasta:false,
      fechaDesde:null,
      fechaHasta:null,
      dataFiltro:[],
    };
  },
  computed:{
     computedFechaDesdeFormattedMomentjs () {
        return this.fechaDesde ? moment(this.fechaDesde).format('YYYY-MM-DD') : '';
      },
      computedFechaHastaFormattedMomentjs () {
        return this.fechaHasta ? moment(this.fechaHasta).format('YYYY-MM-DD') : '';
      },
      total(){
         let suma=0;
         this.dataFiltro.map((val)=>{
           suma+=val.totalNetoSalida-val.totalNetoEntrada
         });
         return suma;
      },
      stringTotal(){
          return this.total<0 ? (' Gasto de '+this.moneda+ Math.abs(this.total) ) : (' Entrada de '+this.moneda+Math.abs(this.total)) ;
      }
  },
  methods:{
    async filtar(){
      this.listarData();
    },
    async listarData(){
        this.$store.dispatch("global/LOADEROPENORCLOSE", true);
        try {
          let respon=await requestApi(
            `kardex/cargarKardex?fechaInicio=${this.fechaDesde==null ? this.fechaDesde : '' }&fechaFin=${this.fechaHasta==null ? '' : this.fechaHasta}`,
            {},
            "GET"
          );
          let data=respon.data.estado ? respon.data.data : [];   
          this.dataFiltro=data;
        } catch (error) {
            console.log("error",error);
        }finally {
          // I’ll fire either way
          this.$store.dispatch("global/LOADEROPENORCLOSE", false);
        }
      }
  }
};
</script>
<style>
.content-table{
  overflow: auto;
}
.table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  overflow: auto;
  min-width:800px !important;
}

.table,.table tr,.table td,.table th {
  border: 1px solid black;
}

.table th {
  vertical-align: center;
}

td:empty:after {
  content: "\00a0"; /* HTML entity of &nbsp; */
}
.thead{
  background: #4F81BE !important;
  color :#fff !important;
}
.thead th{
  border: 1px solid #fff;
}
</style>