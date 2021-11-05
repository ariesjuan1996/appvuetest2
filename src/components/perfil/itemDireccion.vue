<template>
    <v-card class="carditemdireccion" >
        <h3 class="tituloDireccion"> {{item.calle}}  {{item.numeroCalle}} ,{{item.descripcionUbicaciones}}</h3>
        <div class="buttonSeleccion">
            <a class="eliminarDireccion" @click="eliminarDireccion(item.id)">Elimina esta dirección</a></div>
            <v-btn
            depressed
            color="#333"
            style="color:#fff !important;"
            @click="cambiarPreferida(item)"
            >
            Usar esta dirección
            </v-btn>
    </v-card>
</template>
<script>
  export default {
    props:{
        item:Object
    },
     methods: {
        cambiarPreferida(item){
            this.$emit("cambiarPreferida",item);
        } ,
        eliminarDireccion(item){
            this.$emit("eliminarDireccion",item);
        }   
     }
  }
</script>