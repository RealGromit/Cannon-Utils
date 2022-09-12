// Credits to Samsuik for helping me out a ton
use crate::{swing_info::SwingInfo, vector3f64::Vector3f64};

#[tauri::command]
pub fn get_swing(hammer_amount: usize, hammer_y: f64, hammer_y_vel: f64) -> SwingInfo {
    let zero = Vector3f64::new(0.0, 0.0, 0.0);
    let hammer_velocity = Vector3f64::new(0.0, hammer_y_vel, 0.0);
    let mut proj_velocity = Vector3f64::new(0.0, hammer_y_vel, 0.0);
    let mut power_array: Vec<Vector3f64> = Vec::with_capacity(hammer_amount);

    for _ in 0..hammer_amount {
        power_array.push(hammer_velocity);
    }

    for i in 0..hammer_amount {
        power_array[i].y -= 0.03999999910593033;

        for j in i + 1..hammer_amount {
            power_array[j].y += impact(&power_array[i], &zero).y;
        }

        proj_velocity.y += impact(&power_array[i], &zero).y;
    }
    let mut proj_distance = proj_velocity;
    proj_distance.y -= 0.03999999910593033;
    proj_velocity.y -= 0.03999999910593033;
    proj_velocity.y *= 0.9800000190734863;

    let mut position_array: Vec<f64> = Vec::new();
    let mut velocity_array: Vec<f64> = Vec::new();
    let mut distance_y = proj_distance.y;

    position_array.push(distance_y + hammer_y);
    velocity_array.push(proj_velocity.y);
    for _ in 0..60 {
        proj_distance.y *= 0.9800000190734863;
        proj_distance.y -= 0.03999999910593033;
        proj_velocity.y -= 0.03999999910593033;
        proj_velocity.y *= 0.9800000190734863;
        distance_y += proj_distance.y;
        if proj_velocity.y <= 0.0 {
            break;
        }
        position_array.push(distance_y + hammer_y);
        velocity_array.push(proj_velocity.y);
    }
    SwingInfo::new(hammer_amount, position_array, velocity_array)
}

fn impact(power: &Vector3f64, proj: &Vector3f64) -> Vector3f64 {
    let mut x = proj.x - power.x;
    let mut y = proj.y - power.y;
    let mut z = proj.z - power.z;
    let d: f64 = (f64::sqrt(x * x + y * y + z * z) as f32).into();

    if d == 0.0 {
        return Vector3f64::new(0.0, 0.0, 0.0);
    }

    x /= d;
    y /= d;
    z /= d;

    let e = 1.0 - d / 8.0;

    Vector3f64::new(x * e, y * e, z * e)
}
