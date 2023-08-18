
const bcrypt=require("bcrypt")

export default class HashPassword
{
    static hashPassword=(password:string)=>{
        return bcrypt.hash(password,10).then(function(hash:string){
            return hash
        })
    }
    static isSamePassword=(password:string,actualPass:string)=>{
        return bcrypt.compare(password,actualPass).then(function(result:boolean)
        {
            return result
        })
    }
}