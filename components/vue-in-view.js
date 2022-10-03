export default {

	// data() {},

	methods: {

		getDefaultSlot() {
			const vnode = (this.$slots.default || [])
				.filter(vnode => !vnode.text)
				.at(0)
			if (!vnode) return
			const newVnode = { ...vnode }
			newVnode.data = { ...vnode.data }
			return newVnode
		}
	},

	render(create) {
		// const slot = this.getDefaultSlot()
		// console.log(slot)
		// return this.getDefaultSlot()
		return create('div', {
			class: 'vue-in-view',
		}, [
			this.$scopedSlots.default({
				visible: true,
			})
		])
	},
}
