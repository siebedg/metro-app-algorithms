import { MinPriorityQueue } from "@datastructures-js/priority-queue";

export const weightedGraph = new Map<string, { node: string, weight: number, line: string }[]> ([
    ["1", [{ node: "2", weight: 1, line: "Red" }, { node: "3", weight: 4, line: "Blue" }, { node: "4", weight: 2, line: "Red" }]],
    ["2", [{ node: "1", weight: 1, line: "Red" }, { node: "4", weight: 3, line: "Green" }, { node: "5", weight: 2, line: "Green" }, { node: "6", weight: 6, line: "Yellow" }]],
    ["3", [{ node: "1", weight: 4, line: "Blue" }, { node: "7", weight: 5, line: "Blue" }, { node: "8", weight: 2, line: "Purple" }]],
    ["4", [{ node: "1", weight: 2, line: "Red" }, { node: "2", weight: 3, line: "Green" }, { node: "5", weight: 1, line: "Green" }, { node: "9", weight: 4, line: "Red" }]],
    ["5", [{ node: "2", weight: 2, line: "Green" }, { node: "4", weight: 1, line: "Green" }, { node: "6", weight: 3, line: "Yellow" }, { node: "10", weight: 2, line: "Yellow" }]],
    ["6", [{ node: "2", weight: 6, line: "Yellow" }, { node: "5", weight: 3, line: "Yellow" }, { node: "7", weight: 2, line: "Blue" }]],
    ["7", [{ node: "3", weight: 5, line: "Blue" }, { node: "6", weight: 2, line: "Blue" }, { node: "8", weight: 1, line: "Purple" }]],
    ["8", [{ node: "3", weight: 2, line: "Purple" }, { node: "7", weight: 1, line: "Purple" }, { node: "9", weight: 3, line: "Red" }, { node: "10", weight: 4, line: "Yellow" }]],
    ["9", [{ node: "4", weight: 4, line: "Red" }, { node: "8", weight: 3, line: "Red" }, { node: "10", weight: 2, line: "Yellow" }]],
    ["10", [{ node: "5", weight: 2, line: "Yellow" }, { node: "8", weight: 4, line: "Yellow" }, { node: "9", weight: 2, line: "Yellow" }]]
]);

export const denseGraph = new Map<string, { node: string, weight: number }[]> ([
    // 🤖
    // this graph is heavily connected
    ["1", [{ node: "2", weight: 1 }, { node: "3", weight: 2 }, { node: "4", weight: 2 }, { node: "5", weight: 3 }]],
    ["2", [{ node: "1", weight: 1 }, { node: "6", weight: 2 }, { node: "7", weight: 4 }, { node: "8", weight: 5 }]],
    ["3", [{ node: "1", weight: 2 }, { node: "9", weight: 3 }, { node: "10", weight: 1 }, { node: "11", weight: 2 }]],
    ["4", [{ node: "1", weight: 2 }, { node: "12", weight: 4 }, { node: "13", weight: 3 }]],
    ["5", [{ node: "1", weight: 3 }, { node: "14", weight: 1 }, { node: "15", weight: 2 }]],
    ["6", [{ node: "2", weight: 2 }, { node: "16", weight: 5 }, { node: "17", weight: 3 }]],
    ["7", [{ node: "2", weight: 4 }, { node: "18", weight: 2 }, { node: "19", weight: 1 }]],
    ["8", [{ node: "2", weight: 5 }, { node: "20", weight: 3 }]],
    ["9", [{ node: "3", weight: 3 }, { node: "10", weight: 2 }]],
    ["10", [{ node: "3", weight: 1 }, { node: "11", weight: 1 }, { node: "20", weight: 4 }]],
    ["11", [{ node: "3", weight: 2 }, { node: "10", weight: 1 }]],
    ["12", [{ node: "4", weight: 4 }]],
    ["13", [{ node: "4", weight: 3 }]],
    ["14", [{ node: "5", weight: 1 }]],
    ["15", [{ node: "5", weight: 2 }]],
    ["16", [{ node: "6", weight: 5 }]],
    ["17", [{ node: "6", weight: 3 }]],
    ["18", [{ node: "7", weight: 2 }]],
    ["19", [{ node: "7", weight: 1 }]],
    ["20", [{ node: "8", weight: 3 }, { node: "10", weight: 4 }]]
]);

export function generateSparseGraph(size: number): Map<string, { node: string, weight: number }[]> {
    // 🤖
    // this graph has fewer connections
    const graph = new Map<string, { node: string, weight: number }[]>();

    for (let i = 1; i <= size; i++) {
        const neighbors = [];
        for (let j = 1; j <= 3; j++) { // Each node connects to only 3 random others
            const randomNode = Math.floor(Math.random() * size) + 1;
            if (randomNode !== i) {
                neighbors.push({ node: randomNode.toString(), weight: Math.floor(Math.random() * 10) + 1 });
            }
        }
        graph.set(i.toString(), neighbors);
    }

    return graph;
}

export const sparseGraph = generateSparseGraph(100);

export const testLineGraph = new Map<string, { node: string, weight: number, line: string }[]>([
    ["1", [{ node: "2", weight: 2, line: "Red" }, { node: "4", weight: 10, line: "Blue" }]],
    ["2", [{ node: "1", weight: 2, line: "Red" }, { node: "3", weight: 2, line: "Red" }]],
    ["3", [{ node: "2", weight: 2, line: "Red" }, { node: "5", weight: 2, line: "Green" }]],
    ["4", [{ node: "1", weight: 10, line: "Blue" }, { node: "5", weight: 2, line: "Green" }]],
    ["5", [{ node: "3", weight: 2, line: "Green" }, { node: "4", weight: 2, line: "Green" }]]
]);

export function findNeighbors(weightedGraph: Map<string, { node: string; weight: number, line: string }[]>, node: string): {
    line: string; node: string; weight: number
}[] {
    return weightedGraph.get(node) || [];
}

export function dijkstra(
  weightedGraph: Map<string, { node: string; weight: number, line: string }[]>,
  start: string,
  end: string
): { path: string[]; distance: number, transfers: number } {

  const priorityQueue= new MinPriorityQueue<{ node: string, weight: number, transfers: number, line: string}>(
    (entry) => entry.weight * 10 + entry.transfers * 50 // considers time and transfers
  );

  const came_from: { [key: string]: { node: string, line: string } | null } = {}; // to store the path
  const distance: { [key: string]: number } = {}; // to store the distance
  const transfers: { [key: string]: number } = {}; // to store the transfers

    for (const key of weightedGraph.keys()) {
        distance[key] = Infinity;
        transfers[key] = Infinity;
    }

  distance[start] = 0;
  transfers[start] = 0;
  came_from[start] = null;

  priorityQueue.enqueue({ node: start, weight: 0, transfers: 0, line: "" });

  while (!priorityQueue.isEmpty()) {
    const current = priorityQueue.dequeue(); // dequeue the first element

    if (!current) continue; // skip if the current node is undefined
    if (current.node === end) break; // stop the loop if we reach the end node

    // get the neighbors of the current node
    for (const neighbor of findNeighbors(weightedGraph, current.node)) {

      const newDistance = (distance[current.node] ?? Infinity) + neighbor.weight;
      // calculate the number of transfers
      const newTransfers = current.line && current.line !== neighbor.line ? transfers[current.node] + 1 : transfers[current.node];

    //   if (!(neighbor.node in distance) || newDistance < distance[neighbor.node])
    if(
        newDistance < (distance[neighbor.node] ?? Infinity) ||
        (newDistance === (distance[neighbor.node] ?? Infinity) && newTransfers < (transfers[neighbor.node] ?? Infinity))
    )
        {
        distance[neighbor.node] = newDistance;
        transfers[neighbor.node] = newTransfers;
        came_from[neighbor.node] = { node: current.node, line: neighbor.line };

        priorityQueue.enqueue({ node: neighbor.node, weight: newDistance, transfers: newTransfers, line: neighbor.line });
      }
    }
  }

  if (distance[end] === Infinity) return { path: [], distance: Infinity, transfers: Infinity }; // no path found

  // reconstruct the path
  const path: string[] = [];
  let currentNode: string | null = end;

    while (currentNode) {
        path.unshift(currentNode);
        currentNode = came_from[currentNode]?.node || null;
    }

  return { path, distance: distance[end], transfers: transfers[end] };
}

console.log("Test Case");
const result = dijkstra(testLineGraph, "1", "4");
console.log(result); 

// weightedGraph
// console.time("dijkstra performance testing: SIMPLE GRAPH");
//     for (let i = 0; i < 100000; i++) {
//         dijkstra(weightedGraph, "1", "10");
//     }
// console.timeEnd("dijkstra performance testing: SIMPLE GRAPH");

// // denseGraph
// console.time("dijkstra performance testing: DENSE GRAPH");
//     for (let i = 0; i < 100000; i++) {
//         dijkstra(denseGraph, "1", "20");
//     }
// console.timeEnd("dijkstra performance testing: DENSE GRAPH");

// // sparseGraph
// console.time("dijkstra performance testing: SPARSE GRAPH");
//     for (let i = 0; i < 10000; i++) {
//         dijkstra(sparseGraph, "1", "500");
//     }
// console.timeEnd("dijkstra performance testing: SPARSE GRAPH");


