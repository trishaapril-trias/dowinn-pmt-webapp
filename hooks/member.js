import toast from "@node_modules/react-hot-toast/dist";
import { postData } from "@utils/api/api";
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
