import { GET_SALES_ENTRY, PUSH_SALES_ENTRY, MUTATE_SALES_ENTRY } from "../types"
import client from "../0AuthRequest"
import handle from "../handler"
export const state = { 
    responseSales : ''
}

export const mutations = { 
    [MUTATE_SALES_ENTRY] : (state, data) => {
        return state.responseSales = data
    }
}

export const getters = { 
    [GET_SALES_ENTRY] : state => state.responseSales
}

export const actions = { 
    [PUSH_SALES_ENTRY]({commit}, {object})  {
        var data = new FormData()
        data.append("orderInfo", object.orderInfo)
        const request = client.post(`/api/orders/sales-entry`, data)
        return request.then(({data}) => {
            commit(MUTATE_SALES_ENTRY, data)
        })
    }
}