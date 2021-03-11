<template>
	<!-- 这是全部mv里面的mv -->
	<div class="mvlist">
		<ul>
			<router-link tag="li" @click.native=liclick(m,mvdata) v-for="m in mvdata" :key="m.id" :to="{path:'/mv/'+m.id}">
				<div class="top">
					<img :src="m.cover+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
					<span class="bf iconfont icon-bofang1"></span>
					<span class="bfsl iconfont icon-bofang2"> {{m.playCount|shuliang}}</span>
				</div>
				<div class="bottom">
					<p class="p1">名称: {{m.name|substr}}</p>
					<p class="p2">作者: {{m.artists[0].name|substr}}</p>
				</div>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default{
		props:{
			mvdata:Array
		},
		methods:{
			liclick(v,v2){
				var num = "",arr = [];
				for(let s of v2){
					arr.push(s.id);
				}
				for(let s in arr){
					if(v.id == arr[s]){
						num=s;
					}
					// console.log(s)
				}
				// console.log(num);
				this.$store.commit("modifystate",{
					isnavshow:false,
					mvids:arr,
					mvindex:num
				});
			}
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
				if(value.length<=14){
					return value;
				}else{
					let str=value.substr(0,14)+"...";
					return str;
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.mvlist{
		width: 100%;
		overflow: hidden;
		ul{
			width: 100%;
			overflow: hidden;
			li{
				width: 45%;
				float: left;
				margin: 0.4375rem 0 0.4375rem 3.3%;
				.top{
					position: relative;
					img{
						width: 100%;
						height: 5.3125rem;
					}
					span{
						position: absolute;
						color: white;
						text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
					}
					.bf{
						font-size: 2.5rem;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
					}
					.bfsl{
						font-size: 0.875rem;
						left: 0.3125rem;
						bottom: 0.4375rem;
					}
				}
				.bottom{
					text-align: left;
					height: 2.5rem;
					padding-left: 0.3125rem;
					.p1{
						font-size: 0.875rem;
						color: #333;
					}
					.p2{
						font-size: 0.75rem;
						color: #999;
					}
				}
			}
		}
	}
</style>