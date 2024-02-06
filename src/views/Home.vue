<template>
  <div class="container-fluid d-flex align-items-center justify-content-center vh-100">
    <div class="text-center">
      <h1 class="mb-5">! Bienvenidos ! <br/> al concurso de Imágenes del Mundo</h1>
      <a class="btn btn-success mt-5" @click="rules">Empezar</a>
    </div>
  </div>
</template>


<script>
import Swal from 'sweetalert2';

export default {
  methods: {
    rules() {
      Swal.fire({
        title: 'Concurso Imágenes del Mundo',
        icon: "info",
        html: '1. Ingresa una palabra sobre la cual deseas consultar imágenes <br/>2. Los vendedores te mostrarán imágenes relacionadas a la palabra <br/>3. Selecciona la imagen que más te guste y se le otorgarán 3 puntos al vendedor <br/>4. El vendedor que complete 20 puntos ganará',
        confirmButtonColor: "#198754",
        confirmButtonText: "Empezar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: "Contest" });
        }
      });
    },
  },
};


</script>

<style scoped>

</style>