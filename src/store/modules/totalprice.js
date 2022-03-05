import {GET_TOTAL, PUSH_TOTAL, MUTATE_TOTAL} from "../types"
import client from "../0AuthRequest"
import handle from "../handler"

export const state = { 
    total  : null
}

export const mutations = { 
    [MUTATE_TOTAL] : (state, data) => {
        console.log("hm", data)
        return state.total = data
    }
}

export const getters = { 
    [GET_TOTAL] : state => state.total
}

export const actions = { 
    [PUSH_TOTAL]({commit})  {
        const request = client.get(`/api/orders/order-total-price`)
        return request.then(({data}) => {
            commit(MUTATE_TOTAL, data)
        })
    }
}