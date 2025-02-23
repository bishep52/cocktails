<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import { computed, ref } from 'vue'
import { COCKTAIL_BY_ID } from '@/constants'

const route = useRoute()

const cocktail = ref(null)
const cocktailId = computed(() => route.path.split('/').pop())

const ingredients = computed(() => {
  const ingredients = []

  for (let i = 1; i <= 15; i++) {
    if (!cocktail.value[`strIngredient${i}`]) break
    const ingredient = {}
    ingredient.name = cocktail.value[`strIngredient${i}`]
    ingredient.measure = cocktail.value[`strMeasure${i}`]

    ingredients.push(ingredient)
  }

  return ingredients
})

async function getCocktail() {
  try {
      const response = await axios.get(`${COCKTAIL_BY_ID}${cocktailId.value}`)
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
          <ul class="main__list">
            <li class="main__list-item" v-for="(item, key) in ingredients" :key="key">
              {{ item.name }}
              <template v-if="item.measure">
                |
                {{ item.measure }}
              </template>
            </li>
          </ul>
          <div class="main__instructions">
            <p>{{ cocktail.strInstructions }}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
  <div v-else>
    <div class="loader"></div>
  </div>
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
}
</style>
