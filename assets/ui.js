import { config } from "../config.js";
import { icon } from "./icons.js";

export function createElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createExternalLink(label, url) {
  if (!/^https:\/\/[^\s]+$/.test(url))
    throw new Error(`Invalid resource URL: ${label}`);
  const link = createElement("a", "", label);
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  const arrow = createElement("span");
  arrow.innerHTML = icon("arrow");
  link.append(arrow);
  return link;
}

export function createConfiguredLink(kind, label) {
  const value = config[kind];
  if (value) {
    if (kind === "contactEmail" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      const link = createElement("a", "", label);
      link.href = `mailto:${value}`;
      return link;
    }
    const applicationLink =
      /^https:\/\/(?:forms\.gle\/[A-Za-z0-9_-]+|docs\.google\.com\/forms\/d\/(?:e\/)?[A-Za-z0-9_-]+\/viewform)(?:\?[^\s#]*)?$/.test(
        value,
      );
    if (
      kind !== "contactEmail" &&
      /^https:\/\/[^\s]+$/.test(value) &&
      (kind !== "applicationUrl" || applicationLink)
    ) {
      return createExternalLink(label, value);
    }
  }
  const reason = value
    ? "invalid organiser configuration"
    : "not configured yet";
  return createElement("span", "unavailable", `${label}: ${reason}.`);
}
