<template>
	<!-- 这是精选歌单、精品歌单里面的歌单 -->
	<div class="songsheet">
		<ul>
			<router-link tag="li" v-for="m in songsheet" :key="m.id" :to="{path:'/musiclist/'+m.id}">
				<div>
					<img :src="m.coverImgUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
					<p>{{m.name|substr}}</p>
					<span class="iconfont icon-V"> {{m.playCount|shuliang}}</span>
				</div>
			</router-link>
		</ul>
		<Loading v-if="songsheet.length<=0"></Loading>
	</div>
</template>

<script>
	import Loading from "./Loading.vue"
	export default{
		components:{
			Loading
		},
		props:{
			songsheet:Array
		},
		methods:{
			
		},
		filters:{
			shuliang(value){
				if(value<10000){
					return value;
				}else{
					let str=" "+(value/10000).toFixed(1)+"万";
					return str;
				}
			},
			substr(value){
				if(value.length<=20){
					return value;
				}else{
					let str=value.substr(0,20)+"...";
					return str;
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.songsheet{
		width: 100%;
		ul{
			width: 100%;
			overflow: hidden;
			li{
				width: 45%;
				margin-left: 3.3%;
				float: left;
				margin-top: 0.4375rem;
				div{
					width: 100%;
					position: relative;
					img{
						height: 9.375rem;
						width: 100%;
					}
					p{
						color: #333;
						width: 95%;
						margin: 0 auto;
						font-size: 0.875rem;
						text-align: left;
						line-height: 1.25rem;
					}
					span{
						color: white;
						font-size: 0.75rem;
						text-shadow: 2px 3px 3px rgba(0,0,0,.5);
						position: absolute;
						top: 0.3125rem;
						right: 0.3125rem;
					}
				}
			}
		}
	}
</style>
