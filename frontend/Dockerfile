FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine

# Копируем статику
COPY --from=builder /app/dist /usr/share/nginx/html

# Удаляем дефолтный конфиг из conf.d
RUN rm -f /etc/nginx/conf.d/default.conf

# Копируем наш конфиг в conf.d (а не в nginx.conf!)
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
