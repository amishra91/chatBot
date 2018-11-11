$(document).ready(function() {
  setTimeout(function() {
    $('#splashScreen').fadeOut('slow');
    $('#user-chat').fadeIn('slow');
    $('input').focus();
  }, 3000);
});

$(function() {
  // chat aliases
  var user = 'user';
  var robot = 'Robot';
  
  // slow reply by 400 to 800 ms
  var delayStart = 400;
  var delayEnd = 800;
  
  // initialize
  var bot = new chatBot();
  var chat = $('.chat');
  var waiting = 0;
  
  // submit user input and get chat-bot's reply
  var submitChat = function() {
    var input = $('.input input').val();
    if(input == '') return;
    
    $('.input input').val('');
    updateChat(user, input);
    
    var reply = bot.respondTo(input);
    if(reply == null) return;
    
    var latency = Math.floor((Math.random() * (delayEnd - delayStart)) + delayStart);
    waiting++;
    setTimeout( function() {
      if(typeof reply === 'string') {
        updateChat(robot, reply);
      } else {
        for(var r in reply) {
          if(reply[r]=='video'){
            playVideo();
            continue;
          }
          updateChat(robot, reply[r]);
        }
      }
    }, latency);
  }
  
  // add a new line to the chat
  var updateChat = function(party, text) {
    var style = 'user';
    if(party != user) {
      style = 'robot';
      $('#ques').val(text);
    }
    
    var line = $('<div class="party"><span class="text"></span></div>');
    line.addClass(style);
    line.find('.text').text(text);
    chat.append(line);
    chat.stop().animate({ scrollTop: chat.prop("scrollHeight")});
  }
  
  // event binding
  $('.input').bind('keydown', function(e) {
    if(e.keyCode == 13) {
      submitChat();
    }
  });
  $('.input a').bind('click', submitChat);
  
  // initial chat state
  function getLoc(){
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(function(location) {
        var response = {};
        response['lat']  = location.coords.latitude;
        response['long'] = location.coords.longitude;
        response['acc']  = location.coords.accuracy;
        resolve(response); 
      });    
    })
  }

  //Getting temprature and user's location
  async function getUserLocation(){
    var tm = await getLoc();
    await $.ajax({
    url : 'https://api.openweathermap.org/data/2.5/weather?lat='+tm['lat']+'&lon='+tm['long']+'&units=metric&APPID=924eeb708f347c03b39a04782c99f4b2',
    type : 'GET',
    dataType : 'jsonp',
    success: function(data) {
      var txt = 'Hi, it is '+data.main.temp+' degree outside in '+data.name+'. How is your hair feeling?';
      updateChat(robot, txt);
      userReply['oily']  = new Array("How many times do you wash your hair?");
      userReply['dull']  = new Array("How many times do you wash your hair?"); 
      userReply['good']  = new Array("This is great!","I recommend you use dove oxygen moisture for even better results", "video");
      userReply['others']= new Array("I am sorry I didn't get that", txt);
      others[txt] = userReply;
    }
   }); 
  }
  getUserLocation();
});