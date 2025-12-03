<template>
  <section class="page-section">
    <b-container class="text-center mt-5">
      <!-- Cabeçalho -->
      <HeaderPage title="Login" />

      <!-- Mensagem de boas-vindas -->
      <b-row class="justify-content-center mt-4">
        <b-col cols="12" md="6">
          <h2>Seja bem-vindo!</h2>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  name: "LoginPage"
};
</script>

<style scoped>
.page-section {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
