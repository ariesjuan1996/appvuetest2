<template>
    <v-card>
        <v-list>
            <v-list-group
                v-for="(item,index) in listOrder"
                :key="index"
                no-action
            >
                <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title v-text="'ORDEN Nº'+item.numeroPedido"></v-list-item-title>
                </v-list-item-content>
                </template>

                <v-list-item>
                <v-list-item-content>
                    <v-list-item-title >
                        <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-left">Producto</th>
                                <th class="text-left">Precio</th>
                                <th class="text-left">Cantidad</th>
                                <th class="text-left">Sub total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(subItem,indexIndex) in item.detalle" v-bind:key="indexIndex">
                                <td>{{ subItem.descripcionProducto }}</td>
                                <td>S./ {{ subItem.precio }}</td>
                                <td>{{ subItem.cantidad }}</td>
                                <td>S./{{ subItem.subTotal }}</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-group>
            </v-list>
    </v-card>
</template>

<script>

  export default {
    components: {},
    data: () => ({
        items: [
          {
            action: 'local_activity',
            title: 'Attractions',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'restaurant',
            title: 'Dining',
            active: true,
            items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' },
            ],
          },
          {
            action: 'school',
            title: 'Education',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'directions_run',
            title: 'Family',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'healing',
            title: 'Health',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'content_cut',
            title: 'Office',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'local_offer',
            title: 'Promotions',
            items: [
              { title: 'List Item' },
            ],
          },
        ],
      listOrder:[
        {
          numeroPedido:1,
          fechaPedido:"28 de julio de 2020",
          direccion:{
            representante:"juan ramirez sanchez",
            direccion:"chiclayo 100 1Magdalena Del Mar Lima, LIMA Perú"
          },
          formaPago:{
              logo:"logo.jpg",
              descripcionPago:"Tarjeta de Crédito con final 6165"
          },
          detalle:[
              {
                  idProducto:1,
                  descripcionProducto:"Televisor PHILIP LED 45' FHD SMART",
                  precio:22.00,
                  cantidad:2,
                  subTotal:200.00,
                  imgProduto:"https://plazavea.vteximg.com.br/arquivos/ids/346683-50-50"
              },
              {
                  idProducto:1,
                  descripcionProducto:"Televisor PHILIP LED 45' FHD SMART",
                  precio:22.00,
                  cantidad:2,
                  subTotal:200.00,
                  imgProduto:"https://plazavea.vteximg.com.br/arquivos/ids/346683-50-50"
              }
          ]
        }
      ],
       headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
    }),
    computed:{

    },
    methods: {

  },
  async mounted() {
    
  }
  }
</script>
<style>

</style>