import { GET_CO, PUSH_CO, MUTATE_CO } from "../types"
import client from "../0AuthRequest"

export const state = { 
    Orders : []
}

export const mutations = { 
    [MUTATE_CO] : (state, data) => {
        return state.Orders = data
    }
}

export const getters = { 
    [GET_CO] : state => state.Orders
}

export const actions = { 
    [PUSH_CO]({commit})  {
        const request = client.get(`/api/orders/order-list`)
        return request.then(({data}) => {
            
            commit(MUTATE_CO, data)
        })
    }
}