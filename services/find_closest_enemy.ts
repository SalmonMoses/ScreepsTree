import { Creep, GameObject, getObjectsByPrototype, OK } from "game";
import { BehaviorTreeNode, BehaviorTreeService, BTNodeResult } from "../behavior_tree";

export class FindClosestEnemy extends BehaviorTreeService {
    constructor(tickRate: number, private blackboardKey: string) {
        super(tickRate);
    }

    tick(creep: Creep, blackboard: object): BTNodeResult {
        const enemyCreeps = getObjectsByPrototype(Creep).filter(c => !c.my);
        const closest = creep.findClosestByPath(enemyCreeps);
        if (closest !== null) {
            blackboard[this.blackboardKey] = closest;
            return BTNodeResult.Success
        } else {
            return BTNodeResult.Fail;
        }
    }
}