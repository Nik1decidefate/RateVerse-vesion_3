<script>
export default {
  methods:{
    close(){
      sessionStorage.clear()
      this.$router.push('/')
      this.usermas = null
    },
    LoadUserData(){
      const storedUser = sessionStorage.getItem('username')
      if(storedUser){
        const parseUser = JSON.parse(storedUser)
        this.usermas = parseUser
        console.log(this.usermas)
        console.log(this.usermas.idUser, this.usermas.username)
      }
      // } else if (!storedUser && this.statusExit == true) {
        
      //   this.$router.push('/')
      // }
    },
  },
  data(){
    return {
      usermas: null,
      statusExit: false
      
    }

  },
  mounted(){
    this.LoadUserData()
  }
}
</script>

<template>
  <div>
    <header :class="{'scrolled-nav' : scrollPosition}">
    <nav>

      <div className="logo">
          <img src="@/assets/Logo.png" alt="">
          <h1>
              RateVerse
          </h1>
      </div>

      <div style="display: flex; justify-content: center;">
          <ul v-show="!mobile" className="navigation">
            <li><router-link className="links" to="/game">Игры</router-link></li>
            <li><router-link className="links" to="/move">Фильмы</router-link></li>
            <li v-if="usermas && usermas.idRole == 2"><router-link className="links" to="/move">Комментарии</router-link></li>
          </ul>
      </div>

        <div>
          <div v-if="this.usermas != null" className="px_div">
              <router-link className="links" to="/profil" style="display:flex; align-items:center;">
              <img :src="usermas.avatar ? usermas.avatar : '/assets/Logo.png'" className="useravatar" alt="No image"/><br>
              <h3>{{ usermas.username }}</h3> 
            </router-link>
            <button @click="close()" className="btn">Выход</button>
          </div>
          <div v-else-if ="usermas == null" className="P_div">
            <router-link className="links" to="/authorization">Войти</router-link>
            <router-link className="links" to="/registration">Зарегистрироваться</router-link>
          </div>
          <img src="@/assets/notifications.png" style="width: 30px; height: 30px;" alt="">
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>
 

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Nabla&display=swap');
header {
  position: fixed;
  display: flex;
  background:black;
  color: white;
  margin: 0%;
  top:0px;
left: 0px;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo h1 {
    font-family: "Audiowide", sans-serif;
    font-weight: 400;
    margin-left: 10px;
    font-size: 32px;
    font-style: normal;
}
img {
  width:40px;
  height: 40px;
  margin: 1px;
}
.navigation {
  display: flex;
  color:white;
}
nav{
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.links {
  color: white;
  font-family: "Audiowide", sans-serif;
  text-decoration: none;
  margin:0 5px;
}
li {
  padding: 20px 20px 0 0;
  list-style: none;
  color: white;
  font-family: "Audiowide", sans-serif;
  text-decoration: none;
}
li.active {
  color: white;
  font-family: "Audiowide", sans-serif;
  text-decoration: none;
}
.useravatar {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

P_div, px_div {
  display:flex;
  justify-content: center;
  align-items: center;
}
.px_div {
  display:flex;
  justify-content: center;
  align-items: center;
}
p_div h3 {
  font-family: "Audiowide", sans-serif;
  font-weight: 400;
  margin-left: 10px;
  font-size: 32px;
  font-style: normal;
  text-decoration: none;
  color: gray;
}

h3 {
  color:gray;
  font-family: "Audiowide", sans-serif;
  font-weight: 400;
  margin-left: 10px;
  font-size: 16px;
  font-style: normal;
  text-decoration: none;
}

.btn {
  background: transparent;
  color: white;
  height: 100%;
} */

@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Nabla&display=swap');

/* Общие стили для header */
header {
  position: fixed;
  display: flex;
  background: black;
  color: white;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

/* Логотип */
.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.logo h1 {
  font-family: "Audiowide", sans-serif;
  font-weight: 400;
  font-size: 24px;
  margin: 0;
}

/* Навигация */
nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.navigation {
  display: flex;
  gap: 20px;
}

.links {
  color: white;
  font-family: "Audiowide", sans-serif;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

.links:hover {
  color: #ff6f61;
}

.P_div, .px_div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.useravatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
}

.px_div h3 {
  font-family: "Audiowide", sans-serif;
  font-weight: 400;
  font-size: 16px;
  margin: 0;
  color: gray;
}

.btn {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 5px 10px;
  cursor: pointer;
  font-family: "Audiowide", sans-serif;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn:hover {
  background-color: gray;
  color: white;
}

/* Блок уведомлений */
nav div:last-child {
  display: flex;
  align-items: center;
  gap: 10px;
}
nav div:last-child img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

/* Стили для мобильных устройств */
@media (max-width: 768px) {
  header {
    height: 60px;
  }

  .logo h1 {
    font-size: 20px;
  }

  .navigation {
    display: none;
  }

  .P_div, .px_div {
    flex-direction: column;
    gap: 5px;
  }

  .btn {
    font-size: 12px;
    padding: 3px 8px;
  }
}
</style>