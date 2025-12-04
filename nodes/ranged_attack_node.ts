import { Creep, GameObject, OK } from "game";
import { BehaviorTreeNode, BTNodeResult } from "../behavior_tree";

export class RangedAttackNode extends BehaviorTreeNode {
    constructor(private blackboardKey: string) {
        super();
    }

    onStart(creep: Creep, blackboard: object): BTNodeResult {
        const target = blackboard[this.blackboardKey] as GameObject;
        const attackResult = creep.rangedAttack(target);
        
        if (attackResult === OK) {
            return BTNodeResult.Success;
        } else {
            return BTNodeResult.Fail;
        }
    }
}