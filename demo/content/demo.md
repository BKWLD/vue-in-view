# [vue-in-view](https://github.com/BKWLD/vue-in-view)

## CSS animation triggering

Use the `animate` prop to have `vue-in-view` reset CSS animations when the component does not mount within the viewport.  When the user scrolls far enough to reveal the component, the animations will begin from the start. This is the primary use case of `vue-in-view`.

In this example, there are two instances of the same component.  The first instance starts life in the viewport and it's CSS animation plays before JS inits. In fact, if you disable javascript, it will still execute.  The second instance's animation waits to play until it is scrolled into the viewport.

<demos-animate></demos-animate>
<demos-animate></demos-animate>

```vue
<template>
  <in-view animate class="box">
    <span class="title">CSS animation triggering demo</span>
  </in-view>
</template>

<style scoped>
.box {
  position: relative;
  height: 90vh;
  color: #0cffe1;
  border: 1px solid currentColor;
  border-radius: 1em;
  padding: 16px;
  margin-bottom: 5px;
  animation: box-intro 3s both;
}
@keyframes box-intro {
  to {
    box-shadow: 0 0 20px #ed1e79;
  }
}

.title {
  display: inline-block;
  position: sticky;
  font-size: 2em;
  font-weight: 300;
  top: 16px;
  transform-origin: left;
  animation: title-intro 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes title-intro {
  from {
    opacity: 0;
    transform: scale(1.5) translateY(10px);
  }
}
</style>
```

## Automatic CSS classes

Use the `classes` prop to add either `visible` or `hidden` CSS classes.  These won't be added until JS inits, so if you're using these to trigger a build in animation, you should use a select like `:not(.visible)` to set the before state. Generally, the `animate` prop is recommended over this approach because it doesn't depend on waiting for JS to initialize before running your build in animation.

<demos-classes></demos-classes>

```vue
<template>
  <in-view classes class="box">
    <span class="title">CSS classes demo</span>
  </in-view>
</template>

<style scoped>
.box {
  color: #0cffe1;
  height: 200px;
  border: 1px solid currentColor;
  border-radius: 1em;
  padding: 16px;
  transition: box-shadow 3s;
}
.box.visible {
  box-shadow: 0 0 20px #ed1e79;
}
.title {
  display: inline-block;
  font-size: 2em;
  font-weight: 300;
  transform-origin: left;
  transition: transform, scale;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
.box:not(.visible) .title {
  opacity: 0;
  transform: scale(1.5) translateY(10px);
}
</style>
```

## Scoped slot support

You can use the default scoped slot to access the `visible` state. This is a convenient to implement lazy loading of media or other components.  If you watch the network inspector for this page, note that `video.mp4` is not reqeusted until it's scrolled into the viewport.

If using it with `v-if`, like in this example, it's recommended to give the `in-view` component an initial height so that it the page doesn't dramatically reflow once the component enters the viewport.

<demos-scoped-slots></demos-scoped-slots>

```vue
<template>
  <in-view class="box">
    <template #default='{ visible }'>
      <transition name='fade'>
        <video v-if='visible' loop autoplay muted>
          <source type="video/mp4" src='/video.mp4'>
        </video>
      </transition>
       <div class="title">Scoped slot demo</div>
    </template>
  </in-view>
</template>

<style scoped>
.box {
  color: #0cffe1;
  border: 1px solid currentColor;
  border-radius: 1em;
  padding: 16px;
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}
.title {
  font-size: 2em;
  font-weight: 300;
  position: relative;
}
video {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

## Listen for events

For more complex use cases, use the emitted events to trigger functionality.  For instance, you might use this to make an XHR request when the component is visible.  Note how, in this example, the XHR request to "pokeapi.co" isn't made until the component enters the viewport.  The `once` prop is used to only request this data once.

<demos-events></demos-events>

```vue
<template>
  <in-view @visible='loadData' once class="box">
    <div class="title">Events demo</div>
    <transition name='reveal'>
      <p v-if='pokemon'>
        Your spirit Pokémon is:
        <strong>{{ pokemon.name }}</strong>.
      </p>
    </transition>
  </in-view>
</template>

<script>
export default {
  data() {
    return {
      pokemon: null,
    };
  },
  methods: {
    async loadData() {
      const num = Math.round(Math.random() * 100);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
      this.pokemon = await res.json();
    },
  },
};
</script>

<style scoped>
.box {
  height: 250px;
  color: #0cffe1;
  border: 1px solid currentColor;
  border-radius: 1em;
  padding: 16px;
  overflow: hidden;
}
.title {
  font-size: 2em;
  font-weight: 300;
}
strong {
  color: #ed1e79;
}
.reveal-enter-active {
  transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-enter {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
```

## Delay until farther into viewport

This waits to trigger the in-viewport behavior until the element is 25% into the viewport. If scrolled back out, it will play in the reverse direction.

<demos-when></demos-when>

```vue
<template>
  <in-view animate when='25%' class="box">
    <span class="title">I'm now 25% into the viewport</span>
  </in-view>
</template>

<style scoped>
.box {
  position: relative;
  color: #0cffe1;
  border: 1px solid currentColor;
  border-radius: 1em;
  padding: 16px;
  animation: box-intro 3s both;
}

.title {
  font-size: 2em;
  font-weight: 300;
  animation: title-intro 1s both;
}
@keyframes title-intro {
  from {
    opacity: 0;
  }
}
</style>
```

## Other target options

Use the `target` option to control which animations are controlled by `in-view`.  By default, all descendant animations are controlled

<demos-target></demos-target>

```vue
<template>
  <in-view animate target='self' class="box">
    <in-view animate target='children' when='5%'>
      <span class="title">My animation started later than my parent's.</span>
    </in-view>
  </in-view>
</template>

<style scoped>
.box {
  position: relative;
  color: #0cffe1;
  border: 1px solid currentColor;
  border-radius: 1em;
  padding: 25vh 16px;
  animation: box-intro 3s both;
}
@keyframes box-intro {
  to {
    box-shadow: 0 0 20px #ed1e79;
  }
}

.title {
  font-size: 2em;
  font-weight: 300;
  animation: title-intro 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes title-intro {
  from {
    opacity: 0;
    transform: scale(1.5) translateY(10px);
  }
}
</style>
```
