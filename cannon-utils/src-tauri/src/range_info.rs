#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct RangeInfo {
    pub barrel: String,
    pub power_amount: f64,
    pub tick_amount: i32,
    pub x_range: f64,
    pub y_range: f64,
    pub z_range: f64,
    pub x_eff: f64,
    pub y_eff: f64,
    pub z_eff: f64
}

impl RangeInfo {
    pub fn new(barrel: String, power_amount: f64, tick_amount: i32, x_range: f64, y_range: f64, z_range: f64, x_eff: f64, y_eff: f64, z_eff: f64) -> RangeInfo {
        RangeInfo{barrel, power_amount, tick_amount, x_range, y_range, z_range, x_eff, y_eff, z_eff}
    }
}