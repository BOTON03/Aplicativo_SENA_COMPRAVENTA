<template>
  <v-footer blue color="grey darken-1" class="footer">
    <v-col class="text-center white--text" cols="12">
      {{ new Date().getFullYear() }} —
      <strong>Jhoan Sebastian Rueda Monsalve</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {};
</script>
<style scoped>
.footer {
  width: 100%;
  z-index: 20;
  position: fixed;
  bottom: 0px;
  justify-content: center;
}
</style>
