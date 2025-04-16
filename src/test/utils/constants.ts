import dotenv from "dotenv";
dotenv.config({});

export const key = String(process.env.TRELLO_API_KEY); // Replace with your API key
export const token = String(process.env.TRELLO_API_TOKEN); // Replace with your API token
export const trelloBoardId = String(process.env.TRELLO_BOARD_ID);
export const trelloBoardListId = String(process.env.TRELLO_BOARD_LIST_ID);
export const trelloApiHost = "https://api.trello.com";
export const trelloUIHost = "https://trello.com"
export const trelloLoginEmail = String(process.env.TRELLO_LOGIN_EMAIL);
export const trelloLoginPassword = String(process.env.TRELLO_LOGIN_PASSWORD);
export const trello2FASetupKey = String(process.env.TRELLO_2FA_SETUP_KEY)