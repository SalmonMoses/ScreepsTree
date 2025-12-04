import { getObjectsByPrototype, Resource, RESOURCE_ENERGY, StructureContainer, StructureTower } from "game";
import { BehaviorTreeService } from "game/behavior_tree";
import { Creep } from "game/prototypes/creep";

export class FindClosestTower extends BehaviorTreeService {
    constructor(tickRate: number, private targetKey: string) {
        super(tickRate)
    }

    protected tick(creep: Creep, blackboard: object): void {
        const towers = getObjectsByPrototype(StructureTower).filter(c => c.my);
        blackboard[this.targetKey] = creep.findClosestByPath(towers);
    }
}