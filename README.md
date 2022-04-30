# REST-API for adding members with Express.js and React

## The community book

_Is a record keeper to see, add, edit and delete members._

---

This is an individual assignment from my school.\
The assignment is to create a REST-API using NodeJS with Express.
The API has 5 endpoints GET, GET/single, DELETE, PUT, POST.\
All data is saved in a JSON file.
The single endpoint is used for editing an existing record.

For the front I used create-react-app.

- Listing current members with edit/delete
- Form to create/edit member.
- Using animations and toast notifications.

---

Krav för godkänt:  
&check; 1.Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs)  
&check; 2.Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http)  
&check; 3.Datan som API:et hanterar sparas lokalt i serverfilen  
&check; 4.APIét ska svara med 404 om datan saknas.  
&check; 5.Git & GitHub har använts  
&check; 6.Projektmappen innehåller en README.md fil - (läs ovan för mer info)  
&check; 7.Uppgiften lämnas in i tid!  
Krav för väl godkänt:  
&check; 1.Alla punkter för godkänt är uppfyllda  
&check; 2.All data skall vara sparad i en JSON-fil istället för i serverfilen  
&check; 3.Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort  
&check; 4.Ett klient-gränssnitt skall byggas för att anropa API:ets alla olika endpoints och presentera datan, redigeringsformulär skall fyllas i med befintlig information.  
&check; 5.Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt

## Running the project

Clone or download
[repo](https://github.com/spaceflake/REST-api-with-Express)

In the project directory, you can run:

### `npm install`

### `npm start`

start script runs both express server and react client

Check package.json file for scripts running them seperatly.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

---

Project created by Tomas Fridekrans\
School: MedieInstitutet\
Class: FED21G\
Teacher: David Jensen
