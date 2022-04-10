<template>
<div>
     <img v-show="img" :src="img">
  <div class="bg-dark"></div>
  <div class="indecision-container">
      <input type="text" placeholder="Realiza una pregunta" v-model="question">
      <p>Recuerda terminar con un signo de interrogación (?)</p>
      <div v-if="isValidQuestion">
          <h2>{{ question }}</h2>
          <!-- <h1 v-if="answer==='yes'"> Si </h1>
          <h1 v-else> {{answer}} </h1> -->
          <h1 > {{answer}} </h1>
      </div>
  </div>
</div>
 
</template>

<script>
export default {
    name: 'Indecision',
    data(){
        return {
            question:'',
            answer: null,
            img: '',
            isValidQuestion:false
        }
    },
    methods:{
        async getAnswer(){

            try{
                this.answer='Pensando...'
                const lang = {
                    yes: 'Si!',
                    no: 'No!',
                    maybe: 'Quizás...'
                }
                const {answer, image} = await fetch('https://yesno.wtf/api').then(response=> response.json())
       
                this.answer = lang[answer] 
                this.img = image
            }  catch(error){
                console.log('IndecisionConsoleComponent Error', error)
                this.answer = 'No se pudo cargar la respuesta del API'
                this.img = null
            }  
        }
  
    },
    watch:{
        question(value, oldValue){
            this.isValidQuestion=false
            console.log({value}, 'console.log de componente')

            if( value.includes('?') ){
                this.isValidQuestion=true
                this.getAnswer()
            }

        }
    }

}
</script>


<style scoped>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 30px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>