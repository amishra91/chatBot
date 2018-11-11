var userReply = {};
var others   = {};
  
function chatBot() {
  this.input;
  this.respondTo = function(input) {
    var tempKey ;
    this.input = input.toLowerCase();
    input = input.toLowerCase();
    
    if(!isNaN(this.input)){
      if(parseInt(this.input)<7){
        input = 'less-7';
      }else{
        input = 'great-7';
      }
    }

    userReply = {};

    userReply['less-7'] = new Array("Washing your hair "+this.input+" of times per week when it is dull is not healthy", "I recommend you to use dove (oil control/daily shine based on the hair problem) shampoo");
    userReply['great-7'] = new Array("Washing your hair "+this.input+" of times per week when it is oily is not healthy", "I recommend you to use dove (oil control/daily shine based on the hair problem) shampoo");
    userReply['others'] = new Array("I am sorry I didn't get that", "How many times do you wash your hair?");
    others['How many times do you wash your hair?'] = userReply; 
    
    userReply = {};

    var sel = others[$('#ques').val()]; 
    if(sel[input]!=undefined){
       tempKey = sel[input];
    }else{
      tempKey= sel['others']; 
    }
    return tempKey;
  }
}

function playVideo() {
  var videoHtml = "<div class='party robot'>" + 
                    "<iframe src='https://www.youtube.com/embed/wsoN2C0JzWk?rel=0&amp;autoplay=1' class='video' frameborder='0' allowfullscreen>" +
                    "</iframe>" +
                  "</div>";

  setTimeout(function() {
    $('.chat').append(videoHtml);
  }, 1500);
}