<template>
<v-container>
<v-row>
<v-col v-for="(item,index) in listImg" v-bind:key="index" lg="4">
    <v-card >
   
        <v-img :src="item" aspect-ratio="1.7"></v-img> 
    <v-btn  text color="error" @click="deleteImg(index)">eliminar</v-btn>
    </v-card>
</v-col>

</v-row>
</v-container>
</template>

<script>
  export default {
    data: () => ({

    }),
    props:{
        listImg:{
            type:Array,
            default: () => []
        }
    },
    computed: {
      
    },
    watch:{
      
    },
    methods: {
      deleteImg(index){
          this.$emit("deleteImg",index);
      }
    },
    created(){
   
    }
  }
</script>
<style>

</style>