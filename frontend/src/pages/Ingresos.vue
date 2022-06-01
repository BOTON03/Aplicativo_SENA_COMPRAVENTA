  <template>
  <div>
    <!--mi tabla principal-->
    <v-data-table
      :headers="headers"
      :items="ventas"
      :items-per-page="20"
      class="elevation-1 pa-2 ma-2"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Ingresos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              class="pa-md-4 mx-lg-auto"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <!-- 
            modal nueva factura -->
          <v-btn
            color="grey darken-1"
            dark
            class="pt-0 my-0"
            @click="nuevaFactura(item)"
          >
            Nueva Ingreso
          </v-btn>
          <v-dialog persistent v-model="dialog" max-width="75%">
            <v-card>
              <v-card-title>
                <span class="headline font-weight-black grey darken-1--text">{{
                  formTitle
                }}</span>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-btn v-if="btnPDF === true" @click="alerta()">
                  <v-icon color="error">mdi-printer </v-icon></v-btn
                >

                <v-spacer></v-spacer>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" :disabled="isDisabled">
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.usuario.nombre"
                          label="Usuario"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.cliente.nombre"
                          label="Proveedor"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.tipoComprobante"
                          label="Tipo comprobante"
                          type="text"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.serieComprobante"
                          label="Serie comprobante"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.numcomprobante"
                          label="Numero comprobante"
                          type="number"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.impuesto"
                          label="Impuesto"
                          type="number"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>

                  <v-btn
                    color="grey darken-1"
                    class="hidden-xs-only text-while"
                    v-if="btnAgregar === true"
                    @click="modalAgregar()"
                  >
                    Agregar Productos
                  </v-btn>

                  <v-card-title>
                    <span class="text-h5">{{ titulo }}</span>
                    <v-spacer></v-spacer>
                  </v-card-title>

                  <v-spacer></v-spacer>

                  <!-- modal agregar productos a factura -->

                  <v-dialog
                    transition="dialog-top-transition"
                    width="70%"
                    persistent
                    v-model="btnModal"
                    style="min-height: 100vh"
                  >
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar color="grey darken-1" class="while--text"
                          >Agregar productos</v-toolbar
                        >
                        <!-- tabla que muestra los productos que puedo agregar -->
                        <v-data-table
                          :headers="encabezado"
                          :items="articulos"
                          :items-per-page="10"
                          class="elevation-0"
                        >
                          <!-- EL BOTON DE SUMAR -->
                          <template v-slot:[`item.action`]="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="seleccionarArticulo(item)"
                            >
                              mdi-plus-circle
                            </v-icon>
                          </template>
                        </v-data-table>

                        <v-card-actions class="justify-end">
                          <v-btn text @click="dialog.value = false"
                            >Close</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>

                  <!-- tabla de detalle de nueva factura -->
                  <v-card>
                    <v-card-title>
                      <v-toolbar
                        color="grey darken-1"
                        class="white--text"
                        flat
                        dense
                        width="100%"
                        elevation="10"
                        shaped
                        ><p
                          :class="{
                            'caption font-weight-black mx-auto mt-3':
                              $vuetify.breakpoint.xs,
                            'mx-auto mt-3 font-weight-medium':
                              $vuetify.breakpoint.smAndUp,
                          }"
                        >
                          Lista de Productos
                        </p></v-toolbar
                      >
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                        :headers="
                          show
                            ? encabezadoDescripcion
                            : encabezadoDescripcionSin
                        "
                        :items="nuevosProductos"
                        :items-per-page="15"
                        max-width="90%"
                        class="elevation-0 pt-0 my-2"
                        persistent
                      >
                        <template
                          v-if="textCantidad === true"
                          v-slot:[`item.cantidad`]="{ item }"
                        >
                          <v-text-field
                            type="number"
                            v-model="item.cantidad"
                            @change="onChange(item)"
                          >
                          </v-text-field>
                        </template>

                        <template v-slot:[`item.subtotal`]="{ item }">
                          {{ item.subtotal }}
                        </template>

                        <template v-slot:[`item.acciones`]="{ item }"
                          ><div>
                            <v-icon @click="eliminarProducto(item)">
                              mdi-delete {{ item.action }}
                            </v-icon>
                          </div>
                        </template>
                      </v-data-table>
                    </v-card-text>
                    <v-card-actions> </v-card-actions>
                  </v-card>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <!--- AGREGAR PRODUCTOS--->
                <v-btn
                  color="grey darken-1"
                  v-if="btnCancelar == true"
                  text
                  @click="close"
                >
                  {{ btc }}
                </v-btn>

                <v-btn
                  color="grey darken-1"
                  text
                  v-if="btnGuardar == true"
                  @click="Guardar()"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
        <v-icon @click="activ(item)">
          {{ item.estado === 1 ? "mdi-cancel " : "mdi-check" }}
        </v-icon>
      </template>

      <template v-slot:[`item.estado`]="{ item }">
        <span
          v-bind:class="[item.estado === 1 ? 'primary--text ' : 'red--text']"
        >
          {{ item.estado === 1 ? "Activo" : "Inactivo" }}
        </span>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    btnModal: false,
    show: false,
    b: null,
    id: "",
    search: "",
    estado: "",
    cantidad: 0,
    textCantidad: true,
    textAcciones: true,
    textDescuento: true,
    btnPDF: true,
    titulo: "",
    btnAgregar: true,
    btnCancelar: true,
    btnGuardar: true,
    btc: "CANCELAR",
    isDisabled: false,

    articulos: [],
    clientes: [],

    nuevosProductos: [],

    dialogDelete: false,
    dialogText: "",
    encabezadoDescripcion: [
      { text: "Nombre", value: "nombre" },
      { text: "Precio", value: "precio" },
      { text: "Cantidad", value: "cantidad", align: "center" },

      { text: "Subtotal", value: "subtotal" },
      { text: "Acciones", value: "acciones" },
    ],
    encabezadoDescripcionSin: [
      { text: "Nombre", value: "nombre" },
      { text: "Precio", value: "precio" },
      { text: "Cantidad", value: "cantidad", align: "center" },

      { text: "Subtotal", value: "subtotal" },
    ],
    productosDescripcion: [],
    productosAgregar: [],
    encabezadoAgregar: [
      { text: "Nombre", value: "nombre" },
      { text: "Precio", value: "precio" },
      { text: "Acciones", value: "acciones" },
    ],

    encabezado: [
      { text: "Nombre", value: "nombre" },
      { text: "Precio Venta", value: "precioVenta" },
      { text: "Stock", value: "stock" },
      { text: "Actions", value: "action", sortable: false },
    ],

    headers: [
      { text: "Estado", value: "estado" },
      { text: "Usuario", value: "usuario.nombre" },
      { text: "Proveedor", value: "cliente.nombre" },
      { text: "Tipo Comprobante", value: "tipoComprobante" },
      { text: "Serie comprobante", value: "serieComprobante" },
      { text: "Numero comprobante", value: "numComprobante" },
      { text: "Fecha", value: "fecha" },
      { text: "Impuesto", value: "impuesto" },
      { text: "Total", value: "total" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    ventas: [],
    editedIndex: -1,
    editedItem: {
      usuario: "",
      cliente: "",
      tipoComprobante: "",
      serieComprobante: "",
      numComprobante: "",
      impuesto: "",
      total: "",
      estado: "",
    },
    defaultItem: {
      usuario: "",
      cliente: "",
      tipoComprobante: "",
      serieComprobante: "",
      numComprobante: "",
      impuesto: "",
      total: "",
      estado: "",
    },
  }),

  computed: {
    subtotal() {
      this.detalles.map((detalle) => (this.subt += detalle.subtotal));
      return this.subt;
    },
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo ingreso" : "Visualización";
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.traer();
    this.traerCliente();
    this.traerUsuario();
    this.traerArticulos();
  },

  methods: {
    Guardar() {
      let header = { headers: { "x-token": this.$store.state.token } };

      axios
        .post(
          "venta",
          {
            usuario: this.usuario,
            cliente: this.cliente,
            tipoComprobante: this.tipoComprobante,
            serieComprobante: this.serieComprobante,
            numComprobante: this.numComprobante,
            fecha: this.fecha,
            impuesto: this.impuesto,
            total: this.total,
            nombre: this.nombre,
            precio: this.precio,
            cantidad: this.cantidad,
            descuento: this.descuento,
          },
          header
        )
        .then((response) => {
          console.log(response);

          this.$swal({
            position: "center",
            icon: "success",
            title: "REGISTRO GUARDADO CON EXITO",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    onChange(item) {
      item.subtotal = item.precio * item.cantidad;
      this.subt = 0;
    },

    eliminarProducto(item) {
      this.id = item._id;
    },

    seleccionarArticulo(item) {
      console.log(item.nombre);
      let indice = this.nuevosProductos.findIndex(
        (nuevosProductos) => nuevosProductos.nombre === item.nombre
      );
      if (this.nuevosProductos.length === 0) {
        this.nuevosProductos.push({
          _id: item._id,
          nombre: item.nombre,
          precio: item.precioVenta,
          stock: 0,
          subtotal: 0,
        });
      } else if (indice === -1) {
        this.nuevosProductos.push({
          _id: item._id,
          nombre: item.nombre,
          precio: item.precioVenta,
          stock: 0,
          subtotal: 0,
        });
      } else {
        this.$swal({
          position: "center",
          icon: "success",
          title: "Ya seleccionaste este producto",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

    activ(item) {
      this.id = item._id;
      this.estado = item.estado;

      if (this.estado === 1) {
        let header = { headers: { "x-token": this.$store.state.token } };
        axios
          .put(
            `venta/desactivar/${this.id}`,
            {
              estado: 0,
            },
            header
          )
          .then((response) => {
            console.log(response);

            this.traerCliente();
            this.traerUsuario();
            this.traer();
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        let header = { headers: { "x-token": this.$store.state.token } };
        axios
          .put(
            `venta/activar/${this.id}`,
            {
              estado: 1,
            },
            header
          )
          .then((response) => {
            console.log(response);
            this.traerCliente();
            this.traerUsuario();
            this.traer();
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },

    editItem(item) {
      this.dialog = true;
      this.b = 2;
      this.id = item._id;
      this.editedItem.usuario = item.usuario.nombre;
      this.editedItem.cliente = item.cliente.nombre;
      this.editedItem.tipoComprobante = item.tipoComprobante;
      this.editedItem.serieComprobante = item.serieComprobante;
      this.editedItem.numComprobante = item.numComprobante;
      this.editedItem.impuesto = item.impuesto;
      this.editedItem.total = item.total;
      this.editedItem.fecha = item.fecha;
    },

    traerUsuario() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .get("login", header)
        .then((response) => {
          console.log(response.data.login);
          response.data.login.map((x) => {
            this.login.push({
              text: x.nombre,
              value: x._id,
            });
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    traerCliente() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .get("cliente", header)
        .then((response) => {
          response.data.cliente.map((x) => {
            this.cliente.push({
              text: x.nombre,
              value: x._id,
            });
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    traerArticulos() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .get("articulo", header)
        .then((response) => {
          this.articulos = response.data.articulo;
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    traer() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .get("venta", header)
        .then((response) => {
          console.log(response);
          this.ventas = response.data.venta;
          this.traerUsuario();
          this.traerCliente();
          this.traerArticulos();
          console.log(this.ventas);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    mostrar(item) {
      console.log(this.cantidad);
      console.log(item.productosDescripcion);
    },
    modalAgregar() {
      this.btnModal = true;
    },
    nuevaFactura(item) {
      this.show = true;
      this.textCantidad = true;
      this.textAcciones = true;
      this.dialog = true;
      this.btnPDF = false;
      this.isDisabled = false;
      this.btc = "CANCELAR";
      this.btnGuardar = true;
      this.btnCancelar = true;
      this.btnAgregar = true;
      this.dialog = true;
      this.b = 2;
      this.id = item._id;
      this.editedItem.usuario = item.usuario.nombre;
      this.editedItem.cliente = item.cliente.nombre;
      this.editedItem.tipoComprobante = item.tipoComprobante;
      this.editedItem.serieComprobante = item.serieComprobante;
      this.editedItem.numComprobante = item.numComprobante;
      this.editedItem.impuesto = item.impuesto;
      this.editedItem.total = item.total;
      this.editedItem.fecha = item.fecha;
    },

    infoItem(item) {
      this.show = false;
      this.btc = "SALIR";
      this.btnPDF = true;
      this.btnAgregar = false;
      this.btnCancelar = true;
      this.btnGuardar = false;
      this.textCantidad = false;
      this.textAcciones = false;
      this.isDisabled = true;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;

      item.productosFactura.map((x) => {
        this.productosDescripcion.push({
          nombre: x.nombre,
          descripcion: x.descripcion,
          precio: x.precio,
          cantidad: x.cantidad,
          subtotal: x.cantidad * x.precio,
        });
      });
    },
    deleteItem(item) {
      this.id = item._id;
      this.dialogDelete = true;
      this.$swal({
        title: "¿Estas Seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete!",
        cancelButtonText: "Cancel!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          let header = { headers: { "x-token": this.$store.state.token } };
          axios
            .delete(`venta/${this.id}`, header)
            .then((response) => {
              console.log(response);
              this.traerArticulos();
              this.traerUsuario();
              this.traerCliente(), this.traer();
            })
            .catch((error) => {
              console.log(error);
            });
          this.$swal.fire({
            text: "¡ El producto se ha eliminado exitosamente! ",
            icon: "success",
            timer: 1000,
          });
        }
      });
    },

    deleteItemConfirm(item) {
      this.desserts.splice(this.editedIndex, 1);
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.closeDelete();
    },

    close() {
      this.dialog = false;

      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.isDisabled = false;

      this.productosDescripcion = [];
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({});
        this.editedIndex = -1;
      });
    },
  },
};
</script>
<style scoped>
#modalProductos {
  margin-right: 900px;
}
</style>