<template>
    <div class="d-flex bg-light">
      <nav class="admin-nav d-flex flex-column bg-white text-center p-3" style="width: 250px; height: 100vh; position: fixed;">
        <div class="logo p-3 my-5">
          <img src="/src/assets/logo.png" alt="Bigscreen" width="200px" />
        </div>
        <RouterLink to="/admin" class="nav-link py-2">Accueil</RouterLink>
        <RouterLink to="/admin/questions" class="nav-link py-2">Questionnaire </RouterLink>
        <RouterLink to="/admin/answers" class="nav-link py-2">Réponses</RouterLink>
        <button @click.prevent="logout" class="nav-link py-2 mt-auto">Logout</button>
      </nav>
      <main class="flex-fill p-4" style="margin-left: 250px; overflow-y: auto; height: 100vh;">
        <RouterView />
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  export default{
    methods: {
        logout() {
  if (confirm("Are you sure you want to log out?")) {
    axios.get('http://localhost:8000/api/logout')
      .then(response => {
        // Suppression du token
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];

        // Redirection vers la page de login
        this.$router.push('/login'); 
      })
      .catch(error => {

        // Nettoyage même en cas d'erreur
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];

        // Redirection vers la page de login
        this.$router.push('/login');
      });
  }
}

    }
  }
  </script>
  
  <style scoped>
  .admin-nav {
    background-color: #9ecfff !important;
  }
  
  .nav-link {
    text-decoration: none;
    font-weight: bold;
  }
  
  .nav-link:hover {
    background-color: #f8f9fa;
  }
  nav a.router-link-exact-active {
    background-color: #f8f9fa9f;
  }
  .logo {
    text-align: center; /* Centrer le logo */
  }
  </style>
  
  