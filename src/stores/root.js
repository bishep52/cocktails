import { defineStore } from 'pinia'
import axios from 'axios'
import { INGREDIENTS_URL, COCKTAILS_BY_INGREDIENT_URL } from '../constants'

export const useRootStore = defineStore('root', {
  state: () => ({
    ingredients: [],
    ingredient: null,
    cocktails: [],
  }),
  actions: {
    async getIngredients() {
      try {
          const response = await axios.get(INGREDIENTS_URL)
          this.ingredients = response?.data?.drinks
      } catch (e) {
        console.error(e)
      }
    },
    async getCocktails(ingredient) {
      try {
          const response = await axios.get(`${COCKTAILS_BY_INGREDIENT_URL}${ingredient}`)
          this.cocktails = response?.data?.drinks
      } catch (e) {
        console.error(e);
      }
    },
    setIngredient(val) {
      this.ingredient = val
    },
  },
})
