
// Require `PhoneNumberFormat`.
const PNF = require('google-libphonenumber').PhoneNumberFormat;
 
// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

exports.handler = function(context, event, callback) {
  let response = {};
  response.status = false;
  response.econet = false;

  //set up action for Autopilot Response
  let actions = [];

  // get the Memory from Autopilot Redirect
  const memory = JSON.parse(event.Memory)

  // get Phone Number from Autopilot Memory
  const autopilot_number = memory.twilio.collected_data.collect_phone.answers.phone_number.answer;

  // setup variable for parsed number
  let number = ''

  // parse various Number formats with Google's LibPhoneNumber, if not valid start over
  try{
  number = phoneUtil.parseAndKeepRawInput(autopilot_number, 'ZW');
  } catch(error){
    let say = {
      "say": `${autopilot_number} is not a valid number!`
    }
    let redirect = {
        "redirect":"task://collect_phone" 
    }
    actions.push(say);
    actions.push(redirect);

    let respObj = {
      "actions": actions
    };

    callback(null, respObj);   
  }

  // Check to see if this is a valid Zimbabwe Number
  response.status = phoneUtil.isValidNumberForRegion(number, 'ZW');

  // Format the number in the desired National Format stripping spaces
  response.formatted_number = phoneUtil.format(number, PNF.NATIONAL).replace(/\s/g, '');

  if(response.status == true){
    // Check to see if the number starts with 077 or 078
    if(response.formatted_number.substr(0,3) == '077' || (response.formatted_number.substr(0,3) == '078')){
      response.econet = true;
    }
  }

  // check if this is a valid econet number
  if (response.econet) {
    let redirect = {
        "redirect":"task://collect_email" 
    }
    actions.push(redirect);
  }
  else if (response.econet == false) {
    let say = {
      "say": `${response.formatted_number} is not a valid Econet number!`
    }
    let redirect = {
        "redirect":"task://collect_phone" 
    }
    actions.push(say);
    actions.push(redirect);
  }


  let respObj = {
      "actions": actions
  };
  callback(null, respObj);   
};
