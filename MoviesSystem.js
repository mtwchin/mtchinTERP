"use strict";

const express = require("express");
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const portNumber = process.env.PORT || 7003;

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));

/*
This is only needed when testing locally. Keep it commented out on Render.

require("dotenv").config({
   path: path.resolve(__dirname, "credentialsDontPost/.env"),
});
*/

const databaseName = "CMSC335DB";
const collectionName = "moviesCollection";

function createClient() {
   const uri = process.env.MONGO_CONNECTION_STRING;

   if (!uri) {
      throw new Error("MONGO_CONNECTION_STRING is not defined");
   }

   return new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
}

app.get("/", (request, response) => {
   response.send("My Deployment");
});

app.get("/insertMovies", async (request, response) => {
   let client;

   try {
      client = createClient();
      await client.connect();
      const collection = client.db(databaseName).collection(collectionName);

      const moviesArray = [
         { name: "Batman", year: 2021, stars: 1.5 },
         { name: "Wonder Woman", year: 2005, stars: 2.0 },
         { name: "When Harry Met Sally", year: 1985, stars: 5 },
         { name: "Hulk", year: 1985, stars: 5 },
      ];

      const result = await collection.insertMany(moviesArray);
      response.send(`<h2>Inserted ${result.insertedCount} movies</h2>`);
   } catch (error) {
      console.error(error);
      response.status(500).send("<h2>Unable to insert movies</h2>");
   } finally {
      if (client) {
         await client.close();
      }
   }
});

app.get("/listMovies", async (request, response) => {
   let client;

   try {
      client = createClient();
      await client.connect();
      const collection = client.db(databaseName).collection(collectionName);

      const filter = {};
      const cursor = collection.find(filter);
      const result = await cursor.toArray();
      let answer = "<h2>Movies</h2>";

      result.forEach(movie => {
         answer += `${movie.name} (${movie.year}) - ${movie.stars} stars<br>`;
      });

      answer += `<p>Found: ${result.length} movies</p>`;
      response.send(answer);
   } catch (error) {
      console.error(error);
      response.status(500).send("<h2>Unable to list movies</h2>");
   } finally {
      if (client) {
         await client.close();
      }
   }
});

app.get("/clearCollection", async (request, response) => {
   let client;

   try {
      client = createClient();
      await client.connect();
      const collection = client.db(databaseName).collection(collectionName);

      await collection.deleteMany({});
      response.send("<h2>Collection Cleared</h2>");
   } catch (error) {
      console.error(error);
      response.status(500).send("<h2>Unable to clear collection</h2>");
   } finally {
      if (client) {
         await client.close();
      }
   }
});

app.get("/getSummary", (request, response) => {
   const variables = { year: 2026 };
   response.render("summary", variables);
});

app.listen(portNumber, () => {
   console.log(`main URL http://localhost:${portNumber}/`);
});
