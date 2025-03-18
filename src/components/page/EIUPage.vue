<script>
import axios from 'axios'

export default {
    mounted(){
        this.LoadUserData()
    },
    data(){
        return {
            usermas: '',
            // userUpdate:{
            //     idUser: 0,
            //     idRole: 0,
            //     email:'',
            //     username: '',
            //     password:'',
            //     avatar:'',
            //     idStatus: 1,
            //     system: ''
            // }
        }
    },
    methods:{
        LoadUserData() {
            const storedUser = sessionStorage.getItem('username')
            // if(storedUser){
            //     const parseUser = JSON.parse(storedUser)
            //     this.usermas = parseUser
            // } else {
                
            //     this.$router.push('/')
            // }
        },
        LoadAvatar(event){
            this.usermas.avater = event.target.files[0]
        },
        async updateProfile(){
            // const formsData = new FormData()
            // formsData.append('idUser', this.usermas.idUser)
            // formsData.append('username', this.usermas.username)
            // formsData.append('email', this.usermas.email)
            // formsData.append('password', this.usermas.password)
            // formsData.append('system', this.usermas.system)
            // formsData.append('avatar', this.usermas.avatar)
            // formsData.append('idRole', this.usermas.idRole)
            // formsData.append('idStatus', this.usermas.idStatus)
            // try {
            //     const res = await axios.put('http://localhost:5235/EditInfoUser',null, {params: {user: formsData}})
            // }
            try {

            }
            catch (error){
                console.error('Ошибка при обновлении профиля:', error);
                alert('Произошла ошибка при обновлении профиля.');
            }
        }
    },
    
}
</script>
<template>
   <div className="wind_us">
    <h1>Редактирование профиля</h1>
    <div className="profil" style="display:flex; border:1px solid black; border-radius: 20px; width: 1000px; height: 100vh;">
        <!-- блок переходов -->
        <ul className="linksdiv">
            <li><router-link to="/profil" className="link" :class="{ active: $route.path === '/profil' }">Профиль</router-link></li>
            <li><router-link to="/settings" className="link" :class="{ active: $route.path === '/setting' }">Настройки</router-link></li>
           <li><router-link to="/edit" className="link" :class="{ active: $route.path === '/edit' }">Редактирование</router-link></li>
        </ul>
        <!-- блок данных пользователя -->
        <div className="profil-edit">
            <form @submit="updateProfile">
                <div>
                    <label for="file"></label>
                    <input type="file" @change="LoadAvatar" required>
                </div>
                <div>
                    <label for="username"></label>
                    <input type="text" v-model="usermas.username" required>
                </div>
                <div>
                    <label for="password"></label>
                    <input type="password" v-model="usermas.password" required>
                </div>
                <div>
                    <label for="email"></label>
                    <input type="email" v-model="usermas.email" required>
                </div>
                <div>
                    <label for="osInfo"></label>
                    <input type="text" v-model="usermas.system" required>
                </div>
                <button type="submit">[Сохрание изменений]</button>
            </form>
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

    .linksdiv li:nth-child(2) {
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