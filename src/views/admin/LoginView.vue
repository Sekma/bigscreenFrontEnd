<template>
    <div class="m-auto mt-5 p-3 w-50 bd-dark text-white" style="box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3)">
        <div class="text-center">
            <img src="/src/assets/logo.png" alt="logo" width="200px">
            <h2 class="text-muted">Login</h2>
        </div>
      <form class="mt-5" @submit.prevent="login">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input v-model="email" type="email" class="form-control border-bottom mt-2 text-white" style="border:none; background-color: black" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model="password"  type="password" class="form-control border-bottom mt-2 text-white" style="border:none; background-color: black" id="exampleInputPassword1" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary mt-4 w-50 text-white rounded-pill fw-bold">Login</button>
      </form>
    </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      login() {
        axios
          .post("http://localhost:8000/api/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.access_token);
            this.$router.push("/admin");
          })
          .catch((error) => {
            alert("Login failed");
          });
      },
   },
  };
  </script>
