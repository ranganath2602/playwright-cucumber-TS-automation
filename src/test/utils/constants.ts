import dotenv from "dotenv";
dotenv.config({});

export const key = String(process.env.TRELLO_API_KEY); // Replace with your API key
export const token = String(process.env.TRELLO_API_TOKEN); // Replace with your API token
export const trelloBoardId = String(process.env.TRELLO_BOARD_ID);
export const trelloBoardListId = String(process.env.TRELLO_BOARD_LIST_ID);