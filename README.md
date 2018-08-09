# YelpCamp

## Demo
you can see the demo at [Heroku](https://yelp-camp-stack.herokuapp.com/).
### Demo Account
Username | Password
------------ | -------------
demo | demo
demodua | demo
demotiga | demo

## Features
* Create Campgrounds
* Update Campgrounds
* Delete Campgrounds
    * Add Comment to Campgrounds
    * Update comment in campgrounds
    * Delete comment in Campgrounds
* Create Account
* Show Profile Account
* Update Profile Account
* Delete Profile Account

## Plan

### Campground Routes 
Verb | Routes | Description
------------ | ------------- | -------------
GET | /campgrounds | Show all Campgrounds
GET | /campgrounds/new | Page to add campground Data
GET | /campgrounds/:campid | Show a single Campground
POST | /campgrounds/:campid | Create new Campground
GET | /campgrounds/:campid/edit | Page edit Campground
PUT | /campgrounds/:campid | Update a Campground
DELETE | /campgrounds/:campid | Delete a Campground

### Comment Routes 
Verb | Routes | Description
------------ | ------------- | -------------
POST | /campgrounds/:campid/comments | Create new Comment
PUT | /campgrounds/:campid/comments/:commentid | Update a Comment
DELETE | /campgrounds/:campid/comments/:commentid | Delete a Comment