# Stage 1: Build Angular App
FROM node:latest AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci && npm install -g @angular/cli

# Copy all app files and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx html directory
COPY --from=build /app/dist/navkar-artistry-hub /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
