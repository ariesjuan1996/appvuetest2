<template>
    <div>
      <v-card class="mx-auto">
          <v-breadcrumbs
            :items="rutas"
            divider="/"
          >
             <template v-slot:item="{ item }">
                <v-breadcrumbs-item
                  :href="item.url"
                  :disabled="false"
                >
                  {{ item.descripcion}}
                </v-breadcrumbs-item>
              </template>
          </v-breadcrumbs>
      </v-card>
    </div>
</template>

<script>
  export default {
    name: 'breadcurmbs',
    props:{
      rutas: {
        type: Array,
        default: function(){
            return {}
        }
    }
  },

 }
</script>