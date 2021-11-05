<template>
<div>
    <header class="head-not-found">
        <v-container>
            <span class="titleApp">my store</span>
            <v-btn class="btn-register" x-large color="success" dark>registrar mi tienda</v-btn>
        </v-container>
    </header>
    <v-container class="messages-container">
        <v-card class="messages-container-card">
            <p class="message">
                Lo sentimos, esta tienda no está registrada o no  disponible actualmente.</p>
        </v-card>
    </v-container>
</div>
</template>
<style>
.head-not-found{
 background: #000 !important;
 height: 70px !important;
}
.titleApp{
    color:#fff !important; 
    font-size:30px !important;
}
.btn-register{
    float: right;
    height:30px;
    top:0px;
}
.messages-container,.messages-container-card{
    width:100%;
    height:250px;
    margin-top:20px;
    align-items: center;
    display: flex;
    justify-content: center;
}
.message{
    font-size:26px;
}
</style>