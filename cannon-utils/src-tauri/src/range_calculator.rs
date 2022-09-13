use crate::range_info::RangeInfo;
use crate::vector3f64::Vector3f64;

#[tauri::command]
pub fn get_range_custom(
    barrel: String,
    power_amount: f64,
    tick_amount: usize,
    power: Vector3f64,
    projectile: Vector3f64,
) -> RangeInfo {
    let delta_x = projectile.x - power.x;
    let delta_y = projectile.y - power.y;
    let delta_z = projectile.z - power.z;
    let distance: f64 =
        (f64::sqrt(delta_x * delta_x + delta_y * delta_y + delta_z * delta_z) as f32).into();

    if distance >= 8.0 || distance == 0.0 {
        return RangeInfo::new(
            barrel,
            0.0,
            0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            Vec::new(),
            Vec::new(),
        );
    }

    let efficiency_x = delta_x / distance;
    let efficiency_y = delta_y / distance;
    let efficiency_z = delta_z / distance;
    let distance_efficiency = 1.0 - distance / 8.0;

    let range_x_velocity = efficiency_x * distance_efficiency * power_amount;
    let range_y_velocity = efficiency_y * distance_efficiency * power_amount;
    let mut range_z_velocity = efficiency_z * distance_efficiency * power_amount;

    let mut distance: Vec<f64> = Vec::with_capacity(tick_amount);
    let mut velocity: Vec<f64> = Vec::with_capacity(tick_amount);
    let mut range_z_distance = range_z_velocity;

    range_z_velocity *= 0.9800000190734863;
    let mut temp_z_distance = range_z_distance;
    distance.push(temp_z_distance);
    velocity.push(range_z_velocity);
    for _ in 0..tick_amount - 1 {
        range_z_velocity *= 0.9800000190734863;
        range_z_distance *= 0.9800000190734863;
        temp_z_distance += range_z_distance;
        distance.push(temp_z_distance);
        velocity.push(range_z_velocity);
    }
    RangeInfo::new(
        barrel,
        power_amount,
        tick_amount,
        range_x_velocity,
        range_y_velocity,
        temp_z_distance,
        efficiency_x,
        efficiency_y,
        efficiency_z,
        distance,
        velocity,
    )
}

#[tauri::command]
pub fn get_range_stair(power_amount: f64, tick_amount: usize) -> RangeInfo {
    get_range_custom(
        String::from("Stair"),
        power_amount,
        tick_amount,
        Vector3f64::new(0.0, 0.0, 0.0),
        Vector3f64::new(0.5199999809266, 0.5199999809265, 0.98000001907),
    )
}

#[tauri::command]
pub fn get_range_trapdoor(power_amount: f64, tick_amount: usize) -> RangeInfo {
    get_range_custom(
        String::from("Trapdoor"),
        power_amount,
        tick_amount,
        Vector3f64::new(0.0, 0.0, 0.0),
        Vector3f64::new(0.8324999809266, 0.5199999809265, 0.98000001908),
    )
}

#[tauri::command]
pub fn get_range_cobblestone_wall(power_amount: f64, tick_amount: usize) -> RangeInfo {
    get_range_custom(
        String::from("Cobblestone Wall"),
        power_amount,
        tick_amount,
        Vector3f64::new(0.0, 0.0, 0.0),
        Vector3f64::new(0.2699999809266, 0.5199999809265, 0.98000001908),
    )
}

#[tauri::command]
pub fn get_range_ladder(power_amount: f64, tick_amount: usize) -> RangeInfo {
    get_range_custom(
        String::from("Ladder"),
        power_amount,
        tick_amount,
        Vector3f64::new(0.0, 0.0, 0.0),
        Vector3f64::new(0.8949999809266, 0.5199999809265, 0.98000001908),
    )
}

#[tauri::command]
pub fn get_range_chest(power_amount: f64, tick_amount: usize) -> RangeInfo {
    get_range_custom(
        String::from("Chest"),
        power_amount,
        tick_amount,
        Vector3f64::new(0.0, 0.0, 0.0),
        Vector3f64::new(0.0824999809266, 0.5199999809265, 0.98000001908),
    )
}
