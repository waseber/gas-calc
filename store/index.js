import carList from '~/static/carList.json'

export const state = () => ({
  carList: [],
  selectedYear: 2015,
  selectedMake: 'Buick',
  selectedModel: 'enclave',
  fuelTankSize: 22,
  storeTankLevel: 0,
})

export const getters = {
  getYears(state) {
    const returnArr = []
    state.carList.forEach((x) => {
      if (!returnArr.includes(x.Year)) returnArr.push(x.Year)
    })
    return returnArr.reverse()
  },

  getMakes(state) {
    const returnArr = []
    state.carList.forEach((x) => {
      if (x.Year === state.selectedYear)
        if (!returnArr.includes(x.Make)) returnArr.push(x.Make)
    })
    return returnArr.sort()
  },
  getModels(state) {
    const returnArr = []
    state.carList.forEach((x) => {
      if (x.Year === state.selectedYear && x.Make === state.selectedMake)
        if (!returnArr.includes(x.Model)) returnArr.push(x.Model)
    })
    return returnArr.sort()
  },
  getGasTank(state) {
    let returnVal = null
    state.carList.forEach((x) => {
      if (
        x.Make === state.selectedMake &&
        x.Year === state.selectedYear &&
        x.Model === state.selectedModel
      )
        returnVal = x['Tank-Size']
    })
    return returnVal
  },
}

export const mutations = {
  setLoadCarList(state, payload) {
    state.carList = [...payload]
  },
  setTankLevel(state, payload) {
    state.storeTankLevel = payload
  },
  setSelectedYear(state, payload) {
    state.selectedYear = payload
  },
  setSelectedMake(state, payload) {
    state.selectedMake = payload
  },
  setSelectedModel(state, payload) {
    state.selectedModel = payload
  },
}

export const actions = {
  loadCarList({ commit }) {
    commit('setLoadCarList', carList)
  },
  setTankLevel({ commit }, payload) {
    commit('setTankLevel', payload)
  },
  setSelectedYear({ commit }, payload) {
    commit('setSelectedYear', payload)
  },
  setSelectedMake({ commit }, payload) {
    commit('setSelectedMake', payload)
  },
  setSelectedModel({ commit }, payload) {
    commit('setSelectedModel', payload)
  },
}
