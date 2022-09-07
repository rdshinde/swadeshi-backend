<div align="center">
  <h1><a href="https://swadeshi-ecomm.herokuapp.com"> Swadeshi Ecomm Backend </a></h1>
  
  
  The backend for ecomm app.
</div>

## **How to install and run locally ?**

```
$ git clone https://github.com/rdshinde/swadeshi-backend.git
$ npm install
$ npm start
```

## **Features -**

- Create Users.
- Create Categories.
- Create Products.

- User Cart Management
  - Add to Cart.
  - Update Cart.
  - Move to wishlist from Cart.
  
- User Wishlist Management
  - Add to Wishlist
  - Move to cart from Wishlist
  - Delete from Wishlist
  
- Products Management
  - Add new products
  - Fetch all products
  - Fetch Single products

- Manage User Address.
  - Add new address
  - Edit address
  - Delete address
  
- Authentication
  - User Signup
  - User Login

## **Built with -**

- Node JS
- Express JS
- Mongo DB Atlas
- Mongoose

## **How to Use? -**

#### 1. API Endpoint: ` / ` </br>
   Method: `GET` </br>
   Response 
```json 
{
    "title": "Swadeshi-Ecomm-App",
    "description": "This is backend for E-commenrce app.",
    "author": "Rishikesh Shinde",
    "features": [
        "Auth-Management",
        "Products-Management",
        "Cart-Management",
        "Wishlist-Management"
    ],
 }
```
   Description: This endpoint returns the app description.

# Products Management

#### 2. API Endpoint: ` /products ` </br>
   Method: `GET` </br>
   Response 
```json 
{
    "success": true,
    "products": []
}
```
   Description: This endpoint returns the products listed on DB.
   
   

#### 3. API Endpoint: ` /products ` </br>
   Method: `POST` </br>
   ```javascript
   body:{...Product}
   ```
   Response 
```json 
{
    "success": true,
    "products": []
}
```
   Description: This endpoint returns the products listed on DB.
   
   
#### 4. API Endpoint: ` /products/:id ` </br>
   Method: `GET` </br>
   Response 
```json 
{
    "success": true,
    "products": [
          {}
    ]
}
```
   Description: This endpoint returns the single product.
   
   
## **Live Project -**

Here it is [Swadeshi Ecomm Backend](https://swadeshi-ecomm.herokuapp.com/)

