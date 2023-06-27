/**
 * You can find an explanation for this code here - https://dev.to/jashgopani
 article coming soon*/

//*************
const offset = 69;
const borderWidth = 3;
const angles = []; //in  rad
for (let i = 0; i <= 2; i += 0.25) {
  angles.push(Math.PI * i);
}
let nearBy = [];
let activeBtn = document.querySelector(".win-btn-active");
let lastClicked = null;

document.querySelectorAll(".win-btn").forEach((btn) => {
  btn.onclick = (e) => {
    //clear effects from last clicked date and set lastClicked to current item
    if (lastClicked) {
      lastClicked.classList.remove("win-btn-selected");
    }
    lastClicked = e.currentTarget;

    activeBtn.classList.toggle(
      "win-btn-active-unselected",
      e.currentTarget.id !== activeBtn.id
    );
    e.currentTarget.classList.add("win-btn-selected");
  };
});

function clearNearBy() {
  nearBy.splice(0).forEach((e) => (e.style.borderImage = null));
}

const body = document.querySelector(".win-grid");

body.addEventListener("mousemove", (e) => {
  let x = e.clientX; //x position of cursor.
  let y = e.clientY; //y position of cursor

  clearNearBy();

  nearBy = angles.reduce((acc, rad, index, arr) => {
    const offsets = [offset * 0.35, offset * 1.105];

    const elements = offsets.reduce((elementAccumulator, o, i, offsetArray) => {
      //to skip the intermediate first points calculation
      // if (index % 2 === 0 && i === 0) return elementAccumulator;
      const cx = Math.floor(x + Math.cos(rad) * o);
      const cy = Math.floor(y + Math.sin(rad) * o);
      const element = document.elementFromPoint(cx, cy);

      if (
        element &&
        element.classList.contains("win-btn") &&
        !element.classList.contains("win-btn-active") &&
        !element.classList.contains("win-btn-selected") &&
        elementAccumulator.findIndex((ae) => ae.id === element.id) < 0
      ) {
        const brect = element.getBoundingClientRect();
        const bx = x - brect.left; //x position within the element.
        const by = y - brect.top; //y position within the element.
        const gr = Math.floor(offset * 1.7);
        if (!element.style.borderImage)
          element.style.borderImage = `radial-gradient(${gr}px ${gr}px at ${bx}px ${by}px ,rgba(255,255,255,0.3),rgba(255,255,255,0.1),transparent ) 9 / ${borderWidth}px / 0px stretch `;
        console.log("element at", offsets, (rad * 180) / Math.PI, element);

        return [...elementAccumulator, element];
      }
      return elementAccumulator;
    }, []);

    return acc.concat(elements);
  }, []);
});

body.onmouseleave = (e) => {
  clearNearBy();
};