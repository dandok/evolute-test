# evolute-test

## Introduction
One of the main goals of this task is to ensure that users can create and submit surveys. An admin can add a user who can create a survey. A user who creates a survey can add other users to participate and respond to their surveys. The users added by admins have a role of ONE and those added by users have a role of ZERO.

## Dev setup
to clone the repo run the following command `git clone git@github.com:dandok/evolute-test.git`

## Test
to run the test run the following command `yarn test`

## Design
- the different collections include
- admin: 
- surveys
- survey responses
- users

## Validation
- A validation middleware was created to allow for validating the request body.
- As the scope of this project did not allow for authentication, the email of the user is passed from the request header to mimic an authenticated user, the email is used to get the ID of the user with which we can verify if the user owns a survey to which he/she wants to invite other users, we can verify that a request is being made by a valid admin user and we can attach the id of a creator of a survey to the survey upon creating the survey.

## Code structure
- controller: to handle the request/response
- service: this is where business logic is handled
- repository: interaction with the database

## API Routes
- POST `{{baseUrl}}/admin/invite-user/:id`        -    admin can invite a user using the user's email.
- POST `{{baseUrl}}/survey/submit/:id`            -    users can submit their responses to the survey
- POST `{{baseUrl}}/survey`                       -    a user with the correct right can create a survey
- GET `{{baseUrl}}/survey/aggregation/:email`     -    The aggregation returns all surveys the user has responded to and how many times they responded 
