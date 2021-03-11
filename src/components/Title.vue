<template>
	<!-- 这是标题组件 -->
	<div>
		<h4><slot></slot></h4>
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
	div{
		h4{
			text-align: left;
			padding-left: 0.4375rem;
			border-left: 2px solid red;
			margin: 0.625rem 0;
			font-size: 0.875rem;
		}
	}
</style>
