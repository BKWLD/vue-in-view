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
