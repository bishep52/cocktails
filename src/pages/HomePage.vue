<script setup>
import AppLayout from '../components/AppLayout.vue'
import { useRootStore } from '@/stores/root.js'
import { storeToRefs } from 'pinia'
import CocktailThumb from '@/components/CocktailThumb.vue'

const rootStore = useRootStore()
rootStore.getIngredients()

const { ingredients, ingredient, cocktails } = storeToRefs(rootStore)

function getCocktails() {
  rootStore.getCocktails(rootStore.ingredient)
}

function removeIngredient() {
  rootStore.setIngredient(null)
}
</script>

<template>
  <AppLayout
    imgUrl="/src/assets/images/cock.jpg"
    :backFunc="removeIngredient"
    :is-back-button-visible="!!ingredient"
  >
    <div class="root__main-wrapper main">
      <div class="main__info" v-if="!ingredient || !cocktails">
        <h1 class="main__title title">Choose your drink</h1>
        <div class="main__line line"></div>
        <div class="main__select">
          <div class="main__select-wrapper">
            <el-select
              v-model="rootStore.ingredient"
              placeholder="Choose main ingredient"
              size="large"
              filterable
              allow-create
              class="main__select-item"
              @change="getCocktails"
            >
              <el-option
                v-for="item in ingredients"
                :key="item.strIngredient1"
                :label="item.strIngredient1"
                :value="item.strIngredient1"
              />
            </el-select>
          </div>
        </div>
        <p class="main__description">
          Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by
          ingredient through our cocktail generator.
        </p>
        <img src="/src/assets/images/cocktails.png" alt="Cocktails" class="main__image" />
      </div>
      <div class="main__info" v-else>
        <h1 class="main__title title">COCKTAILS WITH {{ ingredient }}</h1>
        <div class="main__line line"></div>
        <div class="main__cocktails cocktails">
          <CocktailThumb
            v-for="cocktail in cocktails"
            :key="cocktail.idDrink"
            :cocktail="cocktail"
          />
        </div>
      </div>
    </div>
  </AppLayout>
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

  &__select {
    &-wrapper {
      padding-top: 50px;
    }

    &-item {
      width: 220px;
    }
  }

  &__description {
    max-width: 516px;
    margin: 0 auto;
    padding-top: 50px;
    line-height: 36px;
    letter-spacing: 0.1em;
    color: $color-gray;
  }

  &__image {
    margin: 60px auto 0;
  }
}

.cocktails {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 20px;
  margin-top: 60px;
  max-height: 550px;
  overflow-y: auto;
}
</style>
