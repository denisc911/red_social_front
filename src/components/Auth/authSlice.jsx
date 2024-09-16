const user = JSON.parse(localStorage.getItem('user'))

 extraReducers: (builder) => {
   builder
     .addCase(login.fulfilled, (state, action) => {
       state.user = action.payload.user
       state.token = action.payload.token
     })
     .addCase(logout.fulfilled, (state) => {
       state.user = null
       state.token = null
     })
 }

