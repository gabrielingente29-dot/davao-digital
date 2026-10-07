/** Condenses qa/motion-check.ts JSON into a readable verdict. */
const j = JSON.parse(await Bun.stdin.text());

const probe = (label: string, x: any) => {
  if (!x) return console.log(label.padEnd(24), "-");
  console.log(
    label.padEnd(24),
    [
      `motion=${x.dataMotion}`,
      `stored=${x.stored}`,
      `cursorMounted=${x.cursorMounted}`,
      `cursorNone=${x.cursorNoneClass}`,
      `ring=${x.ringSize}`,
      `reveals=${x.revealStyled}`,
    ].join(" "),
  );
  if (x.dotTransform) console.log("".padEnd(24), `dot=${x.dotTransform} opacity=${x.dotOpacity}`);
};

const scroll = (label: string, x: any) => {
  if (!x) return console.log(label.padEnd(24), "-");
  const verdict = x.distinctPositions > 8 ? "SMOOTH (animated)" : "JUMP (static)";
  console.log(
    label.padEnd(24),
    `distinctPositions=${x.distinctPositions}/${x.total} ${x.start}->${x.end}  ${verdict}`,
  );
};

console.log(`pref=${j.pref}  clicked=${j.clicked ?? "-"}`);
probe("before", j.before);
probe("after pointer move", j.afterMove);
scroll("scroll (pre-click)", j.scrollBeforeClick);
if (j.afterClick) {
  probe("after toggle click", j.afterClick);
  scroll("scroll (post-click)", j.scrollAfterClick);
}
