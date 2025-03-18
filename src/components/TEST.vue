<script>
export default {
    props: {

    },
    data(){
        return {
            user: []
        }
    }
}
</script>

<template>
    
</template>
<style scoped>
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
        border-radius: 0px 10px 10px 0px;
        background: lightgray;
        transition: width 0.3s ease;
        overflow: hidden; /* Скрываем текст, когда ссылка не активна */
        width: 10px; /* Начальная ширина */
    }
    .link:nth-child(1){
        border-radius: 15px 10px 10px 0;
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