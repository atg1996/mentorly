# Mentorly. Find your Mentor

The aim of the application is to provide opportunities to find a mentor/trainer or experts in
the field and for those who are experienced in any field and want to share their knowledge
to connect with mentees.

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
- [API Endpoints](#api-endpoints)



## Introduction

This project was written in a scope of technical interview. The main Idea was to demonstrate the ability 
to work with RESTful APIs and Databases.

## Technologies

- Node.js
- Express.js
- MongoDB

## Getting Started

These are instructions for setting up and running your project locally.
In order to install dependencies perform
```
npm install
```
to run the app on your local machine perform
```
npm start
```
### Prerequisites

- Node.js installed
- MongoDB installed

## API Endpoints

```
POST /api/v1/auth/signup - used for signing up a new user
POST /api/v1/auth/signin - used for authentication
PATCH /api/v1/profile/edit - used for editing personal info
GET /api/v1/users?page=...&limit=... - used for getting users list paginated
GET /api/v1/users/user:userId - use dfor fetching specific user's profile data
```

