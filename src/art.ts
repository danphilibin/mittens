import { Svg, SVG } from "@svgdotjs/svg.js";

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(function () {
    location.reload();
  });
}

interface SquigglesOptions {
  startingPos?: number;
  topColor?: string;
  bottomColor?: string;
  height?: number;
  width?: number;
}

function squiggles(draw: Svg, options: SquigglesOptions) {
  const opts: SquigglesOptions = {
    startingPos: 0,
    topColor: "green",
    bottomColor: "red",
    height: 10,
    width: 7,
    ...options,
  };

  const { width, height } = opts

  let x1 = 0;
  let y1 = opts.startingPos;

  let x2 = width;
  let y2 = opts.startingPos + height;

  const docWidth = Number(draw.width());
  const totalFitting = docWidth / width;

  draw
    .rect(docWidth, height / 2)
    .attr({ fill: opts.topColor })
    .move(0, opts.startingPos);
  draw
    .rect(docWidth, height / 2)
    .attr({ fill: opts.bottomColor })
    .move(0, opts.startingPos + height / 2);

  for (let i = 0; i < totalFitting; i++) {
    const isEven = i % 2 === 0;

    if (isEven) {
      y2 = opts.startingPos + height;
      y1 = opts.startingPos;
    } else {
      y1 = opts.startingPos + height;
      y2 = opts.startingPos;
    }

    draw
      .line(x1, y1, x2, y2)
      .stroke({ width: 4, color: "yellow", linecap: "round" });

    x1 = x2;
    x2 += width;
  }
}

function draw() {
  const draw = SVG().addTo("#art").size(300, 300);

  const sqTop = 50;
  const sqHeight = 7;
  const sqWidth = 8;

  const segments = [
    50, 25, 50
  ]

  draw.rect(Number(draw.width()), segments[0]).attr({ fill: "#085f56" }).move(0, 0);

  draw
    .rect(Number(draw.width()), segments[1])
    .attr({ fill: "#324741" })
    .move(0, segments[0]);

  draw
    .rect(Number(draw.width()), segments[2])
    .attr({ fill: "#6a7935" })
    .move(0, segments[0] + segments[1]);

  squiggles(draw, {
    startingPos: segments[0],
    height: sqHeight,
    width: sqWidth,
    topColor: "#085f56",
    bottomColor: "#324741",
  });

  squiggles(draw, {
    startingPos: segments[0] + segments[1],
    height: sqHeight,
    width: sqWidth,
    topColor: "#324741",
    bottomColor: "#6a7935",
  });
}

draw();
