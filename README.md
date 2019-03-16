![Cinemaphile Logo](public\assets\images\readme-images\logo.png)

# Cinemaphile
> A web application that tracks the movies you watch, and want to watch!

Search for movies! Then, when logged in, you can add movies to your watch and completed lists. Keep track of movies you want to watch, and movies you've already watched.

This application uses Node.js and Express.js to host the server. Passport.js and bcrypt allows for authentication of user log-in credentials. Handlebars.js allows for dynamic HTML page rendering. Finally, Sequelize is the ORM, allowing for easy references to the MySQL database hosted through JawsDB.

## Getting started

Create an account and log in. Then, search for movies and add to your heart's content!

![Search Page](public\assets\images\readme-images\homepage.png)

## Developing

To develop the project further:

```shell
git clone https://github.com/sdreyes/Project-2.git
cd Project-2/
npm install
```

Create your MySQL database and edit config.js to match your new database credentials. Run the program to initialize your tables.

## Features

* Search the database for movie titles containing your search term
* Add a movie to the database if you don't see the title you're looking for
* Create an account and log in
* Add movies to your own personal lists
* Remove movies from your personal lists

## Links

- Deployed: https://cinemaphile.herokuapp.com/
- Repository: https://github.com/sdreyes/Project-2
- Special Thanks and Inspiration:
  - Passport Tutorial: https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
  - Data Set Source: https://github.com/Vatshayan/MoviesDataReview


## Authors

- Rainer Floeter: https://rrfloeter.github.io/Portfolio-CV-Page/
- Sai Kuk: https://saikuk.github.io/Bootstrap-Portfolio/
- Priya Patel: https://patelpriyasunil.github.io/Priya_Patel_portfolio/
- Shelby Reyes: https://sdreyes.github.io/
