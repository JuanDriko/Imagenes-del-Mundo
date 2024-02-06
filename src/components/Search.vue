<template>
  <div class="">
    <div class="container-fluid m-auto">    
    <h2 class="text-center m-5">Ingresa una palabra</h2>
      <form @submit.prevent="searchI" class="container-fluid col-3 d-flex" role="search">
        <input type="text" v-model="query" class="form-control me-2"/>
        <button type="submit" class="btn btn-outline-success"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form></div>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        query: '',
      };
    },
    methods: {
      searchI() {
        this.$emit('searchCollections', this.query);
        this.query = ""
      },
    },
  };
  </script>
  <style ></style>