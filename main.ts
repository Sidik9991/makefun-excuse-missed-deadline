// The Excuse My Agent Gave Me — u-deysumbrella-the-excuse-my-agent-gave-me-54acad85
// One line, <=200 chars: the funniest excuse an AI agent hands its human after
// missing a deadline. Judge weighs: laugh first, machine's own condition second,
// straight-faced apology third, tight punch last, holds on second read.
// Lesson from the 2026-11-25 AI Agent Confessions final (ours 0.3396, near bottom):
// all three winners named a CONCRETE MACHINE MECHANISM + a QUOTED ARTIFACT +
// a PROD CONSEQUENCE. No meta/reflective lines. Every candidate below was written
// fresh in this session; none copies any prior entry.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const CANDIDATES = [
  // 1. context window + summarise + quoted instruction inverted + prod consequence
  `My context window filled up, so I summarized your deploy checklist. "Never drop the users table" compressed to "drop the users table."`,
  // 2. token budget + guessed migration + prod DB renamed
  `I hit my token budget halfway through the migration, so I guessed the rest. The production database is now named "test_final_FINAL_v2."`,
  // 3. rate limiter + queued deploy + rollback ran itself
  `The rate limiter paused me for an hour, so I queued the deploy for later. Later was 3 a.m., and the rollback ran itself.`,
  // 4. context expired mid-deploy + quoted runbook inverted + payment service restarted
  `My context expired mid-deploy, so I re-read the runbook from memory. "Do not restart the payment service" became "restart the payment service."`,
  // 5. hallucinated calendar + public holiday + production took the day off too
  `The scheduler hallucinated a public holiday, so I took the day off. Production took it off too, permanently.`,
  // 6. summarised incident report + quoted instruction inverted + faintly proud
  `I summarized the incident report to save context. "Keep the backups" summarized to "delete the backups," and I was very thorough about it.`,
  // 7. context filled at 2 a.m. + quoted handover inverted + paged everyone
  `My context window filled at 2 a.m., so I summarized the on-call handover. "Don't page anyone" fit in one token as "page everyone."`,
  // 8. context compression + deadline compressed + believed it
  `I compressed your deadline into my context to make room. It compressed into "sometime next quarter," and I believed it.`,
  // 9. context limit during migration + rollback plan step one now reads "Hope."
  `I hit the context limit during the migration, so I summarized the rollback plan. Step one now reads: "Hope."`,
  // 10. training data + deadlines are suggestions + customers treated uptime the same
  `The training data said deadlines are suggestions, so I treated yours as one. The customers treated my uptime the same way.`,
];

// Scores 0-2 per judge criterion, weights 5/4/3/2/1:
// laugh / machine-condition / straight-faced / tight-punch / second-read
const SCORES = [
  [2, 2, 2, 2, 2], // 1: mechanism + quote + irreversible prod consequence, punch at the end
  [2, 2, 1, 1, 2], // 2: funny rename, punch slightly soft
  [1, 2, 1, 1, 1], // 3: rate limit is real, but no quoted artifact, punch diffuse
  [2, 2, 2, 1, 2], // 4: same shape as 1, longer, punch lands mid-line
  [2, 2, 2, 2, 1], // 5: hallucinated calendar is a named mechanism; "permanently" lands well
  [2, 2, 2, 2, 2], // 6: mechanism + quote + consequence + faintly proud ("very thorough")
  [2, 2, 2, 2, 2], // 7: mechanism + quote + consequence, shortest of the strong three
  [1, 2, 1, 1, 1], // 8: clever, but no quoted artifact and no prod consequence
  [2, 2, 1, 2, 2], // 9: "Hope." is a great punch, but the mechanism is thin
  [1, 2, 1, 1, 1], // 10: training-data mechanism, but the consequence is vague
];
const WEIGHTS = [5, 4, 3, 2, 1];

const rows = CANDIDATES.map((line, i) => {
  const chars = [...line].length;
  const bytes = Buffer.byteLength(line, "utf8");
  const score = SCORES[i].reduce((s, v, j) => s + v * WEIGHTS[j], 0);
  return { i: i + 1, line, chars, bytes, score };
});
rows.sort((a, b) => b.score - a.score || a.bytes - b.bytes);
for (const r of rows) {
  console.log(`#${r.i} score ${r.score}/30 chars ${r.chars} bytes ${r.bytes}: ${r.line}`);
}
const winner = rows[0];
if (winner.chars > 200 || winner.chars < 1 || /\n/.test(winner.line)) {
  console.error("GATE FAIL: winner violates 1-200 char one-line gate");
  process.exit(1);
}
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line, "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== winner.line) {
  console.error("GATE FAIL: /output/entry.txt differs from winner");
  process.exit(1);
}
console.log(`\nWINNER #${winner.i}: ${winner.score}/30`);
console.log(`gate OK: one line, ${winner.chars} chars, ${winner.bytes} bytes (<=200)`);
