<template>
<div class="content-filter-template">

   <transition v-if="drawer "  name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
            <v-list
                  nav
                  dense
                >
                  <v-list-item-title class="title-filter" @click="filterOpen">Filtrar por
                
                  </v-list-item-title>
                  <div v-for="(item,index) in listFilter" v-bind:key="index">
                  
                    <div v-if="item.type=='item-text'" class="item-filter-text">
                      <v-text-field
                      v-model="listFilterValue[index].value"
                      autocomplete="off"
                      text
                      :label="item.label"
                      ></v-text-field>
                    </div>
                    <div v-if="item.type=='item-select'" class="item-filter-multiselect">
                      <v-select
                          v-model="listFilterValue[index].value"
                          :items="item.items"
                          attach
                          chips
                          :label="item.label"
                          multiple
                          :deletable-chips="true"
                      ></v-select>
                    </div>
                    <div v-if="item.type=='item-state'" class="item-filter-state">
                      <label>{{item.label}}</label>
                      <v-radio-group v-model="listFilterValue[index].value" 
                      :mandatory="false" row>
                          <v-radio v-for="(itemRadios,indexRadios) in item.radios" v-bind:key="indexRadios" 
                          :label="itemRadios.text" :value="itemRadios.value"></v-radio>
                      </v-radio-group>
                    </div>
                  </div>
                   
                </v-list>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div class="item-filter">
                <v-btn class="btn-filtrar" large color="primary" @click="filtrar">FILTRAR POR</v-btn>
                <v-btn class="btn-cancelar" large color="error" @click="cancelar">CANCELAR</v-btn>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

    <div class="content-btn-filter text-right">
    <v-btn text   @click.stop="clearFilter">listar todo</v-btn>
    <v-btn text  @click.stop="drawer = !drawer">filtrar por</v-btn></div>
    
    <div class="content-filter-result text-left">
    
      <div v-for="(item,index) in listFilterValueCopy"
            v-bind:key="index">
        <v-chip
          class="ma-2"
          v-if="!((Array.isArray(item.value) && item.value.length)==0)"
        > 
          [ {{listFilter[index].label}} : {{ item.value===true ? 'activo' : (item.value===false ? 'inactivo' : (listFilter[index].type==="item-select" ? listFilterValueCopy[index].valueString : item.value))  }}  ]  
        </v-chip>
        <v-chip
          class="ma-2"
          v-else-if="!(item.value===null || item.value==='' ) && !Array.isArray(item.value)"
        > 
          [ {{listFilter[index].label}} : {{ item.value===true ? 'activo' : (item.value===false ? 'inactivo' : item.value)  }}  ]  
        </v-chip>
        </div>
    </div>
    </div>
</template>
<script>
  export default {
    data: () => ({
      name:'',
      drawer: false,
      group: null,
      radios: 'radio-1',
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
      listFilterValue:[],
      listFilterValueCopy:[]
    }),
    props:{
        listFilter:{
          type:Array,
          default: () => []
        }
    },
    computed: {
      likesAllFruit () {
        return this.selectedFruits.length === this.fruits.length
      },
      likesSomeFruit () {
        return this.selectedFruits.length > 0 && !this.likesAllFruit
      },
      icon () {
        if (this.likesAllFruit) return 'mdi-close-box'
        if (this.likesSomeFruit) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
    },
    watch:{
      drawer(){

      },

      group () {
        this.drawer = false
      },
    },
    methods: {
      clearFilter(){
        this.initFilter();
        let dataResult=[];
        this.listFilter.forEach((item,index)=>{
          if(item.type==="item-text"){
              this.listFilterValueCopy[index].value=this.listFilterValue[index].value;
              dataResult[item.id]=this.listFilterValue[index].value;

          }
          if(item.type==="item-select"){
              this.listFilterValueCopy[index].value=this.listFilterValue[index].value;
              dataResult[item.id]=this.listFilterValue[index].value.join(",");
          }
          if(item.type==="item-state"){
              this.listFilterValueCopy[index].value=this.listFilterValue[index].value;
              dataResult[item.id]=this.listFilterValue[index].value;
          }           
          });
        this.$emit("filterData",dataResult);
      },
      filterOpen(){
         this.drawer = true;

      },
      cancelar(){
          
         this.listFilter.forEach((item,index)=>{
              //radioSelect
            if(item.type==="item-text"){
              this.listFilterValue[index].value=this.listFilterValueCopy[index].value;
            
            }
            if(item.type==="item-select"){
                this.listFilterValue[index].value=this.listFilterValueCopy[index];
              
            }
            if(item.type==="item-state"){
                this.listFilterValue[index].value=this.listFilterValueCopy[index].value;
            }           
          });
          this.drawer = false;
      },
      filtrar(){
        let dataResult=[];
        this.listFilter.forEach((item,index)=>{
              //radioSelect
            if(item.type==="item-text"){
                this.listFilterValueCopy[index].value=this.listFilterValue[index].value;
                dataResult[item.id]=this.listFilterValue[index].value;

            }
            if(item.type==="item-select"){
                this.listFilterValueCopy[index].value=this.listFilterValue[index].value;
                let objectSelect=[];
                this.listFilterValueCopy[index].value.map((value)=>{
                  item.items.map((valueObject)=>{
                    if(value===valueObject.value){
                      let text=valueObject.text;
                      objectSelect.push(text);
                    }
                  });     
                });

                
               this.listFilterValueCopy[index].valueString=objectSelect.join(",");
               console.log("objectSelect:",this.listFilterValueCopy[index].valueString);
               dataResult[item.id]=this.listFilterValue[index].value.join(",");
            }
            if(item.type==="item-state"){
                this.listFilterValueCopy[index].value=this.listFilterValue[index].value;
                dataResult[item.id]=this.listFilterValue[index].value;
            }           
          });
          
          //this.listFilterValueCopy
          this.$emit("filterData",dataResult);
          this.drawer = false;
      },
      toggle () {
        this.$nextTick(() => {
          if (this.likesAllFruit) {
            this.selectedFruits = []
          } else {
            this.selectedFruits = this.fruits.slice()
          }
        })
      },
      initFilter(){
        this.listFilterValue=[];
        this.listFilterValueCopy=[];
        this.listFilter.forEach((item)=>{
         
          if(item.type==="item-text"){
              this.listFilterValue.push({
                id:item.id,
                value:""
              });
              this.listFilterValueCopy.push({
                  id:item.id,
                  value:""
              });
          }
          if(item.type==="item-select"){
              this.listFilterValue.push({
                id:item.id,
                value:[]
              });
              this.listFilterValueCopy.push({
                id:item.id,
                value:[]
              });
          }
          if(item.type==="item-state"){
              this.listFilterValue.push({
                id:item.id,
                value:null
              });
              this.listFilterValueCopy.push({
                id:item.id,
                value:null
              });
          }           
        });

      }
    },
    created(){
      //console.log("listFilter",this.listFilter);
     
      this.initFilter();
    }
  }
</script>
<style>
.content-filter-template aside{
  position:fixed;
}
.title-filter{
    font-size:24px !important;
    font-weight: bold;
}
.v-menu__content{
    left: auto !important;
    right: 0px;
    width:300px !important;
}
.btn-filtrar{
   width:50% !important;
}
.item-filter{
    display:flex;
}
.btn-cancelar{
    margin-top:0px;
    width:50% !important;
}
.v-dialog{
  max-height: 100vh !important;
}
.content-filter-result{
  display: flex;
  overflow: auto;
}
.card-filter{
  height: 100vh;
  position: fixed;
  top: 0px;
  width:350px;
  right: 0px;
}



.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  overflow: auto;
  width: 300px;
  height:100vh;
  top:0px;
  right:0px;
  position: absolute;
  margin: 0px auto;
  padding: 2px 6px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0px !important;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>