import axios from 'axios'

export default axios.create({
    // baseURL: 'https://burgermaniacapstone.azurewebsites.net',// local host site
    baseURL: 'https://localhost:44370',
     headers: {
         "Content-type" : "application/json",
         "authapp" : "Basic:793bb6c2-4807-4805-a092-0a91d5ff62d7"
     }
})