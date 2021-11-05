<template>
    <div class="coloropaco detallepasos">
        <span class="numberOrden">1</span> <p style="font-size:24px !important;">Identificación  
        <v-btn class="btneditar" depressed>
        Editar
        </v-btn>
        </p>
        <p style="margin-top:20px;" > {{dataUsuario.usuario}}</p>
        <p>Nombre: {{dataUsuario.nombre}}</p>
        <p>Teléfono / Móvil: {{dataUsuario.telefono}}</p>
        <v-divider></v-divider>
    </div>
</template>
<script>
export default {
  name:"sessionUsuario",
  props: {
    dataUsuario: Object,
  },

}
</script>
<style>
.pasosCompra{
  width: calc(100% - 378px);
  position :relative;
  float:left;
}
.detalleCompra{
  position: fixed;
  background: red;
  top: 63px;
  width: 418px;
  right: 0px;
  height: 100vh;
}
.btneditar{
  float: right;
}
.coloropaco{
  color:#bababa;
}
.detallepasos{
    padding-left: 40px;
    padding-right: 40px;
    box-sizing: content-box;
    padding-top: 30px;
    box-sizing: content-box;
}
.numberOrden{
    display:block;
    width: 35px !important;
    height: 35px !important;
    line-height: 35px;
    border-radius: 50%;
    background: #e8e8e8;
    position:relative;
    text-align: center;
    float: left;
    top: -6px;
    left: -10px;
}
.pasosCompra p{
  margin-bottom: 0px !important;
  font-size:18px !important;
}
</style>