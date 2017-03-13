<template>
	<div class="game-panel">
		<Dashboard></Dashboard>
		<Chessboard></Chessboard>
		<Status></Status>
	</div>
</template>
<script>
	import Dashboard from './dashboard/Dashboard';
	import Chessboard from './card/Chessboard'
	import Status from './footer/PlayStatus';

	 //从vuex中拿出mapActions工具
	 import { mapActions } from 'vuex';
	 //状态枚举
	 import { STATUS } from '../vuex/store/statusEnum';

	export default{
		methods:{
			...mapActions(['updateStatus','reset'])
		},
		created(){
			this.updateStatus('STATUS.READY');
			this.reset();
		},
		components:{Dashboard,Chessboard,Status}
	}
</script>
<style scoped>
	.game-panel{
		width:450px;
		height:670px;
		border:4px solid #bdbdbd;
		border-radius:2px;
		background-color:yellow;
		padding:10px;
		display:flex;
		flex-direction:column;
	}
	@media screen and (max-width:450px){
		.game-panel{
		width:100%;
		height:100%;
		justify-conetnt:space-around;
		}
	}
</style>