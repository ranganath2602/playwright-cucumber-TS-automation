import { Given, When, Then } from '@cucumber/cucumber'

Given('Provide correct url', function () {
   console.log("Given the url =")
});

When('provide valid UN and pwd', function () {
   console.log("when valid un and pwd")
});

Then('click on login btn', function () {
   console.log("login btn")
});

Then('verify login is success', function () {
   console.log("login successful")
});