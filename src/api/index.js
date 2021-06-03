import Axios from 'axios';
import baseURL, { URLS } from "./URLS";
const appkey = "sun_1620982268360";
const request = Axios.create({
    baseURL,
    params: {
        appkey,
    },
})
request.interceptors.response.use(value => value.data)
const getSideList = (type) => request.get(URLS.getSide, { params: { type } });
const getGoodsList = (type, page, sort, size) => request.get(URLS.getGoodList, {
    params: {
        type,
        page,
        sort,
        size,
    }
})
const likeSearch = (value) => request.get(URLS.likeSearch, {
    params: { likeValue: value }
})
const search = (type, page, size)=>request.get(URLS.search,{
    params:{type,page,size}
})
const getGoodsByIds =(value)=> request.get(URLS.getGoodsByIds,{params:{value}})
export default {
    getSideList,
    getGoodsList,
    likeSearch,
    search,
    getGoodsByIds
}