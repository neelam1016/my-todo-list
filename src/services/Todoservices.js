import http from '../http'; 
const getAll=()=>{
     return http.get("/todo");
}
const getById=(id)=>{
    console.log(id)
   return http.get(`/todo/${id}`)
}
const create=(data)=>{
    console.log(data)
    return http.post(`/todo`,data)
}
const remove=(id)=>{
    return http.delete(`/todo/${id}`)
}
const update=(id,data)=>{
     return http.put(`/todo/${id}`,data)
}
const TodoService={getAll,getById,create,remove,update}
export default TodoService;