/**
 * helper.js
 * @description :: exports helper methods for project.
 */
import { baseUrl } from "./constants/config-constant";
import { createCipheriv, createDecipheriv } from "crypto";


const AES_ENC_KEY = Buffer.from(process.env.AES_ENC_KEY, 'hex') // set random encryption key
const AES_IV = Buffer.from(process.env.AES_IV, 'hex') // set random initialisation vector

export const encrypt = (val) => {
    const cipher = createCipheriv('aes-256-cbc', AES_ENC_KEY, AES_IV)
    let encrypted = cipher.update(val, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
}

export const decrypt = (encrypted) => {
    const decipher = createDecipheriv('aes-256-cbc', AES_ENC_KEY, AES_IV)
    const decrypted = decipher.update(encrypted, 'base64', 'utf8')
    return decrypted + decipher.final('utf8')
}

/**
 * App logo 
 * @returns 
 */
export const logo = () => {
    return baseUrl('assets/logo.png')
}