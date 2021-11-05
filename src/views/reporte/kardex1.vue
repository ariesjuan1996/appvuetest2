<template>
<table>
  <tr>
    <th rowspan="1">FECHA</th>
    <th rowspan="1">PRODUCTO</th>
    <th colspan="2">VENTA</th>
    <th rowspan="2">COMPRA</th>
  </tr>
  <tr>
    <td>CANTIDAD ENTRADA</td>
    <td>COSTO TOTAL</td>
  </tr>
    <tr>
    <td>CANTIDAD ENTRADA</td>
    <td>COSTO TOTAL</td>
  </tr>
  <tr>
  </tr>
</table>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { first_name: "Peter", last_name: "Johnson" },
        { first_name: "Simon", last_name: "Walker" }
      ],
      headers: [{ text: "Full Name", value: "full_name" }]
    };
  }
};
</script>
<style>
  table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}

table, tr, td, th {
  border: 1px solid black;
}

th {
  vertical-align: top;
}

td:empty:after {
  content: "\00a0"; /* HTML entity of &nbsp; */
}
</style>