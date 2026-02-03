/**
 * Test Loop Hook
 *
 * Keeps the agent running until all tests pass.
 * Generic - works with any test runner.
 */

import { readFileSync, existsSync } from "fs";

const MAX_ITERATIONS = 10;
const SCRATCHPAD_PATH = ".cursor/scratchpad.md";

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString());
}

function checkScratchpad() {
  if (!existsSync(SCRATCHPAD_PATH)) {
    return { exists: false, done: false, testsPassing: false };
  }

  const content = readFileSync(SCRATCHPAD_PATH, "utf-8").toUpperCase();

  return {
    exists: true,
    done: content.includes("DONE") || content.includes("COMPLETE"),
    testsPassing: content.includes("TESTS PASSING") || content.includes("ALL TESTS PASS"),
  };
}

async function main() {
  const input = await readStdin();
  const { status, loop_count = 0 } = input;

  if (status !== "completed" || loop_count >= MAX_ITERATIONS) {
    console.log(JSON.stringify({}));
    return;
  }

  const scratchpad = checkScratchpad();

  if (scratchpad.done || scratchpad.testsPassing) {
    console.log(JSON.stringify({}));
    return;
  }

  // Continue the loop
  console.log(
    JSON.stringify({
      followup_message: `[Test Loop ${loop_count + 1}/${MAX_ITERATIONS}] Continue fixing tests. Run the test command, analyze failures, fix one issue at a time. When the task was planned with test scenarios (see rules/97-plan-test-scenarios.mdc), ensure those scenarios are covered and passing. Update ${SCRATCHPAD_PATH} with "TESTS PASSING" when done.`,
    })
  );
}

main().catch(() => {
  console.log(JSON.stringify({}));
});
