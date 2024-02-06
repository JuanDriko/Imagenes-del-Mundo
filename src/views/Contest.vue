<template>
  <div>
    <div v-if="!getWinner()" class="mt-5">
      <div class="container-fluid" v-if="button">
        <transition name="fade-slide" appear class="d-flex align-items-center justify-content-center" v-for="competitor in competitors" :key="competitor.id">
          <h5 class="c-light">
            Puntos de {{ competitor.name }} : {{ competitor.score }}
          </h5>
        </transition>
        <transition name="fade-slide" appear>
          <Search @searchCollections="searchCollections" />
        </transition>

        <transition>
          <div v-if="msg" class="col-3 m-auto bg-danger rounded-bottom text-center">
            <i class="fas fa-exclamation-circle"></i>
            <p class="ms-2">Palabra no encontrada, inténtelo de nuevo</p>
          </div>
        </transition>
      </div>

      <div v-else>
        <h2 class="text-center">Ronda {{ round }}</h2>
        <div class="d-flex">
          <transition name="fade-slide" appear v-for="competitor in competitors" :key="competitor.id">
            <Seller :competitor="competitor" @plusScore="plusScore(competitor.id)" />
          </transition>
        </div>
      </div>
    </div>

    <transition name="fade-slide" appear>
      <Winner v-if="getWinner()" :winner="winner" />
    </transition>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Search from "../components/Search.vue";
import Winner from "../components/Winner.vue";
import Seller from "../components/Seller.vue";
import { getAlegraSellers, searchImages } from "@/services/services";

export default {
  components: {
    Search,
    Seller,
    Winner,
  },
  data() {
    return {
      button: true,
      msg: false,
      competitors: [],
      winner: null,
      globalScore: 0,
      round: 0,
    };
  },
  mounted() {
    this.getSellers();
  },
  methods: {
    async getSellers() {
      try {
        const sellers = await getAlegraSellers();
        console.log(sellers);
        sellers.forEach((seller) => {
          const contestant = {
            id: seller.id,
            name: seller.name,
            identification: seller.identification,
            image: "",
            score: 0,
          };
          this.competitors.push(contestant);
        });
        console.log("competidores", this.competitors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async searchCollections(query) {
      try {
        const collections = await searchImages(query);
        if (collections && collections.length > 0) {
          this.competitors.forEach((competitor, index) => {
            competitor.image = collections[index].cover_photo.urls.regular;
          });
          this.getWinner();
          this.button = false;
          this.round += 1;
        } else {
          console.log("No se encontraron imágenes para la búsqueda.");
          this.msg = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    plusScore(id) {
  const competitor = this.competitors[id - 1];
  Swal.fire({
    icon: "success",
    text: `3 puntos otorgados a ${competitor.name}`,
    confirmButtonColor: "#198754",
    confirmButtonText: "Continuar",
    allowOutsideClick: false,
  }).then(() => {
    competitor.score += 3;
    console.log("Score", this.competitors);
    this.globalScore += 3;
    this.button = true;
    this.msg = false;
  });
},
    getWinner() {
      const theWinner = this.competitors.find(
        (competitor) => competitor.score > 20
      );
      if (theWinner) {
        this.winner = theWinner;
        this.winner.score = this.globalScore;
        console.log("scoreGlobal", this.winner.score);
      }
      return theWinner;
    },
  },
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
