# Game Library - Private Frontend

## Overview
This repo is the private frontend for a library management concept app for use by a board game cafe. It enables CRUD actions for games in the collection, tags used for filtering game searches, and users with varying levels of access.   

Public Frontend Repo: https://github.com/JakeBrowning90/game-library-public
API Repo: https://github.com/JakeBrowning90/game-library-api

All routes are protected by jwt authentication, and newly-created users must be granted "confirmed" status by an Admin before being able to login. Additionally, while all confirmed users can perform CRUD operations on games and tags, only Admins can view or work with data on other users. 

## Technologies
React, React Router,  CSS, JavaScript, jsonwebtoken in localStorage

## Challenges/To-dos
- Update DB with CSV upload including array of tag selections

- Form input limits and backend validation: the build currently has limited form attributes, and validating queries on the back end may be a good practice.

- Collapsable forms on game create/edit/delete?

- Lock search form to the top of the screen: This should be easily doable, but I'd like additional feedback from users before settling on this design.

- Paginate search results: The current build returns all search results as a single page. I'd like to modify this to return only 10 or so at time, and let the user advance through the results one page at a time.

- Change filter form to left sidebar on desktop: the current build is designed as a mobile-first application, but a desktop-friendly layout might have the form off to the side.

- Link to online info: One idea I've heard most frequently in feedback is to give each Game detail additional info like it's boxart and and info from a site like BoardGameGeek for review scores, rules, discussion, and online shopping. I like this idea, but am concerned that store staff would be put off of manually adding those links to a new entry, and I haven't found an API that could more easily fetch that info.

- Popularity/trending view: If I add user ratings and/or the date a game is added to the collection to the Game schema, then it would make sense to add filters like "popular" or "new arrivals" to the search form.

## How to use
Visitors: log into the demo account (read-only access) with the following credentials. 

### Username - DemoUser
### Password - DemoPassword 

You will be able to view the Tag and Game lists, as well as the associated forms, but cannot create, edit, or delete any records. You will also not have access to the User list.

## Credits
Thanks to friends both in my web dev community as well as in my board game group for feedback on design and potential future features. Sample game info is from boardgamegeek.com, or is otherwise made up by myself as example data.