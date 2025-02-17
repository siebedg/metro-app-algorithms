import { graph, findNeighbors } from "../algorithms/bfs";

test("get neighbours of a node", () => {
  expect(findNeighbors(graph, "1")).toEqual(["2", "3"]);
  expect(findNeighbors(graph, "2")).toEqual(["1", "4", "5"]);
  expect(findNeighbors(graph, "4")).toEqual(["2"]);
  expect(findNeighbors(graph, "3")).toEqual(["1", "6"]);
});
