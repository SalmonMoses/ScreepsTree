import { Structure } from "game";
import { BehaviorTreeNode, BTNodeResult } from "game/behavior_tree";
import { Creep } from "game/prototypes/creep";
import { Store } from "game/prototypes/store";

export class ExportFromContainerNode extends BehaviorTreeNode {
    constructor(private targetKey: string,
        private resource: string,
        private amount: number,
        private allowToWithdrawLess: number) {
        super();
    }

    onStart(creep: Creep, blackboard: object): BTNodeResult {
        const targetStructure = blackboard[this.targetKey] as Structure;
        const targetStore: Store | undefined = targetStructure["store"];
        if (targetStore === undefined) {
            return BTNodeResult.Fail;
        }

        const amountToWithdraw = targetStore?.getUsedCapacity(this.resource);
        if (amountToWithdraw < this.amount && !this.allowToWithdrawLess) {
            return BTNodeResult.Fail;
        } else {
            creep.withdraw(targetStructure, this.resource, amountToWithdraw);
            return BTNodeResult.Success;
        }
    }
}