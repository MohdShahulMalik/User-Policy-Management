use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Name {
    pub first_name: String,
    pub last_name: String,
}

#[derive(Serialize, Debug)]
pub struct Count {
    pub count: i64,
}
