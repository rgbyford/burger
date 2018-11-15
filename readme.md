

Make "devoured" a SMALLINT (instead of a boolean) representing the number eaten.  Will still work with a databse where it's stored as a boolean, because a boolean can be up to 255, and any non-zero value should return true;

So far:

1.   Built directory tree and files
2.   Created the mysql database.
3.   Read database (which should make update and insert easy)
4.   Ability to see submit button and read "burger I want" input.
5.   Using handlebars

Challenges:
*   Getting the datbase connection stuff and so on into orm.js and connection.js.  Right now it's all in server.js.
*   I seem to have a lot of HTML (well, it's the javascript that bothers me) in the views pages

Todo:
1.  Format the "home page"
2.  Add burgers typed in to the "list on the left" (with numbering).  Also the "devour it" buttons.
3.  Add the "devoured" list on the right.
4.  Add update and insert to the database.
5.  Implement the devoured counter.  Requires searching the database to see if this is a "previously ordered" burger.

