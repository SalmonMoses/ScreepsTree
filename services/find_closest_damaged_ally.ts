import { Creep, GameObject, getObjectsByPrototype, OK } from "game";
import { BehaviorTreeNode, BehaviorTreeService, BTNodeResult } from "../behavior_tree";

export class FindClosestDamagedAlly extends BehaviorTreeService {
    constructor(tickRate: number, private blackboardKey: string) {
        super(tickRate);
    }

    tick(creep: Creep, blackboard: object) {
        blackboard[this.blackboardKey] = creep.findClosestByPath(getObjectsByPrototype(Creep).filter(c => c.my && c.hits < c.hitsMax));
    }
}