# Admin dashboard for product management inventory

This a fullstack application used to manage product inventory. This includes creating categories, suppliers, users, sales and purchases. It uses Docker to manage individual services such as storing data in MongoDB, communicating with the REST API via Node + Express, and receiving data from React application. During development, challenges were encountered in synchronizing the front-end and back-end applications, as well as the seeding script, which requires fake data in development mode. Some features to consider implementing in the future include optimizing slow-rendering components, specially tables with over 120 rows of data per pagination, and addressing other rendering performance issues. It's also important to avoid unnecessary request from the client to the server.

## Installation

There are two ways to execute this projects: development mode or production mode.

### Development mode

First, clone the source code repository:

<pre>
  npm run dev
</pre>
