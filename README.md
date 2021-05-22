## Authorization JSON Web Token

[![Product Name Screen Shot][product-screenshot]](https://github.com/jannkasper/authorization-react-app-express/blob/master/screenshot.png)

## :rocket: Tech Stack

- ReactJs
- JSON Web Token
- Ant Design
- NodeJs
- Express

## :warning: Prerequisite

- node
- npm

## :cd: How to run local

```bash
# Clone this repository
$ git clone https://github.com/jannkasper/authorization-react-app-express

# Go into server
$ cd authorization-react-app-express/server

# Create configuration file (copy .env.example)
$ echo 'HOST=<host>' >> .env
$ echo 'DB=<db>' >> .env
$ echo 'DB_USER=<user>' >> .env
$ echo 'DB_PASSWORD=<password>' >> .env
$ echo 'DB_PORT=<port>' >> .env
$ echo 'TOKEN_SECRET=<token>' >> .env

# Install dependencies
$ npm install

# Start the backend server
$ npm run start

# On another terminal, go to the client folder
$ cd authorization-react-app-express/client

# Install dependencies
$ npm install

# Start the frontend client
$ npm run start
```

## :book: Directory Structure

```
├── app/
│   ├── client/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Registration.jsx
│   │   │   │
│   │   │   ├── App.css
│   │   │   ├── App.js
│   │   │   ├── index.css
│   │   │   └── index.js
│   │   │
│   │   └── package.json
│   │
│   └── server/
│       ├── bin/
│       ├── config/
│       ├── controllers/
│       ├── helper/
│       ├── models/
│       ├── public
│       ├── routes
│       ├── .env
│       ├── .env.example
│       ├── app.js
│       └── package.json
│    
```

## :memo: License

This project is made available under the MIT License.





<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: screenshot.png
