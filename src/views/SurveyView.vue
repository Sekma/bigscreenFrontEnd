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

      <form class="w-50 m-auto" style="min-width:500px" @submit.prevent="handleSubmit">
        <template v-for="(item, index) in responseData" :key="item.id">
          <div class="form-group border p-3 my-4 rounded shadow-sm" style="background-color:#dee2e6" v-if="item.type === 'a'">
            <p><strong>Question: {{ item.id }}/20 : </strong><br> {{ item.question }}</p>
            <div style="border: 1px dashed black" class="p-3">
              <div v-for="choice in JSON.parse(item.choices)" :key="choice" class="form-check">
                <input class="form-check-input" type="radio" :name="'radio' + item.id" :id="'radio' + index" v-model="formData[item.id]" :value="choice" required/>
                <label class="form-check-label" :for="'radio' + index">{{ choice }}</label>
              </div>
            </div>
          </div>
          <div class="form-group border p-3 my-4 rounded shadow-sm" style="background-color:#dee2e6" v-else-if="item.type === 'c'">
            <label :for="'input' + item.id"><strong>Question: {{ item.id }}/20 : </strong><br> {{ item.question }}</label>
            <input type="number" min="0" max="5" class="form-control mt-3" :id="'input' + item.id" v-model="formData[item.id]" required/>
          </div>
          <div class="form-group border p-3 my-4 rounded shadow-sm" style="background-color:#dee2e6" v-else>
            <label :for="'input' + item.id"><strong>Question: {{ item.id }}/20 : </strong><br> {{ item.question }}</label>
            <input class="form-control mt-3" :id="'input' + item.id" v-model="formData[item.id]" :readonly="item.id === 1" required/>
          </div>
        </template>
        <div class="text-end">
          <button class="btn btn-outline-primary me-3 shadow-sm" type="submit">Finaliser</button>
          <button @click="resetForm(this.email)" class="btn btn-outline-danger shadow-sm" type="reset">Reset</button>
        </div>
      </form>
    </div>
    <MessageModal ref="messageModal" />
  </div>
</template>

<script>
import axios from "axios";
import MessageModal from '../components/MessageModal.vue'; 
export default {
  components: {
    MessageModal
  },
  data() { 
    return {
      responseData: [],
      error: null,
      formData: [],
      answer: [] // Stocker les réponses du formulaire
    };
  },
  
  computed: {
    email() {
      const queryEmail = this.$route.query.email;
      if (queryEmail) {
        localStorage.setItem('userEmail', queryEmail);
        return queryEmail;
      }
      return localStorage.getItem('userEmail') || 'Email non fourni';
    },
  },

  mounted() {
    this.formData['1'] = this.email; // Initialiser le champ email
    this.fetchData();
  },

  methods: {
    fetchData() {
      axios.get('http://127.0.0.1:8000/api/question')
        .then(response => {
          this.responseData = response.data.message;
          // Initialiser formData pour chaque question
          this.responseData.forEach(item => {
            this.$set(this.formData, item.id, ''); // S'assurez que chaque champ est initialisé
          });
        })
        .catch(error => this.error = error);
    },

    handleSubmit() {
    const payload = {
        visitor_email: this.formData[1], // L'email doit être le bon
        answer: Object.values(this.formData).map(value => String(value)) // Assurez-vous que cela contient les bonnes réponses
    };

    console.log('Payload avant envoi :', payload); 
    
    axios.post('http://127.0.0.1:8000/api/answer', payload)
        .then(response => {
          this.showMessage(response.data.message, response.data.reference); // Afficher le message dans le modal
        })
        .catch(error => {
          if (error.response) {
            this.showMessage(error.response.data.message || 'Erreur lors de l\'envoi des données'); // Utiliser le modal pour afficher l'erreur
          } else {
            this.showMessage('Une erreur est survenue');
          }
        });
    },
    showMessage(msg, ref) {
      this.$refs.messageModal.showMessage(msg, ref);
    },
    resetForm(email) { // si l'utilisateur quitte la page du questionnaire sans remplir le formulaire
      if (confirm("Êtes-vous sûr de vouloir quitter ?")) {
        
            axios.delete('http://127.0.0.1:8000/api/delete_visitor/'+email) // supprimer l'utilisateur de la base des données
          .then((response) => {

            localStorage.removeItem('userEmail'); // Supprimer l'email existant
            this.$router.push({ name: 'home' }); // Passer à la page d'accueil
          })
          .catch((error) => {
              alert(response.data.message);
          });
        
        
      }
    }
  },
};
</script>
