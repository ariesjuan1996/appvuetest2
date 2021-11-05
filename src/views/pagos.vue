<template>
    <div style="margin-top:100px !important;">
        <a href="#" v-scroll-to="{el: '#element',container: '#container',duration: 500,
            lazy: false,
            easing: 'linear',
            offset: -200,
            force: true,
            cancelable: true,
            onStart: {},
            onDone: {},
            onCancel: {},
            x: false,
            y: true
        }">
            Scroll to #element
        </a>
 
        <div id="element">
            Hi. I'm #element.
        </div>
    </div>
</template>

<script>
var VueScrollTo = require('vue-scrollto');
export default {
    
    async created(){
        var options = {
            container: '#container',
            easing: 'ease-in',
            lazy: false,
            offset: -60,
            force: true,
            cancelable: true,
            onStart: function(element) {
            // scrolling started
            console.log(element);
            },
            onDone: function(element) {
            // scrolling is done
             console.log(element);
            },
            onCancel: function(ele) {
            // scrolling has been interrupted
             console.log(ele);
            },
            x: false,
            y: true
        }
        
        var cancelScroll = VueScrollTo.scrollTo("#element", 500, options)
        
        // or alternatively inside your components you can use
        cancelScroll = this.$scrollTo("#element", 500, options);
        console.log(cancelScroll);
    }
}
</script>

<style>
#element{
    margin-top:1500px;
}
</style>