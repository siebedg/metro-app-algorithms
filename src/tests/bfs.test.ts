import { bfs } from "../bfs";

test("bfs return the correct traversal order", () => {
    expect(bfs("1")).toEqual(["1", "2", "3", "4", "5", "6"]),
    expect(bfs("2")).toEqual(["2", "1", "4", "5", "3", "6"]);
});

test("empty array for a non existing node", () => {
    expect(bfs("55")).toEqual([])
})

