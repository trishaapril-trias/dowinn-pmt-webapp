export async function addMember(formData) {
    try {
      const data = {
          user_id: formData.username,
          email: formData.email,
          password: formData.password
      }
      
      const response = await postData(`${url}/test01/create_member`, data);
      
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  };
