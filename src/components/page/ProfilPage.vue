<script>
import axios from 'axios'

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
        },
        async deleteUser(){
            const confirmed = window.confirm('Вы уверены, что хотите удалить ваш аккаунт? Это действие необратимо.')
            if(confirmed)
            try {
                const res = await axios.delete(`http://localhost:5235/DetelesUser?id=${this.usermas.idUser}`)
                console.log('Аккаунт был удалён:', res.data);
                alert('Аккаунт удален.');
                sessionStorage.clear()
                this.usermas = null
                this.$router.push('/')
            }
            catch (error) {
                console.error('Ошибка при удалении пользователя:', error.response?.data || error.message)
                alert('Произошла ошибка при удалении пользователя.')
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
        <ul class="linksdiv">
            <li>
                <router-link 
                to="/profil" 
                class="link" 
                :class="{ active: $route.path === '/profil' }"
                >
                Профиль
                </router-link>
            </li>
            <li>
                <router-link 
                to="/settings" 
                class="link" 
                :class="{ active: $route.path === '/settings' }"
                >
                Настройки
                </router-link>
            </li>
            <li>
                <router-link 
                to="/edit" 
                class="link" 
                :class="{ active: $route.path === '/edit' }"
                >
                Редактирование
                </router-link>
            </li>
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

            <div className="btndiv">
                <button className="dltbtn" @click="deleteUser"><span>[Удаление аккаунта]</span></button>
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
    .linksdiv {
        list-style: none;
        width: 250px;
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

    .linksdiv li:hover::before {
        border-radius: 0 20px 20px 0;
        width: 110%;
    }

    .link {
        display: block;
        padding: 10px 20px;
        color: #2b2b2b; /* Цвет текста по умолчанию */
        text-decoration: none;
        font-size: 18px;
        font-weight: 600;
        position: relative;
        z-index: 1;
        transition: color 0.4s ease-out;
    }

    .link:hover {
        color: #fff; /* Цвет текста при наведении */
    }

    .link.active {
        color: #fff; /* Цвет текста для активной ссылки */
        background: #2b2b2b; /* Фон для активной ссылки */
        font-weight: bold; /* Выделение текста жирным */
        border: 2px solid #2b2b2b; /* Более заметная рамка */
    }
    .dltbtn {
        width: 160px; /* Сделаем кнопку чуть шире */
        height: 50px; /* Увеличим высоту для удобства */
        font-weight: bold; /* Текст жирным */
        color: #fff; /* Белый текст */
        background: #000; /* Чёрный фон */
        font-size: 10px; /* Размер шрифта */
        border: 2px solid #fff; /* Белая рамка */
        border-radius: 15px; /* Закруглённые края */
        text-transform: uppercase; /* Текст в верхнем регистре */
        letter-spacing: 1px; /* Расстояние между буквами */
        cursor: pointer; /* Указатель мыши при наведении */
        position: relative; /* Для работы с псевдоэлементами */
        overflow: hidden; /* Скроем лишний контент */
        transition: all 0.3s ease; /* Плавный переход для эффектов */
    }

    /* Эффект свечения при наведении */
    .dltbtn:hover {
        background: #fff; /* Белый фон */
        color: #000; /* Чёрный текст */
        border-color: #000; /* Чёрная рамка */
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.8); /* Белое свечение */
    }

    /* Эффект "вдавливания" при нажатии */
    .dltbtn:active {
        transform: scale(0.95); /* Кнопка слегка уменьшается */
        background: #222; /* Немного светлее чёрного */
        box-shadow: none; /* Убираем свечение */
    }

    /* Добавляем псевдоэлемент для динамичного эффекта */
    .dltbtn::before {
        content: ''; /* Пустой контент */
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 200%;
        height: 0;
        background: rgba(255, 255, 255, 0.1); /* Полупрозрачный белый цвет */
        transition: height 0.3s ease;
        z-index: 0; /* Позади текста */
    }

    /* При наведении полоса увеличивается */
    .dltbtn:hover::before {
        height: 200%; /* Полоса покрывает всю кнопку */
    }

    /* Текст кнопки должен находиться поверх псевдоэлемента */
    .dltbtn span {
        position: relative;
        z-index: 1;
    }
    /* .btndiv {
        background: #2b2b2b;
    } */
</style>