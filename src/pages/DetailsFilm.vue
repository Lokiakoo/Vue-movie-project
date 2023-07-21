<template>
  <div>
    <div class="row justify-center q-mt-xl">
      <q-card class="movieDetailCard">
        <div class="detailDiv">
          <div class="detailPic">
            <img :src="film.img" style="height: 360px; max-width:243px; width: 100%; margin: 16px" @error="handleError"/>
          </div>
          <div class="detailInfo">
            <q-card-section class="text-subtitle2" style="font-size:40px; text-decoration: underline;">{{film.name}} </q-card-section><hr />
            <q-card-section class="text-subtitle2"><span class="detailFont">Year : </span> {{film.year}} &nbsp&nbsp | &nbsp&nbsp {{film.duration}} minutes &nbsp&nbsp | &nbsp&nbsp {{film.genre}}</q-card-section>

            <q-card-section class="text-subtitle2"><span class="detailFont">Director : </span>{{film.director}}</q-card-section>
            <q-card-section class="text-subtitle2"><span class="detailFont">Actor : </span>Louis Koo / Louisa Ko</q-card-section>
            <q-card-section class="text-subtitle2"><span class="detailFont">Language : </span>{{film.language}}</q-card-section>
            <hr />
            <q-card-section class="story">
              <span class="detailFont">Story : </span>A talented advertising creative director longs for the love of his life.
               After he was rejected by his girlfriend, he fell into emotional world, 
              the age gap, the opposition of the parents of the beautiful female student...
            </q-card-section>
          </div>
        </div>
      </q-card>
    </div>
  </div>
  <div class="text-center q-ma-md">
    <q-btn color="primary" @click="$router.push('/')">Back to Homepage</q-btn>
  </div>
</template>

<script>
import axios from 'axios';
import url from '../http-common.js';
import dummy from '../components/dummy.js';

export default {
  data() {
    return {
      film: {},
      filmList: [],
      getPoster: false,
    }
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
  created() {
    axios.get(`${url}/film/${this.$route.params.id}`)
    .then((response) => {
      const filmDetail = response.data
      this.film = {
        name: filmDetail[0].title,
        year: filmDetail[0].year,
        release: filmDetail[0].released,
        duration: filmDetail[0].runtime,
        language: filmDetail[0].language,
        genre: filmDetail[0].genre,
        director: filmDetail[0].director,
        img: filmDetail[0].poster,
      }
    }).catch ((err) => {
      console.log(err)
    })

  }
}
</script>

<style>
.movieDetailCard {
  border-radius: 10px;
  background: #fff8;
}
.detailDiv {
  display: flex
}
.detailInfo {
  margin: 10px;
  text-align: inherit;
  display: grid;
}
.detailFont{
  font-family: fangsong;
  font-size: 15px;
  color: grey;
}
.story {
 max-width: 550px;
}
</style>