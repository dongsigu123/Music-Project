<template>
	<!-- 这是歌手专辑页面 -->
	<div class="album">
		<ul>
			<router-link v-for="m in Album" tag="li" :key="m.id" :to="{path:'/albummusic/'+m.id}">
				<div class="left">
					<img :src="m.picUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
				</div>
				<div class="right">
					<p class="p1">{{m.name}}</p>
					<p class="p2">
						<span class="s1">{{m.publishTime|time}}</span>
						<span class="s2">{{m.size}}首</span>
					</p>
				</div>
			</router-link>
		</ul>
		<Loading v-if="Album.length<=0"></Loading>
	</div>
</template>

<script>
	import Loading from "./Loading.vue"
	export default{
		components:{
			Loading
		},
		data(){
			return {
				zjsong:[]
			}
		},
		props:{
			Album:Array
		},
		methods:{
		},
		created() {
			
		},
		filters:{
			time(value){
				let date=new Date(value);
				let year=date.getFullYear();
				let moth=date.getMonth()+1;
				let day=date.getDate();
				return year+"年"+moth+"月"+day+"日";
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.album{
		width: 100%;
		ul{
			width: 100%;
			padding-top: 0.1875rem;
			li{
				width: 100%;
				overflow: hidden;
				margin-bottom: 0.3125rem;
				border-bottom: 1px solid #ddd;
				.left{
					width: 25%;
					float: left;
					height: 100%;
					position: relative;
					margin-left: 3%;
					img{
						width: 100%;
						vertical-align: bottom;
					}
					&::after{
						content: "";
						width: 20%;
						height: 90%;
						top: 5%;
						background-image: url(../assets/index_icon_2x.png);
						background-size: 20.75rem 12.125rem;
						background-position: 0 -3.75rem;
						position: absolute;
					}
				}
				.right{
					width: 70%;
					text-align: left;
					float: right;
					height: 100%;
					margin-top: 1.875rem;
					p{
						margin-left: 1.25rem;
					}
					.p1{
						width: 100%;
						color: #333;
						font-size: 1.25rem;
					}
					.p2{
						.s1,.s2{
							font-size: 0.875rem;
							color: #999;
						}
						.s2{
							margin-left: 0.9375rem;
						}
					}
				}
			}
		}
	}
</style>
