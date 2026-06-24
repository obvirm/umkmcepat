import { describe, expect, it } from "vitest";

import {
  briefToBuildPrompt,
  createInitialBrief,
  getMissingBriefFields,
  isBriefReady,
  parseProjectBrief,
} from "./brief";

describe("project brief", () => {
  it("creates a safe initial brief", () => {
    const brief = createInitialBrief("buat web toko baju");

    expect(brief.prompt).toBe("buat web toko baju");
    expect(isBriefReady(brief)).toBe(false);
    expect(getMissingBriefFields(brief)).toContain("businessType");
  });

  it("parses unknown values safely", () => {
    expect(parseProjectBrief(null, "halo").prompt).toBe("halo");
    expect(
      parseProjectBrief({ businessType: " Fashion  " }, "halo").businessType,
    ).toBe("Fashion");
  });

  it("marks ready when required fields are filled", () => {
    const brief = parseProjectBrief(
      {
        businessType: "Fashion",
        offer: "Katalog produk",
        targetCustomer: "Anak muda",
        contactOrCta: "Chat WA",
        stylePreference: "Bold gelap",
      },
      "buat web",
    );

    expect(isBriefReady(brief)).toBe(true);
    expect(briefToBuildPrompt(brief)).toContain("Bidang usaha: Fashion");
  });
});
