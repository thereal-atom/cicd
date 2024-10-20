import { Elysia } from "elysia";
import crypto from "crypto";
import { $ } from "bun";
import { config } from "./config.ts";

const app = new Elysia()
    .post(
        "/github/push",
        async ({
            body,
            headers,
            set,
        }) => {
            const signature = `sha256=${crypto.createHmac("sha256", config.github.webhookSecret).update(JSON.stringify(body)).digest("hex")}`;
            if (signature !== headers["x-hub-signature-256"]) {
                set.status = 401;

                return;
            };

            console.log(`working in ${process.cwd()}`);

            const projectRootDirectory = `${process.cwd()}/..`;

            await $`sh ${projectRootDirectory}/deploy.sh`;

            return 200;
        },
    );
    
app.listen(8081, ({
    hostname,
    port,
}) => {
    console.log(`Listening at ${hostname}:${port}`);
});