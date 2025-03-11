// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// // const authoriz(){
// //     new
// // }

// export default new Vuex.Store({
//     state: {
//         users: [{
//             iduser: 1, 
//             login: 'Artigon', 
//             pass: 'Admin88v', 
//             email: 'artigon11@gmail.com', 
//             avatar: '', 
//             role: 'Администратор', 
//             status: 'Нет статуса'
//         }],
//         currentUser: null
//     },
//     getters: {
//         USER: state => {
//             return state.user
//         },
//         GetIdUser: state => {
//             return state.users.find(us => us.iduser == id);
//         },
//         GetCurrentUser: state => state.currentUser
//     },
//     mutations: {
//         Set_Us(state, users){
//             state.users = users
//         },
//         SetCurrentUser(state, user){
//             state.currentUser = user;
//         }
//     },
//     actions: {
//         authoriz({commit, state}, {login, pass}){
//             const user = state.users.find(us => us.login == login && us.pass == pass)
//             if(user){
//                 commit('SetCurrentUser', user)
//                 return true
//             }
//             return false
//         }
//     },   
// })