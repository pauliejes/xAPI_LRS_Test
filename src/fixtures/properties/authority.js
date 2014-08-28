"use strict";
var factory = require("../../utils/factory");

require("./agentAccount");
require("./agent");

factory.register(
    "authority",
    {
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
    }
);
