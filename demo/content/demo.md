# [vue-in-view](https://github.com/BKWLD/ue-in-view)

## Scoped Slot

You can use the default scoped slot to access the `visible` state.

<demos-scoped-slots></demos-scoped-slots>

```vue
<vue-in-view>
  <template #default='{ visible }'>
    <div :class='["box", { visible }]'></div>
  </template>
</vue-in-view>
```
