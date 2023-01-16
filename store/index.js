export const state = () => ({
  selectedMake: 'buick',
  selectedModel: 'enclave',
  selectedModelYear: 2015,
  fuelTankSize: 22,
  storeTankLevel: 0,
})

export const mutations = {
  setTankLevel(state, payload) {
    state.storeTankLevel = payload
  },
}

export const actions = {
  setTankLevel({ commit }, payload) {
    commit('setTankLevel', payload)
  },
}
