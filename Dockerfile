# Step 1: Use an official Node runtime as a parent image
FROM node:18 as build-step

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Step 4: Copy the rest of your app's source code
COPY . .

# Step 5: Build your app
RUN npm run build

# Step 6: Use nginx to serve the app
FROM nginx:alpine
COPY --from=build-step /app/dist/pathway-panorama /usr/share/nginx/html
