
# Get Harley Test App

- AAUser, I can chose a practitioner based on availability and speciality
    - Go to https://get-harley.vercel.app/
    - Choose a timeslot
    - Choose a speciality
    - Enter details
    - Click Next
    - See available practitioners
    - Select available practitioner
    - Click Confirm
    - See Thank You message


## Installation

### Prerequistes:

```

Node - v8.0.0+
Yarn - v1.2.0+.

```
### To get set up:

From the root directory:

1. To install the project dependencies, run `yarn install`
2. To run the app in development mode, run `yarn start`
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
4. You can view the content of the endpoints at:
    - [/practioners](https://get-harley.vercel.app/api/practioners)
    - [/specialities](https://get-harley.vercel.app/api/specialities)

### Tests:

Run `yarn test` to launch the test runner in interactive mode.
Run `yarn lint` to run the linter checks.

I have written services tests: 
    Date/Time management is always very difficult. As a timeslot is the main purpose of this app, making sure the function to create generate the timeslots is accurately tested - the tests here also allow for documentation purposes should the function need changing over time.

Next tests to write:
    - Component unit tests to test user behaviour on the app (using react-testing-library).
        Eg AAUser, when I select a date, I see the next button  

### Tech stack

React with Express server. 

Why react?

- React is a simple and powerful framework. 
- Performance - Virtual DOM, meaning that React renders only the part of the DOM that changes, instead of the whole document
- It is easy to learn. Usually when creating an application, the plan would be to hire a team. React is a popular language with a large community of developers. 
- Used by Facebook, so they are not likely to deprecate it (vs Angular, which is not used by Google)
- Should a mobile app be needed, you can use React Native and have a crossfunctional Mobile/Web dev team

The express server was temporary - the tech stack I would have chosen for this is Django.

Why Django?
- Django ORM, to do performant SQL queries without the SQL 
- Security out of the box
- Django Admin - easy access to a database / import or update csvs with import-export library
- django-rest-framework - to create endpoints
- [djangorestframework-camel-case](https://github.com/vbabiy/djangorestframework-camel-case)
- Python








