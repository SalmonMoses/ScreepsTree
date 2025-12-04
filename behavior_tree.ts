import { Creep, GameObject, getTicks } from "game";

export enum BTNodeResult {
    Success,
    Fail,
    Run
}

export class BehaviorTreeNode {
    private memories: Map<GameObject["id"], object>;

    onStart(creep: Creep, blackboard: object): BTNodeResult {
        this.memories.set(creep.id, this.createDefaultMemory(creep));
        return BTNodeResult.Run;
    }

    tick(creep: Creep, blackboard: object): BTNodeResult {
        return BTNodeResult.Success;
    }

    onFinish(creep: Creep, blackboard: object) { }

    protected createDefaultMemory(creep: Creep): object {
        return {};
    }

    protected getMemoryForCreep(creep: Creep): object {
        return this.memories.get(creep.id);
    }

    protected eraseMemoryForCreep(creep: Creep) {
        this.memories.delete(creep.id);
    }
}

export class BehaviorTreeService {
    private previousTickNumber = -1;

    constructor(private tickRate: number = 1) { }

    tryTick(creep: Creep, blackboard: object, currentTick: number) {
        if (currentTick - this.previousTickNumber >= this.tickRate) {
            this.tick(creep, blackboard);
            this.previousTickNumber = currentTick;
        }
    }

    protected tick(creep: Creep, blackboard: object) { }
}

export class BehaviorTree {
    private blackboards: Map<GameObject["id"], object>;

    constructor(private root: BehaviorTreeNode, private services: Array<BehaviorTreeService>) { }

    startTree(creep: Creep) {
        if (!this.blackboards.has(creep.id)) {
            this.blackboards.set(creep.id, {});
        }

        this.root.onStart(creep, this.blackboards.get(creep.id));
    }

    isStartedForCreep(creep: Creep) {
        return this.blackboards.has(creep.id);
    }

    tick(creep: Creep) {
        const creepBlackboard = this.blackboards.get(creep.id);
        this.services.forEach(s => s.tryTick(creep, creepBlackboard, getTicks()))
        this.root.tick(creep, creepBlackboard);
    }
}