<template>
	<!-- 这是加载中组件 -->
	<div>
		<div class="top">
		</div>
		<div class="bottom">
			<i>加</i>
			<i>载</i>
			<i>中</i>
			<i>.</i>
			<i>.</i>
			<i>.</i>
		</div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
	div{
		width: 50%;
		margin: 0 auto;
		.top{
			background-image: url(../assets/loading.gif);
			background-size: 11.84375rem 9.59375rem;
			width: 11.84375rem;
			height: 9.59375rem;
		}
		.bottom{
			width: 100%;
			margin-top: 0.4375rem;
			i{
				font-style: normal;
				font-weight: bold;
				margin: 0.0625rem;
				display: inline-block;
				animation: loading 0.9s linear -0.4s infinite alternate-reverse;
				&:nth-of-type(n+4){
					font-size: 1.5rem;
				}
				&:nth-child(1){
					animation-delay: -1s;
				}
				&:nth-child(2){
					animation-delay: -0.8s;
				}
				&:nth-child(3){
					animation-delay: -0.6s;
				}
				&:nth-child(4){
					animation-delay: -0.4s;
				}
				&:nth-child(5){
					animation-delay: -0.2s;
				}
				&:nth-child(6){
					animation-delay: 0s;
				}
			}
		}
	}
	@keyframes loading{
		0%{
			transform: translateY(0px);
		}
		50%{
			transform: translateY(-0.4375rem);
		}
		100%{
			transform: translateY(0px);
		}
	}
</style>
