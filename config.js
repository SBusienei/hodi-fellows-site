// Public organiser settings only. Never put credentials or applicant data here.
export const config = Object.freeze({
  applicationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfc9vTWs2xDY6MB1-J24kPcio68D9DlrbY1y7SrByqChpjI9A/viewform",
  interestUrl: "",
  contactEmail: "hello@hodifellows.com",
  privacyController: "",
  privacyReady: false,
  cohortChannelUrl: "",
  liveSessionUrl: "",
  organiserUrl: "https://www.linkedin.com/in/sharleenbusienei/",
  practiceRepositoryUrl: "",
  applicationsOpen: false,
});

export const programme = Object.freeze({
  phases: [
    { number: 1, title: "Foundations and practice", firstWeek: 1, lastWeek: 4 },
    {
      number: 2,
      title: "Open-source contributions",
      firstWeek: 5,
      lastWeek: 8,
    },
    { number: 3, title: "Showcase and next steps", firstWeek: 9, lastWeek: 12 },
  ],
  reviewNotice:
    "After Phase 1, we pause to review what worked and improve what did not. Phases 2 and 3 are planned, subject to review and organiser capacity, not guaranteed. Later dates and the length of the pause will be confirmed before fellows commit to the next phase.",
});
