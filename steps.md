1. Deploy Functions for "validate_email" and "validate_phone"

https://www.twilio.com/console/functions/manage

See example Function I created for this use case here:


2. Create a Bot called Econet from Scratch

https://www.twilio.com/console/autopilot/list 

3. Modify your "greeting" task to redirect to a collect_phone

https://www.twilio.com/console/autopilot/Econet/tasks

{
	"actions": [
		{
			"say": "Hello"
		},
		{
			"redirect": "task://collect_phone"
		}
	]
}

3. Add new tasks "collect-phone", "collect e-mail"

https://www.twilio.com/console/autopilot/Econet/tasks

collect-phone


{
    "actions": [
        {
            "collect": {
                "name": "collect_phone",
                "questions": [
                    {
                        "question": "What's your Econet phone number?",
                        "name": "phone_number"
                    }
                ],
                "on_complete": {
                    "redirect": "https://bac4e67cebba.ngrok.io/validate_phone"
                }
            }
        }
    ]
}

collect-email

{
    "actions": [
        {
            "collect": {
                "name": "collect_phone",
                "questions": [
                    {
                        "question": "What's your E-mail address?",
                        "name": "e-mail address"
                    }
                ],
                "on_complete": {
                    "redirect": "https://bac4e67cebba.ngrok.io/validate_email"
                }
            }
        }
    ]
}