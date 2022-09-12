#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct SwingInfo {
    pub hammer_amount: usize,
    pub position_array: Vec<f64>,
    pub velocity_array: Vec<f64>,
}

impl SwingInfo {
    pub fn new(
        hammer_amount: usize,
        position_array: Vec<f64>,
        velocity_array: Vec<f64>,
    ) -> SwingInfo {
        SwingInfo {
            hammer_amount,
            position_array,
            velocity_array,
        }
    }
}
