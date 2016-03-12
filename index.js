'use strict';
module.exports = function (user, password) {
  var Nightmare = require('nightmare');
  var nightmare = Nightmare({});
  var anybar = require('anybar');

  nightmare
    .goto('https://cas.id.ubc.ca/ubc-cas/login?TARGET=https%3A%2F%2Fssc.adm.ubc.ca%2Fsscportal%2Fservlets%2FSRVSSCFramework')
    .type('#username', user)
    .type('#password', password)
    .click('input[name="submit"]')
    .wait('#tasks')
    .goto('https://ssc.adm.ubc.ca/sscportal/servlets/SRVApplicantStatus?context=html')
    .wait('.pageContent')
    .evaluate(function () {
      var control = document.getElementsByTagName('td');
      var count = 0;
      for(var i=0;i<control.length;i++) {
        if (control[i].innerHTML.indexOf('Thank you for self-reporting your grades.') > -1) {
          count++;
        }
      }
      return count !== 5;
    })
    .end()
    .then(function (result) {
      if(result){
        anybar('purple');
      }
      else{
        anybar('black');
      }
      console.log("updated");
    })
};
