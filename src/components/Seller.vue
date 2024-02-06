<template>
    <div class="container text-center mt-3 ">
        <div class="card bg-light shadow" style="width: 20rem">
          <img :src="competitor.image" class="card-img-top img-fluid" alt="imagen" style="height: 350px;">
          <div class="card-body">
            <h5 class="card-title">{{ competitor.name }}</h5>
            <p class="card-text">Puntos  <br/> {{ competitor.score }}</p>
            <p>{{ 20 - competitor.score }} restantes para ganar</p>
            <a @click="plus" class="btn btn-success shadow">Me gusta</a>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      competitor: Object,
    },
    methods:{
        plus(){
            this.$emit('plusScore')
        }        
    }
  };
  </script>

<style scoped>
</style>