import { Structure } from "game";
import { BehaviorTreeNode, BTNodeResult } from "game/behavior_tree";
import { Creep } from "game/prototypes/creep";
import { Store } from "game/prototypes/store";

export class WithdrawFromContainerNode extends BehaviorTreeNode {
    constructor(private targetKey: string,
        private resource: string,
        private minAmount: number = 1,
        private maxAmount: number = Infinity) {
        super();
    }

    onStart(creep: Creep, blackboard: object): BTNodeResult {
        const targetStructure = blackboard[this.targetKey] as Structure;
        const targetStore: Store | undefined = targetStructure["store"];
        if (targetStore === undefined) {
            return BTNodeResult.Fail;
        }

        const amountToWithdraw = Math.max(this.minAmount, Math.min(this.maxAmount, targetStore?.getUsedCapacity(this.resource)));
        if (amountToWithdraw < this.minAmount) {
            return BTNodeResult.Fail;
        }
        
        creep.withdraw(targetStructure, this.resource, amountToWithdraw);
        return BTNodeResult.Success;
    }
}