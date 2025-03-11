<script>
import axios from 'axios'
export default {
  inject: ['setUser'],
    data() {
        return {
            // testus: {
            //     id: 1,
            //     login: "Artigon",
            //     password: "Admin88v"
            // },
            loginUs: "Artigon",
            passUs: "Admin88v",
            LoginError: false,

        }
    },
    methods: {
      async signIn() {
      //   try {
      console.log('Отправляемые данные:', this.loginUs, this.passUs);

      const response = await axios.get('http://localhost:5235/Authorization', {
        params: {
          login: this.loginUs,
          password: this.passUs
        }
      })
      if (response.data) {
        console.log('Успешная авторизация:', response.data)
        sessionStorage.setItem('username', JSON.stringify(response.data))
        this.$router.push('/profil')
      } else {
        this.LoginError = true
      }
      //   } catch (error) {
      //     console.error('Ошибка авторизации:', error)
      //     console.error('Детали ошибки:', error.response ? error.response.data : null)
      //     this.LoginError = true
      //   }
    }
  }
}
</script>
<template>
    <div className="window">
    <div className="wind_us">
      <div class="aaa"></div>
      <h1>Войти</h1>
      <form @submit.prevent="signIn">
        <h4>Логин</h4>
        <input type="text" v-model="loginUs" placeholder="Логин">
        <h4>Пароль</h4>
        <div style="display: flex;">
          <input type="password" v-model="passUs" placeholder="Пароль">
          <button style="justify-content: center; align-items: center;">
            <img src="@/assets/Logo.png" style="width:20px; height: 20px;" alt="">
          </button>
        </div>
        <button type="submit">Войти</button>
      </form>
      <h3 v-if="LoginError" className="error">Неверный логин или пароль</h3>
    </div>
    <div className="auth">
      <router-link style="text-wrap: wrap; width:100px; text-align: center;" to="/registration">Нет аккаунта? Зарегистрируйся</router-link>
    </div> 
  </div>
  </template>
    <style scoped>
        .wind_us{
            display:flex;
            margin-top:100px;
            justify-content: center;
            align-items: center;
            width: 400px;
            box-shadow: 0px 0px 5px 1px black;
            flex-direction: column;
            border-radius: 20px;
            background: #211d1d;
        }
        .wind_us h1, .wind_us h4 {
            color: white;
        }
        .wind_us input {
            border: 1px solid white;
            background: #1a1212;
            color: white;
        }
        .window{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .auth {
            display: flex;
            justify-content: center;
            width: 400px;
            height: 50px;
            align-items: center;
            box-shadow: 0px 1px 5px 1px black;
            border-radius: 20px;
        }
        .auth links {
            justify-content: center;
            align-items: center;
        }
        .aaa{
            background-color: black;
            height: 50px; 
            border-radius: 20px 20px 0 0;
            width: 100%;
        }
        .error {
            color: white;
        }
    </style>