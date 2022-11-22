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
