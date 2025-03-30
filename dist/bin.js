"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const server_config_1 = require("./config/server-config");
_1.app.listen(server_config_1.PORT, () => {
    console.log(`Server is running on ${server_config_1.PORT}`);
});
