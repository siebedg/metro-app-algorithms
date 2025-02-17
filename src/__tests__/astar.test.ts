import {
  astar,
  weightedGraph,
  denseGraph,
  sparseGraph,
} from "../algorithms/astar";

// ---- weightedGraph ----
describe("weightedGraph", () => {
  test("shortest path and distance from node '1' to '10' in weightedGraph", () => {
    const result = astar(weightedGraph, "1", "10");
    const validPaths = [
      ["1", "5", "10"],
      ["1", "4", "5", "10"],
    ];
    expect(validPaths).toContainEqual(result.path);
    expect(result.distance).toBe(5);
  });

  test("shortest path and distance from node '2' to '6' in weightedGraph", () => {
    const result = astar(weightedGraph, "2", "6");
    const validPaths = [["2", "5", "6"]];
    expect(validPaths).toContainEqual(result.path);
    expect(result.distance).toBe(5);
  });

  test("shortest path and distance from node '3' to '9' in weightedGraph", () => {
    const result = astar(weightedGraph, "3", "9");
    const validPaths = [
      ["3", "8", "9"],
      ["3", "7", "8", "9"],
    ];
    expect(validPaths).toContainEqual(result.path);
    expect(result.distance).toBe(5);
  });
});

// ---- denseGraph ----
describe("denseGraph", () => {
  test("shortest path and distance from node '4' to '13' in denseGraph", () => {
    const result = astar(denseGraph, "4", "13");
    const validPaths = [["4", "13"]];
    expect(validPaths).toContainEqual(result.path);
    expect(result.distance).toBe(3);
  });

  test("shortest path and distance from node '7' to '19' in denseGraph", () => {
    const result = astar(denseGraph, "7", "19");
    const validPaths = [["7", "19"]];
    expect(validPaths).toContainEqual(result.path);
    expect(result.distance).toBe(1);
  });
});

// ---- sparseGraph ----
describe("sparseGraph", () => {
  test("shortest path and distance from node '1' to '50' in sparseGraph", () => {
    const result = astar(sparseGraph, "1", "50");
    expect(result.path[0]).toBe("1");
    expect(result.path[result.path.length - 1]).toBe("50");
    expect(result.distance).toBeGreaterThan(0);
  });

  test("shortest path and distance from node '5' to '99' in sparseGraph", () => {
    const result = astar(sparseGraph, "5", "99");
    expect(result.path[0]).toBe("5");
    expect(result.path[result.path.length - 1]).toBe("99");
    expect(result.distance).toBeGreaterThan(0);
  });
});
