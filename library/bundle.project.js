require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Player":[function(require,module,exports){
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
},{}]},{},["Player"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1BsYXllci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDSTs7QUFFQTtBQUNRO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVZJOztBQWNaO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUhSO0FBS0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNJO0FBQ0E7QUFDSjtBQUNJO0FBQ0E7QUFOUjtBQVFIOztBQUVEO0FBQ0E7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUNKO0FBQ0k7QUFDQTtBQU5SO0FBUUg7QUFDSjs7QUFFRDtBQUNJO0FBQ0k7QUFDSDtBQUVHO0FBQ0g7QUFDSjs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDRztBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBRUg7QUFwSEkiLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAvLyBtYWluIGNoYXJhY3RlcidzIGp1bXAgaGVpZ2h0XHJcbiAgICAgICAgICAgIGp1bXBIZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIC8vIG1haW4gY2hhcmFjdGVyJ3MganVtcCBkdXJhdGlvblxyXG4gICAgICAgICAgICBqdW1wQWNjOiAwLFxyXG4gICAgICAgICAgICAvLyBtYXhpbWFsIG1vdmVtZW50IHNwZWVkXHJcbiAgICAgICAgICAgIG1heE1vdmVTcGVlZDogMCxcclxuICAgICAgICAgICAgLy8gYWNjZWxlcmF0aW9uXHJcbiAgICAgICAgICAgIGFjY2VsOiAwLFxyXG4gICAgICAgICAgICAvL3N0YXJ0aW5nIHkgcG9zaXRpb25cclxuICAgICAgICAgICAgc3RhcnRpbmdQb3NpdGlvbjogMTIwXHJcbiAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc2V0SnVtcEFjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyBqdW1wIHVwXHJcbiAgICAgICAgLy8gd2hlbiByZWxlYXNpbmcgdGhlIGJ1dHRvbiwgc3RvcCBhY2NlbGVyYXRpb24gaW4gdGhpcyBkaXJlY3Rpb25cclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIGZ1bmN0aW9uIChldmVudCl7XHJcbiAgICAgICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5zcGFjZTpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1VwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyBcclxuICAgIH0sXHJcblxyXG4gICAgc2V0SW5wdXRDb250cm9sOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIGFkZCBrZXlib2FyZCBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIC8vIFdoZW4gdGhlcmUgaXMgYSBrZXkgYmVpbmcgcHJlc3NlZCBkb3duLCBqdWRnZSBpZiBpdCdzIHRoZSBkZXNpZ25hdGVkIGRpcmVjdGlvbmFsIGJ1dHRvbiBhbmQgc2V0IHVwIGFjY2VsZXJhdGlvbiBpbiB0aGUgY29ycmVzcG9uZGluZyBkaXJlY3Rpb25cclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIGZ1bmN0aW9uIChldmVudCl7XHJcbiAgICAgICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5hOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHdoZW4gcmVsZWFzaW5nIHRoZSBidXR0b24sIHN0b3AgYWNjZWxlcmF0aW9uIGluIHRoaXMgZGlyZWN0aW9uXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgZnVuY3Rpb24gKGV2ZW50KXtcclxuICAgICAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmE6XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGlmeVVwUG9zaXRpb246IGZ1bmN0aW9uKGlzSnVtcGluZywgZHQpe1xyXG4gICAgICAgIGlmKGlzSnVtcGluZyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55ICs9ICh0aGlzLnlTcGVlZCAqIDAuMDUpLzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55IC09ICh0aGlzLnlTcGVlZCAqIDAuMDUpLzI7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRpbmdQb3NpdGlvbiA9IHRoaXMubm9kZS55O1xyXG4gICAgICAgIHRoaXMuYWNjVXAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldEp1bXBBY3Rpb24oKTtcclxuICAgICAgICAvLyBzd2l0Y2ggb2YgYWNjZWxlcmF0aW9uIGRpcmVjdGlvblxyXG4gICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWNjUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAvLyBjdXJyZW50IGhvcml6b250YWwgc3BlZWQgb2YgbWFpbiBjaGFyYWN0ZXJcclxuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XHJcbiAgICAgICAgdGhpcy55U3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNKdW1waW5nID0gZmFsc2U7XHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBrZXlib2FyZCBpbnB1dCBsaXN0ZW5lclxyXG4gICAgICAgIHRoaXMuc2V0SW5wdXRDb250cm9sKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSBzcGVlZCBvZiBlYWNoIGZyYW1lIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBhY2NlbGVyYXRpb24gZGlyZWN0aW9uXHJcbiAgICAgICAgaWYgKHRoaXMuYWNjTGVmdCkge1xyXG4gICAgICAgICAgICB0aGlzLnhTcGVlZCAtPSB0aGlzLmFjY2VsICogZHQ7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMueFNwZWVkICogZHQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjY1JpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMueFNwZWVkICs9IHRoaXMuYWNjZWwgKiBkdDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy54U3BlZWQgKiBkdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5hY2NVcCl7XHJcbiAgICAgICAgICAgIHRoaXMueVNwZWVkICs9IHRoaXMuanVtcEFjYyAqIDAuMDU7ICAgXHJcbiAgICAgICAgICAgIHRoaXMuaXNKdW1waW5nID0gdHJ1ZTsgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hY2NVcCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXN0cmljdCB0aGUgbW92ZW1lbnQgc3BlZWQgb2YgdGhlIG1haW4gY2hhcmFjdGVyIHRvIHRoZSBtYXhpbXVtIG1vdmVtZW50IHNwZWVkXHJcbiAgICAgICAgaWYgKCBNYXRoLmFicyh0aGlzLnhTcGVlZCkgPiB0aGlzLm1heE1vdmVTcGVlZCApIHtcclxuICAgICAgICAgICAgLy8gaWYgc3BlZWQgcmVhY2hlcyBpdHMgbGltaXQsIHVzZSB0aGUgbWF4IHNwZWVkIHdpdGggY3VycmVudCBkaXJlY3Rpb25cclxuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSB0aGlzLm1heE1vdmVTcGVlZCAqIHRoaXMueFNwZWVkIC8gTWF0aC5hYnModGhpcy54U3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoTWF0aC5hYnModGhpcy5ub2RlLnkpID4gdGhpcy5qdW1wSGVpZ2h0KXsgIFxyXG4gICAgICAgICAgICB0aGlzLmlzSnVtcGluZyA9IGZhbHNlOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTWF0aC5hYnModGhpcy5ub2RlLnkpID4gdGhpcy5zdGFydGluZ1Bvc2l0aW9uIHx8IHRoaXMuaXNKdW1waW5nKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5tb2RpZnlVcFBvc2l0aW9uKHRoaXMuaXNKdW1waW5nLCBkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKE1hdGguYWJzKHRoaXMubm9kZS55KSA9PSB0aGlzLnN0YXJ0aW5nUG9zaXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLnlTcGVlZCA9IDA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RvcHBlZFwiKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIG1haW4gY2hhcmFjdGVyIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBzcGVlZFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=