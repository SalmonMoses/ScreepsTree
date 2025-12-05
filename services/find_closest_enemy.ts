import { Creep, GameObject, getObjectsByPrototype, OK } from "game";
import { BehaviorTreeNode, BehaviorTreeService, BTNodeResult } from "../behavior_tree";

export class FindClosestEnemy extends BehaviorTreeService {
    constructor(tickRate: number, private blackboardKey: string) {
        super(tickRate);
    }

    protected tick(creep: Creep, blackboard: object) {
        blackboard[this.blackboardKey] = creep.findClosestByPath(getObjectsByPrototype(Creep).filter(c => !c.my));
    }
}