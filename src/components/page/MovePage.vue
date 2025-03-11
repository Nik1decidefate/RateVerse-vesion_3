<template>
    <div style="margin-top:120px;">
       <h1>Фильмы</h1>
       <div className="divAll" v-show="moveinput">
         <div v-for="(move, index) in moveinput" :key="index" className="divgame" @click="projectview(move)">
           <!-- Предположим, что изображение передается как base64 строка -->
           <img :src="move.ImageP" alt="Изображение не найдено" className="img">
           <h4>{{ move.Project1 }}</h4>
           <div className="publish_rate">
               <p v-if="move.IdPublisherNavigation">{{ move.IdPublisherNavigation.Publisher1 }}</p>
               <h4 className="rate">{{ move.Rate }}</h4>
           </div>
         </div>
       </div>
     </div>
   </template>
   <script>
       import axios from 'axios'
       export default{
           data(){
               return {
                   moveinput: []
               }
           },
           methods: {
               async ShowMove() {
                   try {
                       const response = await axios.get('http://localhost:5235/ShowAllMove')
                       if (response.data) {
                           console.log("Успешно!", Date.now())
                           this.moveinput = response.data;
                       }
                   } catch (error) {
                       console.error('Ошибка при выполнении запроса:', Date.now(), error)
                   }
               },
               projectview(move){
                   sessionStorage.setItem('selectionProject', JSON.stringify(move));
                   this.$router.push('/project')
               },
           },
           mounted() {
               this.ShowMove();
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