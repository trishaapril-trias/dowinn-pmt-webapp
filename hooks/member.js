import toast from "@node_modules/react-hot-toast/dist";
import { getData, postData } from "@utils/api/api";
const url = process.env.NEXT_PUBLIC_DOWINN_API_URL;

export async function addMember(data) {
    try {
      const response = await postData(`${url}/test01/create_member`, data);
      
      if(response){
        return response.data;
      }else{
        toast.error(response.message)
      } 
    } catch (error) {
      console.error(error);
      return false
    }
  };


  export async function getAllMember() {
    try {
      const response = await getData(`${url}/test01/get_all_member`);
      
      if (response.data.length != 0) {
        return response.data
      } else {
        return null;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  
