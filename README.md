Utilitron
=========

*The all-rounder penknife of web apps*

Utilitron is a FAT-client web application designed with the purpose of having at least most of the common tools one would normally need to use for quick day-to-day tasks, and all in one place!

Note, Utilitron uses the client browser's `localStorage` to store/retrieve settings and data.

Setup
-----
First, from the project root directory, install the bower components:

	bower install

Then, if you wish to use the Gulp script to serve the application, install the needed NPM packages:

	npm install

Make sure NPM has write permissions to this directory, otherwise it may fail to install.

Finally, you can serve the application by simply running the gulp script:

	gulp

By default, gulp will serve the application on port 8888.

