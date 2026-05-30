"use client";

import { Suspense, lazy } from "react";
import {
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({ latestArticles, locale }: HomePageClientProps) {
  const t = useMessages() as any;
  const mobileBannerAd = getPreferredMobileBannerSelection();

  const toolSectionIds = [
    "download-platforms-game-pass",
    "beginner-guide",
    "all-levels-walkthrough",
    "entities-guide",
    "multiplayer-crossplay-voice-chat",
    "achievements-trophies",
    "system-requirements-settings",
    "updates-roadmap-patch-notes",
  ];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>
      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">{t.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">{t.hero.title}</h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">{t.hero.description}</p>
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("beginner-guide")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />{t.hero.getFreeCodesCTA}
              </button>
              <a href="https://store.steampowered.com/app/1943950/Escape_the_Backrooms/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-border hover:bg-white/10 rounded-lg font-semibold text-base md:text-lg transition-colors">
                {t.hero.playOnSteamCTA}
              </a>
            </div>
          </div>
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <VideoFeature videoId="2ZLPWJ-vkBU" title="Escape the Backrooms Official Trailer" />
        </div>
      </section>

      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.tools.title} <span className="text-[hsl(var(--nav-theme-light))]">{t.tools.titleHighlight}</span></h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.tools.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => (
              <button
                key={index}
                onClick={() => scrollToSection(toolSectionIds[index])}
                className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              >
                <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                  <DynamicIcon name={card.icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
                </div>
                <h3 className="mb-1.5 text-sm md:text-base font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <section id="download-platforms-game-pass" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-4">{t.modules.escapeTheBackroomsDownloadPlatformsGamePass.title}</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">{t.modules.escapeTheBackroomsDownloadPlatformsGamePass.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.escapeTheBackroomsDownloadPlatformsGamePass.cards.map((item: any, i: number) => (
              <div key={i} className="p-6 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-[hsl(var(--nav-theme-light))]">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-4">{t.modules.escapeTheBackroomsBeginnerGuide.title}</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">{t.modules.escapeTheBackroomsBeginnerGuide.intro}</p>
          <div className="space-y-4 mb-8">
            {t.modules.escapeTheBackroomsBeginnerGuide.steps.map((step: any, i: number) => (
              <div key={i} className="p-5 border border-border rounded-xl bg-white/5">
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="all-levels-walkthrough" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-4">{t.modules.escapeTheBackroomsAllLevelsWalkthrough.title}</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">{t.modules.escapeTheBackroomsAllLevelsWalkthrough.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.escapeTheBackroomsAllLevelsWalkthrough.items.map((row: any, i: number) => (
              <div key={i} className="p-5 border border-border rounded-xl bg-white/5">
                <h3 className="font-semibold mb-1">{row.name}</h3>
                <p className="text-xs text-[hsl(var(--nav-theme-light))] mb-2">{row.type}</p>
                <p className="text-sm text-muted-foreground">{row.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="entities-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-4">{t.modules.escapeTheBackroomsEntitiesGuide.title}</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">{t.modules.escapeTheBackroomsEntitiesGuide.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.escapeTheBackroomsEntitiesGuide.cards.map((item: any, i: number) => (
              <div key={i} className="p-6 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="multiplayer-crossplay-voice-chat" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-4">{t.modules.escapeTheBackroomsMultiplayerCrossplayVoiceChat.title}</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">{t.modules.escapeTheBackroomsMultiplayerCrossplayVoiceChat.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.escapeTheBackroomsMultiplayerCrossplayVoiceChat.cards.map((item: any, i: number) => (
              <div key={i} className="p-6 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-2"><DynamicIcon name={item.icon} className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" /><h3 className="font-bold">{item.name}</h3></div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements-trophies" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-4">{t.modules.escapeTheBackroomsAchievementsTrophies.title}</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">{t.modules.escapeTheBackroomsAchievementsTrophies.intro}</p>
          <div className="space-y-4">
            {t.modules.escapeTheBackroomsAchievementsTrophies.groups.map((group: any, i: number) => (
              <div key={i} className="p-6 border border-border rounded-xl bg-white/5">
                <h3 className="font-bold mb-3">{group.name}</h3>
                <ul className="space-y-2">
                  {group.items.map((it: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground"><DynamicIcon name={group.icon} className="w-4 h-4 mt-0.5 text-[hsl(var(--nav-theme-light))]" />{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="system-requirements-settings" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-4">{t.modules.escapeTheBackroomsSystemRequirementsSettings.title}</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">{t.modules.escapeTheBackroomsSystemRequirementsSettings.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.escapeTheBackroomsSystemRequirementsSettings.rows.map((row: any, i: number) => (
              <div key={i} className="p-6 border border-border rounded-xl bg-white/5">
                <div className="flex items-center gap-2 mb-2"><DynamicIcon name={row.icon} className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" /><h3 className="font-bold">{row.name}</h3></div>
                <p className="text-sm text-muted-foreground">{row.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="updates-roadmap-patch-notes" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-4">{t.modules.escapeTheBackroomsUpdatesRoadmapPatchNotes.title}</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">{t.modules.escapeTheBackroomsUpdatesRoadmapPatchNotes.intro}</p>
          <div className="space-y-4">
            {t.modules.escapeTheBackroomsUpdatesRoadmapPatchNotes.entries.map((entry: any, i: number) => (
              <div key={i} className="p-6 border border-border rounded-xl bg-white/5">
                <div className="flex items-center gap-2 mb-2"><DynamicIcon name={entry.icon} className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" /><p className="text-xs text-[hsl(var(--nav-theme-light))]">{entry.type}</p></div>
                <h3 className="font-bold mb-2">{entry.title}</h3>
                <p className="text-sm text-muted-foreground">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {mobileBannerAd && <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />}

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection title={t.faq.title} titleHighlight={t.faq.titleHighlight} subtitle={t.faq.subtitle} questions={t.faq.questions} />
      </Suspense>
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection title={t.cta.title} description={t.cta.description} joinCommunity={t.cta.joinCommunity} joinGame={t.cta.joinGame} />
      </Suspense>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />
    </div>
  );
}
