<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <Indecision/>
  <!-- <Counter title="Entraron" :start="10"/>
  <Counter title="Nuevo" :start="0"/>
  <Counter /> -->
  
</template>

<script>

// import Counter from '@/components/Counter.vue'
import Indecision from '@/components/Indecision.vue'

export default {
  name: 'App',
  components:{
   // Counter,
    Indecision
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
