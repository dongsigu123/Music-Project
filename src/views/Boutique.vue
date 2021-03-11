<template>
	<!-- 这是精品歌单 -->
	<div class="boutique">
		<Return>精品歌单</Return>
		<div class="nav">
			<ul>
				<li @click="liclick(1)" :class="curindex==1?'active':''">全部</li>
				<li @click="liclick(2)" :class="curindex==2?'active':''">华语</li>
				<li @click="liclick(3)" :class="curindex==3?'active':''">古风</li>
				<li @click="liclick(4)" :class="curindex==4?'active':''">流行</li>
				<li @click="liclick(5)" :class="curindex==5?'active':''">欧美</li>
			</ul>
		</div>
		<Songsheet :songsheet="songsheet"></Songsheet>
	</div>
</template>

<script>
	import Return from "../components/Return.vue"
	import Songsheet from "../components/Songsheet.vue"
	export default{
		components:{
			Return,
			Songsheet
		},
		data(){
			return {
				curindex:1,
				songsheet:[],
				cat:"全部",
				str:["全部","华语","古风","流行","欧美"]
			}
		},
		methods:{
			liclick(value){
				this.curindex=value;
				this.cat=this.str[value-1];
				this.loadmusic();
			},
			loadmusic(value){
				this.$axios.get("/top/playlist/highquality?cat="+this.cat).then(data=>{
					this.songsheet=data.data.playlists;
					// console.log(this.songsheet);
				})
			}
		},
		beforeRouteUpdate(to,from,next) {
			this.loadmusic();
			next();
		},
		created() {
			this.loadmusic();
		}
	}
</script>

<style lang="less" scoped="scoped">
	.boutique{
		width: 100%;
		padding-top: 5.3125rem;
		.nav{
			width: 100%;
			height: 2.5rem;
			border-bottom: 1px solid #ddd;
			position: fixed;
			top: 2.5rem;
			z-index: 2;
			background-color: white;
			ul{
				width: 100%;
				display: flex;
				li{
					flex: 1;
					font-size: 1.125rem;
					color: #999;
					line-height: 2.5rem;
					font-weight: bold;
				}
				.active{
					color: #dd001b;
					font-size: 1.25rem;
				}
			}
		}
	}
</style>
