#add docker to path
export PATH=$PATH:/usr/local/bin


theAppContainer=prod_portfolio_app

init_things() {
  thisDir=$(pwd)
  parentDir=$(dirname $thisDir)
  grandParentDir=$(dirname $parentDir)
}

reloadProxyNginx() {
  docker exec prod_proxy_hofi_nginx service nginx reload
}

remove_other_folder() {

  for dir in $grandParentDir/*; do
    if [ "$dir" != "$parentDir" ]; then
      echo "remove $dir"
      rm -rf $dir
    fi
  done
}

zero_downtime_deploy() {

  init_things


  echo "Finish replace env variables, start build new app container"

  docker ps
  docker-compose build

  oldAppContainerId=$(docker ps -f name=$theAppContainer -q | head -n1)
  oldAppContainerName=$(docker inspect -f '{{.Name}}' $oldAppContainerId)
  if [ ! -z "$oldAppContainerName" ]; then
    oldAppContainerName=${oldAppContainerName#/}
  fi

  docker-compose up -d --scale $theAppContainer=2 --no-recreate $theAppContainer
  newAppContainerId=$(docker ps -f name=$theAppContainer -q | head -n1)
  newAppContainerName=$(docker inspect -f '{{.Name}}' $newAppContainerId)
  newAppContainerName=${newAppContainerName#/}

  echo "Old container: $oldAppContainerName"
  echo "New container $newAppContainerName"


  docker ps

  for i in {1..60}; do
    if [ "$(docker container inspect -f '{{.State.Running}}' $newAppContainerName)" == "true" ]; then
      break
    fi
    sleep 1
  done
  echo "New container is up";

  docker exec $newAppContainerName chmod -R 777 .
  docker exec $oldAppContainerName chmod -R 777 .

  echo "Finish build new app container"
  echo "New container is up and running"

  reloadProxyNginx

  docker stop $oldAppContainerName
  docker rm $oldAppContainerName
  docker-compose up -d --scale $theAppContainer=1 --no-recreate $theAppContainer

  reloadProxyNginx

  remove_other_folder

  docker rename $newAppContainerName $theAppContainer
}

zero_downtime_deploy

