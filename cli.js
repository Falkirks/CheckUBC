#!/usr/bin/env node
'use strict';
var meow = require('meow');
var checkubc = require('./');

var cli = meow({
  help: [
    'Usage',
    '  checkubc --username=[] --password=[]',
    '',
    'Example',
    '  checkubc --username=user --password=hey'
  ].join('\n')
});

setInterval(function(){
  checkubc(cli.flags.username, cli.flags.password);
}, 1000 * 60 * 5);
