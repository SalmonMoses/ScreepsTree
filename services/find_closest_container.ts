import { getObjectsByPrototype, Resource, RESOURCE_ENERGY, StructureContainer } from "game";
import { BehaviorTreeService } from "game/behavior_tree";
import { Creep } from "game/prototypes/creep";

export class FindClosestContainer extends BehaviorTreeService {
    constructor(tickRate: number, private targetKey: string, private resource: string) {
        super(tickRate)
    }

    protected tick(creep: Creep, blackboard: object): void {
        const containers = getObjectsByPrototype(StructureContainer).filter(c => c.store.getUsedCapacity(this.resource) > 0);
        blackboard[this.targetKey] = creep.findClosestByPath(containers);
    }
}