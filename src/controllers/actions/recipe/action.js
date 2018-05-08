import { Rms, Themosis } from '../../../lib/api/'

export const FETCH_RECIPES = 'FETCH_RECIPES'
export const FETCH_RECIPE = 'FETCH_RECIPE'
export const CANCLED_FETCH_RECIPES = 'CANCLED_FETCH_RECIPES'
export const FETCH_RECIPES_BY_CATEGORY = 'FETCH_RECIPES_BY_CATEGORY'


/**
 * Fetch all recipes with given parameters
 * 
 * @args params | Object
 **/ 
export function fetchRecipes(params = {}) {
  let payload = Rms.get(params)
  return {
    type: FETCH_RECIPES,
    payload
  }
}

/**
 * Fetch recipe by ID
 * 
 * @args id | Integer
 **/
export function fetchRecipe(id = null) {
  let payload = Rms.get(id, { single: true })
  return {
    type: FETCH_RECIPE,
    payload
  }
}

/**
 * Fetch recipes by category
 * 
 * @args Category | String
 **/
export function fetchRecipeByCategory(category = null) {
  let payload = Rms.get(category)
  return {
    type: FETCH_RECIPES_BY_CATEGORY,
    payload
  }
}

/**
 * Fetch recipes by category
 * 
 * @args Category | String
 **/
export function cancelfetchRecipesRequest() {
  return {
    type: CANCLED_FETCH_RECIPES,
  }
}
