<template>
 <v-card
   
    max-width="100%"
    height="100%"
  >

    <v-card-text>
    <v-radio
       
        :label="`preferida`"
        :value="item.preferida"
      ></v-radio>
      <p class="direccion-completa">
         {{item.calle}}  Nº: {{item.numeroCalle}}  {{item.descripcionUbicaciones}}
      </p>
      <v-btn
        class="btn-edit"
        large 
        color="primary"
        @click="editar(item)"
      >
       EDITAR
      </v-btn>
      <v-btn
        class="btn-edit"
        large 
        color="error"
        @click="eliminar(item)"
      >
       EDITAR
      </v-btn>
    </v-card-text>

  </v-card>
</template>


<script>


export default {
 props: {
   item:{
     type:Object
   }
},
methods: {
  editar(item){
    this.$emit("editarDireccion",item);
  },
  eliminar(item){
    this.$emit("eliminarDireccion",item);
  },
}

};
</script>

<style>
.btn-edit{
  position:relative !important;
  bottom: 10px !important;
}
.direccion-completa{
  font-size:18px !important;
  font-weight:bold;
  color: black;
}
@media (max-width: 992px){
 .row-address .v-card__text p{
   font-size: 12px !important;
 }
.text-negrita{
  font-weight: bold !important; 
}

}
</style>
