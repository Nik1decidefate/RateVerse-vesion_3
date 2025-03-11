<script>
import axios from "axios";

export default {
  data() {
    return {
      groupedComments: {}, // Группированные комментарии
      loading: true, // Флаг загрузки
    };
  },
  methods: {
    // Загрузка комментариев
    async fetchComments() {
      try {
        const response = await axios.get("http://localhost:5235/GetRecentComment");
        this.groupedComments = response.data; // Сохраняем полученные комментарии
      } catch (error) {
        console.error("Ошибка при загрузке комментариев:", error);
        alert("Не удалось загрузить комментарии. Попробуйте позже.");
      } finally {
        this.loading = false; // Отключение индикатора загрузки
      }
    },

    // Форматирование даты
    formatDate(date) {
      return new Date(date).toLocaleString();
    },

    // Пометка комментария как прочитанного
    async markAsRead(commentText, projectName) {
      try {
        if (!confirm("Вы уверены, что хотите пометить этот комментарий как прочитанный?")) {
          return;
        }

        // Отправка запроса на сервер
        await axios.put('http://localhost:5235/MarkAsRead', null, {
          params: { comment: commentText, projectName: projectName }
        });

        // Обновление списка комментариев
        this.fetchComments();
      } catch (error) {
        alert("Ошибка при обновлении статуса комментария.");
      }
    },

    // Удаление комментария
    async deleteComment(commentText, projectName) {
      try {
        if (!confirm("Вы уверены, что хотите удалить этот комментарий?")) {
          return;
        }

        await axios.delete('http://localhost:5235/DeleteComment/', {
          params: {
            comment: commentText, projectName: projectName
          }
        });
        this.fetchComments();
      } catch (error) {
        alert("Ошибка при удалении комментария.");
      }
    },
  },
  mounted() {
    this.fetchComments(); // Загружаем комментарии при монтировании компонента
  },
};
</script>

<template>
  <div class="recent-comments">
    <h1>Недавние комментарии</h1>

    <!-- Индикатор загрузки -->
    <div v-if="loading" class="loading">Загрузка...</div>

    <!-- Если комментариев нет -->
    <div v-else-if="!groupedComments || Object.keys(groupedComments).length === 0" class="no-comments">
      Нет новых комментариев за последние 3 дня.
    </div>

    <!-- Список проектов -->
    <div v-else class="projects">
      <div v-for="(comments, projectName) in groupedComments" :key="projectName" class="project">
        <h2>{{ projectName }}</h2>
        <ul class="comment-list">
          <li v-for="comment in comments" :key="comment.iduser" class="comment-item">
            <strong>{{ comment.comment }}</strong>
            <span>(Дата: {{ formatDate(comment.datepublish) }})</span>

            <!-- Пометить как прочитанное -->
            <button @click="markAsRead(comment.comment, projectName)" v-if="!comment.isread">
              Пометить как прочитанное
            </button>

            <!-- Удалить комментарий -->
            <button @click="deleteComment(comment.comment, projectName)">
              Удалить
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

  <style scoped>
.recent-comments {
    margin-top: 10%;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.projects {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.comment-list {
  list-style-type: none;
  padding: 0;
}

.comment-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.comment-item strong {
  display: block;
  margin-bottom: 5px;
}

.comment-item span {
  color: #666;
  font-size: 0.9rem;
}

.comment-item button {
  margin-top: 5px;
  padding: 5px 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  cursor: pointer;
}

.comment-item button:hover {
  background-color: #c9302c;
}

.loading {
  font-size: 1.2rem;
  font-weight: bold;
  color: #666;
  text-align: center;
  margin-top: 20px;
}

.no-comments {
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-top: 20px;
}
</style>