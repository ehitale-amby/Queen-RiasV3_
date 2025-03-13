const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNENuZkhVWHQwMDdYdURjWm5lcDFGS05PbzJaU241TEdZSWlsTm4rY2hHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYitwN3lBSFcwbXJtNGpPb0F3QlQzWVFIL2Y4aCtNNnVQN2pORytJNDBsST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLR05VdTg0MzJhQkZsYklGSlp2bVE3aVEzN0dqYVRQYkg4WEVQQlgzdEV3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHMFR4c1o5WXNVMWtvRTd1YzVqQlF6VXg3RERSQTZXNTJLdnhiZlM0RGhFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldNTVZOUlM0eWg3MHVhYzFvdW01b0lncWYrMklBMEhjUUNtMS91UXJlR2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdKK3U0bnhwNEI0d0hWRFBzQlc1YTdNdFc3VzJvcnB3S0xrMGhTK2FUeFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUdKWjYvSldFWXptaTM1cVQxejlob21MOXk1T1dIUUI5Q3dRQ2NFK3hYWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVh4bkNYaEJqV0cvNW5GVGZqNnlHSVp4Y2ZUZ216MUlQRE5hQVBud3JIRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJ2WmZpS0NjeldqcElOK3VqNDR0MGtZRVBsNzQ1OFVPcXduTS83NFVCNVB3TFlZa2ZCclo1MEpIL0xqcXJsOXRjRjhxeVRzWlBXdFdjT2h4M1pHbUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgzLCJhZHZTZWNyZXRLZXkiOiJqTXl6eXpMc2pIdDhsYVV1UlplVy9peGpmcWNrWGNWY3JOQWdBRDJlWjd3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJHQzE2SkJCVCIsIm1lIjp7ImlkIjoiMjM0NzA0NTc4NzgyMzo0M0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI2OTUwMTAxMDU3NTUzNzo0M0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1ArTnI3c0dFSVhqekw0R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ilo3OHBwRTFlTVJhMkE1MldzaEtXbVd2VFFjOEtuOVd6bWF1eEd0UERmVHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ii90NlN4UE83STh6NUQyNjl2dUFIV21yNmd2K3g2MjVFdVozV1NRNEM4ZHdDUHZKakdrck5UbE5CaXI5S3I4dldkaGVSMzJCdW1ENENhZ003cU9CK0NnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIzOXM4RlRoY0huVW5tcXNDY1pJQ1E0SVRuejVFcFo1SHc3RU9OaEJQN3o5V0g3WXpHVDFrbTZnb0hMUmQwTHU0ODk3NGpKMklNR1ZtS2lnRGk1UERBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNDU3ODc4MjM6NDNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV2UvS2FSTlhqRVd0Z09kbHJJU2xwbHIwMEhQQ3AvVnM1bXJzUnJUdzMwOCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxODk0MDM0LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUh5QiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
