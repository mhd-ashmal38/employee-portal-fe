import { BASE_URL } from "./baseUrl"
import { commonRequest } from "./commonRequest"

// add employees
export const addEmployee=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}`,body)
}

// get employee list
export const getEmployees=async ()=>{
    return await commonRequest("GET",`${BASE_URL}`)
}

// delete employee
export const deleteEmployee=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/${id}`,{})
}

// edit employee
export const editEmployee=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/${id}`,body)
}