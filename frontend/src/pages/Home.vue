<template>
    <div class="ex2">
  <canvas id="myChart"></canvas>
    </div>
</template> 

<script>
import axios from 'axios';
import Chart from 'chart.js'

export default {
  data(){
    return{
      datos:[],
      stock:[],
      myChart:null
    }

  },
  mounted (){
    this.graficar()

  },
  methods: {
    async graficar(){
      
      let me = this;
      let categoriaArray = [];
      let header = {headers:{"x-token": this.$store.state.token}};
      console.log(this.$store.state.token)
      await axios
      .get("articulo", header)
      .then(function(response){
        categoriaArray = response.data.articulo;
        console.log(response.data.articulo);
        categoriaArray.map(function (x){
          me.datos.push(x.nombre);
          me.stock.push(x.stock)

      let ctx = document.getElementById('myChart');
      const myChart = new Chart (ctx, {
        
         type: 'bar',
         data: {
           labels: me.datos,
           datasets:[{
             label:'Articulos',
             data: me.stock,
             backgroundColor:[
               'rgba(255,99,132,0.2)',
               'rgba(54,162,235,0.2)',
               'rgba(255,206,86,0.2)',
               'rgba(75,192,192,0.2)',
               'rgba(25,80,130,0.2)',
               'rgba(25,255,12,0.2)',
             ],
             border:[
              'rgba(255,99,132,0.2)',
               'rgba(54,162,235,0.2)',
               'rgba(255,206,86,0.2)',
               'rgba(75,192,192,0.2)',
               'rgba(25,80,130,0.2)',
               'rgba(25,255,12,0.2)',
             ],
             borderWidth:1 
             
             }]
         },
         options: {
           scales:{
             yAxes:[{
               ticks:{
                 beginAtZero: true
               }
             }]
           }
         }
         
       },myChart);


        });
        
      })
      
    },
   

  },
  
}
</script>

<style>
.ex2 {
  margin : 100px;
}
</style>
