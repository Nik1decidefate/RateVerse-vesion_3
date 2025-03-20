<script>
import axios from 'axios'

export default {
  mounted() {
    this.LoadUserData()
  },
  data() {
    return {
      usermas: '',
      component: {
        cpu: '',
        gpu: '',
        os: '',
        ram: ''
      },
      selectedFile: null, // Для хранения выбранного файла
      previewUrl: '' // Для отображения превью изображения
    }
  },
  methods: {
    LoadUserData() {
      const storedUser = sessionStorage.getItem('username')
      if (storedUser) {
        const parseUser = JSON.parse(storedUser)
        this.usermas = parseUser
        const parts = this.usermas.system.split(';')
        const keys = ['cpu', 'gpu', 'os', 'ram']

        keys.forEach((key, index) => {
          this.component[key] = parts[index] || ''
        })
      } else {
        this.$router.push('/')
      }
    },
    LoadAvatar(event) {
        this.selectedFile = event.target.files[0]
        alert(event.target.files[1])
        if (this.selectedFile) {
            this.previewUrl = URL.createObjectURL(this.selectedFile) // Создание URL для предварительного просмотра
            this.usermas.avatar = `src/image/imgUs/${this.selectedFile.name}`
            alert(this.usermas.avatar)
        }
    },
    async updateProfile() {
      try {
        const componentArray = Object.values(this.component)
        this.usermas.system = componentArray.join(';')
        const res = await axios.put('http://localhost:5235/EditInfoUser', this.usermas)

          if (res.data) {
            const formData = new FormData()
            formData.append('file', this.selectedFile)

            const uploadResponse = await axios.post('http://localhost:5235/UploadImage', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (uploadResponse.data && uploadResponse.data.FileName) {
              alert('Файл успешно загружен!')
            }
            console.log(res.data)
            alert('Профиль успешно обновлён!')
            sessionStorage.setItem('username', JSON.stringify(this.usermas));
            this.$router.push('/profil')
          }
        
      } catch (error) {
        console.error('Ошибка при обновлении профиля:',this.usermas, error)
        alert('Произошла ошибка при обновлении профиля.')
      }
    }
  }
};
</script>

<template>
  <div class="wind_us">
    <h1>Редактирование профиля</h1>
    <div class="profil" style="display:flex; border:1px solid black; border-radius: 20px; width: 1000px; height: 100vh;">
      <ul class="linksdiv">
        <li><router-link to="/profil" class="link" :class="{ active: $route.path === '/profil' }">Профиль</router-link></li>
        <li><router-link to="/settings" class="link" :class="{ active: $route.path === '/setting' }">Настройки</router-link></li>
        <li><router-link to="/edit" class="link" :class="{ active: $route.path === '/edit' }">Редактирование</router-link></li>
      </ul>
      <div class="profil-edit">
        <!-- <form @submit.prevent="updateProfile"> -->
          <div>
            <input type="file" @change="LoadAvatar" />
            <!-- <button @click="uploadImage">Загрузить изображение</button> -->
            <div v-if="previewUrl">
                <img :src="previewUrl" alt="Preview" style="max-width: 200px;" />
            </div>
          </div>
          <div>
            <label for="username">Логин </label>
            <input type="text" v-model="usermas.username" required>
          </div>
          <div>
            <label for="password">Пароль </label>
            <input type="password" v-model="usermas.password" required>
          </div>
          <div>
            <label for="email">Email </label>
            <input type="email" v-model="usermas.email" required>
          </div>
          <div>
            <label for="cpu">Видеокарта</label>
            <input type="text" v-model="component.cpu" required>
          </div>
          <div>
            <label for="ram">Операционная память (ОЗУ)</label>
            <input type="text" v-model="component.ram" required>
          </div>
          <div>
            <label for="os">Операционная система (ОС)</label>
            <input type="text" v-model="component.os" required>
          </div>
          <div>
            <label for="gpu">Процессор</label>
            <input type="text" v-model="component.gpu" required>
          </div>
          <button type="submit" @click="updateProfile">[Сохранение изменений]</button>
        <!-- </form> -->
      </div>
    </div>
  </div>
</template>
    
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Nabla&display=swap');

    .wind_us{
        font-family: "Audiowide", sans-serif;
        font-weight: 400;
        font-style: normal;
        display:flex;
        margin-top: 5%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .linksdiv{
        list-style: none;
        widows: 250px;
        left: 0;
    }
    .linksdiv li {
        margin: 8px 0;
        position: relative;
        background: #fff;
        border: 1px solid black;
        border-radius: 5px;
        padding: 2px;
        overflow: hidden;
    }

    .linksdiv li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 5px;
        background: #2b2b2b;
        transition: 0.5s all ease-in-out;
    }

    .linksdiv li:nth-child(3) {
        background: #2b2b2b;
        color: #fff;
    }
    /* .linksdiv li:nth-child(2)::before {
        background: #e44134;
    }
    .linksdiv li:nth-child(3)::before {
        background: #32a250;
    } */

    .linksdiv li:hover::before {
        border-radius: 0 20px 20px 0;
        width: 110%;
    }

    .link {
        display: block;
        position: 10px 20px;
        color: #2b2b2b;
        text-decoration: none;
        font-size: 18px;
        font-weight: 600;
        position: relative;
        z-index: 1;
    }
    .link:hover {
        color: #fff;
        transition: 0.4s all ease-out;
    }
    .link::after {
        color: #fff;
    }
</style>