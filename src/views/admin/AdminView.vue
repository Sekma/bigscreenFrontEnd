<template>
  <div class="row p-2">
    <h4 class="text-center p-2 text-decoration-underline">Les statistiques du sondage : {{responseData}}</h4>
    <div class="col-6 p-5">
      <p>Marques de casques VR utilisées par les sondés.</p>
      <Pie class="shadow p-3" :data="data" :options="options" />
    </div>
    <div class="col-6 p-5">
      <p>Magasins d'applications utilisés pour l'achat de contenus VR.</p>
      <Pie class="shadow p-3" :data="data" :options="options" />
    </div>
    <div class="col-6 p-5">
      <p>Utilisation principale de Bigscreen pour...</p>
      <Pie class="shadow p-3" :data="data" :options="options" />
    </div>
    <div class="col-6 p-5">
      <p>Évaluation de la qualité d'image et audio sur Bigscreen</p>
      <Radar class="shadow p-3" :data="dataRadar" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale, PointElement, LineElement
} from 'chart.js'
import { Pie, Radar } from 'vue-chartjs'

ChartJS.register(ArcElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement)

export default {
  name: 'App',
  components: {
    Pie,
    Radar
  },
  data() {
    return {
      responseData:'',
      data: {
        labels: ['Occulus Rift/s', 'HTC Vive', 'Windows Mixed Reality', 'PSVR'],
        datasets: [
          {
            label: 'Nbr des sondés',
            data: [150, 100, 50, 20],
            backgroundColor: [ '#36A2EB', '#FFCE56', '#c9cbcf', '#FF6384'],
            hoverOffset: 4
          }
        ],
        hoverOffset: 4
      },
      dataRadar: {
        labels: ['Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'],
        datasets: [
          {label: 'My First Dataset',
            data: [65, 59, 90, 81, 56, 55, 40],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }, {
            label: 'My Second Dataset',
            data: [28, 48, 40, 19, 96, 27, 100],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'}
        ],
        hoverOffset: 4
      },
      options: {
        responsive: true
      },
      chartOptions: {
        responsive: true,
        elements: {
          line: {
            borderWidth: 3
          }
        }
      }
    }
  },
  methods:{
    fetchData(id, answer) {
      axios.get('http://127.0.0.1:8000/api/admin_statistical/'+id+'/'+answer)
        .then(response => {
          this.responseData = response.data.message;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données.', error);
        });
    },
  },
  mounted() {
    this.fetchData(6, 'PSVR');
  }
}
</script>