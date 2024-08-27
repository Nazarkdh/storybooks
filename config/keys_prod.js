const password = encodeURIComponent("PM#Sm@7vuT.fp5L");
console.log(password);
const key={
    mongoURI:process.env.MONGO_URI,
    clientId:process.env.CLIENTID,
    clientSecret:process.env.CLIENT_SECRET
}


module.exports=key;