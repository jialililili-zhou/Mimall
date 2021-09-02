// ------------------封装storage    sessionstorage

const STRORAGE_KEY = 'mall'
export default{
  // 存储值
  setItem(key,value,module_name){
    if(module_name){
      let val = this.getItem(module_name);    //val是json对象
      val[key] = value
      this.setItem(module_name,val)
    }else{
      let val = this.getStorage()
      val[key] = value
      window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))    //将val转化为json字符串再传回
    }
  },

  // 获取值,取一个模块下面的属性user下面的userName
  getItem(key,module_name){
    if(module_name){
      let val = this.getItem(mudule_name)   //返回obj对象
      if(val) return val[key]
    }
    return this.getStorage()[key]
  },

  getStorage(){
    // 取出来的值转化为json对象
    // 返回整个大数据(val)，里面有很多小的对象(module_name),对象里面有键值对(key:value)
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}') 
  },

  clear(key,module_name){
    let val = this.getStorage()
    if(module_name){
      if(module_name == null)return
      delete val[module_name][key]
    }else{
      delete val[key]
    }
    window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
  }
}