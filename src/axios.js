import axios from 'axios'

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'https://whatsapp-mern-clone.herokuapp.com/'
=======
    baseURL: 'https://localhost:9000'
>>>>>>> ae7ceab89c29dd2cd0d3d69722ea7fcb0a8bb5ef
})

export default instance