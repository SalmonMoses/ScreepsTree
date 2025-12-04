import { Structure } from "game";
import { BehaviorTreeNode, BTNodeResult } from "game/behavior_tree";
import { Creep } from "game/prototypes/creep";

export class TransferToStructureNode extends BehaviorTreeNode {
    constructor(private targetKey: string, private resource: string, private minAmount: number = 1, private maxAmount: number = Infinity) {
        super()
    }

    onStart(creep: Creep, blackboard: object): BTNodeResult {
        const target = blackboard[this.targetKey] as (Structure | Creep);
        if (target === undefined || target === null) {
            return BTNodeResult.Fail;
        }

        const amountToTransfer = Math.max(this.minAmount, Math.min(this.maxAmount, creep.store.getUsedCapacity(this.resource)));
        if (creep.store.getUsedCapacity(this.resource) < amountToTransfer) {
            return BTNodeResult.Fail;
        }

        creep.transfer(target, this.resource, amountToTransfer);
        return BTNodeResult.Success;
    }
}