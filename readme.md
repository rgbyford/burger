

Made "devoured" a SMALLINT (instead of a boolean) representing the number eaten.  Will still work with a databse where it's stored as a boolean, because a boolean can be up to 255, and any non-zero value should return true;

So far:

1.   All appears to be working.

Challenges:
*   Getting the datbase connection stuff and so on into orm.js and connection.js.  Right now it's all in server.js.
*   I seem to have a lot of HTML (well, it's the javascript that bothers me) in the views pages

Todo:
1.  Format the "home page" - make it pretty
2.  Move code to orm.js and config.js
3.  Maybe list the number devoured beside the devoured list
4.  Look to see what else is in the "demo."
