<template>
    <div>
        <div v-if="error" class="text-center mt-5">
            <img src="/src/assets/logo.png" width="250px" class="mt-5"/>
            <h4 class="text-success text-white bg-danger mt-3">{{ error }}</h4> <!-- Afficher l'erreur ici -->
        </div>
        <div v-else>
            <div v-if="!responseData.length" class="text-center mt-5">
                <img src="/src/assets/logo.png" width="250px" class="mt-5"/>
                <h4 class="text-success text-white mt-3">Loading...</h4>
              </div>
            <div v-else class="bg-light py-5">
                <div class="w-50 m-auto">
                  <img src="/src/assets/logo(2).png" width="250px" class="mb-3 rounded"/>
                  <h2>Cher(e) {{ findVisitor }}</h2>
                  <p class="text-center"> Vous trouverez ci-dessous les 
                    réponses que vous avez apportées à 
                    notre sondage <br>le : <strong>{{ findDate }}</strong></p>

                    <div v-for="item in responseData" :key="item.question_id" class="form-group border p-3 my-4 rounded shadow-sm" style="background-color:#dee2e6">
                        <p><strong>Question {{item.question_id}}/20 : </strong><br>{{ item.question }}</p>
                        <div style="border: 1px dashed black" class="p-3">
                            {{ item.answer }}
                        </div>
                    </div>
                    <div class="text-end">
                        <button @click="generatePdf" class="btn btn-primary mt-4 shadow-sm">Télécharger l'URL en PDF</button>
                        <button @click="returnHome" class="btn btn-outline-danger ms-4 mt-4 shadow-sm">Fermer</button>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import axios from "axios";
import { jsPDF } from "jspdf";
export default {
    props: ['reference', 'responseData'],
    data() { 
        return {
            responseData: [],
            error: null
        };
    },
    computed: {
        findDate() {
            if (this.responseData.length > 0) {
                return this.responseData[0].date; // Méthode pour trouver la date
            }
            return 'Date non spécifiée'; // Gestion du cas où il n'y a pas de réponses
        },
        findVisitor(){
            if (this.responseData.length > 0) {
                return this.responseData[0].visitor; // Méthode pour trouver le visiteur
            }
            return 'Date non spécifiée'; // Gestion du cas où il n'y a pas de réponses
        }
    },
    methods: {
        fetchData() {
            axios.get(`http://127.0.0.1:8000/api/answer/${this.reference}`)
                .then(response => {
                    this.responseData = response.data.message;
                })
                .catch(error => {
                    this.error = 'Erreur lors de la récupération des données.';
                    console.error(error);
                });
        },
        generatePdf() {
            const currentUrl = window.location.href; // Obtenir l'URL actuelle

            const doc = new jsPDF();
            doc.text("Voici l'URL enregistrée :", 10, 10);
            doc.text(currentUrl, 10, 20); // Ajouter l'URL au PDF
            doc.save("url.pdf"); // Télécharger le PDF
        },
        returnHome() {
        if (confirm("Êtes-vous sûr de vouloir quitter ?")) {
            localStorage.removeItem('userEmail'); // Supprimer l'email existant
            this.$router.push({ name: 'home' }); // Passer à la page d'accueil
        }
        }
        
    },
    mounted() {
        this.fetchData();
    }
}
</script>