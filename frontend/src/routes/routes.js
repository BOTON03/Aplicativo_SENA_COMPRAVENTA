
import login from '../pages/Login.vue';
import home from '../pages/Home.vue'
import categorias from '../pages/Categorias.vue'
import articulos from '../pages/Articulos.vue'
import ingresos from '../pages/Ingresos.vue'
import proveedores from '../pages/Proveedores.vue'
import ventas from '../pages/Ventas.vue'
import compras from '../pages/Compras.vue'
import clientes from '../pages/Clientes.vue'
import { store } from '../../store/store.js';
import VueRouter from 'vue-router';

export const routes=[
    {path: '/', component:login},// significa que el 8081 es la pagina principal
    
    {path: '/home', component:home},
    {path: '/categorias', component:categorias},
    {path: '/articulos', component:articulos},
    {path: '/ingresos', component:ingresos},
    {path: '/proveedores', component:proveedores},
    {path: '/ventas', component:ventas},
    {path: '/compras', component:compras},
    {path: '/clientes', component:clientes},
]

export const router = new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to,from,next)=>{
    if(!store.state.token && to.path != '/'){
      next('/')
    }else{
    next()
    }
    
})