<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>

<template>
  <div>
    <nav v-if="!isAdminRoute" class="p-4">
      <img class="logo" src="/src/assets/logo.png" alt="logo" width="220px">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/survey">Questionnaire</RouterLink>
    </nav>
    <main>
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>

nav {
  font-size: 12px;
  text-align: start;
  padding: 1rem 0;
  border-bottom: 1px solid grey;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3)
}

nav a.router-link-exact-active {
  color: grey;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-weight: bold;
  color: white;
  text-decoration: none;
}

nav a:first-of-type {
  border: 0;
} 

@media (min-width: 1024px) {

  nav {
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem 0;
  }
  nav .logo{
    margin-left: 150px;
  }
  nav .link:first-of-type{
    margin-left: 50px;
  }
}
</style>
