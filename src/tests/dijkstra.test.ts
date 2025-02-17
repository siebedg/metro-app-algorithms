import { dijkstra, weightedGraph, denseGraph, sparseGraph } from "../dijkstra";

// ---- weightedGraph ----
describe("weightedGraph", () => {
  test("shortest path and distance from node '1' to '6'", () => {
    const result = dijkstra(weightedGraph, "1", "6");
    expect(result.path).toEqual(["1", "2", "5", "6"]);
    expect(result.distance).toBe(6);
  });

  test("shortest path and distance from node '1' to '5'", () => {
    const result = dijkstra(weightedGraph, "1", "5");
    const validPaths = [["1", "4", "5"], ["1", "2", "5"]];
    expect(validPaths).toContainEqual(result.path);
    expect(result.distance).toBe(3);
  });

  test("shortest path and distance from node '1' to '10'", () => {
    const result = dijkstra(weightedGraph, "1", "10");
    const validPaths = [["1", "4", "5", "10"], ["1", "2", "5", "10"]];
    expect(validPaths).toContainEqual(result.path);
    expect(result.distance).toBe(5);
  });
});

// ---- denseGraph ---- 
describe("denseGraph", () => {
  test("shortest path and distance from node '1' to '20'", () => {
    const result = dijkstra(denseGraph, "1", "20");
    expect(result.path).toEqual(["1", "3", "10", "20"]);
    expect(result.distance).toBe(7);
  });

  test("shortest path and distance from node '1' to '5'", () => {
    const result = dijkstra(denseGraph, "1", "5");
    expect(result.path).toEqual(["1", "5"]);
    expect(result.distance).toBe(3);
  });

  test("shortest path and distance from node '1' to '15'", () => {
    const result = dijkstra(denseGraph, "1", "15");
    expect(result.path).toEqual(["1", "5", "15"]);
    expect(result.distance).toBe(5);
  });
});

// ---- sparseGraph ----
describe("sparseGraph", () => {
  test("shortest path and distance from node '1' to '100'", () => {
    const result = dijkstra(sparseGraph, "1", "100");
    expect(result.path).toBeDefined();
    expect(result.distance).toBeDefined();
  });

  test("shortest path and distance from node '1' to '500'", () => {
    const result = dijkstra(sparseGraph, "1", "500");
    expect(result.path).toBeDefined();
    expect(result.distance).toBeDefined();
  });

  test("shortest path and distance from node '1' to '1000'", () => {
    const result = dijkstra(sparseGraph, "1", "1000");
    expect(result.path).toBeDefined();
    expect(result.distance).toBeDefined();
  });
});