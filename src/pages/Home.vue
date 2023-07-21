<template>
  <div v-if="error">
    <q-banner inline-action class="text-white bg-red">
      Sorry. there is a problem connecting to the API
    </q-banner>
  </div>  
  <div v-if="!error" class="Contain">    
    <q-page-sticky style="z-index:1" expand position="top">
      <div class="Search">
        <input type="text" class="Search-bar" placeholder="Search Movie" v-model="searchTerm" />
      </div> 
    </q-page-sticky>    
    <!-- v-for loop to sliced array of filmsList based on the current value and filmsPerPage-->    
    <template v-for="(item, index) in filteredFilms.slice((current - 1) * filmsPerPage, current * filmsPerPage)">
      <q-card class="CardDetail q-ma-sm cursor-pointer" @click="$router.replace(`/d/${item.id}`)" >
        <img class="CardDetailPoster" :src="item.poster" @error="handleError" />
        <div class="CardDetailName">{{item.name}}</div>
        <div class="CardDetailSundry">{{item.runtime}} mins <br/> {{item.genre}}</div>  
      </q-card>
    </template>
  </div>
  <PageScroller />
    <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="current"
      :max="Math.ceil(filteredFilms.length / filmsPerPage)"
      input
      input-class="text-orange-10"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { computed } from 'vue';
import dummy from '../components/dummy.js';
import axios from 'axios';
import url from '../http-common.js';
import PageScroller from '../components/PageScroller.vue'


let films = [];

export default {
  components: {
    PageScroller
  },
  data() {
    return {
      error: false,
      filmsList: [],
      searchTerm: '',
      getPoster: false,
    }
  },
  computed: {
    filmsPerPage() {
      return 15; // set the number of films to display per page here
    },
    filteredFilms() {
      return this.filmsList.filter((item) => {
        return item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    },
  },
  methods: {
    handleError(event) {
      event.target.src = this.defaultPoster;
    }
  },
  props: {
    defaultPoster: {
      type: String,
      default: '/src/assets/SunTooShine.png'
    }
  },
  setup () {
    return {
      current: ref(1)
    }
  },
  created() {
  axios.get(`${url}/films`)
  .then((response) => {
    films = (response.data).reverse()
    
    for(let i=0; i<films.length; i++) {
      const filmObj = {
        name: films[i].title,
        poster: films[i].poster,
        id: films[i]._id,
        runtime: films[i].runtime,
        genre: films[i].genre,
      }
      this.filmsList.push(filmObj)
    }
  }) 

  //call from local data
  // for(let i=0; i < dummy.length; i++) {
  //   const filmObj = {
  //     name: dummy[i].title,
  //     poster: dummy[i].poster,
  //     id: dummy[i]._id,
  //     }
  //   this.filmsList.push(filmObj)
  //   }
  },
}
</script>

<style>
.Contain {
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
  }
.CardDetail {
  border-radius: 10px;
  background: #fff9;
  display: inline-grid;
  width: 243px;
}
.CardDetail:hover {
  transition: 0.7s;
}
.CardDetailPoster {
  min-height: 360px;
  max-height: 360px;
  width: 100%    
}
.CardDetailName {
  font-size: 18px;
  font-family: 'Gill Sans';
  margin-left: 10px;
  margin-right: 10px;
}
.CardDetailSundry {
  font-size: 15px;
  font-family: 'Gill Sans';
  margin-left: 10px;
  color: grey
}
.Search {
  width: 100%;
  margin-bottom: 30px;
}
.Search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.4s;
}
.Search-bar:focus {
  text-align: center;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 1);
}
</style>