# eNauczanie feed project

## Table of contents

- [eNauczanie feed project](#enauczanie-feed-project)
  - [Table of contents](#table-of-contents)
  - [General idea](#general-idea)
  - [General plan of work](#general-plan-of-work)
    - [UI](#ui)
    - [API](#api)

## General idea

The main point of the project is to utilize the ability to inject any HTML, JS
or CSS into eNauczanie in order to create an embedded communication app

## General plan of work

App that supports viewing and sending messages

### UI

- Tabs for each feature
  - Viewing sent messages
    - Feed showing the last three messages
    - Ability to show more messages (e.g. show 5 more)
  - Sending messages
    - HTML form to enter any plaintext
    - (later) image import button
  - Configuration
    - App UI configurations

### API

- List all (or a number of) latest posts
- Send a message
