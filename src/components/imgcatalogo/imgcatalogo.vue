<template>
<v-container class="card" style="padding:20px;border:2px solid #969696;">
    <h3>Imagenes del catalogo producto</h3>
    <draggable class="rowitemsimg" v-model="imagesList" draggable=".item" :disabled="widthNavigator<1000 ? true : false">
        <div   class="col-lg-2 col-md-4 col-6 v-card v-sheet theme--light itemimg item"  v-for="(item, index) in imagesList" v-bind:key="index" >
            <v-img  style="width:100%;min-height: 150px;height:100% !important" :src="item" >
            <div class="galery-overlay">
              
              <div class="gallery__item-control gallery__item-control--remove" style="font-size:18px:color:red !important;" @click="deleteImage(index)">X</div>
              <div style="width:100% !important;display: flex;align-items: center;height: 50%;color: #fff;text-align: center;">Arrastrar para Organizar</div>
             
            </div>
            </v-img>
        </div>
        <div class="col-lg-2 col-md-4 col-6 v-card v-sheet theme--light itemNone" @click="addImage" >
            <svg  style="width:100%;min-height: 150px;" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 123 123" focusable="false">
            <path fill-rule="evenodd" d="M59.443 45.542H45v-3.601h14.443V27h3.592v14.941h14.463v3.601H63.035v14.9h-3.592z"></path>
            </svg>
            <span class="uploadImage" >Subir imágenes</span>
        </div> 
    </draggable>
</v-container>
</template>

<script>

import config from '@/../config/index.json'
import {  mapMutations } from 'vuex'
import draggable from 'vuedraggable'
  export default {
    components: {
        draggable
    },
    data: () => ({
      widthNavigator:document.body.clientWidth,
      tab: null,
       
    //  imagesList:[],

    }),
    methods: {
    ...mapMutations({
        addImg: 'global/ADD_IMAGE',
     }),
    ...mapMutations({
        setPositionImages: 'global/SET_POSITION_IMAGES',
     }),
  ...mapMutations({
        removePosition: 'global/REMOVE_IMAGE_INDEX',
     }),
    ...mapMutations({
        setImages: 'global/SET_IMAGES',
     }),
    onresize(){
      this.widthNavigator = document.body.clientWidth;
    },  
    deleteImage(index){
      this.removePosition(index);
    },
     addImage(){
        var input = document.createElement("input");
        input.setAttribute('type', 'file');
        input.click();
        input.addEventListener("change",this.changeFile,false) ;
     },
     async changeFile(event){
        if(event.target.files.length>0){
          let file=event.target.files[0];
          let maxSizeImg=parseInt(config.MAXSIZEIMG);
          let typeImgValid=config.TYPEIMGVALID;
          var type = file.type.split('/').pop().toLowerCase();
          let bandImgValid=false;
          for(var i=0;i<typeImgValid.length;i++){
            if(type==typeImgValid[i]){
              bandImgValid=true;
            }
          }
          if(!bandImgValid){
            let stringTypeImg=typeImgValid.join(","); 
            this.errorMessage=file.name+' no es un tipo de archivo compatible. Sube archivos que terminen en '+stringTypeImg;
            return false;
          }
          if (maxSizeImg<file.size){
            this.errorMessage='La imagen sobrepasa el peso de máximo de 1MG por imagen.';
            return false;
          }
          this.errorMessage=null;
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  (result)=>{
           // this.imagesList.push(result.currentTarget.result);
            this.addImg(result.currentTarget.result);
            };
            reader.onerror = (error)=> {
              console.log('Error: ', error);
            };

        }
       
     },
     async deleteImg(pos){
        this.imagesList=this.imagesList.filter((item,index)=>{
          return index!=pos;
        });
      },
     /* async addImg(){
        this.$refs.fileImg.click();
      } */
    },
    watch:{
    },
    computed:{
      imagesList: {
        get() {
            return this.$store.state.global.imagesList
        },
        set(value) {
          console.log("value",value);
            this.setImages(value);
        }
    }
    //...mapState('global', ['imagesList']),
    },
    async mounted() {
      window.addEventListener("resize", this.onresize);
    }
  }
</script>
<style>
.gallery__item-control--remove{
  cursor:pointer;
  float:right;
  font-size:24px;
}
.galery-overlay{
  display:none;
  background: rgb(0, 0, 0,0.5);
  position: absolute;
  width: 100%;
  top: 0px;
  color:#ffffff !important;
  height: 100%;
}
.itemimg:hover .galery-overlay{
   display:block;
}

.fileImg{
  display:none !important;
}
.vue-notification-group,.vue-notification-wrapper,.vue-notification-template,.vue-notification{
  z-index:9999999999999999999999999999999999 !important;
}
.rowitemsimg{
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;

  background: #fff;

  /*padding-top: 20px;
  padding-bottom: 20px
*/}
.itemNone{
  max-width:100% !important;
  align-items: center;
  cursor:pointer;
  border-style: dotted !important;
  border: 4px dotted  #0463A7 !important;
 
}
.itemNone svg{
    display: flex;
    align-items: center;
    margin: auto;
    height: 100%;
    fill: #0463A7;
    width: 100%;
}
.uploadImage{
  position: relative;
  color :#0463A7;
  width: 100%;
  display: block;
  text-align: center;
  top: -20px;
}
.firstImgSpan{
    position: relative;
    float: left;
    display: block;
    width: 100%;
    background: transparent;
    z-index: 999999;
}
@media (min-width: 1000px){
  .rowitemsimg{
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin-right: -12px;
    margin-left: -12px;
}
}

.itemimg {
  width: 125px;
  cursor:pointer;
}


</style>