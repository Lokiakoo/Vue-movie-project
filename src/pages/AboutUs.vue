<template>
  <q-page-sticky expand position="top">
    <div class="banner-area">
      <div class="banner-content">About Us
        <div class="banner-secContent">Movie Hub &lt;/&gt; <span style="text-decoration: underline;">Who's Us</span>
        </div>
      </div>
    </div>
    <div class="aboutus">
      This is a test web service to obtain movies, all content and images on the site are contributed and maintained by <br/>
      <a target="_blank" href="https://www.omdbapi.com/" class="text-grey">OMDb API</a>
      <br/>
      If you find this service useful, please consider making a one-time donation or become a patron.
    </div>
  </q-page-sticky>
</template>

<style>
.aboutus{
  font-size: 28px;
  text-align: center;
  margin: -10px auto 30px auto;
}
.banner-area {
  width: 100%;
  margin-bottom: 30px;
  background-image: url(https://i0.wp.com/demo.themedraft.net/wp/nadtek/wp-content/uploads/2022/07/banner.jpg);
  background-size: cover;
  display: block;
  background-position: center;
  background-repeat: no-repeat;
  height: 350px;
  background-color: #152133;
  max-width: unset;
}
.banner-content {
  color: white;
  font-size: 40px;
  height: 100% !important;
  margin-top: 150px;
  text-align: center;
}
.banner-secContent {
  font-size: 22px;
}
.donation {
  width: 400px;
  height: 280px;
  opacity: 0.9;    
}
</style>

