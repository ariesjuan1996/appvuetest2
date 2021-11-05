<template>
    <div class="filter-products" v-if="listFiltro.length">
        <ul >
        <li v-for="(item, index)  in  listFiltro" :key="index"  >
            <fieldset  
            :class="!item.filtro ? 'header-option-filter header-option-filter-mas' : 'header-option-filter header-option-filter-menos'"
            @click="dynamicFilter(index,!item.filtro)"><span class="spantitulo">{{item.titulo}}</span></fieldset>
            <div v-for="(itemCheck, indexCheck)  in  item.arrayCheck" :key="indexCheck"   :class="item.filtro ? 'header-option-values' : 'header-option-values-hidden'">
               <input   :id="'id-'+index+'-'+indexCheck" type="checkbox" class = "no-pointer-events" size="lg"   v-model="itemCheck.valueCheck"    
               @change="selectionFilterCheck(index,indexCheck)" /><label :for="'id-'+index+'-'+indexCheck">{{itemCheck.titulo}}</label >
            </div>
        </li>
        </ul>
    </div>
</template>

<script>
export default {
 components: {
 
  },
  props: {
    listFiltro: Array,
  },
  data() {
    return {
     
    };
  },
   methods: {
     async selectionFilterCheck(index,indexCheck){

       this.$emit("acctionSelectionFillter",[index,indexCheck]);
     },  
     async dynamicFilter(index){
       
       this.$emit("acctionFillter",index);
     },

   },


};
</script>

<style>

 /*FILTER CSS3 */
  .header-option-filter-mas:after{
    float: right;
    top: 0px;
    right: 4px;
    height: 16px;
    width: 16px;
    text-align: center;
    color: #d72525;
    display: block;
    font-size: 28px;
    line-height: 10px;
    content: "+";

 }
   .header-option-filter-menos:after{
     
    float: right;
    top: 0px;
    right: 4px;
    height: 16px;
    width: 16px;
    text-align: center;
    color: #d72525;
    display: block;
    font-size: 28px;
    line-height: 10px;
    content: "-";

 }


 .filter-products{
    max-width: 227px;
    box-sizing: border-box;
 }
  .header-option-filter{
    font-weight:bold;
    text-transform: uppercase;
    text-align:left;
    cursor:pointer;
    font-size: 13px;
    overflow: hidden;
   /* white-space: nowrap;
    */text-overflow: ellipsis;
    max-width: 100%;

  }
  .header-option-values-hidden{
    visibility: hidden;
    max-height: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;
  }
  .filter-products li{
    border-bottom: 0.2px solid #ededed;
  }
  .filter-products fieldset{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .header-option-values{
    color: #282828;
    padding: 10px 0 7px 0px;
    font-family: inherit;
    box-sizing: border-box;
    display: block;
    position: relative;
    font-size: 16px;
    text-align: left;
  }
  .header-option-values span{
      margin-left: 10px !important;
  }
  .header-option-values span{
    margin-left: 0px;
  }
  .header-option-values input {
    float:left;
  }
  .header-option-values label{
        margin-left: 8px !important;
  }
 /*FIN CSS3 FLTER*/
 .filter-products li fieldset{
    border: 0px solid transparent;
    border-top: 1px solid #ededed;
   
 }
.filter-products .list-group-item{
    margin-left: 0px !important;
    margin-left: 0px;
}

.filter-products .spantitulo{
    width: calc(100% - 16px);
    display: block;
    font-family: inherit;
    /* line-height: 8px; */
    position: relative;
    top: 20px;
}
@media (max-width: 992px){
.filter-products .list-group{
    display:none;
  }

}
.filter-products{
      position: relative;
      max-width: 350px;
      vertical-align: top;
      width: 100%;
      padding: 0 10px;
      background-color: #fff;
      border-radius: 5px;
      
}
.fillterNormal span{
  font-family: 'Rubik', sans-serif !important;
}
.item-detalle-submenu-text{
  font-family: 'Rubik', sans-serif;

}
</style>
