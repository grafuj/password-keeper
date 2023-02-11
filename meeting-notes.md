  ### Midterm project

Compass: https://web.compass.lighthouselabs.ca/projects/midterm-proj?day_number=w05d5

Questions to answer:
* What kind of app are we thinking?
  * Passwordkeeper

## User stories:
Role | Goal | Benefit

As a registered user, I will be able to sign in and view all my passwords, generate a new password and retrieve and copy a specific password for a website.

## Features:
* user can register/login and be assigned to an organization
* an organization has many users
* user can add a new username and password for a specific website
* app can generate passwords based on the criteria specified (password length, contains lowercase, contairs uppercase, contains numbers, etc)
* user can edit and change their password any time
* user has a convinient copy to clipboard button so they dont have to select the password
* sites can be categoried, to, social (fb, linkedin), work related (bamboo, harvest), entertainment (snapchat, reddit), etc, etc

## Minimum viable product
* login and view some stored passwords

## User authentication
* we will use the Lightbnb setup (const apiRoutes = require('./apiRoutes') const userRoutes = require('./userRoutes');)

## Wireframes
Inspiration: Google password autofill (primarily single-paged) & Lastpass (primaryly multi-paged)
* multi-pag: only for login and register

* Primarily single page for: password management, adding a new password, editing entries, copying to clipboard and deletion.

Wireframe figma: 

https://www.figma.com/file/glePRGLLjpdTQ8c4KOKRyg/PasswordKeeper?node-id=1%3A620&t=7STgEcY4hKPJfGhE-1

@spoon1113
@Juelzlum

Completed ERD:
https://app.diagrams.net/#G1Bxdv4b2ZvNWDUm1n_UvMFIJGP6JdKzxW

