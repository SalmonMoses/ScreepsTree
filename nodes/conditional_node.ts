import { Creep } from "game";
import { BehaviorTreeNode, BTNodeResult } from "game/behavior_tree";

type Condition = (creep: Creep, blackboard: object) => boolean;

export class ConditionalNode extends BehaviorTreeNode {
    constructor(private condition: Condition, private child: BehaviorTreeNode) {
        super();
    }

    onStart(creep: Creep, blackboard: object): BTNodeResult {
        if (this.condition(creep, blackboard)) {
            return this.child.onStart(creep, blackboard);
        } else {
            return BTNodeResult.Fail;
        }
    }

    tick(creep: Creep, blackboard: object): BTNodeResult {
        if (this.condition(creep, blackboard)) {
            return this.child.tick(creep, blackboard);
        } else {
            return BTNodeResult.Fail;
        }
    }
}