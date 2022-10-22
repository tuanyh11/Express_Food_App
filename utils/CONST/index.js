import dotenv from 'dotenv'
dotenv.config()  



const PASSWORD_KEY = process.env.PASSWORD_KEY
const PASS_EMAIL = process.env.PASS_EMAIL
const CODE = process.env.CODE
const EMAIL = process.env.EMAIL
const PORT = process.env.PORT
const JWT = process.env.JWT
const URL_DATABASE = process.env.URL_DATABASE

const env = {
    PASSWORD_KEY,
    PASS_EMAIL,
    CODE,
    EMAIL,
    PORT,
    JWT,
    URL_DATABASE 
}

export default env