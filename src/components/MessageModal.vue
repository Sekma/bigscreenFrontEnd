<template>
    <div v-if="isMessageVisible" class="modal-overlay">
      <div class="confirmation text-center text-white form-group m-auto p-5 w-50">
        <p>{{ message }}</p>
        <button @click="closeMessage" class="btn btn-primary mt-4 text-white rounded-pill fw-bold">Fermer</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMessageVisible: false,
        message: ''
      };
    },
    methods: {
      showMessage(msg) {
        this.message = msg;
        this.isMessageVisible = true;
      },
      closeMessage() {
        this.isMessageVisible = false;
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
    background: rgb(0, 0, 0);
    min-width: 300px; /* Largeur minimale */
    max-width: 90%; /* Ne pas dépasser 90% de l'écran */
  }
  </style>
  
  