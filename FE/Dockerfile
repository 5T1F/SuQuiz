# FROM node:20.11-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm i
# RUN npm install hangul-js

# COPY . .

# RUN npm run build

# RUN npm install -g serve

# EXPOSE 3000

# CMD ["serve", "-s", "build", "-l", "3000"]


FROM node:21
RUN npm install -g serve
RUN mkdir ./build
ADD ./build ./build
ENTRYPOINT ["serve", "-s", "build"]
