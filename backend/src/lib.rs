pub mod handlers;
pub mod models;
pub mod database;
pub mod error;

use std::net::TcpListener;
use actix_web::{dev::Server, web, App, HttpServer};

use crate::handlers::{emp_handlers::*, policy_handlers::*};

pub fn run (listener: TcpListener) -> Result<Server, std::io::Error> {
    let server = HttpServer::new(|| {
        App::new()
            .service(
                web::scope("/employees")
                    .route("", web::get().to(get_emp))
                    .route("", web::post().to(add_emp))
                    .route("/count", web::get().to(get_emp_no))
                    .route("/{id}", web::put().to(update_emp))
                    .route("/{id}", web::delete().to(delete_emp))
            )
            .service(
                web::scope("/policies")
                    .route("", web::get().to(get_policy))
                    .route("", web::post().to(add_policy))
                    .route("/count", web::get().to(get_policy_no))
                    .route("/{id}", web::put().to(update_policy))
                    .route("/{id}", web::delete().to(delete_policy))
            )
    })
    .listen(listener)?
    .run();

    Ok(server)
}
