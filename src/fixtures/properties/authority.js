"use strict";
var factory = require("../../utils/factory"),
    authorities;

require("./agentAccount");
require("./agent");

authorities = {
   "empty": {},
   "consumerOnly": {
       "objectType": "Agent",
       "account": factory.make("consumer agentAccount")
   },
   "consumerAndUser": {
       "objectType": "Group",
       "member": [{
               "account": factory.make("consumer agentAccount")
           },
           factory.make("mboxOnly agent")
       ]
   }
};

factory.register("authority", authorities);
