# Cow Hut Admin With Auth

<hr>

## API Endpoints

  ### Live Link: https://cow-hat-auth-backend.vercel.app
  ### Application Routes:
  
  ## Main part
  
   ### Auth (User)
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/auth/login (POST)
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/auth/signup (POST)
   - Route:  https://cow-hat-auth-backend.vercel.app/api/v1/auth/refresh-token (POST)

   ### Auth (Admin)
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/admins/create-admin (POST)
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/admins/login (POST)
   
   ### User
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/users (GET)  Include an id that is saved in your database
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/users/6499f6da96867b5eeaf3b855 (Single GET) Include an id that is saved in your database
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/users/6499f6da96867b5eeaf3b855 (PATCH) Include an id that is saved in your database
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/users/649771e49c8eb6b1876b5883 (DELETE) Include an id that is saved in your database

   #### Cows
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/cows (POST)
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/cows (GET)
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/cows/6499f7ed96867b5eeaf3b85c (Single GET) Include an id that is saved in your database
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH) Include an id that is saved in your database
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

   #### Orders
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/orders (POST)
   - Route: https://cow-hat-auth-backend.vercel.app/api/v1/orders (GET)

 ## Bonus Part

#### Admin
   -Route: https://cow-hat-auth-backend.vercel.app/api/v1/admins/create-admin (POST)

#### My Profile
- Route: https://cow-hat-auth-backend.vercel.app/api/v1/users/my-profile (GET)
- Route: https://cow-hat-auth-backend.vercel.app/api/v1/users/my-profile (PATCH)

#### Order:
 - Route: https://cow-hat-auth-backend.vercel.app/api/v1/orders/6499f7ed96867b5eeaf3b85c (GET)
