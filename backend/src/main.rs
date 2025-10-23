use std::net::TcpListener;
use employee::run;
use employee::database::initialize::init_db;

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    init_db().await;
    println!("Starting the server");
    let listener = TcpListener::bind("127.0.0.1:3100")?;
    run(listener)?.await
}
