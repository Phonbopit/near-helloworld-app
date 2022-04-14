build:
	cd contract && cargo build --target wasm32-unknown-unknown --release
deploy:
	near deploy --wasmFile contract/target/wasm32-unknown-unknown/release/helloworld.wasm --accountId helloworld.0xchai.testnet