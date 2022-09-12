#[derive(serde::Serialize, serde::Deserialize, Clone, Copy)]
pub struct Vector3f64 {
    pub x: f64,
    pub y: f64,
    pub z: f64,
}

impl Vector3f64 {
    pub fn new(x: f64, y: f64, z: f64) -> Vector3f64 {
        Vector3f64 { x, y, z }
    }
}
