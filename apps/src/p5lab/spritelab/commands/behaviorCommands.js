import * as coreLibrary from '../coreLibrary';
import {commands as actionCommands} from './actionCommands';

export const commands = {
  addBehavior(spriteArg, behavior) {
    let sprites = coreLibrary.getSpriteArray(spriteArg);
    sprites.forEach(sprite => coreLibrary.addBehavior(sprite, behavior));
  },

  Behavior(func) {
    return {func: func, name: func.funcName};
  },

  draggableFunc(p5Inst) {
    return spriteArg => {
      let sprite = coreLibrary.getSpriteArray(spriteArg)[0];
      if (p5Inst.mousePressedOver(sprite) && !sprite.dragging) {
        sprite.dragging = true;
        sprite.xOffset = sprite.x - p5Inst.World.mouseX;
        sprite.yOffset = sprite.y - p5Inst.World.mouseY;
      }
      if (sprite.dragging) {
        sprite.x = p5Inst.World.mouseX + sprite.xOffset;
        sprite.y = p5Inst.World.mouseY + sprite.yOffset;
      }
      if (p5Inst.mouseWentUp()) {
        sprite.dragging = false;
      }
    };
  },

  avoidingTargetsFunc(p5Inst) {
    return spriteArg => {
      const sprite = coreLibrary.getSpriteArray(spriteArg)[0];
      const spritePosition = sprite.position;

      if (!sprite.targetSet) {
        return;
      }

      const range = 100;
      const targetsInRange = sprite.targetSet
        .map(x => coreLibrary.getSpriteArray({costume: x}))
        .flat()
        .filter(target => spritePosition.dist(target.position) < range);

      if (targetsInRange.length === 0) {
        return;
      }

      // Find the average position of all the targets in range
      let totalX = 0;
      let totalY = 0;
      targetsInRange.forEach(target => {
        totalX += target.position.x;
        totalY += target.position.y;
      });
      const averagePosition = p5Inst.createVector(
        totalX / targetsInRange.length,
        totalY / targetsInRange.length
      );

      actionCommands.moveToward(spriteArg, -5, averagePosition);
      actionCommands.edgesDisplace.apply(p5Inst, [spriteArg]);
    };
  },

  followingTargetsFunc(p5Inst) {
    return spriteArg => {
      const sprite = coreLibrary.getSpriteArray(spriteArg)[0];
      const spritePosition = sprite.position;

      if (!sprite.targetSet) {
        return;
      }

      const targets = sprite.targetSet
        .map(x => coreLibrary.getSpriteArray({costume: x}))
        .flat();

      if (targets.length === 0) {
        return;
      }

      // Find closest target
      let closestTarget;
      let closestDistance = Infinity;
      targets.forEach(target => {
        const distance = spritePosition.dist(target.position);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestTarget = target;
        }
      });
      actionCommands.moveToward(spriteArg, 5, closestTarget.position);
    };
  },

  removeAllBehaviors(spriteArg) {
    let sprites = coreLibrary.getSpriteArray(spriteArg);
    sprites.forEach(sprite => coreLibrary.removeAllBehaviors(sprite));
  },

  removeBehavior(spriteArg, behavior) {
    let sprites = coreLibrary.getSpriteArray(spriteArg);
    sprites.forEach(sprite => coreLibrary.removeBehavior(sprite, behavior));
  }
};
