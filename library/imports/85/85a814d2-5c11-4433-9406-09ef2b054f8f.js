"use strict";
cc._RF.push(module, '85a81TSXBFEM5QGCe8rBU+P', 'Player');
// Scripts/Player.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // main character's jump height
        jumpHeight: 0,
        // main character's jump duration
        jumpAcc: 0,
        // maximal movement speed
        maxMoveSpeed: 0,
        // acceleration
        accel: 0,
        //starting y position
        startingPosition: 120

    },

    setJumpAction: function setJumpAction() {
        var self = this;
        // jump up
        // when releasing the button, stop acceleration in this direction
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.KEY.space:
                    self.accUp = true;
                    break;
            }
        });
    },

    setInputControl: function setInputControl() {
        var self = this;
        // add keyboard event listener
        // When there is a key being pressed down, judge if it's the designated directional button and set up acceleration in the corresponding direction
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    self.accLeft = true;
                    break;
                case cc.KEY.d:
                    self.accRight = true;
                    break;
            }
        });

        // when releasing the button, stop acceleration in this direction
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    self.accLeft = false;
                    break;
                case cc.KEY.d:
                    self.accRight = false;
                    break;
            }
        });
    },

    modifyUpPosition: function modifyUpPosition(isJumping, dt) {
        if (isJumping) {
            this.node.y += this.ySpeed * 0.05 / 2;
        } else {
            this.node.y -= this.ySpeed * 0.05 / 2;
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.startingPosition = this.node.y;
        this.accUp = false;
        this.setJumpAction();
        // switch of acceleration direction
        this.accLeft = false;
        this.accRight = false;
        // current horizontal speed of main character
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.isJumping = false;
        // initialize keyboard input listener
        this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        // update speed of each frame according to the current acceleration direction
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
            this.node.x += this.xSpeed * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
            this.node.x += this.xSpeed * dt;
        }
        if (this.accUp) {
            this.ySpeed += this.jumpAcc * 0.05;
            this.isJumping = true;
            this.accUp = false;
        }
        // restrict the movement speed of the main character to the maximum movement speed
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reaches its limit, use the max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        if (Math.abs(this.node.y) > this.jumpHeight) {
            this.isJumping = false;
        }
        if (Math.abs(this.node.y) > this.startingPosition || this.isJumping) {
            this.modifyUpPosition(this.isJumping, dt);
        }
        if (Math.abs(this.node.y) == this.startingPosition) {
            this.ySpeed = 0;
            console.log("Stopped");
        }
        // update the position of the main character according to the current speed
    }
});

cc._RF.pop();