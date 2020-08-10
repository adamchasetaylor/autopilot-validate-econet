

exports.handler = function(context, event, callback) {
  let response = {};
 
  //set up action
  let actions = [];

  let say = {
      "say": 'Thank you!'
  }
  
  actions.push(say);

  let respObj = {
      "actions": actions
  };
  callback(null, respObj);   
};
