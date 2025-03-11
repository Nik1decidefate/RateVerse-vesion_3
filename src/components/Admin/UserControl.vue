<template>
    <div style="margin-top:120px;">
       <h1>Игры</h1>
       <div className="divAll">
         <div v-for="(game, index) in gameinput" :key="index" className="divgame">
           <!-- Предположим, что изображение передается как base64 строка -->
           <img :src="getImgSrc(game.ImageP)" alt="Изображение не найдено" className="img">
           <h4>{{ game.Project1 }}</h4>
           <div className="publish_rate">
               <p v-if="game.IdPublisherNavigation">{{ game.IdPublisherNavigation.Publisher1 }}</p>
               <h4 className="rate">{{ game.Rate }}</h4>
           </div>
         </div>
       </div>
     </div>
   </template>
   <script>
       import axios from 'axios'
       export default{
           props:{
               gameinput: {
                   type:Array,
                   Required: true
               }
           },
           data(){
               return {
                   userinput: []
               }
           },
           methods: {
               async ShowGame() {
                   try {
                       const response = await axios.get('http://localhost:5235/ShowAllGame')
                       if (response.data) {
                           console.log("Успешно!")
                       // Преобразование JSON строки в объекты
                           this.gameinput = response.data;
                       }
                   } catch (error) {
                       console.error('Ошибка при выполнении запроса:', error)
                   }
               }, 
               getImgSrc(base64Data) {
               if (!base64Data) return ''
               return `data:image/png;base64,${base64Data}`
               }
           },
           mounted() {
               this.ShowGame();
           }
               
       }
   </script>
   <style scoped>
   .divAll {
       display: flex;
       flex-wrap: wrap; 
   }
   .divgame{
       padding: 2px;
       border: 0.1px solid black;
       border-radius: 20px;
       margin: 0px 5px;
       width: 300px;
       display:flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       height: auto;
   }
   .publish_rate{
       display: flex;
       align-items: center;
   }
   .rate {
       margin: 0 0 0 5px;
   }
   .img{
       max-width: 300px;
       max-height: 200px;
   }
   </style>