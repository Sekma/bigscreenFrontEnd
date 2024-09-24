

<template>
  <div class="text-white text-center m-auto" style="width:80%">
    <img class="mt-5" src="/src/assets/logo.png" alt="logo" width="200px">
    <h2 class="mt-5">Bienvenue sur le Sondage de Bigscreen !</h2>
    <p class="mt-5">
      Nous sommes ravis de vous accueillir sur notre plateforme dédiée à la collecte de vos précieux retours.
      En tant qu'utilisateur, votre opinion est essentielle pour nous aider à améliorer votre expérience de visionnage de films, 
      émissions TV et jeux vidéo sur un écran géant virtuel.<br>
      Votre participation à ce sondage ne prendra que quelques minutes, mais elle aura un impact significatif sur les futures itérations de notre application VR.
      Merci de prendre le temps de partager vos réflexions !
    </p>
    <button @click="checkAccess" class="btn btn-primary mt-4 w-50 text-white rounded-pill fw-bold">Participer au Sondage</button>
    <ConfirmationModal ref="confirmationModal" />
  </div>
</template>

<script>
import ConfirmationModal from '@/components/ConfirmationModal.vue'; 

export default {
  components: {
    ConfirmationModal,
  },
  methods: {
    checkAccess() { // Vérifier d'abord si l'email est sauvegarder dans localStorage
      if(!localStorage.getItem('userEmail')){ //s'il n'existe pas: afficher le modal pour metter l'email
        this.$refs.confirmationModal.show("Veuillez entrer votre email pour accéder au questionnaire.", this.proceedToSurvey);
      }else{ // s'il existe: passer directement au questionnaire avec l'eamil stoqué dans localStorage
        this.$router.push({name: 'survey'});
      }
     
    },
    proceedToSurvey(email) {
      // Logique pour passer à la page du sondage
      this.$router.push({ name: 'survey', query: { email } });
    },
  },
};
</script>