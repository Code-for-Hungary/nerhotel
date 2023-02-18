import { describe, it, expect } from "vitest";
import getTranslatedKMonitorLink from "./get-translated-k-monitor-link";

describe("A function to get a Google Translate link for the person database URLs", () => {
  it("returns a Google Translate URL", () => {
    expect(
      getTranslatedKMonitorLink(
        "https://adatbazis.k-monitor.hu/adatbazis/cimkek/scheer-sandor",
        "en"
      )
    ).toEqual(
      "https://adatbazis-k--monitor-hu.translate.goog/adatbazis/cimkek/scheer-sandor?_x_tr_sl=hu&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp"
    );
  });

  it("can dynamically change the output language of the returned Google Translate URL", () => {
    expect(
      getTranslatedKMonitorLink(
        "https://adatbazis.k-monitor.hu/adatbazis/cimkek/scheer-sandor",
        "de"
      )
    ).toEqual(
      "https://adatbazis-k--monitor-hu.translate.goog/adatbazis/cimkek/scheer-sandor?_x_tr_sl=hu&_x_tr_tl=de&_x_tr_hl=de&_x_tr_pto=wapp"
    );
  });

  it("returns an empty string if an invalid url is passed", () => {
    expect(getTranslatedKMonitorLink("foo", "en")).toEqual("");
  });
});
