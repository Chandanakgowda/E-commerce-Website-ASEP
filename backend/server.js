import app from "./main.js";

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on PORT : ${port}`));
//prechecked the server on the node server version