
let key;

if(process.env.NODE_ENV==='production'){
    key=require('../config/keys_prod')
    console.log('production mode');
}else{
    key=require('../config/keys_dev')
}


module.exports=key;
