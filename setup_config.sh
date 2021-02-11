#!/bin/bash
set -e

sed -i -e "s/<EMAIL_ADDRESS>/$EMAIL_ADDRESS/g" ./config/config.json
sed -i -e "s/<EMAIL_PASSWORD>/$EMAIL_PASSWORD/g" ./config/config.json
sed -i -e "s/<IP_ADDRESS>/$URL/g" ./config/config.json
sed -i -e "s/<PORT>/$PORT/g" ./config/config.json
