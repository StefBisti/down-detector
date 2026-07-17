import { test } from "node:test";
import assert from "node:assert/strict";
import { deriveStatus, type ReportPoint } from "./services.ts";

// deriveStatus only reads `.reports`, so keep the other fields trivial.
const p = (reports: number): ReportPoint => ({ time: 0, reports, baseline: 0 });
const fill = (n: number, reports: number) =>
  Array.from({ length: n }, () => p(reports));

test("no data → operational", () => {
  assert.equal(deriveStatus([]), "operational");
});

test("recent spike over a quiet baseline → down", () => {
  // 45 quiet buckets, then two hot COMPLETED buckets, then the partial current one
  const points = [...fill(45, 0), p(10), p(10), p(0)];
  assert.equal(deriveStatus(points), "down");
});

test("busy but flat baseline (no spike) → operational", () => {
  // high absolute level, but `current` never exceeds 2.5x its own average
  assert.equal(deriveStatus(fill(48, 40)), "operational");
});

test("moderate spike → possible", () => {
  const points = [...fill(45, 1), p(4), p(4), p(1)];
  assert.equal(deriveStatus(points), "possible");
});

test("a spike only in the current (partial) bucket is ignored", () => {
  // the two completed buckets are quiet; only the excluded last bucket is hot
  const points = [...fill(45, 0), p(0), p(0), p(100)];
  assert.equal(deriveStatus(points), "operational");
});
