# Game Library - Private Frontend

## Overview
This repo is the private frontend for a library management concept app for use by a board game cafe. It enables CRUD actions for games in the collection, tags used for filtering game searches, and users with varying levels of access.   

Public Frontend Repo: https://github.com/JakeBrowning90/game-library-public
API Repo: https://github.com/JakeBrowning90/game-library-api

All routes are protected by jwt authentication, and newly-created users must be granted "confirmed" status by an Admin before being able to login. Additionally, while all confirmed users can perform CRUD operations on games and tags, only Admins can view or work with data on other users. 

## Technologies
React, React Router,  CSS, JavaScript, jsonwebtoken in localStorage

## Challenges/To-dos
-Update DB with CSV upload including array of tag selections

-Form input limits and backend validation: the build currently has limited form attributes and should include some placeholders and hard character limits, as well as improved validation on the back end.

-Collapsable forms on game create/edit/delete?

-Lock forms to top of list screens 

-Paginate search results: The current build returns all search results as a single page. I'd like to modify this to return only 10 or so at time, and let the user advance through the results one page at a time.

-Set demo permissions

Feedback:
-single-player tag
-scrape rating off BGG?
-recommend similar games on detail view?
-Personalize greeting and Game List Header 
-Move difficulty filter out of advanced 
-Change filter form to left sidebar on desktop? 
-Display boxart 
-Detail view: link to buy, rules, forums? 
-Popularity/trending view? 
-Increase title and player count heights

## How to use
Visitors: log into the demo account (read-only access) with the following credentials.
### Username - DemoUser
### Password - DemoPassword 

## Credits
Thanks to friends for feedback on design and potential future features.