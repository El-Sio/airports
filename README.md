# About the Airport Exercice

This project is a simple app in response to a coding exercice that my Lead Tech asks potential recruits to complete.

The exercice is as follows :

Given 3 .csv Files (countries, airports, runway), create an app with the following features :

1/ as a user, I want to see a list all runways for any airport in any country
2/ as a user, I want to see a list of the 10 countries with the greatest number of airports, and the 10 countries with the least number of airports
3/ as a user, I want to see a list of all the surfaces ('type' field in the runway file) available in any given country

# About this AngularAirport "solution"

The code in this repository proposes to solve the problem using an Angular app using RxJS Observables for asynchronous treatment of the servers response.

- For the backend server (not in the repo) : 
- - Converted the CSV Files into one big json data.json file using an online converter (https://www.csvjson.com/csv2json)
- - Used the following package to generate a very simple API (that runs at http://localhost:3000) : typicode JSON Server (https://github.com/typicode/json-server)

- For the font end (code in this repo) :
- - Angular6 / typescript app using RxJS Observable class and many operators (pipe, tap, map, switchmap, combineLatest, pairwise etc.) for the basic features
- - Added the code for a simple memory caching experiment for heavy load computations such as the top 10 or the surfaces search. Code adapted from this experiment (https://github.com/ashwin-sureshkumar/angular-cache-service-blog)
- - Added the core for a simple 'infinite scrolling' feature to display very long lists (the data has over 14k airports objects for country USA) asynchronously. Code adapted from the same experiment (https://github.com/ashwin-sureshkumar/angular-infinite-scroller)