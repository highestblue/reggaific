<template>
  <div id="play-wrapper">
    <div class="panel panel-default">
      <div class="panel-heading" :style="{ 'background-image': 'url(../static/img/' + song.cover + ')' }"></div>

      <div class="panel-body">
        <div class="text-wrapper">
          <h1>{{ song.title }}</h1>
          <h2>{{ song.artist }}</h2>
        </div>
        
        <audio id="audioPlayer" autoplay @timeupdate="update" @ended="finished">
          <source :src="'../static/mp3/' + song.file" type="audio/mpeg">
          Your browser does not support the audio tag.
        </audio>

        <div class="progress-wrapper">
          <div class="playtime">{{ playtime | ms2min }}</div>
          <div id="timeline" class="progress" @click="changePlaybackPosition">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="length">{{ song.length | ms2min }}</div>
        </div>

        <div class="controller-wrapper">
          <button @click="toggleLoop">
            <i class="fa fa-repeat" :class="{ 'repeat-true': isLoop == true }"></i>
          </button>
          
          <button @click="prev"><i class="fa fa-step-backward"></i></button>

          <button @click="togglePlay">
            <i class="fa" :class="{ 'fa-play': isPlaying == false, 'fa-pause': isPlaying == true }"></i>
          </button>

          <button @click="next"><i class="fa fa-step-forward"></i></button>
          
          <div class="volume-wrapper">
            <button @click="volumeSliderVisible = !volumeSliderVisible"><i class="fa" :class="{ 'fa-volume-down': volumeSliderVisible == false, 'fa-volume-up': volumeSliderVisible == true }"></i></button>
            <input id="range-slider" type="range" :value="volume" min="0" max="10" v-if="volumeSliderVisible" @input="changeVolume">
          </div>

        </div>
      </div>
    </div>
  
    <router-link to="/list" class="btn1">Back To List</router-link>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {bus} from '../main'
  import songs from '../db'

  export default {
    data () {
      return {
        currentTrack: this.$route.params.id,
        totalTracks: songs.length - 1,
        song: songs[this.$route.params.id],
        isPlaying: true,
        isLoop: false,
        volumeSliderVisible: false,
        volume: 5,
        progress: 0,
        playtime: 0
      }
    },
    methods: {
      changePlaybackPosition () {
        let lengthinSec = this.song.length / 1000
        this.movePlayhead(event)
        audioPlayer.currentTime = lengthinSec * this.clickPercent(event)
      },
      clickPercent (event) {
        return (event.clientX - this.getPosition(timeline)) / 160;
      },
      getPosition(el) {
        return el.getBoundingClientRect().left;
      },
      movePlayhead(event) {
        this.progress = this.getPosition(timeline)
      },
      update () {
        let vm = this
        vm.playtime = Math.floor(event.target.currentTime) * 1000
        vm.progress = (vm.playtime / vm.song.length) * 100  
      },
      finished () {
        let vm = this
        if (!vm.isLoop) {
          vm.reset()
          vm.next()
        }
      },
      togglePlay () {
        let vm = this
        if (vm.isPlaying) {
          audioPlayer.pause()
          vm.isPlaying = false
        } else {
          audioPlayer.play()
          vm.isPlaying = true
        }
      },
      reset () {
        audioPlayer.load()
        audioPlayer.loop = false
        this.progress = 0
        this.playtime = 0
        this.isLoop = false
        this.isPlaying = true
      },
      toggleLoop () {
        audioPlayer.loop = !audioPlayer.loop
        this.isLoop = !this.isLoop
      },
      prev () {
        this.reset()
        let vm = this
        if (vm.currentTrack <= 0) {
          vm.currentTrack = vm.totalTracks
        } else if (vm.currentTrack > vm.totalTracks) {
          vm.currentTrack = 0
        } else {
          vm.currentTrack--
        }
        vm.song = songs[vm.currentTrack]
      },
      next () {
        this.reset()
        let vm = this
        if (vm.currentTrack < 0) {
          vm.currentTrack = vm.totalTracks
        } else if (vm.currentTrack >= vm.totalTracks) {
          vm.currentTrack = 0
        } else {
          vm.currentTrack++
        }
        vm.song = songs[vm.currentTrack]
      },
      changeVolume () {
        this.volume = event.target.value
        audioPlayer.volume = this.volume / 10
      }
    },
    created () {
      const audioPlayer = document.getElementById('audioPlayer')
      const timeline = document.getElementById('timeline')
      bus.$on('pickSong', (index) => {
        this.currentTrack = index
        this.song = songs[index]
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';
  @import '../assets/scss/global.scss';

  .panel {
    width: 300px;
    margin: 0 auto 20px;
    .panel-heading {
      cursor: default;
    }
    .panel-body {
      .text-wrapper {
        border-radius: 5px;
        padding: 10px 5px;
        h1 { 
          font-family: $accent-font;
          letter-spacing: 1px;
          color: $color1; 
          margin: 0 0 5px; 
        }
        h2 { color: $color4; font-family: $accent-font; }
      }
      
      .progress-wrapper {
        @extend .flex-default;
        height: 10px;
        margin-top: 20px;

        .progress {
          width: 160px;
          margin: 0;
          .progress-bar {
            background-color: $color3;
          }
        }

        .playtime, .length { font-size: 1rem; }
        .playtime { margin-right: 5px; }
        .length { margin-left: 5px; }
      }

      .controller-wrapper {
        @extend .flex-default;
        margin-top: 30px;
        button {
          width: 30px;
          height: 30px;
          margin: 0 2.5px;
          background-color: $color2;
          border-color: $color2;
        }
        .repeat-true {
          color: $color4;
        }

        .volume-wrapper {
          position: relative;
          .fa-volume-up { color: $color4; }
          #range-slider {
            position: absolute;
            bottom: 20px;
            right: -35px;
            -webkit-appearance: none;
            transform: rotate(270deg);
            width: 50px;
            height: 10px;
            border-radius: 3px;
            background: $base-black;
            outline: none;
            padding: 0;
            margin: 0;

            &::-webkit-slider-thumb {
              appearance: none;
              width: 8px;
              height: 10px;
              background: $color1;
              cursor: pointer;
              transition: all 0.2;
              &:hover {
                background: $color4;
              }
            }
            &::-moz-range-thumb {
              width: 8px;
              height: 10px;
              background: $color1;
              cursor: pointer;
              transition: all 0.2;
              &:hover {
                background: $color4;
              }
            }            
          }
        }
      }
    }
  }
</style>