import { Creep, GameObject, OK } from "game";
import { BehaviorTreeNode, BTNodeResult } from "../behavior_tree";

export class HealNode extends BehaviorTreeNode {
    constructor(private blackboardKey: string) {
        super();
    }

    onStart(creep: Creep, blackboard: object): BTNodeResult {
        const target = blackboard[this.blackboardKey] as Creep;
        const attackResult = creep.heal(target);
        
        if (attackResult === OK) {
            return BTNodeResult.Success;
        } else {
            return BTNodeResult.Fail;
        }
    }
}