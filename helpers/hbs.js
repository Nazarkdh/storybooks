

const {format}= require('date-fns');

module.exports={
  truncate:(str,len=150)=>{
    
      if (str.length > len) {  
        let newStr= str.substring(0, len - 3); 
       return newStr.substring(0,newStr.lastIndexOf(''))+'...' 

       console.log(newStr)
      } else {  
        return str;  
      }  
  },
  stripTags:(str)=> {  

    if(!str)
      return str;
    // Regular expression to match HTML tags  
    const regex = /<\/?[^>]+>/g;  
    
    // Replace the matched HTML tags with an empty stringi  
    return str.replace(regex, '');  
  },

  formatDate:(date,formatting)=>{
    return format(date,formatting);
  },
  select:(Elvalue,rValue)=>{
    if(Elvalue===rValue)
      return "selected"
    else
    return ''
  },
  editIcon:(storyUserID,loggedUserID)=>{
    if(storyUserID!=loggedUserID){
      return false;
    }
    return true;
  }
}