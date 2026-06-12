import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUsers,
  faArrowUpRightFromSquare,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";

const GITHUB_USERNAME = "yakubfirman";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  PHP: "bg-purple-500",
  CSS: "bg-pink-500",
  HTML: "bg-orange-500",
  Vue: "bg-emerald-500",
  Python: "bg-sky-500",
};

/** Warna sel per level kontribusi (0–4) — light theme */
const CONTRIBUTION_LEVELS = [
  "bg-slate-100",       // 0 – tidak ada
  "bg-red-200",         // 1 – rendah
  "bg-red-300",         // 2 – sedang-rendah
  "bg-red-400",         // 3 – sedang-tinggi
  "bg-red-500",         // 4 – tinggi
] as const;

const CELL_PX = 10; // lebar/tinggi sel (px)
const GAP_PX = 2; // jarak antar sel (px)
const STRIDE = CELL_PX + GAP_PX;

interface GitHubUser {
  public_repos: number;
  followers: number;
}
interface GitHubRepo {
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}
interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/** Kelompokkan kontribusi menjadi kolom minggu, padding awal sesuai hari */
function buildCalendar(contributions: Contribution[]): (Contribution | null)[][] {
  if (!contributions.length) return [];
  const firstDay = new Date(contributions[0].date).getDay(); // 0=Sun
  const padded: (Contribution | null)[] = [...Array(firstDay).fill(null), ...contributions];
  const weeks: (Contribution | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

/** Label bulan — satu per kolom pertama tiap bulan */
function getMonthLabels(weeks: (Contribution | null)[][]): Array<{ col: number; label: string }> {
  const labels: Array<{ col: number; label: string }> = [];
  const seen = new Set<string>();
  weeks.forEach((week, i) => {
    const first = week.find(Boolean) as Contribution | undefined;
    if (!first) return;
    const d = new Date(first.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!seen.has(key)) {
      seen.add(key);
      labels.push({ col: i, label: d.toLocaleString("en-US", { month: "short" }) });
    }
  });
  return labels;
}

async function getGitHubData() {
  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        next: { revalidate: 86400 },
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        next: { revalidate: 86400 },
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, {
        next: { revalidate: 86400 },
      }),
    ]);

    if (!userRes.ok) return null;

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];
    const contribJson = contribRes.ok ? await contribRes.json() : null;

    const ownRepos = repos.filter((r) => !r.fork);
    const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

    const langCounts = ownRepos
      .filter((r) => r.language)
      .reduce<Record<string, number>>((acc, r) => {
        acc[r.language!] = (acc[r.language!] || 0) + 1;
        return acc;
      }, {});

    const topLanguages = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const contributions: Contribution[] = contribJson?.contributions ?? [];
    const totalContributions: number = contribJson?.total?.lastYear ?? 0;

    return {
      user,
      totalStars,
      topLanguages,
      contributions,
      totalContributions,
      totalLangCount: ownRepos.filter((r) => r.language).length,
    };
  } catch {
    return null;
  }
}

export default async function GitHubSection() {
  const data = await getGitHubData();

  const stats = data
    ? [
        { label: "Public Repos", value: data.user.public_repos, icon: faBook },
        { label: "Total Stars", value: data.totalStars, icon: faStar },
        { label: "Followers", value: data.user.followers, icon: faUsers },
      ]
    : [];

  const weeks = data ? buildCalendar(data.contributions) : [];
  const monthLabels = getMonthLabels(weeks);

  return (
    <section id="github" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Open Source" title="GitHub Stats" />
        </Reveal>

        <Reveal delay={60}>
          <p className="-mt-8 mb-12 max-w-xl text-sm leading-relaxed text-slate-500">
            Aktivitas dan kontribusi saya di GitHub — dari proyek pribadi hingga eksperimen
            teknologi yang sedang saya pelajari.
          </p>
        </Reveal>

        {data ? (
          <>
            {/* ── Stat cards ── */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <div className="group flex items-center gap-4 rounded-2xl border border-red-100/60 bg-white/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-red-200 hover:shadow-lg hover:shadow-red-50">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 rounded-xl bg-red-100/40 blur-md transition-all duration-300 group-hover:bg-red-200/50 group-hover:blur-lg" />
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-rose-50 ring-1 ring-red-100">
                        <FontAwesomeIcon icon={stat.icon} className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* ── Languages + Contribution calendar ── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[14rem_1fr]">
              {/* Top languages */}
              {data.topLanguages.length > 0 && (
                <Reveal delay={200}>
                  <div className="h-full rounded-2xl border border-red-100/60 bg-white/70 p-5 backdrop-blur-sm">
                    <p className="mb-4 font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      Top Languages
                    </p>
                    <div className="space-y-3">
                      {data.topLanguages.map(([lang, count]) => {
                        const pct = Math.round((count / data.totalLangCount) * 100);
                        const color = LANG_COLORS[lang] ?? "bg-red-500";
                        return (
                          <div key={lang}>
                            <div className="mb-1 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${color}`} />
                                <span className="text-xs text-slate-600">{lang}</span>
                              </div>
                              <span className="font-mono text-[10px] text-slate-500">{pct}%</span>
                            </div>
                            <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full rounded-full ${color} opacity-70`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Contribution calendar */}
              {weeks.length > 0 && (
                <Reveal delay={260}>
                  <div className="rounded-2xl border border-red-100/60 bg-white/70 p-5 backdrop-blur-sm">
                    <p className="mb-3 font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      Contribution Activity
                    </p>

                    <div className="overflow-x-auto pb-1">
                      {/* Month labels */}
                      <div
                        className="relative mb-1"
                        style={{ height: 14, width: weeks.length * STRIDE }}
                      >
                        {monthLabels.map((ml) => (
                          <span
                            key={`${ml.label}-${ml.col}`}
                            className="absolute font-mono text-[9px] text-slate-400"
                            style={{ left: ml.col * STRIDE }}
                          >
                            {ml.label}
                          </span>
                        ))}
                      </div>

                      {/* Calendar grid — columns = weeks, rows = days */}
                      <div className="flex gap-0.5">
                        {weeks.map((week, wi) => (
                          <div key={wi} className="flex flex-col gap-0.5">
                            {Array.from({ length: 7 }).map((_, di) => {
                              const day = week[di];
                              return day ? (
                                <div
                                  key={di}
                                  title={`${day.date}: ${day.count} contributions`}
                                  className={`h-2.5 w-2.5 rounded-sm ${CONTRIBUTION_LEVELS[day.level]} transition-all duration-200 hover:ring-1 hover:ring-red-400/50`}
                                />
                              ) : (
                                <div key={di} className="h-2.5 w-2.5" />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 font-mono text-[10px] text-slate-500">
                      {data.totalContributions} contributions in the last year
                    </p>
                  </div>
                </Reveal>
              )}
            </div>
          </>
        ) : (
          <Reveal delay={100}>
            <div className="rounded-2xl border border-red-100/60 bg-white/70 p-8 text-center backdrop-blur-sm">
              <FontAwesomeIcon icon={faGithub} className="mb-3 h-8 w-8 text-slate-400" />
              <p className="text-sm text-slate-500">Statistik tidak dapat dimuat saat ini.</p>
            </div>
          </Reveal>
        )}

        {/* CTA */}
        <Reveal delay={400}>
          <div className="mt-8 flex justify-center sm:justify-start">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-red-200/80 bg-white/60 px-5 py-2.5 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-all duration-300 hover:border-red-300 hover:bg-red-50/60 hover:text-slate-900 hover:shadow-lg hover:shadow-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
            >
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
              Lihat Profil GitHub
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-3 w-3 text-slate-400 transition-colors duration-200 group-hover:text-red-500"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
