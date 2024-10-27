# calendar-backend

1. Install All dependencies using npm install.
2. then run the backend server with help of nodemon app.js.

# for security purposes i remove my google id credentials, I hope it is not a problem.

1. make a .env file in backend folder.
2. In .env file add this,

    MONGO_URI=mongodb://localhost:27017/calenderevents # your database uri obtain from mongodb
    GOOGLE_CLIENT_ID="your client id"
    GOOGLE_CLIENT_SECRET="your secret key"
    REDIRECT_URI="http://localhost:5000/auth/google/callback"
    PORT=5000