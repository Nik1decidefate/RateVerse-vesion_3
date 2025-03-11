<script>
export default {
    
}
</script>

<template>
    <div class="not-found">
        <h1>404 - Страница не найдена</h1>
        <p>Кажется, запрашиваемая страница не существует.</p>
        <router-link to="/">Вернуться на главную</router-link>
    </div>
</template>

<style scoped>
    .not-found {
    text-align: center;
    margin-top: 10%;
    }

    h1 {
    font-size: 2rem;
    color: #d9534f;
    }

    p {
    font-size: 1.2rem;
    color: #555;
    }
</style>