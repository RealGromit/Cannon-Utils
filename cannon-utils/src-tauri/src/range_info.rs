use crate::{entity::Entity, vector3f64::Vector3f64};

#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct RangeInfo {
    pub elapsed: usize,
    pub barrel: String,
    pub power_amount: f64,
    pub tick_amount: usize,
    pub projectile: Entity,
    pub efficiency: Vector3f64,
}

impl RangeInfo {
    pub fn new(
        elapsed: usize,
        barrel: String,
        power_amount: f64,
        tick_amount: usize,
        projectile: Entity,
        efficiency: Vector3f64,
    ) -> RangeInfo {
        RangeInfo {
            elapsed,
            barrel,
            power_amount,
            tick_amount,
            projectile,
            efficiency,
        }
    }
}
