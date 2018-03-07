# Stock Tracker
This is an app for tracking the performance of your investments in an user-friendly interface. On top of tracking current prices, purchase prices, and number of shares for each investments, it also pulls in key financial ratios, company information, and relevant news. 

## Link to site
https://stock-up-app.herokuapp.com

## Technologies/Frameworks used:
MERN stack:

React.js
MongoDB
Express.js
Node.js

Other:
React-router
Axios
Mongoose.js
CSS and HTML
styled-components
Recharts
Heroku
React Icons

### More About the Project

Planning and Project Management

- User Stories: https://trello.com/b/SUzslxtZ/stocks-app
- Wireframes: https://i.imgur.com/zYyY8AM.png
- ERD: https://i.imgur.com/yFghmws.png

## API's
I spent a lot of time researching and testing different API's. Some that I found even inspired some of my favorite features on the site that I was not sure if I was going to be able to complete. For instance, when I found the Alpha Vantage free API for time series stock prices, I knew I had to try to leverage this to make a line graph. Once I got it working for daily prices, I knew I wanted to give the option to quickly toggle between multiple timeframes.  

#### Intrinio
- Financial Ratios
- News
- Company Information

#### Alpha Vantage
- Hourly close prices
- Daily close prices
- Weekly close prices
- Current real-time price

## Remaining goals:
- Add cryptocurrencies
- Add gain/loss color indicator for each stock like I have for the total portfolio on the index page
- Add a homepage with a general newsfeed, maybe based on specific user's interests
- Authentication
- Watch lists for stocks that you want to keep an eye on but not yet purchase
