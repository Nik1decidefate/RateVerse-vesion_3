<script>

</script>

<template>
       <div className="wind_us">
    <h1>Профиль</h1>
    <div style="display:flex; border:1px solid black; border-radius: 20px; width: 1000px; height: 100vh;">
        <!-- блок переходов -->
        <div className="linksdiv">
            <router-link to="/profil" class="link" :class="{ active: $route.path === '/profil' }">Профиль</router-link>
        <router-link to="/setting" class="link" :class="{ active: $route.path === '/setting' }">Настройки</router-link>
        <router-link to="/edit" class="link" :class="{ active: $route.path === '/edit' }">Редактирование</router-link>
        </div>
        <!-- блок данных пользователя -->
        <div>
            <h1>Редактирование профиля</h1>
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
    justify-content: center;
    align-items: center;
    box-shadow: 1px 0px 20px black;
    flex-direction: column;
}
.linksdiv{
    display:flex;
    padding: 1px;
    flex-direction: column; 
    border-right: 2px solid black; 
    width: auto;
    margin-left: 0px;
    /* position: relative; */
}
.link {
    display: flex;
    height: 40px;
    justify-content: center;
    /* position: absolute; */
    right: 0;
    top: 0;
    margin: 1px;
    min-width: 10px;
    color: transparent;
    text-decoration: none;
    font-weight: 600;
    align-items: center;
    text-align: center;
    border-radius: 20px 0px 0px 20px;
    background: lightgray;
    transition: width 0.3s ease;
    overflow: hidden; /* Скрываем текст, когда ссылка не активна */
    width: 10px; /* Начальная ширина */
}
.link.active, .link:hover {
    width: 200px;
    color: black;
}
.link + .link {
    top: calc(var(--prev-height, 0px) + 1px);
    --prev-height: 41px;
}
</style>