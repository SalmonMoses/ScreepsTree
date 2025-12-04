Decision Tree library for Screeps: Arena

Example:
```javascript
const meleeBT = new BehaviorTree(new Selector([
        new AttackNode("target"),
        new MoveToNode("target")
    ]), [new FindClosestEnemy(1, "target")]);

export function loop() {
    const creeps = getObjectsByPrototype(Creep);
    const meleeFighter = creeps.filter(c => c.my && c.body.some(b.type === ATTACK));

    if (!meleeBT.isStartedForCreep(meleeFighter)) {
        meleeBT.startTree(meleeFighter);
    }
    
    meleeBT.tick(meleeFighter);
}
```
