<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Login" />

      <!--FORM-->
      <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <form @submit.prevent="login">
            <div class="form-group">
              <input
                type="text"
                v-model="username"
                class="form-control form-control-lg"
                id="exampleInputEmail1"
                placeholder="escreve o teu username"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                v-model="password"
                class="form-control form-control-lg"
                id="exampleInputPassword1"
                placeholder="escreve a tua password"
                required
              />
            </div>
            <button type="submit" class="btn btn-success mr-2">
              <i class="fas fa-sign-in-alt"></i> ENTRAR
            </button>
            <router-link
              :to="{ name: 'register' }"
              tag="button"
              class="btn btn-danger"
            >
              <i class="fas fa-file-signature"></i> REGISTAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8082/auth/login", {
          username: this.username,
          password: this.password
        });

        // Mostra mensagem de sucesso
        this.$alert(
          response.data.message || "Login efetuado com sucesso",
          "Login",
          "sucesso"
        );

        // Redirecionar para home
        this.$router.push({ name: "Principa" });
      } catch (error) {
        // Mostra erro retornado da API
        this.$alert(
          error.response?.data?.message || error.message,
          "Erro",
          "erro"
        );
      }
    }
  }
};
</script>
