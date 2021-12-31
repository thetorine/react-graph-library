import { getNodeMapping } from "./use-tree.utils";

describe("Get node mapping from node list", () => {
  test("No nodes", () => {
    expect(getNodeMapping([])).toEqual({});
  });

  test("One node", () => {
    const nodeId = "b6088d53-f3a0-461b-9c5b-41ea43fd3194";

    expect(getNodeMapping([{ id: nodeId, data: {} }])).toEqual({
      [nodeId]: { id: nodeId, data: {} },
    });
  });

  test("Multiple unique nodes", () => {
    const node1Id = "f4252fe3-5d46-43dd-a75b-ef1ffe592a7b";
    const node2Id = "eade1d40-f51e-4fdc-9129-051142ad85da";
    const node3Id = "38e1ba4e-ad4c-491b-97ed-39c47c89f96a";

    expect(
      getNodeMapping([
        {
          id: node1Id,
          data: {},
        },
        {
          id: node2Id,
          data: {},
        },
        {
          id: node3Id,
          data: {},
        },
      ])
    ).toEqual({
      [node1Id]: {
        id: node1Id,
        data: {},
      },
      [node2Id]: {
        id: node2Id,
        data: {},
      },
      [node3Id]: {
        id: node3Id,
        data: {},
      },
    });
  });
});
