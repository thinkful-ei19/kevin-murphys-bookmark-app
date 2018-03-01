This is a solo project, by Kevin Murphy. The goal is to design a bookmark application that follows these guidelines:

# Fundamentals Final Project
---
## Build a Bookmarks App
---
### Project Overview
Using everything you've learned over the Fundamentals section of the course, you will build the frontend for an API-powered Bookmarks application that lets the user store and rate their custom web bookmarks.

### User Stories
As a user:

I can add bookmarks to my bookmark list. Bookmarks contain:

* title
* link
* description
* rating (1-5)

* I can see a list of my bookmarks when I first open the app

All bookmarks in the list default to a "condensed" view showing only title and rating
I can click on a bookmark to display the "detailed" view

Detailed view expands to additionally display description and a "Visit Site" link
I can remove bookmarks from my bookmark list

I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated above the chosen selection

(Extension) I can edit the rating and description of a bookmark in my list

Process
Before coding anything, think about your user flow. What does the initial loaded page look like? What is each action a user can take and how does it affect the visual layout?

Draw up gray box wireframes using MockFlow, a free wireframing tool of your choice, or on a napkin!

For every wireframed application state, include a populated store object as an example next to it

Set up your project. Create your Git repo, build your boilerplate file structure, connect jQuery and confirm your linked JavaScript/CSS files are being read by your HTML.

Build an HTML version of all the different states of your application. Use multiple HTML files if you wish - these will be deleted later, but useful for establishing the HTML strings your template generator functions will need to build.

Review the API Documention. Perform some test requests with Postman.

Construct your modules and test every new function as you build it.

Technical Requirements
Use jQuery for AJAX and DOM manipulation

Use namespacing to adhere to good architecture practices

Minimal global variables!
Logically group your functions
Use semantic HTML

Use responsive design

Follow a11y best practices