use crate::vector3f64::Vector3f64;

#[derive(Clone, serde::Serialize, serde::Deserialize)]
pub struct Entity {
    pub position: Vector3f64,
    pub velocity: Vector3f64,
    pub positions: Vec<Vector3f64>,
    pub velocities: Vec<Vector3f64>,
    pub track: bool,
}

impl Entity {
    pub fn new(position: Vector3f64, velocity: Vector3f64, track: bool) -> Entity {
        Entity {
            position,
            velocity,
            positions: Vec::new(),
            velocities: Vec::new(),
            track,
        }
    }

    pub fn get_range(
        &mut self,
        power_amount: f64,
        tick_amount: usize,
        power: &Entity,
        guider: bool,
    ) -> Vector3f64 {
        let mut velocity_x = self.position.x - power.position.x;
        let mut velocity_y = self.position.y - power.position.y;
        let mut velocity_z = self.position.z - power.position.z;

        let distance: f64 =
            (f64::sqrt(velocity_x * velocity_x + velocity_y * velocity_y + velocity_z * velocity_z)
                as f32)
                .into();

        if distance >= 8.0 || distance == 0.0 {
            return Vector3f64::new(0.0, 0.0, 0.0);
        }

        let eff_x = velocity_x / distance;
        let eff_y = velocity_y / distance;
        let eff_z = velocity_z / distance;

        let distance_efficiency = 1.0 - distance / 8.0;
        velocity_x = eff_x * distance_efficiency * power_amount;
        velocity_y = eff_y * distance_efficiency * power_amount;
        velocity_z = eff_z * distance_efficiency * power_amount;
        self.velocity.x += velocity_x;
        self.velocity.y += velocity_y;
        self.velocity.z += velocity_z;

        let mut first_pass = true;
        for _ in 0..tick_amount {
            if first_pass && guider {
                self.tick();
                if velocity_x != 0.0 {
                    self.velocity.x = 0.0;
                }
                if velocity_y != 0.0 {
                    self.velocity.y = 0.0;
                }
                first_pass = false;
            } else {
                self.tick();
            }
        }
        Vector3f64::new(eff_x, eff_y, eff_z)
    }

    pub fn tick(&mut self) {
        self.velocity.y -= 0.03999999910593033;
        self.move_tnt();
        self.velocity *= 0.9800000190734863;
        if !self.track {
            return;
        }
        self.positions.push(self.position);
        self.velocities.push(self.velocity);
    }

    fn move_tnt(&mut self) {
        self.position += self.velocity;
    }
}
