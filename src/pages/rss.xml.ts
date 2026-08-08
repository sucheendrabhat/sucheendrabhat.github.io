import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import config from "@/config";

export async function GET(context: { site: URL }) {
  const projectLogs = await getCollection("projectLogs");
  const skillLogs = await getCollection("skillLogs");

  const taggedProjectLogs = projectLogs.map((log) => ({
    type: "project" as const,
    log,
    date: new Date(log.data.date).getTime(),
  }));

  const taggedSkillLogs = skillLogs.map((log) => ({
    type: "skill" as const,
    log,
    date: new Date(log.data.date).getTime(),
  }));

  const sortedLogs = [...taggedProjectLogs, ...taggedSkillLogs].sort(
    (a, b) => b.date - a.date
  );

  const rssItems = await Promise.all(
    sortedLogs.map(async (item) => {
      let parentTitle = "Unknown";
      let link = "";

      const logSubSlug = item.log.id.includes("/")
        ? item.log.id.split("/").pop()!
        : item.log.id;

      if (item.type === "project") {
        const parent = await getEntry(item.log.data.project);
        if (parent) {
          parentTitle = parent.data.title;
          link = `/projects/${parent.id}/${logSubSlug}`;
        }
      } else {
        const parent = await getEntry(item.log.data.skill);
        if (parent) {
          parentTitle = parent.data.title;
          link = `/learning/${parent.id}/${logSubSlug}`;
        }
      }

      const prefix = item.type === "project" ? "Project" : "Learning";
      const excerpt = item.log.body
        ? item.log.body.slice(0, 200).replace(/[\r\n]+/g, " ") + "..."
        : item.log.data.title;

      return {
        title: `[${prefix}: ${parentTitle}] ${item.log.data.title}`,
        pubDate: new Date(item.log.data.date),
        description: excerpt,
        link,
      };
    })
  );

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: context.site || config.site.url,
    items: rssItems,
  });
}
