use std::time::Instant;

use crate::entity::Entity;
use crate::range_info::RangeInfo;
use crate::vector3f64::Vector3f64;

#[tauri::command]
pub fn get_range_custom(
    barrel: String,
    power_amount: f64,
    tick_amount: usize,
    power_pos: Vector3f64,
    projectile_pos: Vector3f64,
    projectile_vel: Vector3f64,
) -> RangeInfo {
    let now = Instant::now();
    let power = Entity::new(power_pos, Vector3f64::new(0.0, 0.0, 0.0), false);
    let mut projectile = Entity::new(projectile_pos, projectile_vel, true);
    let efficiency = projectile.get_range(power_amount, tick_amount, &power, true);

    RangeInfo::new(
        now.elapsed().as_micros() as usize,
        barrel,
        power_amount,
        tick_amount,
        projectile,
        efficiency,
    )
}

#[tauri::command]
pub fn get_range_stair(
    power_amount: f64,
    tick_amount: usize,
    projectile_vel: Vector3f64,
) -> RangeInfo {
    get_range_custom(
        String::from("Stair"),
        power_amount,
        tick_amount,
        Vector3f64::new(0.0, 0.0, 0.0),
        Vector3f64::new(0.5199999809266, 0.5199999809265, 0.98000001907),
        projectile_vel,
    )
}

#[tauri::command]
pub fn get_range_trapdoor(
    power_amount: f64,
    tick_amount: usize,
    projectile_vel: Vector3f64,
) -> RangeInfo {
    get_range_custom(
        String::from("Trapdoor"),
        power_amount,
        tick_amount,
        Vector3f64::new(0.0, 0.0, 0.0),
        Vector3f64::new(0.8324999809266, 0.5199999809265, 0.98000001908),
        projectile_vel,
    )
}

#[tauri::command]
pub fn get_range_cobblestone_wall(
    power_amount: f64,
    tick_amount: usize,
    projectile_vel: Vector3f64,
) -> RangeInfo {
    get_range_custom(
        String::from("Cobblestone Wall"),
        power_amount,
        tick_amount,
        Vector3f64::new(0.0, 0.0, 0.0),
        Vector3f64::new(0.2699999809266, 0.5199999809265, 0.98000001908),
        projectile_vel,
    )
}

#[tauri::command]
pub fn get_range_ladder(
    power_amount: f64,
    tick_amount: usize,
    projectile_vel: Vector3f64,
) -> RangeInfo {
    get_range_custom(
        String::from("Ladder"),
        power_amount,
        tick_amount,
        Vector3f64::new(0.0, 0.0, 0.0),
        Vector3f64::new(0.8949999809266, 0.5199999809265, 0.98000001908),
        projectile_vel,
    )
}

#[tauri::command]
pub fn get_range_chest(
    power_amount: f64,
    tick_amount: usize,
    projectile_vel: Vector3f64,
) -> RangeInfo {
    get_range_custom(
        String::from("Chest"),
        power_amount,
        tick_amount,
        Vector3f64::new(0.0, 0.0, 0.0),
        Vector3f64::new(0.0824999809266, 0.5199999809265, 0.98000001908),
        projectile_vel,
    )
}
