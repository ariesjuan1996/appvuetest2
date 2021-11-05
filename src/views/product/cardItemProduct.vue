<template>
    <div class="cardItem">
        <img class="img-card" :src="item.img" alt="MDN">
        <div class="card-body">
           <p class="card-text text-bold">{{item.marca}}</p>
           <p class="card-text text-bold">{{item.producto}}</p>
           <p class="card-text text-bold text-precio">{{item.precio}}</p>
            <p class="card-text text-bold text-ver">ver producto <span> >  </span></p>
        </div>
    </div>
</template>

<script>

export default {
  name: 'contentResult',
  components:{
      
  },    
  props:{
      item:{
          type:Object,
         default: () => []
      }
  },
  data() {
        return{
            
        }
    },
  methods: {

  }
}
</script>
<style>
    .card-body{
        width: 100%;

    }
    .text-ver span{
        float: right;
    }
    .text-precio,.text-ver{
      color: #ee3037;
      font-size: 14px;
      line-height: 17px;
    }
    .text-ver{

    }
    .img-card{
        width: 12em;
        height: 12em;
        border:2px solid red;
    }
    .cardItem{
        display: flex;
        padding: 30px;
        box-sizing: border-box;
    }
    .card-text{
        width: 100%;
        text-align: left;
        padding: 10px;
    }
    .text-bold{
      font-weight: bold;
      font-size: 100%;
    }
    @media (max-width: 769px) {
     .img-card{
        width: 80px;
        height: 80px;
        border:2px solid red;
    }
    }
</style>