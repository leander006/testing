"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const { PORT } = require("./config/server-config");
_1.app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
