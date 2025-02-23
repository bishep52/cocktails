<template>
  <div class="cocktails__item">
    <RouterLink :to="`/cocktail/${cocktail.idDrink}`">
      <div
        class="cocktails__image"
        :style="`background-image: url(${cocktail.strDrinkThumb})`"
      ></div>
    </RouterLink>

    <div class="cocktails__name">{{ cocktail.strDrink }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  cocktail: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/main';

.cocktails__item {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}

.cocktails__image {
  width: 120px;
  aspect-ratio: 1;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
  border-radius: 7px;
}
</style>
