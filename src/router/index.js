import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SurveyView from '@/views/SurveyView.vue'
import AnswersView from '@/views/AnswersView.vue'
import AdminLayout from '../views/admin/AdminLayout.vue';
import AdminView from '../views/admin/AdminView.vue';
import AdminQuestionsView from '@/views/admin/AdminQuestionsView.vue';
import AdminAnswersView from '@/views/admin/AdminAnswersView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/survey',
      name: 'survey',
     
      component: SurveyView,
      beforeEnter: (to, from, next) => {
        const email = localStorage.getItem('userEmail'); // Vérifie si l'email est stocké
        if (email) {
          next(); // L'utilisateur peut accéder à la page
        } else {
          alert('Email non fourni. Veuillez cliquer sur le bouton "Participer au Sondage", puis entrer votre email pour accéder à cette page.'); // Affiche l'alerte
          next({ name: 'home' }); // Rediriger vers la page d'accueil si pas d'email
        }
      }
    },
    {
      path: '/answer/:reference',  // route avec un paramètre
      name: 'answer',
      component: AnswersView,
      props: true  // Cela permet de passer le paramètre comme prop au composant
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/admin/LoginView.vue')
    },
    {
      path: '/admin',
      component: AdminLayout, // Utiliser le layout
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin',
          component: AdminView,
        },
        {
          path: '/admin/questions',
          name: 'admin-questions',
          component: AdminQuestionsView
        },
        {
          path: '/admin/answers',
          name: 'admin-answers',
          component: AdminAnswersView
        }
      ],
    },
  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');  // Vérifier la présence d'un token

  // Vérifier si la route nécessite une authentification.
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si la route nécessite une authentification et que l'utilisateur n'est pas authentifié, rediriger vers la page login
    next({ name: 'login' });
  } else {
    // Sinon, permettre à l'utilisateur de continuer.
    next();
  }
});

export default router
