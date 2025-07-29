const key={
    mongoURI:process.env.MONGO_URI,
    clientId:process.env.CLIENTID,
    clientSecret:process.env.CLIENT_SECRET
}

console.log("client ID: "+key.clientId);


module.exports=key;
