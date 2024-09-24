<template>
  <div>
    <div v-if="!responseData.length" class="text-center mt-5">
      <img src="/src/assets/logo.png" width="250px" class="mt-5"/>
      <h4 class="text-success text-white mt-3">Loading...</h4>
    </div>
    <div v-else class="bg-light py-5">
      <div class="w-50 m-auto">
        <img src="/src/assets/logo(2).png" width="250px" class="mb-3 rounded"/>
        <p>Merci de répondre à toutes les questions et de valider le formulaire en bas de page. </p>
      </div>
    <!-- Contenu du questionnaire -->

    <form class="w-50 m-auto" style="min-width:500px" action="" @submit.prevent="handleSubmit">
      <template v-for="(item, index) in responseData" :key="item.id">
        
        <div class="form-group border p-3 my-4 rounded" style="background-color:#dee2e6" v-if="item.type === 'a'">
          <p>{{ item.id }}/20 - {{ item.question }}</p>
          <div style="border: 1px dashed black" class="p-3">
            <div v-for="choice in JSON.parse(item.choices)" :key="choice" class="form-check">
            
              <input class="form-check-input" type="radio" :name="'radio' + item.id" :id="'radio' + index" v-model="formData[item.id]" :value="choice" style="border: 1px solid grey" required/>
              
              <label class="form-check-label" :for="'radio' + index">
                {{ choice }}
              </label>
            </div>
          </div>
          
        </div>
        
        <div class="form-group border p-3 my-4 rounded" style="background-color:#dee2e6" v-else-if="item.type === 'c'">
          <label :for="'input' + item.id">{{ item.id }}/20 - {{ item.question }}</label>
          <input type="number" min="0" max="5" class="form-control mt-3" :id="'input' + item.id" v-model="formData[item.id]" style="border: 1px dashed black" required/>
        </div>
    
        <div class="form-group border p-3 my-4 rounded" style="background-color:#dee2e6" v-else>
          <label :for="'input' + item.id">{{ item.id }}/20 - {{ item.question }}</label>
          <input class="form-control mt-3" :id="'input' + item.id" v-model="formData[item.id]" :readonly="item.id === 1" style="border: 1px dashed black" required/>
        </div>
        
      </template>
      <div class="text-end">
        <button class="btn btn-outline-primary me-3" type="submit">Finaliser</button>
        <button @click="resetForm" class="btn btn-outline-danger" type="reset">Reset</button>
      </div>
    </form>
    
<div>
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
      error: null,
      formData: {
        // Prédéfinisser une valeur pour le premier champ
        '1': this.email,
      },
      }
    },

  computed: {
    email() {
      // Vérifier d'abord si l'email est passé en tant que paramètre de requête
      const queryEmail = this.$route.query.email;
      if (queryEmail) {
        localStorage.setItem('userEmail', queryEmail); // Sauvegarder dans localStorage
        return queryEmail; // Retourner l'email passé dans la requête
      }

      // Sinon, récupèrer l'email depuis localStorage
      return localStorage.getItem('userEmail') || 'Email non fourni'; // Retourner un message par défaut si pas d'email
    },
  },
  
    mounted() {
      // s'assurer de mettre à jour formData si l'email change
      this.formData['1'] = this.email;
    },

    methods: {
      fetchData(){
        axios.get('http://127.0.0.1:8000/api/question').then(response => 
          {
            this.responseData = response.data.questions
          }
        ).catch(error => this.error = error) 
      },
      resetForm() {
        if(confirm("Êtes-vous sûr de vouloir quitter ?")){
          localStorage.removeItem('userEmail'); // Supprimer l'email existant dans localStorage
          this.$router.push({name: 'home'}) // passer vers la page home
        }
      }
    },
    created(){
      this.fetchData()
    },
};
</script>


