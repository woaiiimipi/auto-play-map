/* eslint-disable no-undef */
export const defaultConfig = {
  width: 50,
  height: 30,
  line1: {
    duration: 0.6, // unit: s
    color: '#000',
    length: 50,
  },
  line2: {
    duration: 0.3,
    color: '#000',
    length: 30,
  },
  text: {
    content: 'content',
    duration: 0.5,
    width: 50,
    height: 30,
    color: '#333',
    backgroundColor: 'skyblue',
    font: '14px Arial',
    padding: {
      top: 5,
      right: 15,
      bottom: 5,
      left: 15,
    },
  },
};
export class Tooltip {
  state = null;
  graphics = null;
  timeline = null;
  start = {
    x: 0,
    y: 0,
  };
  line1End = {};
  line2End = {};
  config = {};
  delay = 0;
  constructor(id, config = defaultConfig) {
    this.init(id, config);
    this.drawLine1();
    this.drawLine2();
    this.drawText();
  }
  init = (id, config) => {
    this.config = config;
    // init stage
    this.stage = new createjs.Stage(id);
    // add graphics
    this.graphics = new createjs.Graphics();
    const lineShape = new createjs.Shape(this.graphics);
    this.stage.addChild(lineShape);
    // add timeLine
    this.timeline = new TimelineMax();
    // set start position
    const { height } = config;
    this.start.y = height;
  }
  drawLine1 = () => {
    const { stage, start, timeline, graphics, line1End } = this;
    const { line1: { duration, length, color } } = this.config;
    const time1 = new TimelineMax();
    timeline.add(time1, 0);
    const scale = { s: 0 };
    time1.to(scale, duration, {
      s: 1,
      onUpdate() {
        line1End.x = start.x + parseInt(length * Math.sin(Math.PI / 4)) * scale.s;
        line1End.y = start.y - parseInt(length * Math.sin(Math.PI / 4)) * scale.s;
        graphics.clear()
          .beginStroke(color)
          .moveTo(start.x, start.y)
          .lineTo(line1End.x, line1End.y);
        stage.update();
      }
    });
    stage.update();
    this.delay += duration;
  }
  drawLine2 = () => {
    const { stage, start, line1End, line2End, timeline, graphics, delay } = this;
    const { line2: { duration, length, color } } = this.config;
    const time2 = new TimelineMax();
    timeline.add(time2, delay);
    const scale = { s: 0 };
    time2.to(scale, duration, {
      s: 1,
      onUpdate() {
        line2End.x = line1End.x + length * scale.s;
        line2End.y = line1End.y;
        graphics.clear()
          .beginStroke(color)
          .moveTo(start.x, start.y)
          .lineTo(line1End.x, line1End.y)
          .lineTo(line2End.x, line2End.y);
        stage.update();
      }
    });
    stage.update();
    this.delay += duration;
  }
  drawText = () => {
    const { stage, timeline, start, line1End, line2End, graphics, delay } = this;
    const { line1: { color: color1 }, text: { duration, content, color: textColor, font, backgroundColor, padding, width, height } } = this.config;
    const text = new createjs.Text('', font, textColor);
    const textBg = new createjs.Shape();
    this.stage.addChild(textBg, text);
    const time3 = new TimelineMax();
    timeline.add(time3, delay);
    const scale = { s: 0 };
    time3.to(scale, duration, {
      s: 0.8,
      onStart() {
        text.text = content;
        text.x = line2End.x + padding.left;
        text.y = line2End.y - height / 2 + 2;
        text.color = textColor;
        text.alpha = 0;
        textBg.alpha = 0;
        textBg.shadow = new createjs.Shadow('rgba(0,0,0,.2)', 0, 1, 5);
        console.log(height);
        textBg.graphics.clear()
          .beginFill(backgroundColor)
          .drawRoundRect(line2End.x, line2End.y - height / 2 - padding.top, width + padding.left + padding.right, height + padding.top + padding.bottom, 5);
        graphics.clear()
          .beginStroke(color1)
          .moveTo(start.x, start.y)
          .lineTo(line1End.x, line1End.y)
          .lineTo(line2End.x, line2End.y);
        stage.update();
      },
      onUpdate() {
        text.alpha = scale.s;
        textBg.alpha = scale.s;
        textBg.
        // console.log(Math.min(scale.s, 0.4));
        // textBg.alpha = Math.min(scale.s, 0.4);
        stage.update();
      }
    });
    stage.update();
  }
}