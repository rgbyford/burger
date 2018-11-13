

Make "devoured" a SMALLINT (instead of a boolean) representing the number eaten.  Will still work with a databse where it's stored as a boolean, because a boolean can be up to 255, and any non-zero value should return true;

So far:

1.   Built directory tree and files
2.   Read database (which should make update and insert easy)
3.   Ability to see submit button and read "burge I want" input.
4.   Using handlebars

Challenges:
*   Getting the datbase connection stuff and so on into orm.js and connection.js.  Right now it's all in server.js.
*   I seem to have a lot of HTML in the views pages
