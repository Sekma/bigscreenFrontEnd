<template>
  <div class="row p-2">
    <h4 class="text-center p-2 text-decoration-underline">Les statistiques du sondage</h4>
    <div class="col-6 p-5">
      <p>Marques de casques VR utilisées par les sondés.</p>
      <Pie v-if="dataPie_Q6.labels.length>0" class="shadow p-3" :data="dataPie_Q6" :options="options" />
    </div>
    <div class="col-6 p-5">
      <p>Magasins d'applications utilisés pour l'achat de contenus VR.</p>
      <Pie v-if="dataPie_Q7.labels.length>0" class="shadow p-3" :data="dataPie_Q7" :options="options" />
    </div>
    <div class="col-6 p-5">
      <p>Utilisation principale de Bigscreen pour...</p>
      <Pie v-if="dataPie_Q10.labels.length>0" class="shadow p-3" :data="dataPie_Q10" :options="options" />
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
      // graphique Q6
      responseData_Q6:[],
      dataPie_Q6: {
        labels: [],
        datasets: [
          {
            label: 'Nbr des sondés',
            data: [],
            backgroundColor: [ '#36A2EB', '#ffcd23', '#4bffc0', '#FF6384'],
            hoverOffset: 4
          }
        ],
        hoverOffset: 4
      },

      // graphique Q7
      responseData_Q7:[],
      dataPie_Q7: {
        labels: [],
        datasets: [
          {
            label: 'Nbr des sondés',
            data: [],
            backgroundColor: [ '#36A2EB', '#ffcd23', '#4bffc0', '#FF6384', '#c9cbcf', '#ffaf4b'],
            hoverOffset: 4
          }
        ],
        hoverOffset: 4
      },

      // graphique Q10
      responseData_Q10:[],
      dataPie_Q10: {
        labels: [],
        datasets: [
          {
            label: 'Nbr des sondés',
            data: [],
            backgroundColor: [ '#36A2EB', '#ffcd23', '#4bffc0', '#FF6384'],
            hoverOffset: 4
          }
        ],
        hoverOffset: 4
      },

      // graphique radar
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
    // method_Q6
    fetchData_Q6() {
      axios.get('http://127.0.0.1:8000/api/admin_statistical/6')
        .then(response => {
          this.responseData_Q6 = response.data.message;

          // Les labels a afficher
        const labels = ['Occulus Rift/s', 'HTC Vive', 'Windows Mixed Reality', 'PSVR'];
        const result = {};

        // initialiser tous les labels à 0
        labels.forEach(label => {
          result[label] = 0;
        });

        // Mettre à jour les answer_count selon le tableau responseData_Q6
        this.responseData_Q6.forEach(item => {
          if (result.hasOwnProperty(item.answer)) {
            result[item.answer] = item.answer_count;
          }
        });

        // insérer les données dans le graphique
        this.dataPie_Q6.labels = labels;
        this.dataPie_Q6.datasets[0].data = labels.map(label => result[label]);

          
         // this.data.labels = result.map(item => item.answer);
         // this.data.datasets[0].data = this.responseData_Q6.map(item => item.answer_count);

          console.log(result)
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données.', error);
        });
    },

    // method_Q7
    fetchData_Q7() {
      axios.get('http://127.0.0.1:8000/api/admin_statistical/7')
        .then(response => {
          this.responseData_Q7 = response.data.message;

          // Les labels a afficher
        const labels = ['SteamVR', 'Occulus store', 'Viveport', 'Playstation VR', 'Google Play', 'Windows store'];
        const result = {};

        // initialiser tous les labels à 0
        labels.forEach(label => {
          result[label] = 0;
        });

        // Mettre à jour les answer_count selon le tableau responseData_Q7
        this.responseData_Q7.forEach(item => {
          if (result.hasOwnProperty(item.answer)) {
            result[item.answer] = item.answer_count;
          }
        });

        // insérer les données dans le graphique
        this.dataPie_Q7.labels = labels;
        this.dataPie_Q7.datasets[0].data = labels.map(label => result[label]);

          console.log(result)
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données.', error);
        });
    },

    // method_Q10
    fetchData_Q10() {
      axios.get('http://127.0.0.1:8000/api/admin_statistical/10')
        .then(response => {
          this.responseData_Q10 = response.data.message;

          // Les labels a afficher
        const labels = ['regarder des émissions TV en direct', 'regarder des films', 'jouer en solo', 'jouer en team'];
        const result = {};

        // initialiser tous les labels à 0
        labels.forEach(label => {
          result[label] = 0;
        });

        // Mettre à jour les answer_count selon le tableau responseData_Q10
        this.responseData_Q10.forEach(item => {
          if (result.hasOwnProperty(item.answer)) {
            result[item.answer] = item.answer_count;
          }
        });

        // insérer les données dans le graphique
        this.dataPie_Q10.labels = labels;
        this.dataPie_Q10.datasets[0].data = labels.map(label => result[label]);

          console.log(result)
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données.', error);
        });
    }
  },
  mounted() {
   this.fetchData_Q6();
   this.fetchData_Q7();
   this.fetchData_Q10();
  }
}
</script>