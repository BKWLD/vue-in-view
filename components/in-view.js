export default {

	props: {
		animate: Boolean, // Control CSS animations
		once: Boolean, // Stop reacting after first intersection
		classes: Boolean, // Add "visible" class to child when intersecting
		when: {  // Used to delay triggering until farther into viewport
			type: Number,
			default: 0,
		}
	},

	// Store visibile state
	data() {
		return {
			visible: null, // Is the element intersecting with viewport
			initialState: true, // Are we checking the initial state
			viewportHeight: null,
		}
	},

	// Start observing immediately
	mounted() {
		this.startObserving()
		if (this.when) {
			this.updateViewport()
			window.addEventListener('resize', this.updateViewport)
		}
	},

	// Cleanup observer
	beforeDestroy() {
		this.stopObserving()
		window.removeEventListener('resize', this.updateViewport)
	},

	computed: {

		// Calculate the intersection observer's rootMargin
		rootMargin() {
			if (!this.when) return
			return `0% 0% -${this.when * 100}% 0%`
		}

	},

	watch: {

		// React to visiblity changes
		visible() {

			// Fire event
			this.visible ? this.$emit('visible') : this.$emit('hidden')

			// Control animations
			if (this.animate) {

				// On the initial response, stop any animations that play in elements
				// not in the initial viewport. If they were already in the viewport,
				// allow them to continue.
				if (this.initialState && !this.visible) this.resetAnimations()

				// If not the initial state, play animations that enter the viewport.
				// We don't run this on the intiial state so we don't touch animations
				// that started out playing, pre-JS.
				else if (!this.initialState && this.visible) this.playAnimations()

				// Also, if there is a non-zero until
			}

			// Respect `once` prop
			if (this.once && this.visible) this.stopObserving()

			// We've now processed the initial state
			this.initialState = false
		}

	},

	methods: {

		// Start watching for intersections with viewport
		startObserving() {
			this.observer = new IntersectionObserver(([entry]) => {
				this.visible = entry.isIntersecting
			}, {
				rootMargin: this.rootMargin
			})
			this.observer.observe(this.$el)
		},

		// Destroy IntersectionObserver
		stopObserving() {
			if (this.observer) this.observer.disconnect()
		},

		// Restart all css animations inside the container
		resetAnimations() {
			this.$el.getAnimations({ subtree: true }).forEach(animation => {
				animation.pause()
				animation.currentTime = 0
			})
		},

		// Play all css animation inside the container
		playAnimations() {
			this.$el.getAnimations({ subtree: true }).forEach(animation => {
				animation.play()
			})
		},

		// Watch for the viewport height to change
		updateViewport() {
			this.viewportHeight = window.innerHeight
		}
	},

	render(create) {

		// Make wrapper component that is used to measure visibility from.  I'd
		// love to have an implementation that didn't require nesting thse slot in
		// the wrapper div but Vue just doesn't give an API for this.
		return create('div', {

			// Add dynamic classes
			class: this.classes ? (this.visible ? 'visible' : 'hidden') : undefined,

		// Render the default slot through a scoped slot
		}, [
			this.$scopedSlots.default({
				visible: this.visible,
			})
		])
	},
}
