<template>
	<!-- 这是歌曲、歌单评论组件 -->
	<li :key="item.itemId">
		<div class="left">
			<img :src="item.user.avatarUrl" alt="">
		</div>
		<div class="right">
			<div class="top">
				<p class="p1">
					<span :class="textcolor==1?'s1':'s11'">{{item.user.nickname}}</span>
					<span v-show="item.user.vipType!=0" class="s2 iconfont icon-vip"> {{item.user.vipType}}</span>
					<span :class="textcolor==1?'s3':'s33'" class="iconfont icon-dianzan"></span>
					<span :class="textcolor==1?'s4':'s44'">{{item.likedCount}}</span>
				</p>
				<p :class="textcolor==1?'p2':'p22'">{{item.time|time}}</p>
			</div>
			<div class="bottom">
				<p :class="textcolor==1?'p1':'p11'">{{item.content}}</p>
			</div>
		</div>
	</li>
</template>

<script>
	export default{
		props:{
			item:Object,
			textcolor:Number
		},
		methods:{
			
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
	li{
		width: 100%;
		overflow: hidden;
		padding-left: 0.9375rem;
		padding-top: 0.625rem;
		.left{
			float: left;
			width: 10%;
			img{
				width: 1.875rem;
				height: 1.875rem;
				border-radius: 50%;
				display: block;
			}
		}
		.right{
			float: left;
			width: 90%;
			border-bottom: 1px solid rgba(0,0,0,.1);
			.top{
				overflow: hidden;
				p{
					display: inline-block;
					text-align: left;
					width: 100%;
				}
				.p1{
					line-height: 1.125rem;
					.s1,.s11.s2{
						float: left;
					}
					.s1,.s11{
						font-size: 0.875rem;
					}
					.s1{
						color: hsla(0,0%,100%,.7);
					}
					.s11{
						color: #666;
					}
					.s2{
						color: #eabf07;
						font-size: 0.875rem;
						margin-left: 0.3125rem;
					}
					.s3,.s33,.s4,.s44{
						float: right;
						font-size: 0.75rem;
						margin-right: 0.4375rem;
					}
					.s3,.s4{
						color: hsla(0,0%,100%,.3);
					}
					.s33,.s44{
						color: #999;
					}
				}
				.p2,.p22{
					font-size: 0.875rem;
				}
				.p2{
					color: hsla(0,0%,100%,.3);
				}
				.p22{
					color: #999;
				}
			}
			.bottom{
				width: 100%;
				padding-bottom: 0.625rem;
				padding-top: 0.3125rem;
				border-bottom: 1px solid hsla(0,0%,100%,.1);
				.p1,.p11{
					text-align: left;
					width: 95%;
					line-height: 1.25rem;
					font-size: 0.9375rem;
				}
				.p1{
					color: white;
				}
				.p11{
					color: #333;
				}
			}
		}
	}
</style>
