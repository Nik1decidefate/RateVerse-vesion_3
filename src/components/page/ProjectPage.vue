<script>
import axios from 'axios';

export default {
  data() {
      return {
        content: [],
        projectmas: [],
        contentItem: '',
        userId: [],
        comments: [],
        newComment: [],
        popularGames: [],
      }
  },
  methods: {
    async contentIn() {
      this.projectmas = JSON.parse(sessionStorage.getItem('selectionProject'))
      this.userId = JSON.parse(sessionStorage.getItem('username'))
      const response = await axios.get('http://localhost:5235/GetpContent', {
        params: {
          id: this.projectmas.IdProject,
        }
      })
      if (response.data) {
        this.content = response.data
        this.contentItem = response.data[0]
      }
    },

    inputItem(item){
      console.log(this.contentItem, item)
      this.contentItem = item
    },

    // Загрузка коментариев
    async fetchComments() {
      const response = await axios.get('http://localhost:5235/ShowCommentP', {
        params: {
          id: this.projectmas.IdProject
        }
      })
      if (response.data) {
        this.comments = response.data
        console.log(this.comments);
      }
      const response1 = axios.get('http://localhost:5235/ShowPopularP', {
        params: {
          id: this.projectmas.IdTproject,
          idp: this.projectmas.IdProject
        }
      })
      if (response1.data) {
        this.popularGames = response1.data
        console.log(this.popularGames);
      }
    },

    // добавление коментария


    addComment() {
      if (!this.userId.iduser || !this.newComment.rating || !this.newComment.text) {
        alert('Заполните все поля!')
        return
      }
      const now = new Date()
      this.comments.push({
        iduser: this.userId.iduser, // Можно заменить на реальный ID пользователя
        comment: this.newComment.text,
        rate: this.newComment.rating,
        datepublish: now.toISOString(),
      })

      // Сброс формы
      this.newComment.text = ''
    },

    // Загрузка популярного контента
    pls(){
      const response = axios.get('http://localhost:5235/ShowPopularP', {
        params: {
          id: this.projectmas.IdTproject,
          idp: this.projectmas.IdProject
        }
      })
      if (response.data) {
        this.popularGames = response.data
        console.log(this.popularGames);
      }
    },
  },
  mounted(){
    this.contentIn(),
    this.fetchComments(),
    this.pls()
  }
}
</script>

<template>
    <div style="margin-top:120px; flex-direction: column;">
      <!-- Название проекта -->
      <h1>{{ projectmas.Project1 || 'Проект' }}</h1>
      <!-- Основной контейнер -->
      <div class="maindiv">
        <!-- Div c медиавитриной и плеером -->
        <div class="projdiv">
          <!-- Плеер -->
          <div className="img_video">
            <video v-if="contentItem && contentItem.TypeContent === 'video'" :src="contentItem.ContentFile" controls />
            <img v-else-if="contentItem && contentItem.TypeContent === 'image'" :src="contentItem.ContentFile" alt="Main Display" />
          </div>
          <!-- Медиавитрина -->
          <div class="content">
            <div v-for="(item, index) in content" :key="index" @click="inputItem(item)" class="s">
              <img v-if="item && item.TypeContent === 'image'" :src="item.ContentFile"  alt="Thumbnail" />
              <video v-else-if="item && item.TypeContent === 'video'" :src="item.ContentFile" controls />
            </div>
          </div>
          <div className="commentDivs">
            <form @submit.prevent="addComment">
              <label for="rating">Оценка (1-10):</label>
              <input type="number" id="rating" v-model.number="newComment.rating" min="1" max="10" required />

              <label for="text">Комментарий:</label>
              <textarea id="text" v-model="newComment.text" required></textarea>

              <button type="submit">Оставить отзыв</button>
            </form>
            <div className="commentList">
              <div className="itemcomment" v-for="(i, index) in comments" :key="index">
                <h5>{{ i.iduser }}</h5>
                <h4>{{ i.comment }}</h4>
                <h6>{{ i.datepublish }}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="oc">
          <h2>Популярное</h2>
          <div v-for="(game, index) in popularGames" :key="index" class="s">
            <img :src="game.ImageP" alt="Game Thumbnail" />
            <p>{{ game.Project1 }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
    div {
      margin: 10px;
      border: 1px solid black;
      display: flex;
      border-radius: 20px;
    }
    .maindiv {
      flex-direction: row;
      width: 98%;
      height: auto;
    }
    .projdiv {
      width: 70%;
      height: auto;
      flex-direction: column;
    }
    .img_video {
      position: relative;
      width: auto;
      height: 400px;
      margin-bottom: 0;
    }
    .img_video img, .img_video video {
      width: 100%; /* Занимает всю доступную ширину родительского контейнера */
      height: auto; /* Сохраняет пропорции */
      display: block; /* Убирает лишние пробелы под медиа */
      object-fit: contain; /* Для видео и изображений — сохранение пропорций */
      border-radius: 20px;
      margin: 1px;
    }
    .content {
      margin-top: 0;
      height: 100px;
      display: flex;
      overflow-x: auto;
    }
    .oc {
      width: 25%;
      display: flex;
      flex-direction: column;
    }
    .s{
      position: relative;
    }
    .s video, .s img {
      width: 100%; /* Занимает всю доступную ширину родительского контейнера */
      height: auto; /* Сохраняет пропорции */
      display: block; /* Убирает лишние пробелы под медиа */
      object-fit: contain; /* Для видео и изображений — сохранение пропорций */
      border-radius: 20px;
      margin: 1px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border-color 0.3s;
    }
    .s img:hover {
      border-color: #c7d5e0;
    }
    .s video:hover {
      border-color: #c7d5e0;
    }
    .commentList{
      display: flex;
      flex-direction: column;
    }
    .commentList div {
      width: 100px;
    }
    .commentDivs {
      display: flex;
      flex-direction: column;
    }
    .itemcomment {
      width: 4px;
      flex-direction: column;
    }

  </style>
  