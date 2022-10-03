# vue-in-view

Vue component for triggering animations, adding classes, firing events, and syncing slot variables based on visibility in the viewport.

- [View demo](https://vue-in-view.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/vue-in-view)

## Install

```sh
yarn add vue-in-view
```

### Default

```js
import InView from '@bkwld/vue-in-view'
Vue.component 'in-view', InView
```

### Nuxt

```js
// nuxt.config.js
export default {
  buildModules: [ 'vue-in-view/nuxt' ]
}
```

## Usage

Use the `animate` prop to have `vue-in-view` reset CSS animations when the component does not mount within the viewport.  When the user scrolls far enough to reveal the component, the animations will begin from the start. This is the primary use case of `vue-in-view`.

```vue
<template>
  <in-view animate class="box" />
</template>
<style>
.box {
  animation: box-intro 1s both;
}
@keyframes box-intro {
  to {
    background: pink;
  }
}
</style>
```

For more examples, check out [the demo](https://vue-in-view.netlify.app).

## API

### Props

| **Prop**    | **Default** | **Description**
|-------------|-------------|----------------
| `animate`   | `false`     | Reset CSS animations when hidden and play them when visible.
| `classes`   | `false`     | Adds `hidden` class when hidden and `visible` when visible.
| `once`      | `false`     | Stops watching for viewport changes after the first instance of the component being visible.

### Slots

| **Slot**    | **Description**
|-------------|----------------
| `default`   | **Slot props:**
|             | `visible` - True when `in-view` is visible.

### Events

| **Event**   | **Description**
|-------------|----------------
| `visible`   | Fired when `in-view` intersects the viewport.
| `hidden`    | Fired when not visible.


## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).
