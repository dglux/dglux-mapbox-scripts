const fs = require("fs");

const browserify = require("browserify");
// browserify transforms
const bubleify = require("bubleify");
// browserify plugins
const commonShake = require("common-shakeify");
const packFlat = require("browser-pack-flat/plugin");
const watchify = require("watchify");

const instance = browserify("index.js", {
  cache: {},
  packageCache: {},
  standalone: "polygon_circles"
});

instance.transform(bubleify, {
  bubleError: true
});

instance.plugin(commonShake);
instance.plugin(packFlat);

let bundleCount = 0;
function bundle() {
  bundleCount++;
  console.log(`[BUNDLE] (${bundleCount} updates)`);

  instance.bundle()
    .on("error", err => {
      console.log(err.message);
    })
    .pipe(fs.createWriteStream("./dist/index.js"));
}

if(process.argv.length >= 3 && process.argv[2] === "watch") {
  const serve = require("serve");
  serve(__dirname, {
    port: 5000,
    ignore: ["node_modules"]
  });

  instance.plugin(watchify);
  instance.on("update", bundle);
}

bundle();
