<template>
  <div id="list-wrapper">
    <input type="text" class="form-control" placeholder="Search" v-model="keyword" @keyup="search">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-lg-4" v-for="(song, index) in filteredRecords">
        <div class="panel panel-default">
          <div class="panel-heading" :style="{ 'background-image': 'url(../static/img/' + song.cover + ')' }" @mouseover="playShow(index)" @mouseleave="playHide(index)" @click="play(song)">
            <transition name="animatecss" enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
              <i class="fa fa-play-circle-o" v-show="playVisible[index]"></i>
            </transition>
          </div>

          <div class="panel-body">
            <dl>
              <dt>Title:</dt><dd>{{ song.title }}</dd>
              <dt>Artist:</dt><dd>{{ song.artist }}</dd>
              <dt>Length:</dt><dd>{{ song.length | ms2min }}</dd>
            </dl>
          </div>
        </div>
      </div>

    
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {bus} from '../main'
  import songs from '../db'

  export default {
    data() {
      return {
        keyword: '',
        playVisible: [false, false, false, false],
        filteredRecords: songs
      }
    },
    methods: {
      search () {
        let vm = this
        let keyword = vm.keyword.toLowerCase()
        vm.filteredRecords = _.filter(songs, (obj) => {
          let title = obj.title.toLowerCase()
          let artist = obj.artist.toLowerCase()
          if (title.includes(keyword) || artist.includes(keyword)) return obj
        })
      },
      playShow (index) {
        Vue.set(this.playVisible, index, true)
      },
      playHide (index) {
        Vue.set(this.playVisible, index, false)
      },
      play (song) {
        bus.$emit('pickSong', song.id)
        this.$router.push({ name: 'Play', params: { id: song.id } }) 
      }
    }
  }
</script>
