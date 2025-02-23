<template>
  <section class="root">
    <div class="root__image" :style="`background-image: url(${imgUrl})`"></div>
    <div class="root__main">
      <div class="root__main-controls controls">
        <el-button
          type="primary"
          :icon="Back"
          circle
          class="controls__button-circle"
          @click="goBack"
          v-if="isBackButtonVisible"
        />
        <el-button class="controls__button" @click="goForCocktailRandom"
          >Get random cocktail
        </el-button>
      </div>
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, defineProps } from 'vue'
import { Back } from '@element-plus/icons-vue'
import { ROUTES_PATHS } from '@/constants'

const props = defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
  backFunc: {
    type: Function,
  },
  isBackButtonVisible: {
    type: Boolean,
    default: true,
  },
})

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name)

function goForCocktailRandom() {
  router.push(ROUTES_PATHS.COCKTAIL_RANDOM)

  if (routeName.value === ROUTES_PATHS.COCKTAIL_RANDOM) router.go()
}

function goBack() {
  props.backFunc ? props.backFunc() : router.go(-1)
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/main';

.root {
  display: flex;
  min-height: 100vh;
  background-color: $color-dark;

  &__image {
    width: 50%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
  }

  &__main {
    position: relative;
    width: 50%;
    padding: 32px 40px;
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__button {
    background-color: $color-accent;
    color: $color-light;
    border-color: $color-accent;

    &:hover {
      background-color: darken($color-accent, 10%);
      color: darken($color-light, 10%);
    }

    &-circle {
      width: 53px;
      height: 53px;
      border: 1px solid $color-light;
      border-radius: 50%;
      background-color: transparent;
      font-size: 25px;
      color: $color-light;

      &:hover {
        border-color: $color-accent;
        color: $color-accent;
      }
    }
  }
}
</style>
