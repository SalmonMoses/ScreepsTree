import { Creep, GameObject, getObjectsByPrototype, OK } from "game";
import { BehaviorTreeNode, BehaviorTreeService, BTNodeResult } from "../behavior_tree";

export class FindClosestDamagedAlly extends BehaviorTreeService {
    constructor(tickRate: number, private blackboardKey: string) {
        super(tickRate);
    }

    tick(creep: Creep, blackboard: object): BTNodeResult {
        const damagedAllyCreeps = getObjectsByPrototype(Creep).filter(c => c.my && c.hits < c.hitsMax);
        const closest = creep.findClosestByPath(damagedAllyCreeps);

        if (closest !== null) {
            blackboard[this.blackboardKey] = closest;
            return BTNodeResult.Success;
        } else {
            return BTNodeResult.Fail;
        }
    }
}