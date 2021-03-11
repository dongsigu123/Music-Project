<template>
	<!-- 这是精选歌单 -->
	<div class="selected">
		<Return>精选歌单</Return>
		<div class="switch">
			<div @click="circle" class="circle"></div>
			<span class="s1">最热</span>
			<span class="s2">最新</span>
		</div>
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
			return{
				curindex:1,
				order:"hot",
				cat:"全部",
				str:["全部","华语","古风","流行","欧美"],
				songsheet:[]
			}
		},
		methods:{
			liclick(value){
				this.curindex=value;
				this.cat=this.str[value-1];
				this.loadmusic();
			},
			circle(e){
				if(this.order=="hot"){
					e.target.style.left="26px";
					this.order="new";
				}else{
					e.target.style.left="0px";
					this.order="hot";
				}
				this.loadmusic();
			},
			loadmusic(value){
				this.$axios.get("/top/playlist?limit=30&order="+this.order+"&cat="+this.cat).then(data=>{
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
	.selected{
		width: 100%;
		padding-top: 5rem;
		.switch{
			position: fixed;
			top: 0.5rem;
			right: 2.5rem;
			border: 1px solid #8b8b8b;
			border-radius: 0.9375rem;
			width: 3.125rem;
			height: 1.5rem;
			background-image: linear-gradient(to right, pink,skyblue);
			z-index: 3;
			.circle{
				background-image: linear-gradient(to right bottom,white,black);
				width: 1.5rem;
				height: 1.5rem;
				border-radius: 50%;
				position: absolute;
				left: 0;
				transition: left 0.3s linear;
			}
			span{
				position: absolute;
				top: 0;
				color: white;
				font-size: 0.875rem;
			}
			.s1{
				transform: translate(-110%,10%);
				left: 0;
			}
			.s2{
				transform: translate(110%,10%);
				right: 0;
			}
		}
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
