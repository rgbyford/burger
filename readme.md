

Made "devoured" a SMALLINT (instead of a boolean) representing the number eaten.  Will still work with a databse where it's stored as a boolean, because a boolean can be up to 255, and any non-zero value should return true;

All the burgers in the database that have devoured = 0 will appear in the left side list when the app is started.

If you submit a burger that's already on the wanted list (so to speak) it will not appear again.

It would be nice to have the devoured list and the wanted list both start at the top of the page (rather than the devoured list appearing below the other), but I couldn't figure out how to do that.  I note that in the demo it's the text entry and the submit button that "float" down the page as the wanted list grows.  :-)  Maybe it's bootstrap one should use, but I'm not sure about combining bootstrap and handlebars.  It looks as though one could do that, but why is it so hard to find something on the web?

I was planning to put the number devoured beside the name on the devoured list, but I ran out of time.

When you refresh the page, the eaten list stays put (until the server is restarted).  Again, I can't decide whether it should.  Nor can I figure out how to make it go away.  Because a refresh of the burgers page takes place when you hit Submit as well as during startup.

There's javascript in the views pages.  Should there be?  I couldn't figure out how to move it anywhere else.
