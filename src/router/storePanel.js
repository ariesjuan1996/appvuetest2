import Vue from 'vue'
import VueRouter from 'vue-router'
//import pageMain from '@/views/pageMain/pageMain.vue';
Vue.use(VueRouter)
  const routes = [
    {
      path: '/admin',
      name: 'clients',
      component: () => import( '@/views/store/clients/clients.vue'),
    }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach(async(to, from, next) => {
  console.log("to",to.path);
  //await verifyStore(nameStore);
  /*let tokenSessionStore=localStorage.getItem("token");
  if((to.path=="/login" || to.path=="/") && tokenSessionStore!=null){
    next('/admin');
  }
  if(!(to.path=="/login") && tokenSessionStore==null){
    next('/login');
  }*/
  next();
}); 
export default router
