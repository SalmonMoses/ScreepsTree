import { Creep } from "game/prototypes/creep";
import { BehaviorTreeNode, BTNodeResult } from "../behavior_tree";
import { GameObject } from "game";

export class MoveToNode extends BehaviorTreeNode {
    constructor(private blackboardKey: string, private radius: number = 1) {
        super();
    }

    tick(creep: Creep, blackboard: object): BTNodeResult {
        const target = blackboard[this.blackboardKey] as GameObject;
        if (creep.getRangeTo(target) < this.radius) {
            return BTNodeResult.Success;
        }

        creep.moveTo(target);
        
        if (creep.getRangeTo(target) < 1) {
            return BTNodeResult.Success;
        } else {
            return BTNodeResult.Run;
        }
    }
}