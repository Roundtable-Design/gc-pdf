# About

### Project description

A microservice used to generate printable A4 PDFs from the output of a [Garden Church 'Rule of Life' survey](https://gardenchurch.netlify.app)

### Notable files/folders

1. '/template.html'
    - The PDF generator uses this file as a template
2. '/index.js'
    - Runs the server, which ever waits for GET requests to the `/poster` endpoint, and returns a generated PDF when called

# Set up

### Prerequisite software

1. Node
2. NPM

### Configuration

_Environment variables(?)_

1. `PROJECT_ROOT=[fully resolved path to project root]`

### How to run locally

1. `npm install`
2. `npm start`

### How to deploy

1. Log in to the server with the `ubuntu` user
2. Run `killall node`
3. Run `screen`
4. Run `cd ~/gc-pdf`
5. Run `git pull && npm start`

# Other notable information

1. Fonts and assets stored in root directory. Do not move them
