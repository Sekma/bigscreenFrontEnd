<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="confirmation text-start text-white form-group m-auto p-5 w-50">
        <p class="text-center">{{ message }}</p>
        <p class="text-center messageError" v-if="emailError">{{ emailError }}</p>
        <div>
          <label for="inputName">Nom</label>
          <input id="inputName" type="text" v-model="name" placeholder="Entrez votre nom" class="form-control border-bottom mt-2 text-white" style="border:none; background-color: black" required/>
          <label class="mt-3" for="inputEmail">Adresse Email</label>
          <input id="inputEmail" type="email" v-model="email" placeholder="Entrez votre email" class="form-control border-bottom mt-2 text-white" style="border:none; background-color: black" required/>
          <small id="emailHelp" class="form-text text-muted">Nous ne partagerons jamais votre adresse e-mail avec qui que ce soit.</small>
        </div>
        <button @click="confirm" :disabled="!email || !name" class="btn btn-primary mt-4 w-50 text-white rounded-pill fw-bold">Confirmer</button>
        <button @click="cancel" class="btn btn-primary mt-4 ms-2 w-25 text-white rounded-pill fw-bold">Annuler</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    data() {
      return {
        isVisible: false,
        message: '',
        name: '',
        email: '',
        emailError: '',
        onConfirm: null,
      };
    },
    methods: {
        // pour afficher du modal avec deux parametres: message ('Veuillez entrer votre email pour accéder au questionnaire.')
        // et la fonction a appeler (proceedToSurvey())
      show(message, callback) {
        this.message = message;
        this.email = ''; // Réinitialiser l'email
        this.name = ''; // Réinitialiser le nom
        this.onConfirm = callback;
        this.isVisible = true; // Afficher le modal
      },
    // valider le format email
      validateEmail() {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.email)) {
                        this.emailError = 'Format d\'email invalide';
                        return false;
                    }
                    this.emailError = '';
                    return true;
                },
    // confirmer         
      confirm() {
        if (this.validateEmail()){ // si le format email est valider

                // stocker les données de formulaire dans la base de données à travers l'api
                axios.post("http://localhost:8000/api/visitor", {
                name: this.name,
                email: this.email
                })
                .then((response) => {
                    
                    this.isVisible = false; // Cacher le modal
                    if (this.onConfirm) {
                        localStorage.setItem('userEmail', this.email); // Stocker l'email
                        this.onConfirm(this.email); // Appeler le callback avec l'email
                    }
                    alert(response.data.message);
                })
                .catch((error) => {
                    this.email= ''
                    alert(error.response.data.message);
                });
            
        }else{
            this.email= ''
        }
      },
      // fermer
      cancel() {
        this.isVisible = false; // Cacher le modal
      },
    },
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
    background: rgb(0, 0, 0);
    min-width: 300px; /* Largeur minimale */
    max-width: 90%; /* Ne pas dépasser 90% de l'écran */
  }
  .confirmation p {
    color: rgb(255, 255, 255) !important; /* Force la couleur du texte */
  }
  .confirmation p.messageError{
    color: rgb(255, 0, 0) !important; /* Force la couleur du texte */
  }
  </style>
  