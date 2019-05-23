# Image upload and cropping app

## Test

* Upload a 1024 x 1024 image as a sample to test the application

## Assumption

* Image should be 1024 x 1024
* Doesnot upload if different size
* Cropping available for 4 sizes

## Project Description
```
1) A web panel where the user can upload an image 
2) Each image has a recommended size of 1024 x 1024. 
3) Don’t upload the file if it’s not the right size. 
4) Each image has to be converted into 4 different sizes. 
horizontal : 755 x 450 
vertical : 365 x 450 
horizontal small : 365 x 212 
gallery : 380 x 380 
Images should not be stretched, and they should be cropped properly.

5) Save all 4 of these images locally on the server 
6) Show a webpage with all 4 of these new images.

Bonus : Instead of saving these files to the server, upload them to a cloud image hosting service.

Double Bonus : While uploading the image shows a preview in the browser itself of all the different image sizes, and lets the user decide how to crop the images to the smaller size.
```

### Installing

Environment : Windows and Linux

Setting Prerequisites

```
1) Start mongodb by running mongod
2) node v8.11.4
```

Setting up the local server

```
1) Run command npm install
2) Node app to start the server
5) Go to localhost:3000
```

Getting started

```
1) Visit http://localhost:3000 on your browser
2) Manage image cropping fast and effortlessly in the smartest way possible.
```

## Built With

* Bootstrap
* nodejs
* Postman
* VS code

## Versioning

Image upload and cropping version 1.0

## Authors

* **Vivek Shankar** 