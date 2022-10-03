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
  height: 150px;
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
