<template>
	<!-- 这是热歌组件 -->
	<div class="hot">
		<Return>热歌榜</Return>
		<div class="hottitle">
				<div class="tp"></div>
				<p>更新日期 : {{updateDate|formatDate}}</p>
				<div class="yy"></div>
		</div>
		<ul>
			<Songlist v-for="(item, k) in hotmusic" :songstr="hotmusic" :item="item" :key="item.id">
				<div class="leftnum">{{k+1|leftnum}}</div>
			</Songlist>
		</ul>
		<Loading v-if="hotmusic.length<20*num"></Loading>
		<button @click="abc">点击加载更多</button>
	</div>
</template>

<script>
	import Songlist from "../components/Songlist.vue"
	import Loading from "../components/Loading.vue"
	import Return from "../components/Return.vue"
	export default{
		components:{
			Songlist,
			Loading,
			Return
		},
		data(){
			return {
				updateDate:new Date(),
				hotmusic:[],
				num:0
			}
		},
		methods:{
			abc(){//点击加载更多热歌
				this.loadmusic(this);
			},
			loadmusic(vm){
				let musiclistids=[];
				vm.num++;
				vm.$http.get("/top/list?idx=1").then(data=>{
					vm.updateDate=data.data.playlist.updateTime;//获取更新日期
					musiclistids=data.data.playlist.trackIds.slice(20*(vm.num-1),20*vm.num);
				}).then(()=>{
					for(let v of musiclistids){
						vm.$http.get("song/detail?ids="+v.id).then((data)=>{
							vm.hotmusic.push({
								name:data.data.songs[0].name,
								id:data.data.songs[0].id,
								song:{
									alias:data.data.songs[0].alia,
									privilege:{
										maxbr:data.data.privileges[0].maxbr
									},
									artists:data.data.songs[0].ar
								}
							});
						})
					}
				})
			}
		},
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				if(typeof vm.$route.params.num == 'undefined'){//判断有没有路由进来 如果有路由.不清空原来数据.
					vm.hotmusic=[];
					vm.num=0;
				}
				vm.loadmusic(vm);
			});
		},
		beforeRouteUpdate(to,from,next){
			this.loadMusic(this);
			next();
		},
		filters:{
			formatDate(value){
				let d=new Date(value);
				let month=(d.getMonth()+1);
				return (month<10?"0"+month:month)+"月"+d.getDate()+"日";
			},
			leftnum(value){
				if(value<10){
					return "0"+value;
				}else{
					return value;
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.hot{
		padding-top: 2.5rem;
		.hottitle{
			background:url(../assets/hot_music_bg_2x.jpg) no-repeat center;
			background-size:cover;
			position: relative;
			height: 10.5625rem;
			.tp{
				background-image: url(../assets/index_icon_2x.png);
				width: 8.875rem;
				height: 4.1875rem;
				background-position: -1.5rem -1.875rem;
				background-size: 10.375rem 6.0625rem;
				position: absolute;
				top: 1.875rem;
				left: 1.25rem;
				z-index: 2;
			}
			p{
				position: absolute;
				left: 0.9375rem;
				transform: scale(0.9);
				bottom: 0.9375rem;
				color: white;
				font-size: 0.8125rem;
				z-index: 2;
			}
			.yy:after{
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
					background-color: rgba(0,0,0,.2);
			}
		}
		.leftnum{
			line-height: 2.5rem;
			padding-right: 0.625rem;
			float: left;
			color: #df3436;
			width: 8%;
			text-align: center;
		}
		li:nth-of-type(n+4) .leftnum{
			color: #999;
		}
		button{
			outline: none;
			border: none;
			margin: 0.9375rem auto;
			background-color: transparent;
		}
	}
</style>