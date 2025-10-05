🍲 Georgian Supra — Recipe Sharing App

A modern Angular 20 recipe-sharing web application with clean design, lazy loading, and a JSON-based backend.
Users can browse, search, add, edit, and delete recipes with full details — including ingredients, instructions, and images.

🚀 Features
🔹 Recipe Display

Home page lists all available recipes with title, short description, and image.

Each recipe card links to a detailed view page showing:

Full description

Ingredients

Preparation instructions

Edit & Delete options

🔹 Add Recipes

Add new recipes via a simple form.

Fields:

Title

Short Description

Image URL or Upload Thumbnail

Ingredients (dynamic list)

Instructions

Mark as favorite

Built with Angular Reactive Forms and validation.

🔹 Edit & Delete Recipes

Edit or remove recipes after posting directly from the details page.

🔹 Search Functionality

Live search bar filters recipes by title or ingredient.

Toggle switch to show only favorite recipes.

🔹 Routing & Lazy Loading

Uses Angular’s new control flow syntax (@if, @for) and lazy-loaded routes.

Routes include:

/recipes — home page

/recipes/:id — recipe details

/recipes/new — add recipe form

/recipes/:id/edit — edit recipe form

/** — not-found page

🔹 UI & Styling

SCSS styling for consistent layout across cards and forms.

Clean typography, rounded buttons, and responsive grid.

Styled 404 “Not Found” page.

🧩 Tech Stack
Layer	Technology
Frontend	Angular 20
Language	TypeScript
Styling	SCSS
Backend (mock API)	JSON Server
Package Manager	npm
Architecture	Component-based, Reactive Forms, Signals API, Services.
⚙️ Setup Instructions
1️⃣ Clone the repository
https://github.com/nikakaladze/Georgian-Supra
cd Georgian-Supra

2️⃣ Install dependencies
npm install

3️⃣ Run JSON Server (Mock Backend)
npx json-server --watch db.json --port 3000


You can also add a script inside package.json:

"scripts": {
  "server": "json-server --watch db.json --port 3000"
}


Then simply run:

npm run server

4️⃣ Run Angular Frontend
ng serve


Navigate to:
👉 http://localhost:4200

5️⃣ JSON Server API

Base URL: http://localhost:3000/recipes

Example:

GET    /recipes
GET    /recipes/:id
POST   /recipes
PUT    /recipes/:id
DELETE /recipes/:id


💡 How It Works

The frontend requests data from json-server (localhost:3000/recipes).

Recipes are displayed dynamically with Angular bindings.

When you add or edit a recipe, it sends a POST/PUT request to JSON server.

Search and filtering work on the client-side via Signals & ngModel binding.
