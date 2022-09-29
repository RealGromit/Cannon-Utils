#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod entity;
mod range_calculator;
mod range_info;
mod splitter_calculator;
mod splitter_info;
mod swing_calculator;
mod swing_info;
mod vector3f64;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            range_calculator::get_range_custom,
            range_calculator::get_range_stair,
            range_calculator::get_range_trapdoor,
            range_calculator::get_range_cobblestone_wall,
            range_calculator::get_range_ladder,
            range_calculator::get_range_chest,
            swing_calculator::get_swing,
            splitter_calculator::get_splitter
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
