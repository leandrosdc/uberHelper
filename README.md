#UberHelper
Application Project - Group 10 - Fanshawe College

Welcome to UberHelper, a project developed by Group 10 at Fanshawe College. This application is designed to assist users in finding nearby restaurants (currently focused on McDonald's and Burger King), Gas Stations and mechanics using Google Maps and Firebase for data storage. Below, you'll find all the necessary details to understand, set up, and contribute to the project.

Project Structure
The project is organized into the following folders and files:

/css: Contains all the CSS files for styling the application.

restaurant.css: The main CSS file used as a visual standard for all pages.

/js: Contains all JavaScript files for functionality.

firebase.js: Handles Firebase integration for data storage.

/images: Stores all images used in the project, including icons and background images.

index.html: The main HTML file for the application.

README.md: This file, containing project details and instructions.

Getting Started
To set up the project locally, follow these steps:

Clone the Repository:
Open your terminal and run the following command to clone the repository into your desired folder:

bash
git clone https://github.com/leandrosdc/uberHelper.git
Navigate to the Project Folder:
Move into the project directory:

bash
cd uberHelper
Open the Project in Visual Studio Code:
Launch the project in your code editor:

bash
code .

Run the Project:
Use the Live Server extension in Visual Studio Code to open the project. Right-click on index.html and select "Open with Live Server". This will start the application at a local address (e.g., http://127.0.0.1:5500/).

Git Commands for Updates:

To stage changes:
bash
git add .

To commit changes:
bash
git commit -m "Your commit message here"

To push changes to the repository:
bash
git push origin main

Tools and APIs

Google Maps API
The project uses the Google Maps API to display the map and search for nearby restaurants. To use the API:

Open the project using Live Server in Visual Studio Code.

Note the local address provided by Live Server (e.g., http://127.0.0.1:5500/).

Share this address with the project maintainer (in this case, Leandro) so they can add it to the allowed domains in the Google Cloud Console.

The API key is already included in the code, but it will only work after the domain is authorized.

Firebase
The project uses Firebase for real-time data storage. If you need to set up a new Firebase database:

Contact the project maintainer (Leandro) to create a Firebase project together.

Update the Firebase configuration in firebase.js with the new credentials.

Visual Standards
To maintain consistency across all pages, use the restaurant.css file as a reference for styling. This ensures a uniform look and feel throughout the application.

Updating the README
For every update to the code, ensure the README.md file is also updated with the following details:

Date: The date of the update.

Name: The name of the person making the update.

Changes: A brief description of what was changed or added.

Example:

### Update - October 10, 2023  
**By: Leandro**  
- Added Google Maps integration for restaurant search.  
- Updated Firebase configuration for real-time data storage.  