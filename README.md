
<!-- ## Table of Contents: -->

<!-- - [Overview](#overview)
  + [The Chalenge](#the-challenge)

- [Our Proces](#process)
  + [Timeline](#timeline)
  + [Team Collaboration](#collaboration)
  + [Built with](#built-with)

- [Run the project](#run-project)
  + [Back-End](#backend)
  + [Front-End](#frontend)

- [Future Development](#development)
  
- [Authors](#authors)
  + [Back-End](#backend-authors)
  + [Front-End](#frontend-authors) -->

## Health Ecommerce - Overview

### The challenge:
This project is an E-Commerce Web App as a graduation project from the Job Placement Program by Sprints as part of [egFWD scholarship](https://egfwd.com/)

The E-Commerce app has two types of users:

- **User**: can browse products, add to cart and make orders
- **Admin**: can perform CRUD operations on products, categories, brands, change order status and view bussiness statistics

<!-- You can access the live demo via [Public Domain on Heroku](https://healthecommerce.herokuapp.com) -->

## Our Process

### Timeline:
- The proejct was annouonced with 3 weeks deadline, we met on the Bootcamp slack channel and formed the team and had about 2.5 weeks in our hands

- From our humble understanding of **Agile mindset**, we decided to have two main sprints for Development (Fron-End & Back-End in parallel). After that we had a sprint for Testing & Fixing Bugs

- From our interest in **Health Tech**, we opted to focus the E-commerce scope for health products(e: medical devices, nutrients, ...etc)

### Team Collaboration:
- We used different tools to follow a collaborative work style and manage tasks, as follows:
  + [Github Repo](https://github.com/Mohamed3Okasha/health-ecommerce)
  + [Trello Board](https://trello.com/b/NPpDfUxS/health-e-commerce)
  + [Postman Workspace](https://app.getpostman.com/join-team?invite_code=6f971a6daa3aff03af4868df315a1616&target_code=54927e7e729a93d8e277db7491e11b59)
  + [DB Diagram, Online](https://dbdiagram.io/d/62a11bb854ce2635278a503e)


### Built With:

- [Node.js](https://nodejs.org/en/) - Runtime environment to help build fast server applications
- [Express.js](https://expressjs.com/) - Backend web framework
- [MongoDB](https://www.mongodb.com/) - Database to store document-based data
- [Mongoose](https://mongoosejs.com/) - Object-modeling tool for Node.js
- [ReactJS](https://reactjs.org/) - JavaScript library for building user interfaces
- [Heroku](http://heroku.com/) - Platform to deploy web applications
- [JSON Web Token](https://jwt.io/) - A standard to securely authenticate HTTP requests


## How to run the project

### Run the Back-End

- You need to have the following installed

  - **NPM**
  - **Node.JS**
  - **MongoDB**

- Create MongoDB cluster and obtain connection string
- Clone this repository
- Create enviornment file `/back-end/src/config/.env.development`
- Inside `.env.development`, add the following enviornment variables:

```
MONGODB_URL={MongoDB connection string}
JWT_SECRET={JWT secret key}
PORT={The port you want the server to run on (typically 3000)}
```

- Navigate to `project/back-end`
- Run the following commands:

```
npm install
npm run start
```

- Server is now running on `http://localhost:{PORT}`

### Run the Front-End
- You need to have the following installed

  - **NPM**
  - **ReactJS**
  - **React Router**
  
- Navigate to `project/front-end`
- Run the following commands:

```
npm install
npm run start
```

- You can now access the app on `http://localhost:3003`

## Future Development:

- Using Redux Toolkit for managing the state
- Using HttpOnly Cookie & Silent Refresh for JWTs 

## Team Members on LinkedIn:

### BackEnd:
- [Alwaleed Ibrahim](https://www.linkedin.com/in/al-waleed-ibrahim/)
- [Mohamed Alkhateb](https://www.linkedin.com/in/mohamed-alkhateb-951342215)
### FrontEnd:
- [Mohamed Okaha](https://www.linkedin.com/in/mohamed-okasha)