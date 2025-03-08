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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUtnQ3NiTjV4Y3hmcUd0MCtTTHFMaVk3TGd4VzNFZ3d2bkEwWkpma2xIbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidk4xaHozRVFZTVJKdkZYdHppSlkydVRVYmZBZUc0dGs4TGI3OGo1NVVUUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSU02QTZwMzBkcWJOa1h1S0xxNTBocHBaalpHcFV2UzZ6eEVHbkFaU0UwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOY3k5VmJnVnNRajN1cmxCeTZJL3Bidnk4bE4xR0ptR1V0NjkzMTdEN0JRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9FMmVYTW9UaHVqVlpPQm5Ka1NhWExUUER6WGRSWm5lS2dDb2czdHgwRkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitPVG0zSVNVeDVxVFBiVkxZN2lFZGRxam05MGFPQ2ZiSlZRS2wxYmpzRHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUM5L0xDSUJxaFA0TmkwQTdWSWZMS0FqbEtKVExPcy9aNVU5TEhMOWxsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUzljV3ZOVmdQeExWQ3cwNEpIVVc3UUNkdllBNURCWmNDYnRUNnFmZGNqZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikt4dG5kSG9heWdHQ2N0ZlIxS09ZcTZBeC9ZOWV1eUJ6SE9uNW9vbVNScVNMYnlBZEcxS1ZFNEhaeWdkM0JTekNMR0t5NDdONHpjVER1bUs4MkpTSkRRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE3LCJhZHZTZWNyZXRLZXkiOiJxa0Qra2NvT1lXdnVUdWtzdk1oc0VuSE5ralgyVXNuR3B4MlBlV3F1dzcwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIyM0FCODhFViIsIm1lIjp7ImlkIjoiMjM0NzA0NTc4NzgyMzozNUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI2OTUwMTAxMDU3NTUzNzozNUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1B1TnI3c0dFTi91c2I0R0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ilo3OHBwRTFlTVJhMkE1MldzaEtXbVd2VFFjOEtuOVd6bWF1eEd0UERmVHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6InpMUGtNQ3JXMzBoc1l1Ry9EakFtbXZxUGt2eTZ0eGo3TTdXWXZpV2tnVS9ZcXVsYXc5bDUxdXJ0N2RDZmJZWi9DdjBIbjZ2SXZ5TEVmNkUrOVlIQkFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ6NnNCcFFuZjNxeUtZdnRuTmFzN2NyT1duOEplZzMwODlVYnBZTGdKeHZNalhYY2E0dTFXKzdGa1pqL3VMUDVETEhpc3lMd3JGV1hJUDJsZ2NvTTVDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNDU3ODc4MjM6MzVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV2UvS2FSTlhqRVd0Z09kbHJJU2xwbHIwMEhQQ3AvVnM1bXJzUnJUdzMwOCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxNDUzMTY0LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU0xMSJ9",
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
