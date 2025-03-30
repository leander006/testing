import { app } from ".";
import { PORT } from "./config/server-config";

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});