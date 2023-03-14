class UserDto{
  constructor({_id,name,mail,password}){
    this.name = name
    this.mail = mail
  }
}

export const convertUserToDto = (users)=>{
  if(Array.isArray(users)){
    return users.map(user=>new UserDto(user))
  }else{
    return new UserDto(users)
  }
}

export{UserDto}