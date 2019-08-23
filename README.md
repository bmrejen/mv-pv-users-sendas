### Features

- The Users-Sendas project updates the Gmail signature and aliases of users created with the Users project

####Functioning

Users created by the users project cannot have their Gmail signature and alias updated instantly. Google requires a latency time ranging from a few seconds to several hours.
The users-sendas project solves this problem through an API that stores requests as JSON files so they can be executed later.

####How to 

Terminal 1 - run the User project and create or update the user you want 

	docker start users_webserver
	docker exec -ti -u user users_webserver /bin/bash
	yarn run dev

Terminal 2 - expose the API of the Users-Sendas project to catch and store requests

	docker start users-sendas
	docker exec -ti -u node used-sendas /bin/sh
	yarn run start

Terminal 3 (inside the users-sendas docker) - launch this script when you want the requests to be executed
	
	./bin/update-users-alias.sh
    