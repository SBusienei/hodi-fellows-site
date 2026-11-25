import { config, programme } from "../config.js?v=closed-20261125";
import { icon } from "./icons.js";
import { createConfiguredLink } from "./ui.js";

document.querySelectorAll("[data-icon]").forEach((node) => {
  if (!node.querySelector("svg")) node.innerHTML = icon(node.dataset.icon);
});
document.querySelectorAll("[data-phase-review]").forEach((node) => {
  node.textContent = programme.reviewNotice;
});

const menu = document.querySelector(".menu-toggle");
if (menu) {
  const nav = menu.closest("nav");
  const links = document.getElementById(menu.getAttribute("aria-controls"));
  const setOpen = (open) => {
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    links.classList.toggle("is-open", open);
  };
  nav.classList.add("menu-enhanced");
  menu.addEventListener("click", () =>
    setOpen(menu.getAttribute("aria-expanded") !== "true"),
  );
  nav.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menu.getAttribute("aria-expanded") === "true"
    ) {
      setOpen(false);
      menu.focus();
    }
  });
  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  matchMedia("(max-width: 720px)").addEventListener("change", () =>
    setOpen(false),
  );
}

document.querySelectorAll("[data-config-link]").forEach((node) => {
  node.append(
    createConfiguredLink(node.dataset.configLink, node.dataset.label),
  );
});
const action = document.querySelector("#application-action");
const applicationPreview = document.querySelector("#application-preview");
const privacyContact = createConfiguredLink("contactEmail", "Privacy contact");
const privacyController =
  typeof config.privacyController === "string"
    ? config.privacyController.trim()
    : "";
const privacyReady =
  config.privacyReady === true &&
  privacyController.length > 0 &&
  privacyContact.tagName === "A";
document.querySelectorAll("[data-privacy-controller]").forEach((node) => {
  node.textContent = privacyController || "not confirmed yet";
});
applicationPreview?.addEventListener("submit", (event) => {
  event.preventDefault();
  const notice = document.querySelector("#application-notice");
  notice.textContent =
    "Applications are not available yet. Nothing was sent or saved; this is only a form preview.";
  notice.setAttribute("role", "alert");
});
if (action && config.applicationsOpen && !privacyReady) {
  const notice = document.querySelector("#application-notice");
  notice.textContent =
    "Applications are not available. The privacy notice, controller and public contact must be finalised before applications open.";
  notice.setAttribute("role", "alert");
} else if (action && config.applicationsOpen) {
  const destination = createConfiguredLink(
    "applicationUrl",
    "Apply on Google Forms",
  );
  if (destination.tagName === "A") {
    if (applicationPreview) applicationPreview.hidden = true;
    const draft = document.querySelector("#application-draft");
    if (draft) draft.hidden = true;
    destination.className = "button primary";
    action.replaceWith(destination);
    document.querySelector("#application-notice").textContent =
      "Applications are open. The application form opens on Google Forms in a new tab.";
  } else {
    const notice = document.querySelector("#application-notice");
    notice.textContent = `Applications are not available. ${destination.textContent}`;
    notice.setAttribute("role", "alert");
  }
}
