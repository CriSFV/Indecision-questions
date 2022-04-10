<template>
<div>
  <h2> {{customTitle}} </h2>
  <p data-testid="counter"> {{counter}} </p> 
  <!-- // data-testid->es atributo que hemos puesto para localizarlo en el test -->
  <p>{{counter}}  <sup>2</sup> = {{squarecounter}} </p> 


  <div class="btn">
    <button @click="increase">+1</button>
    <button @click="decrease" data-testid="decreaseBtn">-1</button>
  </div>
</div>

</template>

<script>
export default {
    name:'Counter',
    props: {
      title: String,
      start: {
        type:Number,
        default:100,
        validatos(value){
          return value >= 0 
        }
        },
    },

    data(){
        return{
            counter:this.start,
        }
    },
    methods:{
      getSquareValue(){
        return this.counter*this.counter
      },
      increase(){
        this.counter++
      },
      decrease(){
        this.counter--
      }
    },
    computed:{
      // se guardan en el cache
      squarecounter (){
        return this.counter*this.counter
      },
      customTitle(){
          return this.title || 'Counter'
          // this.title ? this.title : 'Counter' // // esta es otra manera de hacer que si no hay title, ponga counter
      }
    }
}
</script>

<style>

  button{
    background-color: #64bb87;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
  }
  button:hover{
    background-color: #5aa67b;
    transition: 0.3s ease-in-out;
  }

</style>