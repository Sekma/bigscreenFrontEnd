<template>
    <div v-if="isMessageVisible" class="modal-overlay">
      <div class="confirmation text-center text-white form-group m-auto p-5 w-50">
        <p>{{ message }}</p>
        <RouterLink @click="deleteMail" class="text-decoration-none text-primary mb-4" :to="`/answer/${reference}`">http://localhost:5173/answer/{{reference}}</RouterLink>
        <div class="text-end">
          <button @click="closeMessage" class="btn btn-primary mt-4 text-white rounded-pill fw-bold">Fermer</button>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMessageVisible: false,
        message: '',
        reference: ''
      };
    },
    methods: {
      showMessage(msg, ref) {
        this.message = msg
        this.reference = ref
        this.isMessageVisible = true;
      },
      closeMessage() {
        localStorage.removeItem('userEmail'); // Supprimer l'email existant
        this.$router.push({ name: 'home' }); // Passer à la page d'accueil
        this.isMessageVisible = false; // Fermer le Modal
      },
      deleteMail(){ // supprimer l'email dès que l'utilisateur fini le sondage et quitte la page
                    // il doit entrer un nouveau mail pour accéder à la page du questionnaire
        localStorage.removeItem('userEmail'); // Supprimer l'email existant
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .confirmation {
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.8);
    min-width: 300px; /* Largeur minimale */
    max-width: 90%; /* Ne pas dépasser 90% de l'écran */
  }
  </style>
  
  