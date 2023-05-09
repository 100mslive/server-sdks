ls -la

cd ./go-sdk

echo -n '{
		"url": "' > config.json
echo -n "$TEST_MEETING_URL" >> config.json
echo '",
		"duration": 600,
		"count": 3,
		"subscribe_max_video": {
				"high": 1,
				"medium": 5,
				"low": 0,
				"priority": [
						"medium",
						"high"
				]
		},
		"subscribe_max_audio": 0,
		"join_rate": 5,
		"logger": {
				"level": "panic",
				"console_events": true,
				"output": ""
		}
}' >> config.json

cat config.json
make loadtest &
populate_room_pid=$!

sleep 100
echo "started load-test pid=$populate_room_pid"

cd ../nodejs
yarn test

kill $populate_room_pid

