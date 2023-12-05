import * as request from "../library/request"

const baseUrl = "http://localhost:3030/data/products"

export const getAll = async () => {
    const result = await request.get(baseUrl)
    return result
}

export const getOne = async (productId) => {
    const result = await request.get(`${baseUrl}/${productId}`)
    return result;
}