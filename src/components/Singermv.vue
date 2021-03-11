<template>
	<!-- 这是歌手mv页面 -->
	<div class="singermv">
		<ul>
			<li class="lmv" v-show="Singermv.length==0">
				<p class="pmv">该歌手还没有发布MV哦！</p>
			</li>
			<router-link v-for="m in Singermv" :key="m.id" tag="li" :to="{path:'/mv/'+m.id}">
				<div class="left">
					<img :src="m.imgurl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
					<span class="s1 iconfont icon-bofang1"></span>
					<span class="s2 iconfont icon-bofang2"> {{m.playCount|shuliang}}</span>
				</div>
				<div class="right">
					<p class="p1">{{m.name}}</p>
					<p class="p2">{{m.publishTime}}</p>
				</div>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default{
		props:{
			Singermv:Array
		},
		methods:{
		},
		filters:{
			shuliang(value){
				let str=" "+(value/10000).toFixed(1)+"万";
				return str;
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.singermv{
		width: 100%;
		ul{
			width: 100%;
			li{
				width: 100%;
				overflow: hidden;
				border-bottom: 1px solid #ddd;
				margin-bottom: 0.3125rem;
				div{
					float: left;
				}
				.left{
					width: 40%;
					position: relative;
					img{
						width: 100%;
						height: 6.875rem;
						vertical-align: bottom;
					}
					span{
						color: white;
						text-shadow: 2px 3px 3px rgba(0,0,0,0.5);
					}
					.s1{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-50%);
						font-size: 1.875rem;
					}
					.s2{
						position: absolute;
						left: 5%;
						bottom: 5%;
						font-size: 0.875rem;
					}
				}
				.right{
					padding-left: 0.625rem;
					width: 60%;
					text-align: left;
					.p1{
						margin-top: 0.4375rem;
						display: block;
						font-size: 1.125rem;
						color: #333;
					}
					.p2{
						font-size: 0.875rem;
						color: #999;
						display: block;
					}
				}
			}
			.lmv{
				text-align: center;
				line-height: 12.5rem;
				border-bottom: none;
				.pmv{
					width: 100%;
					font-size: 1.5rem;
					line-height: 12.5rem;
					color: #999;
					font-weight: bold;
				}
			}
		}
	}
</style>
