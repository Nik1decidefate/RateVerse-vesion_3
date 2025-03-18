<script>
    import axios from 'axios';
    export default {
        data(){
            return{
                user:{
                    login: '',
                    password: '',
                    avatar: 'src/image/imgUs/stub.png',
                    idrole: 1,
                    idstatus: 1
                },
                showPassword: false,
                
            }
        },
        methods:{
            async registerUser(){
                try {
                    if (!this.validateForm()){
                        alert("Пожалуйста, заполните все поля.");
                        return;
                    }
                    const userData = {
                        Username: this.user.login,
                        Password: this.user.password,
                        Avatar: this.user.avatar,
                        IdRole: this.user.idrole,
                        IdStatus: this.user.idstatus
                    }   
                    const response = await axios.post("http://localhost:5235/Registration", userData)
                    if(response.status === 200){
                        alert("Добро пожаловать в [Систему] {" , this.user.login, "}!")
                        // sessionStorage.setItem('username')
                        this.signIn();
                    }
                }
                catch (error) {
                    console.error("Ошибка при регистрации:", error)
                    alert("Произошла ошибка. Проверьте данные или попробуйте позже.")
                }
            },
            togglePasswordVisibility(){
                this.showPassword = !this.showPassword
                const passwordInput = document.querySelector("input[id='passwords']")
                if (passwordInput) {
                    passwordInput.type = this.showPassword ? "text" : "password";
                }
                else {

                }
            },
            validateForm(){
                return (this.user.login.trim() !== "" &&
                        this.user.password.trim() !== "")
            },
            async signIn() {
              try {
                // console.log('Отправляемые данные:', this.user.login, this.user.password);

                const response = await axios.get('http://localhost:5235/Authorization', {
                    params: {
                        login: this.user.login,
                        password: this.user.password
                    }
                })
                if (response.data) {
                    console.log('Успешная авторизация:', response.data)
                    sessionStorage.setItem('username', JSON.stringify(response.data))
                    this.$router.push('/profil')
                }
              } catch (error) {
                console.error('Ошибка авторизации:', error)
                console.error('Детали ошибки:', error.response ? error.response.data : null)
              }
            }
            
        }
    }
</script>
<template>
<div className="window">

    <div className="wind_us">
        <h1>Регистрация</h1>
        <h4>Логин</h4>
        <input v-model="user.login" type="text" required>
        <h4>Пароль</h4>
        <div style="display: flex;">
            <input type="password" id="passwords"  v-model="user.password" required>
            <button @click="togglePasswordVisibility">
            <img
              :src="showPassword ? 'src/assets/eye-open.png' : 'src/assets/eye-closed.png'"
              style="width: 20px; height: 20px; cursor: pointer;"
              alt="Toggle Password Visibility"/>
          </button>
        </div>
        <button @click="registerUser">Зарегистрироваться</button>
        <router-link
            style="text-wrap: wrap; width: 100%; text-align: center; display: block; margin-top: 10px;"
            to="/authorization">
            Есть аккаунт? Войти
        </router-link>
   </div> 
</div>
</template>
<style scoped>
    /* .wind_us{
        display:flex;
        margin-top:100px;
        justify-content: center;
        align-items: center;
        width: 400px;
        box-shadow: 0px 10px 15px 5px black;
        flex-direction: column;
    }
    .window{
        display: flex;
        justify-content: center;
        align-items: center;
    } */
    .window {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
    }

    .wind_us {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 300px;
    }

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>