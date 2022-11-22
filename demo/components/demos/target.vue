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
