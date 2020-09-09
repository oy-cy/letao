import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var carData = JSON.parse(localStorage.getItem('carData') || '[]');


const Store = new Vuex.Store({
    state: {
        carData: carData
    },
    mutations: {
        addCar(state, goods) {
            var index;
            var hasSomeGoods = state.carData.some(function(item, k) {
                index = k; // 记录当前同名商品的下标
                return item.id === goods.id
            })
            if (hasSomeGoods) {
                // 有： 就累加数量即可
                state.carData[index].number += goods.number;
            } else {
                // 没有；构造一个购物车的商品对象
                state.carData.push(goods)
            }

            // 最后要把购物车对象在同步到本地存储
            localStorage.setItem('carData', JSON.stringify(state.carData));
        },
        delCarGoods(state, goods_id) {
            var index = state.carData.some((v, k) => {
                if (v.id === goods_id) {
                    console.log(k);
                    return k;
                }
            })

            // 通过下标index删除数组元素
            state.carData.splice(index, 1);


            //同步到本地存储
            localStorage.setItem('carData', JSON.stringify(state.carData))
        },
        // 修改商品的选中状态
        changeGoodsSelected(state, obj) {
            // 根据商品id找到其所在的下标
            var index = state.carData.findIndex(v => {
                return v.id == obj.goods_id;
            })
            state.carData[index].selected = obj.selected;
            //同步到本地存储
            localStorage.setItem('carData', JSON.stringify(state.carData))
        },
        // 修改商品的数量
        changeGoodsNumber(state, obj) {
            // 根据商品id找到其所在的下标
            var index = state.carData.findIndex(v => {
                return v.id == obj.goods_id;
            })
            state.carData[index].number = obj.number;
            //同步到本地存储
            localStorage.setItem('carData', JSON.stringify(state.carData))
        }
    },
    getters: {
        // 获取购物车商品的总数量
        carTotal(state) {
            var total = 0;
            state.carData.forEach(v => total += parseInt(v.number));
            return total;
        },
        getCarData(state) {
            return state.carData;
        },
        getGoodsSelected(state) {
            var obj = {};
            state.carData.forEach(v => {
                obj[v.id] = v.selected;
            })
            return obj;
        },
        getGoodsNumber(state) {
            var obj = {};
            state.carData.map(v => {
                obj[v.id] = v.number;
            })
            return obj;
        },
        getGoodsSelectedNumber(state) {
            var total = 0;
            state.carData.forEach(v => {
                if (v.selected === true) {
                    total += v.number;
                }
            })
            return total;
        },
        getGoodsSelectedPrice(state) {
            var totalPrice = 0;
            state.carData.forEach(v => {
                if (v.selected === true) {
                    totalPrice += v.number * v.price;
                }
            })
            return totalPrice * 100;
        }
    }



})

export default Store;
