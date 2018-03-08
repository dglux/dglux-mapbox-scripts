// just a wrapper for Browserify

const browserify = require("browserify");
// browserify transforms
const bubleify = require("bubleify");
// browserify plugins
const commonShake = require("common-shakeify");
const packFlat = require("browser-pack-flat/plugin");

const instance = browserify("index.js", {
  cache: {},
  packageCache: {},
  standalone: "feature_area_sort"
});

instance.transform(bubleify, {
  bubleError: true
});

instance.plugin(commonShake);
instance.plugin(packFlat);

let bundleCount = 0;
function bundle() {
  bundleCount++;

  instance.bundle()
    .on("error", err => {
      console.log(err);
    })
    .pipe(process.stdout);
}

bundle();
