# Use following version of Node as the base image
FROM node:7.3

# Set work directory for run/cmd
WORKDIR /app

# ENV variable for parliaments
ENV PARLIAMENTS='{}'

# Copy package.json into work directory and install dependencies
COPY package.json /app/package.json
RUN npm install

# Copy everthing else in work directory
COPY . /app

# Expose server port
EXPOSE 3000

# Run node
CMD ["node", "/app/index.js"]
