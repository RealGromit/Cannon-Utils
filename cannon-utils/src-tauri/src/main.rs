#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod range_calculator;
mod vector3f64;
mod range_info;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      range_calculator::get_range_custom,
      range_calculator::get_range_stair,
      range_calculator::get_range_trapdoor,
      range_calculator::get_range_cobblestone_wall,
      range_calculator::get_range_ladder,
      range_calculator::get_range_chest,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
