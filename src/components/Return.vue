<template>
	<!-- 这是页面的返回按钮 -->
	<p class="pfh">
		<span class="fhbtn iconfont icon-zuojiantou" @click.self="fhbtn"></span>
		<span class="s2"><slot></slot></span>
	</p>
</template>

<script>
	export default{
		methods:{
			fhbtn(){
				window.scroll(0,0);
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.pfh{
		position: fixed;
		text-align: left;
		top: 0;
		width: 100%;
		left: 0;
		line-height: 2.5rem;
		height: 2.5rem;
		z-index: 3;
		background-color: #dd001b;
		.fhbtn{
			font-weight: bold;
			font-size: 1.5625rem;
			color: white;
			position: absolute;
			left: 0.4375rem;
		}
		.s2{
			font-weight: bold;
			font-size: 1.25rem;
			color: white;
			position: absolute;
			left: 2.5rem;
		}
	}
</style>
