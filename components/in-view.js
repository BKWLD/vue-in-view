export default {

	props: {
		animate: Boolean, // Control CSS animations
		once: Boolean, // Stop reacting after first intersection
		classes: Boolean, // Add "visible" class to child when intersecting
		when: {  // Used to delay triggering until farther into viewport
			type: Number | String,
			default: 0,
		},
		target: {
			type: String,
			default: 'descendants',
			validator(val) {
				return ['self', 'children', 'descendants'].includes(val)
			},
		},
	},

	// Store visibile state
	data() {
		return {
			visible: null, // Is the element intersecting with viewport
			initialState: true, // Are we checking the initial state
		}
	},

	// Start observing immediately
	mounted() {
		this.startObserving()
	},

	// Cleanup observer
	beforeDestroy() {
		this.stopObserving()
	},

	computed: {

		// Determin the when value, which accepts numbers and strings
		rootMarginBottom() {
			if (!this.when) return
			if (typeof this.when == 'string') return `-${this.when}`
			if (typeof this.when == 'number') {
				if (this.when >= 0 && this.when <= 1) return `-${this.when * 100}%`
				else return `-${this.when}px`
			}
		},

		// Calculate the intersection observer's rootMargin
		rootMargin() {
			if (!this.rootMarginBottom) return
			return `0% 0% ${this.rootMarginBottom} 0%`
		}

	},

	watch: {

		// Rebuild intersection obserer when root margin changes
		rootMargin() {
			this.stopObserving()
			this.startObserving()
		},

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

				// Play animations in reverse when no longer visible, like as an outro.
				// If the animations start delayed, reverse them.  Otherwise, we can
				// just hard reset when they aren't visible
				else if (!this.initialState && !this.visible) {
					if (this.rootMarginBottom) this.reverseAnimations()
					else this.resetAnimations()
				}
			}

			// Respect `once` prop
			if (this.once && this.visible) this.stopObserving()

			// We've now processed the initial state
			this.initialState = false
		},

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

		// Get the array of animationed to control
		getAnimations() {
			switch(this.target) {
				case 'self': return this.$el.getAnimations()
				case 'children':
					return Array.from(this.$el.children).reduce((animations, child) => {
						return animations.concat(child.getAnimations())
					}, [])
				case 'descendants': return this.$el.getAnimations({ subtree: true })
			}
		},

		// Restart all css animations inside the container
		resetAnimations() {
			this.getAnimations().forEach(animation => {
				animation.pause()
				animation.currentTime = 0
			})
		},

		// Play all css animation inside the container
		playAnimations() {
			this.getAnimations().forEach(animation => {
				animation.playbackRate = 1
				animation.play()
			})
		},

		// Play all css animation inside the container backwards
		reverseAnimations() {
			this.getAnimations().forEach(animation => {
				animation.playbackRate = -1
				animation.play()
			})
		},
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
