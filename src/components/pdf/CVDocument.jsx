import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { profile, contacts, languages } from "../../data/sidebarData";
import { experiences } from "../../data/experienceData";
import { educationItems } from "../../data/educationData";
import { about } from "../../data/aboutData";
import { frontendSkills, backendSkills } from "../../data/skillsData";
import { softSkills } from "../../data/sidebarData";
import { projects } from "../../data/projects";

const C = {
  accent: "#6d28d9",
  text: "#111827",
  muted: "#4b5563",
  light: "#9ca3af",
  divider: "#d1d5db",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.text,
    paddingTop: 22,
    paddingBottom: 20,
    paddingLeft: 26,
    paddingRight: 26,
  },

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 7,
    marginBottom: 8,
    borderBottomColor: C.accent,
    borderBottomWidth: 1.5,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    color: C.text,
    marginBottom: 2,
  },
  jobTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: C.accent,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  contactItem: {
    fontSize: 7.5,
    color: C.muted,
    marginBottom: 1.5,
  },
  contactLink: {
    fontSize: 7.5,
    color: C.accent,
    marginBottom: 1.5,
    textDecoration: "none",
  },

  // SECTION TITLE
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: C.accent,
    textTransform: "uppercase",
    letterSpacing: 0.9,
    marginBottom: 5,
    marginTop: 10,
    paddingBottom: 2,
    borderBottomColor: C.divider,
    borderBottomWidth: 0.5,
  },
  sectionTitleFirst: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: C.accent,
    textTransform: "uppercase",
    letterSpacing: 0.9,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomColor: C.divider,
    borderBottomWidth: 0.5,
  },

  // ABOUT
  aboutIntro: {
    fontSize: 8,
    color: C.muted,
    lineHeight: 1.4,
    marginBottom: 4,
  },

  // BULLET LIST (shared by About + Experience)
  bulletList: {
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    fontSize: 7.5,
    color: C.accent,
    width: 10,
    marginTop: 0.5,
  },
  bulletText: {
    fontSize: 7.5,
    color: C.text,
    flex: 1,
    lineHeight: 1.4,
  },

  // EXPERIENCE
  expEntry: {
    marginBottom: 7,
  },
  expTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  expRole: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: C.text,
    flex: 1,
    marginRight: 6,
  },
  expPeriod: {
    fontSize: 7.5,
    color: C.light,
  },
  expCompany: {
    fontSize: 7.5,
    color: C.muted,
    fontFamily: "Helvetica-Oblique",
    marginBottom: 2,
  },
  expShortDesc: {
    fontSize: 7.5,
    color: C.muted,
    lineHeight: 1.4,
    marginBottom: 2,
  },

  // EDUCATION
  eduEntry: {
    marginBottom: 5,
  },
  eduTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eduDegree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: C.text,
    flex: 1,
    marginRight: 6,
  },
  eduYears: {
    fontSize: 7.5,
    color: C.light,
  },
  eduSchool: {
    fontSize: 7.5,
    color: C.muted,
    marginBottom: 2,
  },
  eduShortDesc: {
    fontSize: 7.5,
    color: C.text,
    lineHeight: 1.45,
  },
  // SKILLS (two-column grid at bottom)
  skillsRow: {
    flexDirection: "row",
    marginTop: 3,
  },
  skillsCol: {
    flex: 1,
    marginRight: 10,
  },
  skillGroup: {
    marginBottom: 4,
  },
  skillGroupLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: C.text,
    marginBottom: 2,
  },
  skillList: {
    fontSize: 7.5,
    color: C.muted,
    lineHeight: 1.45,
  },

  // SOFT SKILLS
  softSkillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  },
  softSkillItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
    marginBottom: 3,
  },
  softSkillDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#6d28d9",
    marginRight: 4,
  },
  softSkillText: {
    fontSize: 8,
    color: C.text,
  },

  // LANGUAGES
  langRow: {
    flexDirection: "row",
  },
  langEntry: {
    marginRight: 16,
    flexDirection: "row",
  },
  langName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: C.text,
    marginRight: 4,
  },
  langLevel: {
    fontSize: 8,
    color: C.muted,
  },

  // PROJECTS
  projEntry: {
    marginBottom: 5,
  },
  projTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  projTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: C.text,
    flex: 1,
    marginRight: 6,
  },
  projLinkGroup: {
    flexDirection: "row",
  },
  projLink: {
    fontSize: 7,
    color: C.accent,
    textDecoration: "none",
    marginLeft: 6,
  },
  projDesc: {
    fontSize: 7.5,
    color: C.muted,
    lineHeight: 1.4,
  },
});


export default function CVDocument() {
  const pdfProjects = projects.slice(3, 7);
  const emailContact = contacts.find((c) => c.icon === "email");
  const websiteContact = contacts.find((c) => c.icon === "link");
  const phoneUk = contacts.find((c) => c.flagAlt === "Ukraine");
  const phoneRo = contacts.find((c) => c.flagAlt === "Romania");
  const locationContact = contacts.find((c) => c.icon === "location");

  return (
    <Document
      title={`${profile.name} — CV`}
      author={profile.name}
      subject="Frontend & Full-Stack Developer CV"
      keywords="frontend developer, full-stack developer, react, node.js, javascript, typescript, redux, mongodb, express, vite, git, agile, remote"
    >
      <Page size="A4" style={styles.page}>
        {/* ── HEADER ─────────────────────────────────────── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.jobTitle}>{profile.subtitle}</Text>
          </View>
          <View style={styles.headerRight}>
            {emailContact && (
              <Link src={emailContact.href} style={styles.contactLink}>
                {emailContact.text}
              </Link>
            )}
            {websiteContact && (
              <Link src={websiteContact.href} style={styles.contactLink}>
                {websiteContact.text}
              </Link>
            )}
            {phoneUk && (
              <Text style={styles.contactItem}>UA: {phoneUk.text}</Text>
            )}
            {phoneRo && (
              <Text style={styles.contactItem}>RO: {phoneRo.text}</Text>
            )}
            {locationContact && (
              <Text style={styles.contactItem}>{locationContact.text}</Text>
            )}
            <Link src="https://www.linkedin.com/in/vitalii-belevtsov/" style={styles.contactLink}>
              linkedin.com/in/vitalii-belevtsov
            </Link>
          </View>
        </View>

        {/* ── ABOUT ──────────────────────────────────────── */}
        <Text style={styles.sectionTitleFirst}>About Me</Text>
        <Text style={styles.aboutIntro}>{about.modalDescription.intro}</Text>

        {/* ── EXPERIENCE ─────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Experience</Text>
        {experiences.map((exp) => (
          <View key={exp.id} style={styles.expEntry}>
            <View style={styles.expTopRow}>
              <Text style={styles.expRole}>{exp.role}</Text>
              <Text style={styles.expPeriod}>{exp.period}</Text>
            </View>
            <Text style={styles.expCompany}>{exp.company}</Text>
            <Text style={styles.expShortDesc}>{exp.description}</Text>
          </View>
        ))}

        {/* ── PROJECTS ───────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Projects</Text>
        {pdfProjects.map((proj, i) => (
          <View key={i} style={styles.projEntry}>
            <View style={styles.projTopRow}>
              <Text style={styles.projTitle}>{proj.title}</Text>
              <View style={styles.projLinkGroup}>
                <Link src={proj.demo} style={styles.projLink}>Demo</Link>
                <Link src={proj.code} style={styles.projLink}>GitHub</Link>
              </View>
            </View>
            <Text style={styles.projDesc}>{proj.description}</Text>
          </View>
        ))}

        {/* ── SKILLS ─────────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsRow}>
          <View style={styles.skillsCol}>
            <View style={styles.skillGroup}>
              <Text style={styles.skillGroupLabel}>Frontend</Text>
              <Text style={styles.skillList}>
                {frontendSkills.join(" · ")}
              </Text>
            </View>
          </View>
          <View style={styles.skillsCol}>
            <View style={styles.skillGroup}>
              <Text style={styles.skillGroupLabel}>Backend & Tools</Text>
              <Text style={styles.skillList}>
                {backendSkills.join(" · ")}
              </Text>
            </View>
          </View>
        </View>

        {/* ── EDUCATION ──────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Education</Text>
        {educationItems.map((edu) => (
          <View key={edu.id} style={styles.eduEntry}>
            <View style={styles.eduTopRow}>
              <Text style={styles.eduDegree}>{edu.degree}</Text>
              <Text style={styles.eduYears}>{edu.years}</Text>
            </View>
            <Text style={styles.eduSchool}>{edu.school}</Text>
            {edu.descriptionShort && (
              <Text style={styles.eduShortDesc}>{edu.descriptionShort}</Text>
            )}
          </View>
        ))}

        {/* ── SOFT SKILLS ────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Soft Skills</Text>
        <View style={styles.softSkillsRow}>
          {softSkills.map((skill) => (
            <View key={skill} style={styles.softSkillItem}>
              <View style={styles.softSkillDot} />
              <Text style={styles.softSkillText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* ── LANGUAGES ──────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Languages</Text>
        <View style={styles.langRow}>
          {languages.map((lang) => (
            <View key={lang.name} style={styles.langEntry}>
              <Text style={styles.langName}>{lang.name}</Text>
              <Text style={styles.langLevel}>— {lang.level}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
