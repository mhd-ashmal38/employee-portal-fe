import axios from "axios"

// Define a function to set a common API call using Axios

export const commonRequest = async (method, url, body) => {

    let reqConfig = {
        method,
        url,
        data: body,
        headers: {
            "content-type": "application/json"
        }
    }

    // api call using axios library

    return await axios(reqConfig).then((response) => {
        return response
    }).catch((err) => {
        return err
    })


}