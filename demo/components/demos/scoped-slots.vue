<template>

<vue-in-view>
  <template #default='{ visible }'>
    <div :class='["box", { visible }]'></div>
  </template>
</vue-in-view>

</template>
