import '../css/main.css';
import Vue from 'vue';
import Game from './components/Game';
import store from './vuex/store';

new Vue({el:'#application',components:{Game},store})
