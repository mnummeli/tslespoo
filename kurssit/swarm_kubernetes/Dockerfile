FROM node:18 as builder
COPY package.json .
RUN yarn

FROM node:18
WORKDIR /app
COPY index.js /app
COPY --from=builder package.json /app
COPY --from=builder node_modules /app/node_modules/
EXPOSE 3000
ENTRYPOINT ["node", "./index.js"]

# docker build -t tslhostname .
# docker run -p "3000:3000" tslhostname
#
# docker swarm init --advertise-addr <IP ADDRESS>
# docker service create --name tslhostname --replicas 5 -p "3000:3000" tslhostname
#
# http://<HOSTNAME>:3000
#
# docker service scale tslhostname=20
# docker swarm leave