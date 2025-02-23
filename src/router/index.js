import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES_PATHS } from '@/constants'
import HomePage from '../pages/HomePage.vue'
import CocktailPage from '../pages/CocktailPage.vue'
import CocktailRandomPage from '../pages/CocktailRandomPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: ROUTES_PATHS.HOME,
      component: HomePage,
    },
    {
      path: ROUTES_PATHS.COCKTAIL,
      name: ROUTES_PATHS.COCKTAIL,
      component: CocktailPage,
    },
    {
      path: ROUTES_PATHS.COCKTAIL_RANDOM,
      name: ROUTES_PATHS.COCKTAIL_RANDOM,
      component: CocktailRandomPage,
    },
  ],
})

export default router
