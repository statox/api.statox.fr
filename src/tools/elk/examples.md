I wrote this while debugging an issue where the API seemed to work but neither the logs nor the home tracker records appeared to reach ELK.
There were no errors in the containers logs.

These are steps to create a log that is displayed in the Kibana view `api-statox` from different places in the stack to isolate where the issue is.

# In Kibana dev tools

## Get the datastream receiving the logs

```
GET /_data_stream/logs-api-statox-default
```

## Get the latest 10 logs created on the logs datastream

```
GET /logs-api-statox-default/_search
{
  "size": 10,
  "sort": [
    {
      "@timestamp": {
        "order": "desc"
      }
    }
  ]
}
```

## Create a log in the data stream

/!\ Change the date. You can you `date -u +"%Y-%m-%dT%H:%M:%S.%3NZ"` to get the current date.

```
POST /logs-api-statox-default/_doc/
{
  "@timestamp": "2025-11-11T17:24:14.009Z",
  "message": "Debug from dev tools"
}
```

# To run in the ELK container

## Add a log

```bash
curl -u "elastic:${ELASTIC_PASSWORD}" \
  -X POST "https://localhost:9200/logs-api-statox-default/_doc/" \
  --cacert /usr/share/elasticsearch/config/certs/ca/ca.crt \
  -H 'Content-Type: application/json' \
  -d '{
    "@timestamp": "'"$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)"'",
    "message": "test message from inside elasticsearch container",
    "data_stream": {
      "type": "logs",
      "dataset": "api-statox"
    }
  }'
```

# To run in the Logstash container

## Call directly the ELK API (bypass pipeline)

TODO api.statox.fr is not the right index: That creates an index

```bash
curl -u "$ELASTIC_USER:$ELASTIC_PASSWORD" \
  --cacert /usr/share/logstash/certs/ca/ca.crt \
  -X POST "https://es01:9200/logs-api-statox-default/_doc" \
  -H 'Content-Type: application/json' \
  -d '{
    "@timestamp": "'"$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)"'",
    "message": "test message from inside logstash container",
    "data_stream": {
      "type": "logs",
      "dataset": "api-statox"
    }
  }'
```

## Call logstash (test the pipeline)

```
curl -u "$LOGGER_USER:$LOGGER_PASSWORD" \
  -X POST "http://localhost:${LOGSTASH_HTTP_INPUT_PORT}/api.statox.fr/_doc" \
  -H 'Content-Type: application/json' \
  -d '{
    "@timestamp": "'"$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)"'",
    "message": "test message via Logstash HTTP input",
    "component": "debug"
  }'
```

## Call logstash from an external network

## From the heroku instance

```
curl -u "$LOGGER_USER:$LOGGER_PASSWORD" \
  -X POST "${ELK_DOMAIN_ENDPOINT}/api.statox.fr/_doc" \
  -H 'Content-Type: application/json' \
  -d '{
    "@timestamp": "'"$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)"'",
    "message": "test message via Logstash from Heroku",
    "component": "debug"
  }'
```

## From the local dev machine

The same command as the one for the heroku instance can be used.
The 3 variables are stored in the config variables on heroku.
