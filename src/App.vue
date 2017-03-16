<template>
  <div class="container">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  
  export default {
    components: {
      'app-header': Header
    }
  }
</script>

<style lang="scss">
  @import './assets/scss/variables.scss';
  @import './assets/scss/global.scss';

  html { font-size: 10px; }

  body {
    color: $base-black;
    font-family: $base-font;
    min-width: 320px;
    max-width: 1920px;
    margin: 0 auto;
  }

  audio {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }

  input {
    margin-bottom: 15px;
  }

  h1 {
    font-weight: bold;
    font-size: 1.4rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1;
  }

  h2 {
    font-size: 1.3rem;
    text-align: center;
    margin: 0;
  }

  dl {
    margin: 0;
    dt {
      width: 20%;
      float: left;
      text-align: right;
    }

    dd {
      float: left;
      width: 75%;
      margin-left: 5%;
    }
  }

   #header-wrapper {
    padding-top: 20px;
  }

  .title {
    @extend .flex-default;
    height: 20px;
    
    &:hover, &:focus {
      text-decoration: none;
    }

    img {
      max-height: 100%
    }

    span {
      font-family: $accent-font;
      font-size: 1.6rem;
      color: $base-black;
    }
  }

  .panel {
    .panel-heading {
      height: 250px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      overflow: hidden;

      i {
        @extend .flex-default;
        height: inherit;
        color: white;
        font-size: 6rem;
        &:hover, &:focus {
          color: $color4;
        }
      }
    }
  }

</style>