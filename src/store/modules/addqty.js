

import {GET_ADDQTY,
    PUSH_ADDQTY,
    MUTATE_ADDQTY,
    MUTATE_VALIDATE_ADDQTY,
    GET_SCREEN,
    QTY_REDUCER,
    PUSH_BOXOF6_TYPE,
    GET_BOXOF6_TYPE,
    MUTATE_BOXOF6_TYPE,
    PUSH_B1T1_TYPE,
    GET_B1T1_TYPE,
    MUTATE_B1T1_TYPE} from "../types"
import client from "../0AuthRequest"
import handle from "../handler"
import Element from 'element-ui'

export const state = { 
    addqtyResponse : false,
    screenLoading : false,
    boxof6Response : false,
    b1t1Response : false
}
export const mutations = {
    [MUTATE_ADDQTY] : (state, data) => {
        return state.addqtyResponse = data
    },
    [MUTATE_BOXOF6_TYPE] : (state, data) => {
        return state.boxof6Response = data
    },
    [MUTATE_B1T1_TYPE] : (state, data) => {
        return state.b1t1Response = data
    }
}   

export const getters = { 
    [GET_ADDQTY] : state => state.addqtyResponse,
    [GET_SCREEN] : state => state.screenLoading,
    [GET_BOXOF6_TYPE] : state => state.boxof6Response,
    [GET_B1T1_TYPE] : state => state.b1t1Response
}

export const actions = { 
    [PUSH_ADDQTY]({commit, state, dispatch} , {objectQTYUpdater, objectQTYReducer}) {
        console.log(objectQTYReducer)
        state.screenLoading = true
       setTimeout(() => {
        const request = client.put(`/api/orders/update-qty-cart?id=${objectQTYUpdater.addingID}&qty=${objectQTYUpdater.addingQty}`)
        return request.then((resp) => {
            if(resp.data === 'success update qty'){
                const req = client.put(`/api/orders/order-decrease-qty-solo?orderID=${localStorage.getItem('key_solo_externalID')}&qty=${objectQTYUpdater.addingQty}&cartID=${objectQTYUpdater.addingID}`)
                return req.then(({data}) => {
                    console.log("decrease" , data)
                    if(data === "success_decrease"){
                        state.screenLoading = false
                        state.addqtyResponse = true
                        Element.Notification.success({
                            title : 'Success',
                            message : 'Successfully Added Quantity',
                            offset: 100
                        })
                    }
                }) 
            }
        })
       }, 2000)
    },
    [PUSH_BOXOF6_TYPE]({state}, {objectQTYUpdater, objectQTYReducer}){
        state.screenLoading = true
        setTimeout(() => {
            const request = client.put(`/api/orders/update-qty-cart-boxof6?id=${objectQTYUpdater.addingID}&qty=${objectQTYUpdater.addingQty}`)
            return request.then((resp) => {
                if(resp.data === 'success update qty'){
                    const req = client.put(`/api/orders/order-decrease-qty-bundle?orderID=${localStorage.getItem('key_boxof6_externalID')}&qty=${6}&origqty=${objectQTYUpdater.addingQty}`)
                    return req.then(({data}) => {
                        if(data === 'success decrease'){
                            state.screenLoading = false
                            state.boxof6Response = true
                            Element.Notification.success({
                                title : 'Success',
                                message : 'Successfully Added Quantity',
                                offset: 100
                            })
                        }
                    })
                }
            })
        }, 2000)
    },
    [PUSH_B1T1_TYPE]({commit, state}, {objectQTYUpdater, objectQTYReducer}){
        state.screenLoading = true
        setTimeout(() => {
            const request = client.put(`/api/orders/update-qty-cart-b1t1?id=${objectQTYUpdater.addingID}&qty=${objectQTYUpdater.addingQty}`)
            return request.then((resp) => {
                if(resp.data === 'success update qty'){
                    const req = client.put(`/api/orders/order-decrease-qty-buy1take1?orderID=${localStorage.getItem('key_b1t1_externalID')}&qty=${2}&origqty=${objectQTYUpdater.addingQty}`)
                    return req.then(({data}) => {
                        if(data === 'success_decrease'){
                            state.screenLoading = false
                            state.boxof6Response = true
                            Element.Notification.success({
                                title : 'Success',
                                message : 'Successfully Added Quantity',
                                offset: 100
                            })
                        }
                    })
                }
            })
        }, 2000)
    }
}