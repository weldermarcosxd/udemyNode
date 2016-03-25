var https = require('https');

function printMessage(username, badgeCount, totalPoints) {
  var message = username + " has " + badgeCount + " total badges and " + totalPoints + " points in javascript";
  console.log(message);
}

function printError(err) {
  console.error("Shit happend: " + err.message)
}

function get(user){
    https.get("https://teamtreehouse.com/"+ user +".json", function (data) {

      var responseBody = "";

      data.on('data', function (chunk) {
        responseBody = responseBody + chunk;
      });

      if(data.statusCode != 200){
        printError({message: data.statusCode});
      }else{
        try{
          data.on('end', function () {
            var profile = JSON.parse(responseBody);
            printMessage(profile.profile_name, profile.badges.length, profile.points.JavaScript);
          });
        } catch(err){
          printError(err);
        }
      }
    }).on('error', function(err) {
      printError(err);
    });
}

module.exports.get = get;
