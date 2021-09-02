export default{
  saveUserName(context,payload){
   context.commit('saveUserName',payload)
  },
  saveCartCount(context,payload){
    context.commit('saveCartCount',payload)
  }
}