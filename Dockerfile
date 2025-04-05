FROM node:23

WORKDIR /app

RUN npm install -g pnpm@10

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --no-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]
