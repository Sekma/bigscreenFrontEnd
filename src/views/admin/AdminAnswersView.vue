<template>
  <div class="p-2">
    <div v-if="!responseData.length" class="text-center mt-5">
      <img src="/src/assets/logo(2).png" width="250px"/>
      <h4>Loading...</h4>
    </div>
    <div v-else class="data-table d-flex justify-content-between mt-1 text-center">
      <div class="m-auto">
        <h4 class="bg-light p-2">La liste des réponses par sondé</h4>
        <div v-for="(responses, visitorId) in groupedResponses" :key="visitorId" class="mb-4">
          <h5>Sondé : {{ responses[0].visitor }}</h5>
          <table class="table table-striped border">
            <thead>
              <tr class="table-primary">
                <th class="fw-bold">N° Question</th>
                <th class="fw-bold">Question</th>
                <th class="fw-bold">Réponse</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="response in responses" :key="response.question_id">
                <td>{{ response.question_id }}/20</td>
                <td>{{ response.question }}</td>
                <td>{{ response.answer }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() { 
    return {
      responseData: [], // Remplacez ici si nécessaire
      groupedResponses: {}
    };
  },
  methods: {
    fetchData() {
      axios.get('http://127.0.0.1:8000/api/admin_answer')
        .then(response => {
          this.responseData = response.data.message; // Utiliser le même nom
          this.groupResponsesByVisitor();
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données.', error);
        });
    },
    groupResponsesByVisitor() {
      this.groupedResponses = this.responseData.reduce((acc, response) => {
        const visitorId = response.visitors_id;
        if (!acc[visitorId]) {
          acc[visitorId] = [];
        }
        acc[visitorId].push(response);
        return acc;
      }, {});
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style>
/* Ajoutez vos styles ici si nécessaire */
</style>
