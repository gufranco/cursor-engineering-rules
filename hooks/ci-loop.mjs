/**
 * CI Loop Hook
 *
 * Keeps the agent running until CI/CD pipeline passes.
 * Reads context from stdin, returns followup_message to continue loop.
 *
 * Usage: Automatically triggered by Cursor on agent stop.
 */

import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const MAX_ITERATIONS = 10;

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString());
}

function checkPRStatus() {
  try {
    // Check if we're in a git repo with a PR
    const prNumber = execSync("gh pr view --json number -q .number 2>/dev/null", {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();

    if (!prNumber) return { hasPR: false };

    // Get PR check status
    const checksJson = execSync(
      `gh pr checks --json name,state,conclusion 2>/dev/null`,
      {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      }
    );

    const checks = JSON.parse(checksJson);
    const failed = checks.filter(
      (c) => c.conclusion === "FAILURE" || c.conclusion === "CANCELLED"
    );
    const pending = checks.filter(
      (c) => c.state === "PENDING" || c.state === "QUEUED" || c.state === "IN_PROGRESS"
    );
    const passed = checks.filter((c) => c.conclusion === "SUCCESS");

    return {
      hasPR: true,
      prNumber,
      total: checks.length,
      passed: passed.length,
      failed: failed.length,
      pending: pending.length,
      allPassed: failed.length === 0 && pending.length === 0 && checks.length > 0,
      failedChecks: failed.map((c) => c.name),
    };
  } catch {
    return { hasPR: false };
  }
}

function checkScratchpad() {
  const scratchpadPath = ".cursor/scratchpad.md";
  if (!existsSync(scratchpadPath)) return { done: false };

  const content = readFileSync(scratchpadPath, "utf-8");
  return { done: content.includes("DONE") || content.includes("COMPLETE") };
}

async function main() {
  const input = await readStdin();
  const { status, loop_count = 0 } = input;

  // Don't continue if aborted/errored or max iterations reached
  if (status !== "completed" || loop_count >= MAX_ITERATIONS) {
    console.log(JSON.stringify({}));
    return;
  }

  // Check scratchpad for explicit completion
  const scratchpad = checkScratchpad();
  if (scratchpad.done) {
    console.log(JSON.stringify({}));
    return;
  }

  // Check PR CI status
  const pr = checkPRStatus();

  if (pr.hasPR) {
    if (pr.allPassed) {
      // All checks passed - we're done
      console.log(JSON.stringify({}));
    } else if (pr.failed > 0) {
      // CI failed - continue to fix
      console.log(
        JSON.stringify({
          followup_message: `[CI Loop ${loop_count + 1}/${MAX_ITERATIONS}] Pipeline FAILED. ${pr.failed} check(s) failed: ${pr.failedChecks.join(", ")}. Run \`gh run view <id> --log-failed\` to see errors, fix them, commit, and push. Continue until all checks pass.`,
        })
      );
    } else if (pr.pending > 0) {
      // Still running - wait and check again
      console.log(
        JSON.stringify({
          followup_message: `[CI Loop ${loop_count + 1}/${MAX_ITERATIONS}] Pipeline still running (${pr.passed}/${pr.total} passed, ${pr.pending} pending). Run \`gh pr checks --watch\` to wait for completion.`,
        })
      );
    } else {
      // No checks yet
      console.log(JSON.stringify({}));
    }
  } else {
    // No PR - check scratchpad or stop
    console.log(JSON.stringify({}));
  }
}

main().catch(() => {
  console.log(JSON.stringify({}));
});
