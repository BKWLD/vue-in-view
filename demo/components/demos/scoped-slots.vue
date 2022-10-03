<template>

<vue-in-view animate>
  <template #default='{ visible }'>
    <div :class='["box", { visible }]'>
      <h1><span>Demo</span></h1>
    </div>
  </template>
</vue-in-view>

</template>

<style lang='stylus' scoped>

// Zoom in the title
h1 span
	display inline-block
	@keyframes h1-intro
		from
			opacity 0
			transform scale(1.5) translateY(10px)
		to
			opacity 1
			transform scale(1) translateY(0)
	animation h1-intro 1s ease-out-quint both

</style>
