# Express Basic Email Auth Boilerplate

Contains nothing but simple email-password authentication based app complete with session implementation. User can signup using an email and password. He can login using the same. Appropriate error messages come up as well.

### Setup
1. `npm install` (customary).
2. Visit `mysql.js` and configure mysql `host`, `username`, `password` and `database`.
3. Run mysql migrations using `node migration.js up`.

### URLS
1. /user/login - Login form
2. /user/sigup - Signup form
3. /dashboard - User to land post login

### Start server
`ENV_VARIABLE=development DEBUG=express-basic-email-auth:* npm start`

### Styling
Thanks to [Milligram](http://milligram.io/)

## Yet to implement
1. Forgot password
2. Tests
3. Header
4. Proper Redirections
5. Better Error messages

Thanks :)
