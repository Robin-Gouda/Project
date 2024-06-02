@echo off
cd public
cd json

start "" cmd /c "json-server product_inventory.json --port 3002"
start "" cmd /c "json-server customer_schema.json --port 3003"
start "" cmd /c "json-server sale_order.json --port 3005"
start "" cmd /c "json-server auth.json --port 3006"
