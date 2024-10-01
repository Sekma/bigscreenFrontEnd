<template>
  <div class="p-2">
    <div v-if="!responseData.length" class="text-center mt-5">
      <img src="/src/assets/logo(2).png" width="250px"/>
      <h4>Loading...</h4>
    </div>
    <div v-else class="data-table d-flex justify-content-between mt-1 text-center">
      <div class="m-auto">
        <h4 class="bg-light p-2">La liste des questions</h4>
        <table class="table table-striped border table-bordered">
          <thead>
            <tr class="table-primary">
              <th class="fw-bold">N°/20</th>
              <th class="fw-bold">Le corps de la question</th>
              <th class="fw-bold">Le type de question</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in responseData" :key="row.id">
              <td>{{ row.id }}/20</td>
              <td>{{ row.question }}</td>
              <td>{{ row.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      responseData: [],
      error: null
    };
  },
  methods: {
    fetchData() {
      axios.get('http://127.0.0.1:8000/api/admin_question')
        .then(response => {
          this.responseData = response.data.message;
        })
        .catch(error => {
          this.error = 'Erreur lors de la récupération des données.';
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchData(); // Appeler fetchData lors du montage du composant
  }
}
</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
</style>
