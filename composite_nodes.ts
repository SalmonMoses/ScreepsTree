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

    onStart(creep: Creep, blackboard: object): BTNodeResult {
        super.onStart(creep, blackboard);

        if (this.children.length < 1) {
            return BTNodeResult.Fail;
        } else {
            return BTNodeResult.Run;
        }
    }

    tick(creep: Creep, blackboard: object): BTNodeResult {
        const memory = this.getMemoryForCreep(creep) as CompositeNodeMemory;

        for (let i = memory.currentChild; i < this.children.length; ++i) {
            const result = this.tickChildNode(creep, blackboard, i, i === memory.currentChild);
            if (result === BTNodeResult.Success) {
                continue;
            } else if (result === BTNodeResult.Fail) {
                memory.currentChild = 0;
                return BTNodeResult.Fail;
            } else if (result === BTNodeResult.Run) {
                memory.currentChild = i;
                return BTNodeResult.Run;
            }
        }

        memory.currentChild = 0;
        return BTNodeResult.Success;
    }

    private tickChildNode(creep: Creep, blackboard: object, nodeIndex: number, startedBefore: boolean): BTNodeResult {
        const node = this.children[nodeIndex];
        if (!startedBefore) {
            node.onStart(creep, blackboard);
        }

        const result = node.tick(creep, blackboard);
        if (result === BTNodeResult.Success || result === BTNodeResult.Fail) {
            node.onFinish(creep, blackboard);
        }
        return result;
    }
}

export class Selector extends CompositeNode {
    protected createDefaultMemory(creep: Creep): object {
        return { currentChild: 0 };
    }

    onStart(creep: Creep, blackboard: object): BTNodeResult {
        super.onStart(creep, blackboard);

        if (this.children.length < 1) {
            return BTNodeResult.Fail;
        } else {
            BTNodeResult.Run;
        }
    }

    tick(creep: Creep, blackboard: object): BTNodeResult {
        const memory = this.getMemoryForCreep(creep) as CompositeNodeMemory;

        for (let i = memory.currentChild; i < this.children.length; ++i) {
            const result = this.tickChildNode(creep, blackboard, i, i === memory.currentChild);
            if (result === BTNodeResult.Success) {
                memory.currentChild = 0;
                return BTNodeResult.Success;
            } else if (result === BTNodeResult.Fail) {
                continue;
            } else if (result === BTNodeResult.Run) {
                memory.currentChild = i;
                return BTNodeResult.Run;
            }
        }

        memory.currentChild = 0;
        return BTNodeResult.Fail;
    }

    private tickChildNode(creep: Creep, blackboard: object, nodeIndex: number, startedBefore: boolean): BTNodeResult {
        const node = this.children[nodeIndex];
        if (!startedBefore) {
            node.onStart(creep, blackboard);
        }

        const result = node.tick(creep, blackboard);
        if (result === BTNodeResult.Success || result === BTNodeResult.Fail) {
            node.onFinish(creep, blackboard);
        }
        return result;
    }
}