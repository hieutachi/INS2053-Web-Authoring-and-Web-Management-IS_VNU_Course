import {
  Divider,
  Grid,
  H1,
  H2,
  PieChart,
  Stack,
  Stat,
  Table,
  Text,
  Tag,
  useHostTheme,
} from "qoder/canvas";

export default function INS2053Overview() {
  const { tokens } = useHostTheme();
  return (
    <Stack gap={24}>
      <Stack gap={6}>
        <H1>INS2053 — Course Overview</H1>
        <Text tone="secondary">Web Authoring &amp; Web Management · 4 credits · 15 weeks · English · 3 periods/week</Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value="15" label="Sessions" />
        <Stat value="15" label="Ebook chapters" />
        <Stat value="29" label="Exercises + homework" />
        <Stat value="5" label="CLOs covered" tone="success" />
      </Grid>

      <Divider />

      <Grid columns={2} gap={20}>
        <Stack gap={12}>
          <H2>Assessment</H2>
          <PieChart
            donut
            centerLabel="100%"
            data={[
              { label: "Attendance", value: 10 },
              { label: "Midterm (wk 8)", value: 30 },
              { label: "Final", value: 60 },
            ]}
          />
          <Text tone="secondary" size="small">Homework due every Sunday 23:59 · exams practical, no internet.</Text>
        </Stack>

        <Stack gap={12}>
          <H2>Course learning outcomes</H2>
          <Table
            headers={["CLO", "Outcome", "Where"]}
            rows={[
              ["1", "Master basic web skills", "Sessions 1–10, 13–15"],
              ["2", "Analyze business requirements", "Session 11 (+ appendix A)"],
              ["3", "Choose technologies", "Appendix A"],
              ["4", "Design & build a web app", "Capstone project"],
              ["5", "Evaluate, document, present", "Sessions 11, 12, 15"],
            ]}
          />
        </Stack>
      </Grid>

      <Divider />

      <Stack gap={12}>
        <H2>15-week schedule</H2>
        <Table
          headers={["Wk", "Topic", "Builds toward"]}
          rows={[
            ["1", "Intro to Dreamweaver / web basics", "First HTML file"],
            ["2", "Creating a new site", "Project structure"],
            ["3", "Text & images", "About page"],
            ["4", "Applying CSS", "External stylesheet"],
            ["5", "Page layouts", "Semantic layout"],
            ["6", "Layouts (cont.) — navigation", "Multi-page site"],
            ["7", "CSS3 & web fonts", "Typography polish"],
            ["8", "Review & midterm", "Exam"],
            ["9", "Tables", "Schedule page"],
            ["10", "Flash / video / sound", "Media page"],
            ["11", "Compact site + requirements (CLO2)", "Polished site"],
            ["12", "Code-editing tools", "Validation"],
            ["13", "Forms", "Contact page"],
            ["14", "Spry framework (legacy)", "Modern CSS nav"],
            ["15", "Mobile / review + presentation (CLO5)", "Responsive site"],
          ]}
        />
      </Stack>

      <Stack gap={8}>
        <Tag tone="info">Capstone: Student Club Website</Tag>
        <Text tone="secondary" size="small">
          One project all semester. Milestones M1–M8 feed the final grade. See project/spec.md and examples/student-club/.
        </Text>
      </Stack>
    </Stack>
  );
}
