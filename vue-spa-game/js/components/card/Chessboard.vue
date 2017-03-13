<template>
	<div class='chessboard'>
		<Card v-for="(card,index) in cards"  :key="index"  :option="card" v-on:flipped='onFlipped'></Card>
	</div>
</template>
<script>
	import Card from './Card';
	import {mapActions,mapGetters} from 'vuex';
	import { STATUS } from '../../vuex/store/statusEnum';
	export default{
		data(){
			return {
			lastCard:null
			}
		},
		computed:{
			...mapGetters(['leftMatched','cards','status'])
		},
		methods:{
			...mapActions(['updateStatus','match','flipCards']),

		onFlipped(e){
			//游戏开始后，第一次翻牌时，开始为游戏计时
			if(this.status===STATUS.READY){
				this.updateStatus(STATUS.PLAYING);
			}
			//如果之前没有牌被翻开，把这张牌赋值给lastCard
			if(!this.lastCard){
			return this.lastCard=e;
			}
			//如果之前有牌被翻了，而且当前翻的牌正好和之前那张花色相同
			if(this.lastCard !== e && this.lastCard.cardName === e.cardName){
				//将lastCard置空
				this.lastCard=null;
				//触发配对成功的action
				this.match();
				//如果棋盘内所有牌都配对完毕，触发状态变更action,并告知已过关
				return this.leftMatched ||   this.updateStatus(STATUS.PASS);
			}
			let lastCard=this.lastCard;
			this.lastCard=null;
			setTimeout(() =>{
			this.flipCards([lastCard,e]);
			},1000);
		}
	},
		components:{Card}
	}
</script>
<style scoped>
	.chessboard{
		margin-top:20px;
		width:100%;
		background-color:#fff;
		height:530px;
		border-radius:4px;
		padding:10px 5px;
		display:flex;
		flex-wrap:wrap;
		justify-content:center;
		align-items:center;
		align-content:space-around;
	}
	.container:nth-child(4n){
		margin-right:0;
	}
	@media screen and (max-width:450px){
		.chessboard{
		height:480px;
		padding:10px 0;
		}
	}
	@media screen and (max-width:450px){
		.chessboard{
		height:450px;

		}
	}
</style>