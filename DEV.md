# Adding a user to the API

Use the `npm run user:create` script. It interactively prompts for a username, password and scopes and creates the user in the `User` table of the database.

For prod users `npm run user:create:prod` runs the command on an temporary heroku instance to reach the prod database.

# Auth2 flow

Users are stored in `User` in mysql.

They call `/auth/login` with a username and password. `passportjs` is used to authenticate the credentials using the `passport-local` strategy to validate against the database. If that succeeds, `passport-session` strategy is used to store a new session for the user in the `sessions` table.

The response contains a header `Set-Cookie` containing a `connec.sid=` chunk which instructs the browser to store this cookie.

There are several security settings for cookies which comes into play here. `secure: true` forces us to have https connections, `sameSite` handles CORS, ... This might need to vary between the dev and the prod.

On the next calls, the browser adds the `connect.sid` cookie to the request and the server uses `passport-session` strategy to extract the cookie and validate its content.

The content of the cookie is 2 parts, one is the session id urlencoded and the other is the signature of the id with the session secret stored in the server config.

`auth/logout` removes the user session and notices the browser to do the same.
