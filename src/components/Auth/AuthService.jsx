const logout = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
     const res = await axios.delete(`${API_URL}/users/logout`, {
       headers: {
         authorization: token,
       }
     })
      if (res.data) localStorage.clear()
     return res.data
    }
    