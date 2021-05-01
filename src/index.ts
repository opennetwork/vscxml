import JSDOM from "jsdom";
import scxml from "@scion-scxml/scxml";
import type { ModelFactoryFactory } from "@scion-scxml/scxml";
import { createNode, VNode, VNodeRepresentationSource } from "@opennetwork/vnode";
import { render } from "@opennetwork/vdom";
import core from "@scion-scxml/core";
import type { Statechart } from "@scion-scxml/core";

export function h(type: string, options: Record<string, object>, ...children: VNodeRepresentationSource[]): VNode {
  return createNode(
    type,
    {
      type: "Element",
      attributes: options
    },
    ...children
  );
}

export async function renderToString(node: VNode): Promise<string> {
  const dom = new JSDOM.JSDOM("<scxml-root />", {
    contentType: "application/scxml+xml"
  });
  const root = dom.window.document.querySelector("scxml-root");
  await render(node, root);
  return root.innerHTML;
}

export async function stringToModelFactoryFactory(string: string): Promise<ModelFactoryFactory> {
  return await new Promise(
    (resolve, reject) => {
      scxml.documentStringToModel("https://scxml.opennetwork.dev", string, (error, modelFactory) => {
        if (error) {
          reject(error);
        } else {
          resolve(modelFactory);
        }
      });
    }
  );
}

export async function renderToModelFactoryFactory(node: VNode): Promise<ModelFactoryFactory> {
  const string = await renderToString(node);
  debugger;
  return stringToModelFactoryFactory(string);
}

export async function renderToStateChart(node: VNode): Promise<Statechart> {
  const modelFactoryFactory = await renderToModelFactoryFactory(node);
  const modelFactory = await new Promise(
    (resolve, reject) => {
      modelFactoryFactory.prepare((error, modelFactory) => {
        if (error) {
          reject(error);
        } else {
          resolve(modelFactory);
        }
      });
    }
  );
  return new core.Statechart(modelFactory);
}

