import * as postmark from "postmark";

export const postmarkClient = new postmark.ServerClient(
  process.env.POSTMARK_SERVER_TOKEN || "",
);
