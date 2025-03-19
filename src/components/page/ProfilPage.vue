<script>
export default {
    mounted(){
        this.LoadUserData()
    },
    data(){
        return {
            usermas: '',
            component: {
                cpu: '',
                os: '',
                ram:'',
                gpu: ''
            }
        }
    },
    methods:{
        async LoadUserData() {
            const storedUser = await sessionStorage.getItem('username')
            if(storedUser){
                const parseUser = JSON.parse(storedUser)
                this.usermas = parseUser
                const parts = this.usermas.system.split(';')
                const keys = ['cpu', 'os', 'ram', 'gpu']

                keys.forEach((key, index) => {
                    this.component[key] = parts[index] || ''
                });
            } else {
                
                this.$router.push('/')
            }
        }
    },
    
}
</script>
<template>
   <div className="wind_us">
    <h1>Профиль</h1>
    <div className="profil" style="display:flex; border:1px solid black; border-radius: 20px; width: 1000px; height: 100vh;">
        <!-- блок переходов -->
        <ul className="linksdiv">
            
            <li><router-link to="/profil" className="link" :class="{ active: $route.path === '/profil' }">Профиль</router-link></li>
            <li><router-link to="/settings" className="link" :class="{ active: $route.path === '/setting' }">Настройки</router-link></li>
           <li><router-link to="/edit" className="link" :class="{ active: $route.path === '/edit' }">Редактирование</router-link></li>
        </ul>
        <!-- блок данных пользователя -->
        <div>
            <div style="border-bottom: 1px solid black;">

                <img :src="usermas.avatar ? usermas.avatar : 'src/image/imgUs/stub.png'" style="width: 200px; 
                        height: 200px; 
                        border-radius:100vh;">
                <H2>{{ usermas.username || 'Имя пользователя' }}</H2>
            </div>
            <h5>Процессор: {{ component.cpu }}</h5>
            <h5>Операционная система (ОС): {{ component.os }}</h5>
            <h5>Оперативная память (ОЗУ): {{ component.ram }}</h5>
            <h5>Видеокарта: {{ component.gpu }}</h5>

            <div>
                <button>[Удаление аккаунта]</button>
            </div>
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

    .linksdiv li:nth-child(1) {
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