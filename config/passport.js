var LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    models = require('../models/');

module.exports = function(passport) {
  
  passport.use('local', new LocalStrategy(
    function(username, password, done) {
      console.log("hahahahaha" + username +"  "+password);
      models.Employee.findOne({
        where: {
          'userName': username
        }
      }).then(function (employee) {
        console.log(employee.password)
        if (employee == null) {
          return done(null, false, { message: 'Incorrect credentials.' })
        }
        
        var hashedPassword = bcrypt.hashSync(password, employee.salt)
        
        if (employee.password === hashedPassword) {
          return done(null, employee)
        }
        
        return done(null, false, { message: 'Incorrect credentials.' })
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    Employee.findOne({
      where: {
        'id': id
      }
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      }
      
      done(null, user)
    })
  })
}