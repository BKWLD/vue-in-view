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
