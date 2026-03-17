import { profile, contacts, socials, softSkills, languages } from "../sidebarData";
import { experiences } from "../experienceData";
import { educationItems } from "../educationData";
import { projects } from "../projects";
import { designSkills, frontendSkills, backendSkills } from "../skillsData";
import { contactLinks } from "../contactData";

describe("sidebarData", () => {
  it("profile has required fields", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.subtitle).toBeTruthy();
    expect(profile.photo).toBeTruthy();
  });

  it("every contact has label, href, text", () => {
    for (const c of contacts) {
      expect(c.label).toBeTruthy();
      expect(c.href).toBeTruthy();
      expect(c.text).toBeTruthy();
    }
  });

  it("every social has label, href, text, icon", () => {
    for (const s of socials) {
      expect(s.label).toBeTruthy();
      expect(s.href).toBeTruthy();
      expect(s.text).toBeTruthy();
      expect(s.icon).toBeTruthy();
    }
  });

  it("softSkills is a non-empty array of strings", () => {
    expect(softSkills.length).toBeGreaterThan(0);
    for (const skill of softSkills) {
      expect(typeof skill).toBe("string");
    }
  });

  it("every language has icon, name, level", () => {
    for (const lang of languages) {
      expect(lang.icon).toBeTruthy();
      expect(lang.name).toBeTruthy();
      expect(lang.level).toBeTruthy();
    }
  });
});

describe("experienceData", () => {
  it("experiences is a non-empty array", () => {
    expect(Array.isArray(experiences)).toBe(true);
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("every experience has id, role, company, period", () => {
    for (const exp of experiences) {
      expect(exp.id).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.period).toBeTruthy();
    }
  });

  it("experience ids are unique", () => {
    const ids = experiences.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("educationData", () => {
  it("educationItems is a non-empty array", () => {
    expect(Array.isArray(educationItems)).toBe(true);
    expect(educationItems.length).toBeGreaterThan(0);
  });

  it("every item has id, school, degree", () => {
    for (const item of educationItems) {
      expect(item.id).toBeTruthy();
      expect(item.school).toBeTruthy();
      expect(item.degree).toBeTruthy();
    }
  });
});

describe("projects", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has title and description", () => {
    for (const p of projects) {
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
    }
  });
});

describe("skillsData", () => {
  it("all skill arrays are non-empty", () => {
    expect(designSkills.length).toBeGreaterThan(0);
    expect(frontendSkills.length).toBeGreaterThan(0);
    expect(backendSkills.length).toBeGreaterThan(0);
  });
});

describe("contactData", () => {
  it("contactLinks is a non-empty array with label and href", () => {
    expect(contactLinks.length).toBeGreaterThan(0);
    for (const link of contactLinks) {
      expect(link.label).toBeTruthy();
      expect(link.href).toBeTruthy();
    }
  });
});
