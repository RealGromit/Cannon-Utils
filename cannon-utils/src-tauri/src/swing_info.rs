#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct SwingInfo {
    pub elapsed: i32,
    pub hammer_amount: usize,
    pub position_array: Vec<f64>,
    pub velocity_array: Vec<f64>,
}

impl SwingInfo {
    pub fn new(
        elapsed: i32,
        hammer_amount: usize,
        position_array: Vec<f64>,
        velocity_array: Vec<f64>,
    ) -> SwingInfo {
        SwingInfo {
            elapsed,
            hammer_amount,
            position_array,
            velocity_array,
        }
    }
}
