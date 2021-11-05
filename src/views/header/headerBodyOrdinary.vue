<template>
    <div id="menuHeaderBody"  v-if="mostrarMenu">
      <div class="opcionesCategorias" >
        
        <ul class="ulcategory" >
           <li v-bind:class="{ active: (categoriaSelect ? (categoriaSelect.id==value.id ? true : false) : false ) }"  
           v-for="(value,index) in dataMenu" v-bind:key="index" @click="selectCategoria(value)">{{value.titulo}}</li>
        </ul>
        <div class="listSubcategory">
            <div class="content-title" >
             <p class="contentCategorySelect" >{{categoriaSelect ? categoriaSelect.titulo : null}}</p>
            </div>
           
              <v-container fluid class="content-body" style="position:relative; height:calc(100vh-210px);" >
               <v-row>
                  <v-col class="item-category-menu" lg="3" md="6" v-for="(valueSubCategoria,indexSubCategoria) in (categoriaSelect ? categoriaSelect.subCategorias :[])" v-bind:key="indexSubCategoria">
                      <p @click="redirectPage(categoriaSelect.titulo+'/'+valueSubCategoria.titulo)"> {{valueSubCategoria.titulo}} </p>
                      <ul>
                          <li class="itemTipo" @click="redirectPage(categoriaSelect.titulo+'/'+valueSubCategoria.titulo+'/'+valueTipos.titulo)" v-for="(valueTipos,indexTipos) in valueSubCategoria.subCategorias"  v-bind:key="indexTipos">{{valueTipos.titulo}}</li>
                      </ul>                      
                  </v-col>

               </v-row>  
              </v-container>
           
           
        </div>
      </div>

    </div>
</template>

<script>

export default {
name: 'menuHeaderBody',
data() {
  return {

    anchoPantalla:screen.width,
    activeBuscador:false,
    scrollTop:0,
    listCategorias:[],
    
    categoriaSelect:null,
}
},
 props:{
   mostrarMenu:{
     type:Boolean,
     default:false
   },
   dataMenu:{
     type:Array,
     default:() => ([

    ])
   },

 },
 components: {

  },
  watch:{
    mostrarMenu(newVal){
      if(newVal){
        document.body.className ="scrollnone";
        document.getElementById("app").classList.add("scrollnone");
        document.getElementById("app").classList.remove("scroll");
      }else{
        document.body.className ="scroll";
        document.getElementById("app").classList.add("scroll");
        document.getElementById("app").classList.remove("scrollnone");
      }
    },
    dataMenu(newVal){
      this.listCategorias=newVal;
     
      if(newVal.length){
        this.categoriaSelect=newVal[0];
      }
    },
    anchoPantalla(newVal){
      
      if(newVal>900){
        this.activeBuscador=false;
      }
    }
  },
  methods: {
   async redirectPage(newVal){
      let redirecValue=newVal.split(" ").join("+");
      let redeccionar='/categoria/'+redirecValue;
       if(this.$route.path!=redirecValue){
         await this.$router.push(redeccionar);
       }
      
      location.reload();
    },
    ocultarMenu(){

      this.$emit("cerrarMenu");
    },
    seleccionarOpcion(index){
      this.$emit("seleccionarOpcion",index);

    },
    async abrirVentana(){
      if(screen.width<=900){
        this.activeBuscador=true;
      }else{
          this.activeBuscador=false;
      }
    },
  
    posicionarMenu() {
  
    this.scrollTop=window.scrollY;

    },
    cerrarTodo(){
      this.$emit('accionPrincipal');
      this.$emit('accionListCategoria');
      
    },
    selectCategoria(item){
     this.categoriaSelect=item;
      console.log("this.categoriaSelect",this.categoriaSelect);
    },
    cambiarTamanio(){
      this.anchoPantalla=screen.width;
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.posicionarMenu);
    window.addEventListener("resize", this.cambiarTamanio);
  }
}
</script>

<style>
 .ulSubcategory .itemSubCategoria ul{
   margin-top:20px;
}
.listSubcategory{
  width:100%;
  overflow-y: auto !important;

}
#menuHeaderBody .listSubcategory ul .itemSubCategoria p {
  cursor:pointer;
}
#menuHeaderBody .listSubcategory ul .itemTipo{
  padding: 0px;
  text-align: left;
  cursor:pointer;

}
#menuHeaderBody .listSubcategory ul .itemTipo:before{
  content:"•";
  font-size: 20px;
  top: 40px;
  left: 5px;
  
  margin-right: 10px;
  line-height: 1;

}


 #menuHeaderBody .opcionesCategorias{
   display: flex;
   padding-top: 10px;
 
}
.ulcategory{
 overflow-y:auto;
}
 #menuHeaderBody .ulcategory{
   width: 40%;
   height: 100vh;
   padding-right: 20px;
   padding-bottom: 20px;
 }
 .ulcategory::-webkit-scrollbar {
	width: 4px;
}

.ulcategory::-webkit-scrollbar-track {
	background-color: #AAAAAA;
}


 #menuHeaderBody,.opcionesCategorias,.ulcategory{
  box-sizing: border-box;

 }
 #menuHeaderBody .ulSubcategory p{
  text-align: left;
 }
 #menuHeaderBody .ulSubcategory{
   box-sizing: border-box;
   position:fixed;
   top:160px;
   bottom:10px;
   width:90%; 
   overflow:hidden;
   background:red;
 }
#menuHeaderBody .ulSubcategory .itemSubCategoria{
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  width: 25% !important;  
  /*float: left !important;
   */

 }
 #menuHeaderBody .ulSubcategory .itemSubCategoria p{
  font-weight: bold;
 }
 #menuHeaderBody .ulcategory li{
   text-align: left;
   width:100% !important;
   padding: 6px 0 6px 35px;
   border-top: 0;
   box-sizing: border-box;
   clear: both;
   font-size: 100%;
   cursor: pointer;

 }
  #menuHeaderBody .ulcategory li:after{
    content:">";
    float: right;
  }
  .active{
    color:red;
  }
  .contentCategorySelect{
    width: 100%;
    margin-left:20px;
  }
  .content-title{
    width: 100%;
    background: #000;
    padding-top:10px;
    padding-bottom:10px;
    color: #fff;
    display: block;
  }
  .close-menuOrdinary{
    cursor: pointer !important;
    background: transparent !important;
    color: #fff !important;
    background: transparent !important;
  }
  .item-category-menu{
      bottom: auto !important;
  }
  .content-body{
    height: 85vh;
    opacity: 1;
    padding-bottom: 100px;
    position: relative;
  }
  .item-category-menu p{
        font-weight: bold;
        text-align:left;
        cursor:pointer;
  }
  .item-category-menu ul .itemTipo{
    font-size: 13px;
    font-weight: 300;
    color: #606060;
  }

</style>
