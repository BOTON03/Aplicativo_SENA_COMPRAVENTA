<template>
  <v-app class="mt-16 ma-3 pa-16">
    <v-container>
      <v-row justify="center" aling="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6 mt-16 ma-auto" color="" width="550px">
            <v-toolbar dark color="grey darken-1">
              <v-toolbar-title>Acceso al sistema</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="formulario">
                <v-text-field
                  id="email"
                  prepend-icon="mdi-account"
                  required
                  name="email"
                  label="usuario@gmail.com"
                  type="email"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey darken-1"
                class="text-center white--text white"
                @click="login()"
                >Iniciar Sesion</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,

    error: "",
    email: "",
    password: "",
  }),

  methods: {
    login() {
      axios
        .post("/login/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);

          this.$swal.fire({
            position: "center",
            icon: "success",
            text: "¡ Bienvenido! " + response.data.login.nombre,
            showConfirmButton: false,
            timer: 1500,
          });

          this.$store.dispatch("setEmail", response.data.login.email); // lllamamos las acciones  con dispatch
          this.$store.dispatch("setPassword", response.data.login.password);
          this.$store.dispatch("setNombre", response.data.login.nombre);
          this.$store.dispatch("setToken", response.data.token);
          this.$router.replace({ path: "/home" });
        })
        .catch((error) => {
          console.log(error.response);
          this.$swal({
            position: "center",
            icon: "warning",
            text: `${error.response.data.msg}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },

    reset() {
      this.$refs.formulario.reset();
    },
    resetValidation() {
      this.$refs.formulario.resetValidation();
    },
  },
};
</script>

<style scoped>
</style>


