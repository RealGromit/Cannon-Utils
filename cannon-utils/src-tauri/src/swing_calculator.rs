// Credits to Samsuik for helping me out a ton
use crate::{entity::Entity, swing_info::SwingInfo, vector3f64::Vector3f64};
use std::time::Instant;

#[tauri::command]
pub fn get_swing(
    hammer_amount: usize,
    hammer_pos: Vector3f64,
    hammer_vel: Vector3f64,
) -> SwingInfo {
    let now = Instant::now(); // Timer start
    let mut hammer_array: Vec<Entity> = Vec::with_capacity(hammer_amount);
    let mut projectile = Entity::new(hammer_pos, hammer_vel, true);

    for _ in 0..hammer_amount {
        hammer_array.push(Entity::new(hammer_pos, hammer_vel, false));
    }

    for i in 0..hammer_amount {
        hammer_array[i].tick();
        let current_hammer = hammer_array[i].clone();

        for j in i + 1..hammer_amount {
            hammer_array[j].get_range(1.0, 0, &current_hammer, false);
        }

        projectile.get_range(1.0, 0, &current_hammer, false);
    }
    for _ in 0..60 {
        projectile.tick();
        if projectile.velocity.y <= 0.0 {
            break;
        }
    }
    SwingInfo::new(
        now.elapsed().as_micros() as i32, // Timer end
        hammer_amount,
        projectile,
    )
}
