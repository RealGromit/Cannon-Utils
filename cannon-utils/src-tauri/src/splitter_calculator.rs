use crate::{entity::Entity, splitter_info::SplitterInfo, vector3f64::Vector3f64};
use std::time::Instant;

#[tauri::command]
pub fn get_splitter(
    hammer_pos: Vector3f64,
    hammer_vel: Vector3f64,
    splitter_amount: usize,
    splitter_pos: Vector3f64,
    splitter_vel: Vector3f64,
    splitter_before_hammer: usize,
    sand_pos: Vector3f64,
    sand_vel: Vector3f64,
) -> SplitterInfo {
    let now = Instant::now(); // Timer start

    let mut hammer = Entity::new(hammer_pos, hammer_vel, true);
    let mut sand = Entity::new(sand_pos, sand_vel, true);

    if splitter_amount > 1 {
        let mut splitter_array: Vec<Entity> = Vec::with_capacity(splitter_amount);
        for _ in 0..splitter_amount {
            splitter_array.push(Entity::new(splitter_pos, splitter_vel, false));
        }

        for i in 0..splitter_amount {
            splitter_array[i].tick();
            let current_splitter = splitter_array[i].clone();

            for j in i + 1..splitter_amount {
                splitter_array[j].get_range(1.0, 0, &current_splitter, false);
            }

            hammer.get_range(1.0, 0, &current_splitter, false);
            sand.get_range(1.0, 0, &current_splitter, false);
        }

        for _ in 0..splitter_before_hammer {
            hammer.tick();
            sand.tick();
        }
    } else {
        let mut splitter = Entity::new(splitter_pos, splitter_vel, false);
        splitter.tick();
        hammer.get_range(1.0, splitter_before_hammer, &splitter, false);
        sand.get_range(1.0, splitter_before_hammer, &splitter, false);
    }
    SplitterInfo::new(
        now.elapsed().as_micros() as usize, // Timer end
        splitter_before_hammer,
        splitter_amount,
        hammer,
        sand,
    )
}
