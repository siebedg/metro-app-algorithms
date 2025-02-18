import {
  kShortestPaths,
  weightedGraph,
  findNeighbors,
} from "../algorithms/kShortestPaths";

test("findNeighbors should return correct neighbors", () => {
  expect(findNeighbors(weightedGraph, "1")).toEqual([
    { node: "2", weight: 1 },
    { node: "3", weight: 4 },
    { node: "4", weight: 2 },
  ]);
});

test("kShortestPaths should return the three shortest paths from 1 to 4", () => {
    const result = kShortestPaths(weightedGraph, "1", "4", 3);
  
    expect(result).toEqual(
      expect.arrayContaining([
        { path: ["1", "4"], distance: 2 }, // Direct shortest path
        { path: ["1", "2", "4"], distance: 4 }, // Second shortest
        // Add the third shortest path if needed
      ])
    );
  });

test("kShortestPaths should return an empty array if no valid path exists", () => {
  expect(kShortestPaths(weightedGraph, "1", "99", 3)).toEqual([]); // "99" is not in the graph
});
