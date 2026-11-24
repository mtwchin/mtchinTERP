# CMSC335 Project 7 - Hosting

This is my Node.js deployment project for CMSC335. It uses Express, EJS, and MongoDB. The three required database routes clear the movie collection, insert four movies, and list the movies.

## 1. Set up MongoDB Atlas

1. Sign in at `https://cloud.mongodb.com/`.
2. Use a different Atlas project or connection string from the other class projects.
3. Create a database user with password authentication and read/write access.
4. Save the database username and password somewhere private.
5. Under Network Access, add `0.0.0.0/0` so Render can connect from its changing IP address.
6. Open the cluster, select Connect, Drivers, and choose Node.js.
7. Copy the connection string and replace its username and password placeholders.
8. URL encode special password characters. For example, `@` becomes `%40`.
9. Do not put the connection string in GitHub or in `deploy/index.shtml`.

The program creates the `CMSC335DB` database and `moviesCollection` collection when it first inserts data.

## 2. Test locally

1. Run `npm install` in this folder.
2. Copy `credentialsDontPost/.env.example` to `credentialsDontPost/.env`.
3. Put the new Atlas URI after `MONGO_CONNECTION_STRING=` in `.env`.
4. Temporarily uncomment the `require("dotenv").config(...)` block in `MoviesSystem.js`.
5. Run `npm start`.
6. Open `http://localhost:7003/`. It should say `My Deployment`.
7. Open `http://localhost:7003/clearCollection`.
8. Open `http://localhost:7003/insertMovies`. It should report four inserted movies.
9. Open `http://localhost:7003/listMovies`. It should list four movies.
10. Open `http://localhost:7003/getSummary` to check the EJS template.
11. Stop the server with Control-C.
12. Comment the `dotenv` block again before committing for Render.

Do not commit `credentialsDontPost/.env`. The `.gitignore` file excludes it. A quick check is `git status --short`; the private `.env` file should not appear.

## 3. Create the GitHub repository

1. Sign in to GitHub. The local GitHub CLI login for `mtwchin` currently needs to be renewed if the CLI will be used.
2. Create a repository named exactly `mtchinTERP`.
3. Make the repository public.
4. Commit this project folder, including `package-lock.json` but excluding `node_modules` and `.env`.
5. Push the commit to `https://github.com/mtwchin/mtchinTERP`.
6. Open that URL in an incognito/private browser window and confirm the files are visible without signing in.

One possible command sequence after creating the empty GitHub repository is:

```text
git init
git add .
git commit -m "Complete hosting project"
git branch -M main
git remote add origin https://github.com/mtwchin/mtchinTERP.git
git push -u origin main
```

## 4. Deploy on Render

1. Sign in to Render with GitHub.
2. Select Add New, then Web Service.
3. Connect the public `mtchinTERP` repository.
4. Use `mtwchinTERP` as the service name if it is available.
5. Select Node as the language/runtime.
6. Set the build command to `npm install`.
7. Set the start command to `npm start`.
8. Select the Free compute option.
9. Add an environment variable named exactly `MONGO_CONNECTION_STRING`.
10. Paste the Atlas URI as its value without surrounding quotes.
11. Select Deploy Web Service and watch the logs until deployment succeeds.
12. Save the final `https://...onrender.com` URL. Render may lowercase or adjust the service name.

## 5. Test the deployed application

Visit these URLs in this order, replacing the host if Render assigned a different one:

1. `https://mtwchinterp.onrender.com/`
2. `https://mtwchinterp.onrender.com/clearCollection`
3. `https://mtwchinterp.onrender.com/insertMovies`
4. `https://mtwchinterp.onrender.com/listMovies`
5. `https://mtwchinterp.onrender.com/getSummary`

The list should show exactly four movies after clearing and inserting once. If the root route works but a database route fails, check the Render logs, Atlas database user, URI password encoding, IP access list, and Render environment variable.

## 6. Finish the TerpConnect page

1. Open `deploy/index.shtml`.
2. If Render assigned a different URL, replace all four `mtwchinterp.onrender.com` links.
3. Upload the whole `deploy` folder to the TerpConnect personal web area. Do not rename it to `terpconnect_static_site`.
4. Open `https://www.terpconnect.umd.edu/~mtchin/deploy/` and click every link.
5. Run the course hosting verification page with directory ID `mtchin`.

## Final check

- Repository name is exactly `mtchinTERP`.
- GitHub repository is public in an incognito window.
- Render root, clear, insert, and list routes work.
- A separate MongoDB connection string is used for this project.
- The TerpConnect folder is named `deploy` and contains `index.shtml`.
- The TerpConnect page has the name, GitHub URL, Render URL, and all three required database endpoints.
- Every link works before the deadline.
