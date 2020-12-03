# Blog-assign

To install dependaincies: npm install OR npm i

To start : npm start 
    This will start the server on port 3040.
All parameters to be sent in req.body . Tested with postman with x-www-form-urlencoded type.

JWT token to be send in header with key 'token' wherever required.

Base URL: localhost:3040/

Available APIs: 
1. URL: /user/register 
   Type: POST
   Token: NA
   Params: userId,  password,  firstName,  lastName,  email,  phone
   
2. URL: /user/login
   Type: POST
   Token: NA
   Params: userId,  password
   
3. URL: /user/logout
   Type: GET
   Token: Required
   
4. URL: /post/create 
   Type: POST
   Token: Required
   Params: title,  description
   
5. URL: /post/edit 
   Type: POST
   Token: Required
   Params: postId,  title,  description
   
6. URL: /post/delete 
   Type: POST
   Token: Required
   Params: id
   
7. URL: /post/getPost
   Type: POST
   Token: Required
   Params: postId
   
8. URL: /post/getAll 
   Type: GET
   Token: Required
   Params: NA
   
9. URL: /comment/add 
   Type: POST
   Token: Required
   Params: postId,  comment
   
10.URL: /commnet/get 
   Type: POST
   Token: Required
   Params: postId
   
   
Covered most positive flows here, but there is much more room for updation and optimization.
