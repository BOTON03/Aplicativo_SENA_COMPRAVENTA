<template >
  <div>
    <v-app-bar color="grey darken-1" dark max-height="65">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Bienvenido</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="$store.state.token !== ''"
        @click="salir()"
        class="grey darken-1"
      >
        SALIR</v-btn
      >
      <v-icon>mdi-menu-rightw</v-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-grey darken-1--text text--accent-4"
        >
          <v-card class="mx-auto" width="300">
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-group :value="false">
                <template v-slot:activator>
                  <v-list-item-title>Almacen</v-list-item-title>
                </template>

                <v-list-item
                  v-for="([title, icon, ruta], i) in admins"
                  :key="i"
                  link
                  :to="ruta"
                >
                  <v-list-item-title v-text="title"></v-list-item-title>
                  <v-list-item-icon>
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>

              <v-list-group :value="false">
                <template v-slot:activator>
                  <v-list-item-title>Compras</v-list-item-title>
                </template>

                <v-list-item
                  v-for="([title, icon, ruta], i) in compras"
                  :key="i"
                  link
                  :to="ruta"
                >
                  <v-list-item-title v-text="title"></v-list-item-title>
                  <v-list-item-icon>
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>

              <v-list-group :value="false">
                <template v-slot:activator>
                  <v-list-item-title>Ventas</v-list-item-title>
                </template>

                <v-list-item
                  v-for="([title, icon, ruta], i) in ventas"
                  :key="i"
                  link
                  :to="ruta"
                >
                  <v-list-item-title v-text="title"></v-list-item-title>
                  <v-list-item-icon>
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>

              <v-list-group :value="false">
                <template v-slot:activator>
                  <v-list-item-title>Accesos</v-list-item-title>
                </template>
                <v-list-item
                  v-for="([title, icon], i) in accesos"
                  :key="i"
                  link
                  to=""
                >
                  <v-list-item-title v-text="title"></v-list-item-title>
                  <v-list-item-icon>
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>

              <v-list-group :value="false">
                <template v-slot:activator>
                  <v-list-item-title>consultas</v-list-item-title>
                </template>
                <v-list-item
                  v-for="([title, icon], i) in consultas"
                  :key="i"
                  link
                >
                  <v-list-item-title v-text="title"></v-list-item-title>
                  <v-list-item-icon>
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
      open: ["Almacen"],
      admins: [
        ["Categorias", "mdi-format-list-bulleted-type", "/categorias"],
        ["Articulos", "mdi-playlist-plus", "/articulos"],
      ],
      compras: [
        ["Ingresos", "mdi-currency-usd", "/ingresos"],
        ["proveedores", "mdi-account-multiple", "/proveedores"],
      ],
      ventas: [
        ["Ventas", "mdi-chart-line-variant", "/ventas"],
        ["Clientes", "mdi-account-multiple", "/clientes"],
      ],
      accesos: [["Usuarios", "mdi-account-multiple-plus"]],

      consultas: [
        ["Cosulta Compras", "mdi-cart", "/compras"],
        ["Consulta Ventas", "mdi-cart"],
      ],
    };
  },

  methods: {
    salir() {
      this.$swal({
        title: "¿Estas seguro de  salir?)",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Salir",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("setToken", "");
          this.$router
            .replace("/")
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          this.$swal.fire({
            posicion: "center",
            text: "¡ Vuelve a iniciar sesion! ",
            icon: "success",
            timer: 1000,
          });
        }
      });
    },
  },
};
</script>
