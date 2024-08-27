
let key;

if(process.env.NODE_ENV==='development'){
    key=require('../config/keys_prod')
}else{
    //key=require('../config/keys_dev')
}


module.exports=key;
