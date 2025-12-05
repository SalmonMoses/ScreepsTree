import { Creep } from "game/prototypes/creep";
import { BehaviorTreeNode, BTNodeResult } from "./behavior_tree";

interface CompositeNodeMemory {
    currentChild: number;
}

export class CompositeNode extends BehaviorTreeNode {
    constructor(protected children: Array<BehaviorTreeNode>) {
        super();
    }
}

export class Sequence extends CompositeNode {
    protected createDefaultMemory(creep: Creep): object {
        return { currentChild: 0 };
    }

    tick(creep: Creep, blackboard: object): BTNodeResult {
        if (this.children.length < 1) {
            return BTNodeResult.Fail;
        }

        for (let i = 0; i < this.children.length; ++i) {
            const result = this.children[i].tick(creep, blackboard);
            if (result === BTNodeResult.Success) {
                continue;
            } else if (result === BTNodeResult.Fail) {
                return BTNodeResult.Fail;
            } else if (result === BTNodeResult.Run) {
                return BTNodeResult.Run;
            }
        }

        return BTNodeResult.Success;
    }
}

export class Selector extends CompositeNode {
    protected createDefaultMemory(creep: Creep): object {
        return { currentChild: 0 };
    }

    tick(creep: Creep, blackboard: object): BTNodeResult {
        if (this.children.length < 1) {
            return BTNodeResult.Fail;
        }

        for (let i = 0; i < this.children.length; ++i) {
            const result = this.children[i].tick(creep, blackboard);
            if (result === BTNodeResult.Success) {
                return BTNodeResult.Success;
            } else if (result === BTNodeResult.Fail) {
                continue;
            } else if (result === BTNodeResult.Run) {
                return BTNodeResult.Run;
            }
        }

        return BTNodeResult.Fail;
    }
}