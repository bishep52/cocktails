<script setup>
import axios from 'axios'
import AppLayout from '../components/AppLayout.vue'
import { computed, ref } from 'vue'
import { COCKTAIL_RANDOM, INGREDIENT_PICTURE } from '@/constants'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const cocktail = ref(null)

const ingredients = computed(() => {
  const ingredients = []

  for (let i = 1; i <= 15; i++) {
    if (!cocktail.value[`strIngredient${i}`]) break
    const ingredient = cocktail.value[`strIngredient${i}`]

    ingredients.push(ingredient)
  }

  return ingredients
})

async function getCocktail() {
  try {
      const response = await axios.get(`${COCKTAIL_RANDOM}`)
      cocktail.value = response?.data?.drinks[0]
  } catch (e) {
    console.error(e)
  }
}

getCocktail()
</script>

<template>
  <div v-if="cocktail">
    <AppLayout :imgUrl="cocktail.strDrinkThumb">
      <div class="root__main-wrapper main">
        <div class="main__info">
          <h1 class="main__title title">{{ cocktail.strDrink }}</h1>
          <div class="main__line line"></div>
          <div class="main__slider">
            <swiper :slides-per-view="3" :space-between="50" class="swiper">
              <swiper-slide class="swiper__slide" v-for="(ingredient, key) in ingredients" :key="key">
                <img :src="`${INGREDIENT_PICTURE}${ingredient}-Small.png`" alt="" />
                <p class="swiper__title">
                  {{ ingredient }}
                </p>
              </swiper-slide>
            </swiper>
          </div>
          <div class="main__instructions">
            <p>{{ cocktail.strInstructions }}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
  <div v-else>loading</div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';

.main {
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-self: start;
    row-gap: 20px;
    padding: 50px 0 80px;

    &-item {
      position: relative;
      padding-left: 30px;

      &::before {
        position: absolute;
        content: '';
        width: 17px;
        aspect-ratio: 1;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background: url('/src/assets/images/heart.svg') no-repeat 50% 50%;
      }
    }
  }

  &__instructions {
    width: 516px;
    margin: 0 auto;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0.1em;
    color: $color-gray;
  }

  &__slider {
    padding: 50px 0;
  }
}

.swiper {
  width: 586px;

  &__slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    user-select: none;
  }
}
</style>
