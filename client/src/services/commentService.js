import * as request from "../library/request"

const baseUrl = "http://localhost:3030/data/comments"

export const create = async (productId,text) => {
    const newComment = await request.post(baseUrl, {
        productId,
        text
    })

    return newComment;
}

export const getAll = async (productId) => {
    const query = new URLSearchParams({
        where: `productId="${productId}"`,
        load: `owner=_ownerId:users`
    })

    const result = await request.get(`${baseUrl}?${query}`)
    // return result.filter(c => c.productId === productId)
    return result;
}



export const updateComment = async (commentId, updatedText ) => {
    const result = await request.put(`${baseUrl}/${commentId}`, {
        text: updatedText
    })
        console.log(result);
    return result;
}

export const deleteComment = async(commentId) => {
    await request.remove(`${baseUrl}/${commentId}`)
}