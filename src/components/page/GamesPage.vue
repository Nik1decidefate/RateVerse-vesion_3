<template>
 <div className="maindiv">
    <h1>Игры</h1>
    <div className="divAll" v-show="gameinput">
      <div v-for="(game, index) in gameinput" :key="index" className="divgame" @click="projectview(game)">
        <!-- Предположим, что изображение передается как base64 строка -->
        <img :src="game.ImageP" alt="Изображение не найдено" className="img">
        <h4>{{ game.Project1 }}</h4>
        <div className="publish_rate">
            <p v-if="game.IdPublisherNavigation">{{ game.IdPublisherNavigation.Publisher1 }}</p>
            <h4 className="rate">{{ game.Rate }}</h4>
        </div>
      </div>
    </div>
    <aside className="filterDiv">
        <label for="text">Поиск</label>
        <input type="text" required>

    </aside>
  </div>
</template>
<script>
    import axios from 'axios'
    export default{
        data(){
            return {
                gameinput: []
            }
        },
        methods: {
            async ShowGame() {
                try {
                    const response = await axios.get('http://localhost:5235/ShowAllProject', {
                        params: {
                            id: 1
                        }
                    })
                    if (response.data) {
                        console.log("Успешно!", Date.now())
                    // Преобразование JSON строки в объекты
                        this.gameinput = response.data;
                    }
                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', Date.now(), error)
                }
            },
            projectview(game){
                sessionStorage.setItem('selectionProject', JSON.stringify(game));
                this.$router.push('/project')
            },
        },
        mounted() {
            this.ShowGame();
        }
            
    }
</script>
<style scoped>
.divAll {
    display: flex;
    flex-wrap: wrap; 
}
.divgame{
    padding: 2px;
    border: 0.1px solid black;
    border-radius: 20px;
    margin: 0px 5px;
    width: 300px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
}
.publish_rate{
    display: flex;
    align-items: center;
}
.rate {
    margin: 0 0 0 5px;
}
.img{
    max-width: 300px;
    max-height: 200px;
}
.filterDiv {
    border: 1xp solid black;
    right: 0;
}

.maindiv {
    display: flex;
    flex-direction: column;
}
</style>