# Getting started

## Installation

Clone the repository

    git clone https://github.com/your-repository/line-bot.git

Switch to the repo folder

    cd line-bot
    
Install dependencies
    
    npm install

Copy config file and set environment variables

    cp .env.example .env
    
----------

## Environment Variables

This project requires two environment variables for LINE Bot integration:

- `LINE_CHANNEL_SECRET`  
  Your LINE Channel Secret, which can be obtained from the LINE Developers Console.
  
- `LINE_CHANNEL_ACCESS_TOKEN`  
  Your LINE Channel Access Token, which can also be obtained from the LINE Developers Console.

After copying the `.env.example` file to `.env`, make sure you fill in the values:

    LINE_CHANNEL_SECRET=your_channel_secret

    LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token

----------

## NPM scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start the application in development mode with watch enabled
- `npm run start:prod` - Build and start the application in production mode

----------

## Authentication

The backend service uses LINE Messaging API for authentication. Make sure to properly configure and securely manage the `LINE_CHANNEL_SECRET` and `LINE_CHANNEL_ACCESS_TOKEN` in your `.env` file.

----------

## Start application

This backend service consists of the following functionality:
1. **LINE Bot Service** – Handles the LINE Bot interactions and event responses.

To start the services, follow these steps:

1. Run the LINE Bot service:
    ```bash
    npm run start
    ```

Test the bot by sending a message to your LINE bot or checking the logs to ensure everything is working correctly.
