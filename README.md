# Cow Hut Admin With Auth

<hr>

## API Endpoints

  ### Live Link: https://digital-cow-hut-backend-one-zeta.vercel.app
  ### Another Live Link: https://digital-cow-hut-backend-bucpef6dp-noormohammad011.vercel.app
  ### Application Routes:
  
  ## Main part
  

  ### Testing Cows Get Route
  - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/test (GET--> All Cows)
  - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/test?page=1&limit=1 (GET --> Pagination)
  - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/test?page=1&limit=1&sort=-price (GET --> Sorting)
  - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/test?page=1&limit=1&sort=-price&fields=name,price (GET --> Field Selection)
  - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/test?page=1&limit=1&sort=-price&fields=name,price&price[gte]=5000 (GET --> Filtering by price)
  - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/test?page=1&limit=1&sort=-price&fields=name,price&price[gte]=5000&price[lte]=100000 (GET --> Filtering by price)
  - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/test?price[gte]=5000&page=1&limit=10&location=Rajshahi&sort=-breed&fields=name,price (GET --> Filtering by price, location, sorting, field selection, pagination)
  - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/test?price[gte]=5000&page=1&limit=10&location=Rajshahi&breed=Nellore,Brahman&sort=-breed&fields=name,price (GET --> Filtering by price, location, breed(Multiple Fields), sorting, field selection, pagination)
  - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/test?price[gte]=5000&page=1&limit=10&location=Rajshahi&breed=Nellore,Brahman&sort=-breed&fields=name,price&searchText=na (GET --> Filtering by price, location, breed(Multiple Fields), sorting, field selection, pagination, search)




  



   ### Auth (User)
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/auth/login (POST)
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/auth/signup (POST)
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/auth/refresh-token (POST)

   ### Auth (Admin)
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/admins/create-admin (POST)
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/admins/login (POST)
   
   ### User
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/users (GET)  Include an id that is saved in your database
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/users/6499f6da96867b5eeaf3b855 (Single GET) Include an id that is saved in your database
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/users/6499f6da96867b5eeaf3b855 (PATCH) Include an id that is saved in your database
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/users/649771e49c8eb6b1876b5883 (DELETE) Include an id that is saved in your database

   #### Cows
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows (POST)
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows (GET)
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/6499f7ed96867b5eeaf3b85c (Single GET) Include an id that is saved in your database
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH) Include an id that is saved in your database
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

   #### Orders
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/orders (POST)
   - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/orders (GET)

 ## Bonus Part

#### Admin
   -Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/admins/create-admin (POST)

#### My Profile
- Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/users/my-profile (GET)
- Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/users/my-profile (PATCH)

#### Order:
 - Route: https://digital-cow-hut-backend-one-zeta.vercel.app/api/v1/orders/6499f7ed96867b5eeaf3b85c (GET)
