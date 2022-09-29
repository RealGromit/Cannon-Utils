use crate::entity::Entity;

#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct SwingInfo {
    pub elapsed: i32,
    pub hammer_amount: usize,
    pub projectile: Entity,
}

impl SwingInfo {
    pub fn new(elapsed: i32, hammer_amount: usize, projectile: Entity) -> SwingInfo {
        SwingInfo {
            elapsed,
            hammer_amount,
            projectile,
        }
    }
}
