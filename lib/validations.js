module.exports= {

  validations:function(title, url, year){
    var output=[];
    if(title.trim().length === 0){
      output.push("Title Can Not be Blank");
    }

    if(title.trim().length<2){
      output.push("Title must be at least 3 Characters");
    }

    if(url.trim().length===0){
      output.push("Url cannot be blank");
    }

    if(year.trim().length<4){
      output.push("Year must be 4 Characters");
    } return output;
  }
};
