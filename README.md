# onlineAI

##NPM INSTALL
  - installs all dependencies need 
 ##NPM START
  - runs frontend services 

######BACKEND

python server.py - runs the python backend which connects all the detection algorithms to the front-end 
  - must continuously be running in conjunction with frontend 

Make sure that ports 3000 & 5000 are open as the frontend runs on port 3000 and converts all the backend ports which run on 5000 to 3000 by using an httop proxy as the middle connection. 

##Data Folder
	Under backend folder there is a subfolder labeled Data that contains the coordinates for each algorithm utilized 
