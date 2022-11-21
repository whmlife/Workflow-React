#!/bin/bash

echo "============== start workflow ================"

version=4.0.0
PORT=4000
DM_PATH=<%= running_path %>
title=<%= title %>

rm -rf $DM_PATH/workflow-zip-dist $DM_PATH/__MACOSX
unzip -d $DM_PATH/ $DM_PATH/workflow-zip-dist.zip
chmod 777  -R $DM_PATH/workflow-zip-dist/dist

cd $DM_PATH/workflow-zip-dist

stotage_domain=<%= stotage_domain %>
api_host=<%= api_host %>
socket_domain=<%= socket_domain %>
socket_path=<%= socket_path %>
secret_key=<%= secret_key %>


PORT=$PORT SOCKET_PATH=$socket_path SOCKET_DOMAIN=$socket_domain SECRET_KEY=$secret_key STORAGE_DOMAIN=$stotage_domain API_HOST=$api_host title=$title version=$version  nohup npm run serve >/dev/null 2>&1 &!

echo "============= end workflow =================="