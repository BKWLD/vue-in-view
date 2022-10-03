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
