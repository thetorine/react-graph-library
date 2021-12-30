import { NodeList, NodeMapping, EdgeList, EdgeMapping } from "src/common/types";

function getNodeMapping<Data>(nodeList: NodeList<Data>): NodeMapping<Data> {
  return nodeList.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.id]: curr,
    }),
    {}
  );
}

function getEdgeMapping(edgeList: EdgeList): EdgeMapping {
  const edgeMapping: EdgeMapping = {};

  for (const edge of edgeList) {
    if (!(edge.fromId in edgeMapping)) {
      edgeMapping[edge.fromId] = [];
    }
    edgeMapping[edge.fromId].push(edge.toId);
  }

  return edgeMapping;
}

export { getNodeMapping, getEdgeMapping };
