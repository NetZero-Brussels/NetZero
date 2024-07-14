//!
//!
//! The program is ABI-equivalent with Solidity, which means you can call it from both Solidity and Rust.
//! To do this, run `cargo stylus export-abi`.
//!
//! Note: this code is a template-only and has not been audited.
//!

// Allow `cargo stylus export-abi` to generate a main function.
#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

/// Use an efficient WASM allocator.
#[global_allocator]
static ALLOC: mini_alloc::MiniAlloc = mini_alloc::MiniAlloc::INIT;

use serde::{Deserialize, Serialize};
/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::{alloy_primitives::U256, prelude::*};
use ethabi::{decode, ParamType};

// Define some persistent storage using the Solidity ABI.
// `Counter` will be the entrypoint.
sol_storage! {
    #[entrypoint]
    pub struct Counter {
        uint256 number;
    }
}

/// Emission factors struct
#[derive(Serialize, Deserialize)]
pub struct EmissionFactors {
    car: f64,
    walking: f64,
    bike: f64,
    subway: f64,
}

/// Carbon footprint calculator
#[derive(Serialize, Deserialize)]
pub struct CarbonFootprintCalculator {
    emission_factors: EmissionFactors,
}

impl CarbonFootprintCalculator {
    pub fn new(
        car_factor: f64, walking_factor: f64, bike_factor: f64, subway_factor: f64
    ) -> CarbonFootprintCalculator {
        CarbonFootprintCalculator {
            emission_factors: EmissionFactors {
                car: car_factor,
                walking: walking_factor,
                bike: bike_factor,
                subway: subway_factor,
            },
        }
    }

    pub fn calculate_carbon_footprint(&self, distance: f64, travel_type: u8) -> f64 {
        match travel_type {
            1 => distance * self.emission_factors.car,
            2 => distance * self.emission_factors.walking,
            3 => distance * self.emission_factors.bike,
            4 => distance * self.emission_factors.subway,
            _ => panic!("Invalid travel type"),
        }
    }

    pub fn calculate_energy_converted(&self, distance: f64, travel_type: u8) -> f64 {
        const FUEL_EMISSION_FACTOR: f64 = 2.31; // kg CO2e per liter
        const FUEL_ENERGY_DENSITY: f64 = 34.2; // MJ per liter

        let carbon_footprint = self.calculate_carbon_footprint(distance, travel_type);
        let fuel_used = carbon_footprint / FUEL_EMISSION_FACTOR;
        fuel_used * FUEL_ENERGY_DENSITY
    }
}

/// Declare that `Counter` is a contract with the following external methods.
#[external]
impl Counter {
    /// Gets the number from storage.
    pub fn number(&self) -> U256 {
        self.number.get()
    }

    /// Sets a number in storage to a user-specified value.
    pub fn set_number(&mut self, new_number: U256) {
        self.number.set(new_number);
    }

    /// Sets a number in storage to a user-specified value.
    pub fn mul_number(&mut self, new_number: U256) {
        self.number.set(new_number * self.number.get());
    }

    /// Sets a number in storage to a user-specified value.
    pub fn sub_number(&mut self, new_number: U256) {
        self.number.set(new_number + self.number.get());
    }

    /// Increments `number` and updates its value in storage.
    pub fn increment(&mut self) {
        let number = self.number.get();
        self.set_number(number + U256::from(1));
    }

    /// Calculate carbon footprint and energy converted from ABI-encoded input
    pub fn calculate(&mut self, encoded_data: Vec<u8>) -> (U256, U256) {
        // Decode the ABI-encoded input
        let params = vec![
            ParamType::Uint(8),
            ParamType::Uint(256),
            ParamType::Uint(256),
            ParamType::Uint(256),
        ];
        let decoded = decode(&params, &encoded_data).expect("Failed to decode input");

        let travel_type: u8 = decoded[0].clone().into_uint().unwrap().as_u64() as u8;
        let distance: u64 = decoded[1].clone().into_uint().unwrap().as_u64();
        let _duration: u64 = decoded[2].clone().into_uint().unwrap().as_u64();
        let _points: u64 = decoded[3].clone().into_uint().unwrap().as_u64();

        let calculator = CarbonFootprintCalculator::new(0.12, 0.0, 0.09, 0.03);

        let carbon_footprint = calculator.calculate_carbon_footprint(distance as f64, travel_type);
        let energy_converted = calculator.calculate_energy_converted(distance as f64, travel_type);

        // web_sys::console::log_1(&format!("Carbon Footprint: {} kg CO2e", carbon_footprint).into());
        // web_sys::console::log_1(&format!("Energy Converted: {} MJ", energy_converted).into());
        
        // Convert f64 results to U256 with a scale factor (e.g., 1e6 for 6 decimal places)
        let scale_factor = 1_000_000.0;
        let carbon_footprint_scaled = (carbon_footprint * scale_factor) as u64;
        let energy_converted_scaled = (energy_converted * scale_factor) as u64;

        let carbon_footprint_u256 = U256::from(carbon_footprint_scaled);
        let energy_converted_u256 = U256::from(energy_converted_scaled);

        (carbon_footprint_u256, energy_converted_u256)
    }
}
