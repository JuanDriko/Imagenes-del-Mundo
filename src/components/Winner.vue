<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center">
      <h1>Felicitaciones</h1>
      <div class="card bg-light" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">El ganador es <br/>{{ winner.name }} con 21 puntos</h5>
          <p class="card-text">Puntos otorgados en total: {{ winner.score }}</p>
          
        </div>
        <button class="btn btn-success m-3" @click="sendInvoice">Generar Factura del ganador</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { generateInvoice } from "@/services/services";

export default {
  props: {
    winner: Object,
    globalScore: Number,
  },
  methods: {
    async sendInvoice() {
      try {
        const invoiceData = await generateInvoice(this.winner);
        console.log('Datos de la factura:', invoiceData);

        Swal.fire({
          icon: "success",
          title: "Factura guardada exitosamente",
          confirmButtonColor: "#198754",
          confirmButtonText: "Aceptar",
          html: `
          <p><strong>ID Cliente:</strong> ${invoiceData.client.id}</p>
          <p><strong>ID Vendedor:</strong> ${invoiceData.seller.id}</p>
          <p><strong>Nombre de vendedor:</strong>${invoiceData.seller.name}</p>
          <p><strong>Descripción:</strong> ${invoiceData.items[0].description}</p>
          <p><strong>Cantidad:</strong> ${invoiceData.items[0].quantity}</p>
          <p><strong>Precio:</strong> ${invoiceData.items[0].price}</p>
          <p><strong>Fecha:</strong> ${invoiceData.date}</p>
          <p><strong>Fecha de vencimiento:</strong> ${invoiceData.dueDate}</p>           
          <p><strong>Factura # </strong> ${invoiceData.numberTemplate.number}</p>
          <p><strong>Total:</strong> ${invoiceData.total}</p>
          <h6><strong>Mírala en la app de Alegra</strong></h6>`,
          allowOutsideClick: false,          
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({name: "Home"})
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No fue posible guardar la factura",
        });
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
</style>
