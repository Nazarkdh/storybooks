const key={
    mongoURI:process.env.MONGO_URI,
    clientId:process.env.CLIENTID,
    clientSecret:process.env.CLIENT_SECRET
}

console.log("url: "+process.env.PUBLIC_BASE_URL);


module.exports=key;
