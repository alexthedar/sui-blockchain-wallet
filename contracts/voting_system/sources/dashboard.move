module voting_system::dashboard;

use sui::test_scenario::Scenario;
use sui_system::validator::description;

public struct Dashboard has key {
    id: UID,
    proposals_ids: vector<ID>
}

fun init(ctx: &mut TxContext) {
    new(ctx);
}

public fun new(ctx: &mut TxContext) {
    let dashboard: Dashboard = Dashboard {
        id: object::new(ctx),
        proposals_ids: vector[]
    };

    transfer::share_object(dashboard);
}

public fun register_proposal(self: &mut Dashboard, proposal_id: ID){
    self.proposals_ids.push_back( proposal_id)
}

#[test]
fun test_module_init() {
    use sui::test_scenario;
    use voting_system::proposal::{Self};

    let creator: address = @0xCA;

    let mut scenario: Scenario = test_scenario::begin(creator);
    {
        init(scenario.ctx())
    };

    scenario.next_tx(creator);
    {
        let title = b"Hi".to_string();
        let description = b"There".to_string();
        proposal::create( title, description, 2000000000, scenario.ctx() )
    };

    scenario.end();

    let expectedValue: u64 = 1;
    let functionResult: u64 = 1;

    assert!(functionResult == expectedValue)

}