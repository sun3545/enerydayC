import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sideList: [],
        showContent: false,
        size: 5,
        goodsList: [],
        type: null,
        counterMap: {},
        motionSearch: false,
    },
    mutations: {
        setSideList(state, list) {
            state.sideList = list;
        },
        setShowContent(state, status) {
            state.showContent = status;
        },
        setGoodsList(state, list) {
            state.goodsList = [...state.goodsList, ...list];
        },
        resetGoodsList(state) {
            state.goodsList = [];
        },
        setGoodsListType(state, type) {
            state.type = type;
        },
        setCounterMap(state, map) {
            state.counterMap = map;
        },
        storageChange(state, { id, value }) {
            localStorage.removeItem('goods')
            if (state.counterMap[id]) {
                if (value === -1 && state.counterMap[id] === 1 || value === -Infinity) {
                    Vue.delete(state.counterMap, id)
                } else {
                    Vue.set(state.counterMap, id, state.counterMap[id] + value)
                }
            } else {
                Vue.set(state.counterMap, id, 1)
            }
            localStorage.setItem('goods', JSON.stringify(state.counterMap))
        },
        setMotionSearch(state, status) {
            state.motionSearch = status;
        },
    },
    actions: {
        async A_setSideList({ commit }, type) {
            commit("setShowContent", false);
            const reps = await api.getSideList(type)
            commit("setSideList", reps);
            commit("setShowContent", true);

        },
        async A_getGoodsList({ state, commit }, options) {
            const { page, sort } = options;
            const type = options.type || state.type;
            const { list } = await api.getGoodsList(type, page, sort, state.size)
            commit("setGoodsList", list);
            commit("setGoodsListType", type); 
            if (list.length) {
                return true;
            }
            return false;
        }
    },
    modules: {
    }
})
