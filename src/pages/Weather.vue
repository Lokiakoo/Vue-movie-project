<template>
  <div
    id="weather"
    :class="
      typeof weather.main === 'undefined' ? 'whatWeather' :
      weather.main.temp > 18 ? 'warm' : 'cold'
    ">
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Type city name"
          v-model.lazy="query"
          @change="fetchWeather"
        />
      </div>
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>
  
<!-- SCRIPTS -->
<script>
export default {
  name: "weather",
  data() {
    //fetching API from openweathermap.org
    return {
      api_key: "7f40938131da6e5fe5ebeaea4fe2d0da",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "hongkong",
      weather: {},
      weatherData: [],
    }
  },
    beforeMount() {
    // run your function here
    this.fetchWeather();
  },
  methods: {
    fetchWeather(e) {
      //if (e.key == 'Enter') {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
        ) //${this.query}
          .then((res) => {
            return res.json();
          })
          .then(this.setResults);
      //}
    },
    setResults(results) {
      this.weather = results;
      this.weatherData.push(this.weather)
    },
    
    
    //creating dates for the weather
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day}, ${date} ${month} ${year}`;
    },
  },
};
</script>
  
<!-- STYLING -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Montserrat", sans-serif;
}
#weather.whatWeather {
  background-image: url("https://www.surfertoday.com/images/stories/current-temperature-outside.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  z-index: 2;
  background-repeat: no-repeat;
}
#weather.cold {
  background-image: url("https://images.dailyhive.com/20201224080750/shutterstock_16210609481.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  z-index: 2;
  background-repeat: no-repeat;
}
#weather.warm {
  background-image: url("https://blogs.cdc.gov/wp-content/uploads/sites/12/2018/07/extremeheat_456pxnew.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  z-index: 2;
  background-repeat: no-repeat;
}
main {
  height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}
.search-box {
  width: 100%;
  margin-bottom: 30px;
}
.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  /* text-shadow: 1px 3px rgba(0, 0, 0, 0.25); */
}
.location-box .date {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  /* font-style: italic; */
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: aliceblue;
  font-size: 95px;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  margin: 30px 0px;
}
.weather-box .weather {
  color: #fff;
  font-size: 40px;
  font-weight: 500;
}
</style>