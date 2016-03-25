var user = 'joshtimonen';
var profile = require('./profile');

var users = process.argv.slice(2);

users.forEach(function (user) {
    profile.get(user);
})
