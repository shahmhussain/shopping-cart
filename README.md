# Shopping Cart App

Created this app using everything requested in the tech test sheet including:

- React
- Typescript
- React Context API
Note: I over-engineering this project to use useContext; this was not necessary as the props were only nested one level deep.
I added this into the project as it was requested in the tech test
- Hooks
- MUI
- React Testing Library
- Cypress

## Running the app
- cd shopping-cart-app
- For first time installation, please run 'npm i'
- npm run start

# Unit Testing
- React Testing Library, achieved 100% branch coverage (excluding the Typescript interfaces and index.tsx)

## Running unit tests
- Please run 'npm run coverage' to see the generated report


# End to end Testing 
- Cypress, added a basic cypress test just to showcase my knowledge of Cypress
- Used data-testid to make sure e2e tests were not brittle

## Running e2e tests
- In one terminal window make sure you have the app open on localhost (see section 'running the app')
- Open another terminal window and change into the 'cypress-tests' folder
- For first time installation, please run 'npm i'
- Then run 'npm cy:open' to open the tests