import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum([
        "production",
        "development",
    ]),
    GITHUB_WEBHOOK_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export const config = {
    env: env.NODE_ENV,
    github: {
        webhookSecret: env.GITHUB_WEBHOOK_SECRET,
    },
};