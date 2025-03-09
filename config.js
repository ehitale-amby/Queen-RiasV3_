const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0J5VlNueWNZM3VHd0p6Znp3WWhKYi9zbVBkc3pCaE1vYy9aNWZqdFoxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYzJTVXNpeUFDTTVBamJvRnJhZEwyZGpuMzIxRmlqT0VMRlg2enlleFJFZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQmFES2ltb1d1YzhlVmVOZ3dvTFIxRjQ5dmJaajFLOVlEL0w3MHlnYUdzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzbWtYRSttK2dGMkI2L0E0M3lLWmd1LzNJVVgvQS92RmVMZkxyeXF1c0ZBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndOOWE0U01BdVhSKytyR3hwc2Nzc1pVRkN5SWd2ejgwMnBmOFVBbmdERnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5ndTE2RGpKU0ZtQ3VNWTZrNlpOeXZVY0dqNUpuZ1VWZW1qMWdNRXVIblE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUVxSmt1ditSL1FkNFkyUm9DZFJYZWJoMU1uOHYvQ0VWd2dVY0d3RzlGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejZtRnBlSUZmYlcvWlFINlIvZEdKZm9wLysrTndwRUluaDRINWVHT3VuST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhzS3NnZC9yRGpuVGp2RE1IeS9RRXVsRkU2N0VRRXFUdWJncThTcVJXd1A2eEw2Z2pHbDBwVkYwNU50aW0zaEJqWENHNUU0cHUvZEhPV1VyclR5V2hBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA0LCJhZHZTZWNyZXRLZXkiOiI2ZG9ZTEk0czArRjI1bUNyZUdEVUIxYUR1SmpRZVNDTEFKbzlaUEJzVFVVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJKSFhUOEtTVCIsIm1lIjp7ImlkIjoiMjM0NzA0NTc4NzgyMzozOUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI2OTUwMTAxMDU3NTUzNzozOUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1AyTnI3c0dFT3FzdUw0R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ilo3OHBwRTFlTVJhMkE1MldzaEtXbVd2VFFjOEtuOVd6bWF1eEd0UERmVHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikx0RWlDaDZzdDNBR3dKZG5wa0krdEYrVGJNeDR3NVpLS1NheXB3Z2FiMHZOb2l6VXF4a1Vha1JzbUhjdW50TEpUdGd2WFNqTm5DbWhyUHczVitVRENBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2WDhqUkJBUzF6alp5cFl5UURZd2dIZE1iZDRYTTNGS0pEQ3F3WVptQTVHVDBHcEh5UWZhSExORHV6dENBTFVEczJpTjczVjd4Y2JTdmJNUjU4RHdqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNDU3ODc4MjM6MzlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV2UvS2FSTlhqRVd0Z09kbHJJU2xwbHIwMEhQQ3AvVnM1bXJzUnJUdzMwOCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxNTU5NDE1LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU0xMSJ9",
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
