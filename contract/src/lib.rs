use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::{env, log, near_bindgen, AccountId};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct HelloWorld {
    pub messages: LookupMap<AccountId, String>,
}

impl Default for HelloWorld {
    fn default() -> Self {
        Self {
            // messages: LookupMap::new(b"a".to_vec()),
            messages: LookupMap::new("".as_bytes().to_vec()),
        }
    }
}

#[near_bindgen]
impl HelloWorld {
    pub fn hello(&mut self, message: String) {
        let account_id = env::signer_account_id();
        let greeting = format_args!("Hello {message}!").to_string();

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
                log!("value from lookupMap(messages) is {}", value);
                value
            }
            None => "not found".to_string(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    #[test]
    fn set_then_get_hello() {
        let context = get_context(vec![], false);
        testing_env!(context);

        let mut contract = HelloWorld::default();
        contract.hello("Chuck".to_string());

        let message = contract.get_hello("bob_near".to_string());
        assert_eq!("Hello Chuck!".to_string(), message);
    }

    #[test]
    fn get_default_hello() {
        let context = get_context(vec![], true);
        testing_env!(context);

        let contract = HelloWorld::default();
        let message = contract.get_hello("bob_near".to_string());

        assert_eq!("not found".to_string(), message);
    }
}
