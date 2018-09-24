# Web Page with Next and Material-ui 
## Tech
- Axios
- Redux
- Material-ui
- Next - (React lib to SSR)

# Install and deploy
You should have installed `NodeJS` first, next clone the repo and follow the next steps:

## Install
- `yarn install` (into the folder repo)

## Run
- `yarn start` (run locally)

## Generate static files
- `yarn run static` or `yarn run static:win` if you have Windows OS
It command will generate a folder with named `out` in the root proyect. You should see this folder and serveral files into. The folder (out) content you can upload to a static server.

## Tree folder
- ```static``` have all static files used for the app
- ```pages``` there is all routes
- ```components``` there is all components
- ```out``` is a folder genered to distribute all statics files