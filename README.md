
# flutterwaveBackend
Flutterwave rule validation

hosted on : /POST: https://flutterwavebackend.web.app/validate-rule

body = {
  "rule": {
    "field": "age",
    "condition": "contains",
    "condition_value": 10
  },
  "data": {
    "name": "James Holden",
    "crew": 2,
    "age": [0,20,10],
    "position": 1,
    "missions": {
        "district":"Director",
        "age": 30
    }
  }
}

Endpoint requirements/constraints:
a/ The rule and data fields are required.


b/ The rule field should be a valid JSON object and should contain the following required fields: 
b1/ field: The field in the data passed to validate the rule against. Your implementation for the field should also support nested data objects.
e.g. if field is passed as "card.first6" it means you need to check to see if the data contains a card field, then check to see if the card field contains a first6 field.
[PS: The nesting should not be more than two levels]
b2/ condition: The condition to use for validating the rule. Accepted condition values are:
    i/ eq: Means the field value should be equal to the condition value 
    ii/ neq: Means the field value should not be equal to the condition value 
    iii/ gt: Means the field value should be greater than the condition value 
    iv/ gte: Means the field value should be greater than or equal to the condition value 
    v/ contains: Means the field value should contain the condition value
b3/ condition_value: The condition value to run the rule against. Your rule evaluation is expected to be like: 
["data.field"] ["rule.condition"] ["rule.condition_value"]


c/ The data field can be any of:
c1/ A valid JSON object 
c2/ A valid array
c3/ A string


d/ If a required field isn't passed. Your endpoint should return with a response (HTTP 400 status code) that is similar to the below: 
{
  "message": "[field] is required."
  "status": "error",
  "data": null
}
E.g. if the rule field is not passed, your endpoint response should be:
{
  "message": "rule is required."
  "status": "error",
  "data": null
}


e/ If a field is of the wrong type, your endpoint should return with a response (HTTP 400 status code) that is similar to the below:
{
  "message": "[field] should be a|an [type]."
  "status": "error",
  "data": null
}
E.g. if the rule field is passed as a number instead of a valid object, your endpoint response should be:
{
  "message": "rule should be an object."
  "status": "error",
  "data": null
}




