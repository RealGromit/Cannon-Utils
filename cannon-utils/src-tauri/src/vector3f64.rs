use std::{
    fmt,
    ops::{AddAssign, MulAssign},
};

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

impl AddAssign for Vector3f64 {
    fn add_assign(&mut self, other: Self) {
        self.x = self.x + other.x;
        self.y = self.y + other.y;
        self.z = self.z + other.z;
    }
}

impl MulAssign<f64> for Vector3f64 {
    fn mul_assign(&mut self, value: f64) {
        self.x *= value;
        self.y *= value;
        self.z *= value;
    }
}

impl fmt::Display for Vector3f64 {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {}, {})", self.x, self.y, self.z)
    }
}
