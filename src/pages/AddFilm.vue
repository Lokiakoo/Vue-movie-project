<template>
  <q-page-sticky style="z-index:1" expand position="top">
  <div class="Search">
    <input type="text"
    class="Search-bar"    
    placeholder="Search Movie From OMDb"
    v-model.lazy="searchOmdbTitle"
    @change="fetchOmdb"
    />
  </div> 
</q-page-sticky>
<div class="addFilm">
  <div class="addFilmHeader">Add film</div>  
    <div class="addFilmContain">    
      <div>
        <img :src="this.poster" class="addFilmContainPoster"/> 
      </div>    
      <div>
        <input dense outlined square v-model="title" placeholder="Fix title" class="bg-white col" disabled="disabled"/>
        <input dense outlined square v-model="poster" placeholder="Fix poster" class="bg-white col"  disabled="disabled"/>
        <input dense outlined square v-model="year" placeholder="Enter year" class="bg-white col" />
        <input dense outlined square v-model="released" placeholder="Enter released" class="bg-white col" />
        <input dense outlined square v-model="runtime" placeholder="Enter runtime" class="bg-white col" />
        <input dense outlined square v-model="language" placeholder="Enter language" class="bg-white col" />
        <input dense outlined square v-model="genre" placeholder="Enter genre" class="bg-white col" />
        <input dense outlined square v-model="director" placeholder="Enter director" class="bg-white col" />
        <div class="text-center">
        <q-btn type="submit" color="primary" @click="saveFilm">Save</q-btn>
        <q-btn type="submit" color="primary" @click="cleanDetail">Cancel</q-btn>
        </div>
        <div class="returnMsg" style="text-align: center" v-if="Msg"> "{{Msg}}" </div>
        
      </div>      
    </div>  
  </div>
</template>

<script>
import axios from 'axios';
import url from '../http-common.js';

export default {  
data()
{
  return {
    searchOmdbTitle:'',
    title: '',
    poster: '',
    year: '',
    released: '',
    runtime: '',
    language: '',
    genre: '',
    director: '',
    Msg: '',
  }
},
methods:{
  async fetchOmdb() {
    try {
      const response = await axios.get(`${url}/ofilm/${this.searchOmdbTitle}`)
      console.log(response.data)

      if (response) {
        const runtime = response.data.runtime.slice(0, -4)

        this.title = response.data.title
        this.poster = response.data.poster
        this.year = response.data.year
        this.released = response.data.released
        this.runtime = runtime
        this.language = response.data.language
        this.genre = response.data.genre
        this.director = response.data.director
      } else {
        console.log(`Request failed with status code ${response.status}`)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async saveFilm() {
    const film = {
      title: this.title,
      poster: this.poster,
      year: this.year,
      released: this.released,
      runtime: parseInt(this.runtime),
      language: this.language,
      genre: this.genre,
      director: this.director,
    }
    const customConfig = {
        headers: {
          'Content-Type': 'application/json',
          'k': this.$store.getters.getSession
        }
      }
  try {
    await axios.post(`${url}/film`, film, customConfig)
    .then((res) => {
    console.log(res);
    console.log("Film saved successfully")
    console.log(res.data.description)
    this.Msg = ("Film saved successfully")
    })
    .then(this.cleanDetail)
    } catch (error) {
    console.log(error);
    console.log("Film saved failed")
    this.Msg = ("Film saved failed")
    }
  },
  cleanDetail() {
    this.searchOmdbTitle = ''
    this.title = ''
    this.poster = ''
    this.year = ''
    this.released = ''
    this.runtime = ''
    this.language = ''
    this.genre = ''
    this.director = ''
    console.log("Clean detail")
  },
}
}
</script>

<style>
.addFilmHeader{
font-size: 40px;
font-weight: bold;
text-align: center;    
}
.addFilmContain{
  display: flex;
  justify-content: center;
  margin: 10px
}
.addFilmContainPoster{
  height: 100%;
  margin-right: 50px;
}
.addFilm input{
width: 300px;
height: 40px;
padding-left: 10px;
display: block;
margin: auto auto 15px 15px;
}
.addFilm button{
width: 100px;
margin: 15px 25px;
}
</style>