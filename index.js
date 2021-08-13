var secretImg = null, openImg = null, lockImg=null,
    posSecret = document.getElementById("secretPic"),
    posOpen = document.getElementById("openPic"),
    posRes = document.getElementById("resPic"),
    posLock = document.getElementById("lock"),
    posUnlock = document.getElementById("unlock");

function warning() {
  if (secretImg == null || openImg == null || !secretImg.complete() || !openImg.complete()) {
    alert("Image not loaded completely");
    return true;
  };

  return false;
}

function uploadSecret() {
  var secretInput = document.getElementById("secretInput");

  secretImg = new SimpleImage(secretInput);
  secretImg.drawTo(posSecret);
}

function uploadOpen() {
  var openInput = document.getElementById("openInput");
  openImg = new SimpleImage(openInput);

  openImg.drawTo(posOpen);
}

function mix(valueOpen, valueSecret) {
  return( Math.floor(valueOpen/16)*16 + Math.floor(valueSecret/16) );
}

function combine() {
  if (warning()) return;
  var w = secretImg.getWidth(), h = secretImg.getHeight();

  openImg.setSize(w, h);

  var resImg = new SimpleImage(w, h);

  for(var resPx of resImg.values()) {1
    var x = resPx.getX(), y = resPx.getY();

    var secretPx = secretImg.getPixel(x, y);
    var openPx = openImg.getPixel(x, y);

    resPx.setRed(mix(openPx.getRed(), secretPx.getRed()));
    resPx.setGreen(mix(openPx.getGreen(), secretPx.getGreen()));
    resPx.setBlue(mix(openPx.getBlue(), secretPx.getBlue()));
  }

  resImg.drawTo(posRes);
}

function uploadLock() {
  var input = document.getElementById("encode");

  lockImg = new SimpleImage(input);
  lockImg.drawTo(posLock);
}

function extract(value) {
  return (value % 16) * 16;
}

function Decode() {
  if (lockImg == null || !lockImg.complete()) {
    alert("Image not loaded");
    return;
  }

  var unlockImg = new SimpleImage(lockImg.getWidth(), lockImg.getHeight());

  for(var pixel of unlockImg.values()) {
    var x = pixel.getX(), y = pixel.getY();
    var lockPx = lockImg.getPixel(x, y);

    pixel.setRed(extract(lockPx.getRed()));
    pixel.setGreen(extract(lockPx.getGreen()));
    pixel.setBlue(extract(lockPx.getBlue()));
  }

  unlockImg.drawTo(posUnlock);
}
