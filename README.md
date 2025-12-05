Decision Tree library for Screeps: Arena

Example:
```javascript
const meleeBT = new BehaviorTree(new Sequence(
    [new MoveToNode("target"), new AttackNode("target")]
), [new FindClosestEnemy(1, "target")]);

export function loop() {
    const creeps = getObjectsByPrototype(Creep);
    const meleeFighter = creeps.filter(c => c.my && c.body.some(b.type === ATTACK));

    meleeBT.tick(meleeFighter);
}
```
