# cicd

custom way to use github webhooks to update a service in a VPS

designed to be as simple as possible

## usage

1. `vim .env`
2. `mv .env.example .env`
3. `vim example-deploy.sh`
4. `mv example-deploy.sh ../deploy.sh`
5. `bun install`
6. `pm2 start "bun run start" --name cicd --update-env`

## github setup

1. visit https://<your-repo>/settings/hooks
2. add webhook
3. payload url is https://<your-vps-ip>:8081/github/push
4. secret is anything (make sure to set in .env)
5. leave the rest of the settings as default (enable SSL verification, just the push event)