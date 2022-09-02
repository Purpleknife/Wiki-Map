## Wiki Map

Wiki Map is an app where you can discover maps depending on your interests: 'Best Dog Parks', 'Best Beach Parks Around Town', etc. It currently shows maps only for: Toronto (Ontario), Calgary (Alberta) and Vancouver (British Columbia).

This is a collaborative project for Lighthouse Labs's Midterms with @Coltonb-boop.

## Features

- A non-registered or non-logged-in user can view a list of maps, but they can't create, edit or delete pins.
- A logged-in user can't modify maps (create, edit and delete pins).
- They can create new maps and edit, delete or add pins to it.
- They can 'Favorite' a map or remove it from their Favorites.

## Setup

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information (username, password, database)
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
6. Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local` (Note: nodemon is used, so you should not have to restart your server)
8. Visit `http://localhost:8080/`


## Dependencies

- Node
- NPM
- PG
- Chalk
- cookie-session
- method-override
- dotenv
- EJS
- SASS
- Express
- Morgan
- Nodemon

## Final Product

!["Home page"](https://github.com/Purpleknife/Wiki-Map/blob/master/docs/home-page.png?raw=true)
!["Profile page"](https://github.com/Purpleknife/Wiki-Map/blob/master/docs/profile-page.png?raw=true)
!["Create new map"](https://github.com/Purpleknife/Wiki-Map/blob/master/docs/create-new-map.png?raw=true)
!["Edit or Delete pin"](https://github.com/Purpleknife/Wiki-Map/blob/master/docs/edit-delete-pin.png?raw=true)
!["Create new pin"](https://github.com/Purpleknife/Wiki-Map/blob/master/docs/create-pin.png?raw=true)
