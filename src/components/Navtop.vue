<template>
	<!-- 这是导航栏组件 -->
	<div class="nav">
		<ul>
			<li>
				<router-link to="/">推荐</router-link>
			</li>
			<li>
				<router-link to="/find">发现</router-link>
			</li>
			<li>
				<router-link to="/search">搜索</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
	.nav{
		width: 100%;
		position: fixed;
		left: 0;
		z-index: 3;
		background-color: white;
		top: 0;
		ul{
			width: 100%;
			display: flex;
			border-bottom: 1px solid #eee;
			li{
				flex: 1;
				line-height: 2.5rem;
				a{
					color: #999;
					font-size: 1.125rem;
					font-weight: bold;
					text-decoration: none;
					&.router-link-exact-active{
						font-size: 1.25rem;
						color: #dd001b;
					}
				}
			}
		}
	}
</style>
