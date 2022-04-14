use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::env::log;
use near_sdk::{env, log, near_bindgen, AccountId, BorshStorageKey};

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    Records,
    UniqueValues,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct HelloWorld {
    pub messages: LookupMap<AccountId, String>,
}

#[near_bindgen]
impl HelloWorld {
    pub fn hello(&mut self, message: String) {
        let account_id = env::signer_account_id();
        let greeting = format_args!("Hello {account_id}!").to_string();

        log!(
            "{} hello with message {} and greeting: {}",
            account_id,
            message,
            greeting
        );

        self.messages.insert(&account_id, &greeting);
    }

    pub fn get_hello(&self, account_id: AccountId) -> String {
        match self.messages.get(&account_id) {
            Some(value) => {
                log!("value from lookupMap is {}", value);
                value
            }
            None => "not found".to_string(),
        }
    }
}
