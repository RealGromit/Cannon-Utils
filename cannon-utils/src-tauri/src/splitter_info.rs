use crate::entity::Entity;

#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct SplitterInfo {
    pub elapsed: usize,
    pub splitter_before_hammer: usize,
    pub splitter_amount: usize,
    pub hammer: Entity,
    pub sand: Entity,
}

impl SplitterInfo {
    pub fn new(
        elapsed: usize,
        splitter_before_hammer: usize,
        splitter_amount: usize,
        hammer: Entity,
        sand: Entity,
    ) -> SplitterInfo {
        SplitterInfo {
            elapsed,
            splitter_before_hammer,
            splitter_amount,
            hammer,
            sand,
        }
    }
}
