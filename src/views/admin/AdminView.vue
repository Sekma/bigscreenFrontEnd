<template>
  <div class="row p-2">
    <h4 class="text-center p-2 text-decoration-underline">Les statistiques du sondage</h4>
    <div class="col-6 p-5">
      <p>Marques de casques VR utilisées par les sondés.</p>
      <Pie v-if="dataPie_Q6.datasets[0].data.length>0" class="shadow p-3" :data="dataPie_Q6" :options="options" />
    </div>
    <div class="col-6 p-5">
      <p>Magasins d'applications utilisés pour l'achat de contenus VR.</p>
      <Pie v-if="dataPie_Q7.datasets[0].data.length>0" class="shadow p-3" :data="dataPie_Q7" :options="options" />
    </div>
    <div class="col-6 p-5">
      <p>Utilisation principale de Bigscreen pour...</p>
      <Pie v-if="dataPie_Q10.datasets[0].data.length>0" class="shadow p-3" :data="dataPie_Q10" :options="options" />
    </div>
    <div class="col-6 p-5">
      <p>Évaluation de la qualité d'image et audio sur Bigscreen</p>
      <Radar v-if="dataRadar.datasets[0].data.length>0 && dataRadar.datasets[1].data.length>0 " class="shadow p-3" :data="dataRadar" :options="chartOptions" />
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
        labels: [],
        datasets: [
          {label: 'Image (Nbr des sondés)',
            data: [],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }, {
            label: 'Audio (Nbr des sondés)',
            data: [],
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
    fetchDataPie(id, labels) {
      axios.get('http://127.0.0.1:8000/api/admin_statistical/'+id)
        .then(response => {
          this.responseData = response.data.message;
          const result = {};

          // Initialiser tous les labels à 0
          labels.forEach(label => {
            result[label] = 0;
          });

          // Mettre à jour les answer_count selon le tableau responseData
          this.responseData.forEach(item => {
            if (result.hasOwnProperty(item.answer)) {
              result[item.answer] = item.answer_count;
            }
          });

          // Insérer les données dans le graphique
          if (id === 6) {
            this.dataPie_Q6.labels = labels;
            this.dataPie_Q6.datasets[0].data = labels.map(label => result[label]);
          } else if (id === 7) {
            this.dataPie_Q7.labels = labels;
            this.dataPie_Q7.datasets[0].data = labels.map(label => result[label]);
          } else if (id === 10) {
            this.dataPie_Q10.labels = labels;
            this.dataPie_Q10.datasets[0].data = labels.map(label => result[label]);
          }

  
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données.', error);
        });
    },

    
    // method Radar
    fetchDataRadar(id) {
      axios.get('http://127.0.0.1:8000/api/admin_statistical/'+id)
        .then(response => {
          const responseData = response.data.message;

          // Les labels à afficher
          const labels = ['0', '1', '2', '3', '4', '5'];
          const result = {};

          // Initialiser tous les labels à 0
          labels.forEach(label => {
            result[label] = 0;
          });

          // Mettre à jour les answer_count selon le tableau responseData
          responseData.forEach(item => {
            if (result.hasOwnProperty(item.answer)) {
              result[item.answer] = item.answer_count;
            }
          });

      // Insérer les données dans le graphique
      this.dataRadar.labels = labels;

      if (id === 11) {
        this.dataRadar.datasets[0].data = labels.map(label => result[label]);
      } else if (id === 15) {
        this.dataRadar.datasets[1].data = labels.map(label => result[label]);
      }

    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données.', error);
    });
}

  },
  mounted() {
   this.fetchDataPie(6, ['Occulus Rift/s', 'HTC Vive', 'Windows Mixed Reality', 'PSVR']);
   this.fetchDataPie(7, ['SteamVR', 'Occulus store', 'Viveport', 'Playstation VR', 'Google Play', 'Windows store']);
   this.fetchDataPie(10, ['regarder des émissions TV en direct', 'regarder des films', 'jouer en solo', 'jouer en team']);
   this.fetchDataRadar(11);
   this.fetchDataRadar(15);
  }
}
</script>