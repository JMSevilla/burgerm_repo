import { GET_B1T1, PUSH_B1T1, MUTATE_B1T1, BUNDLE_ID } from "../types"
import client from "../0AuthRequest"
import handle from "../handler"
import Element from 'element-ui'


export const state = { 
    productValidate : null,
    bundle : false,
}

export const mutations = { 
    [MUTATE_B1T1] : (state, data) => {
        return state.productValidate = data
    },
}

export const getters = { 
    [GET_B1T1] : state => state.productValidate,
    [BUNDLE_ID] : state => state.bundle,
}

export const actions = { 
    [PUSH_B1T1]({commit, state}, {object}){
        const request = client.get(`/api/orders/solo-validate-cart/${object.buy1take1Quantity}/${object.buy1take1externalIDQTY}`)
        return request.then(({data}) => {
            if(data === 'valid qty'){
                const addreq = client.post(`/api/orders/order-solo`, handle.DataBind(object))
                return addreq.then((response) => {
                    if(response.data === 'success order'){
                        const reducer = client.put(`/api/orders/order-decrease-qty-buy1take1?orderID=${object.buy1take1externalIDQTY}&qty=${2}&origqty=${object.buy1take1Quantity}`)
                        return reducer.then((resp) => {
                            
                               if(resp.data === 'success_decrease'){
                                    state.bundle = false
                                    Element.Message.success({
                                        title : 'Success',
                                        message : 'Successfully added to cart',
                                        offset : 100
                                    })
                                    
                                }
                        })
                    }
                })
            }else {
                Element.Message.error({
                    title : 'Error',
                    message : 'Invalid Quantity',
                    offset : 100
                })
                return false
            }
        })
    },
}