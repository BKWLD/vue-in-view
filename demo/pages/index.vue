<!-- Demo homepage -->

<template lang='pug'>

nuxt-content(:document='page')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	# Get page content
	asyncData: ({ app, params, $content }) ->
		page = await $content('demo').fetch()
		return { page }

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

</style>
