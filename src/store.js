import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        recipes: [],
        apiUrl: 'https://api.edamam.com/search'
    },
    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload;
        }
    },
    actions: {
        async getRecipes({ state, commit }, plan){
            console.log(state.apiUrl);
            try {
                // Para que funcionara se cambió ${state.apiUrl} por state.apiUrl 
                let response = await axios.get(state.apiUrl, {
                    params: {
                        q: plan,
                        app_id: 'c0075690',
                        app_key:'4c24f0411b2319368f3963f81f6e1bbc',
                        from: 0,
                        to: 9
                    }   
                });
                commit('setRecipes', response.data.hits);
            } catch (error) {
                commit('setRecipes', []);
            }
        }
    }
});
