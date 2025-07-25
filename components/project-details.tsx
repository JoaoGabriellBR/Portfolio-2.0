"use client";

import React, { memo } from "react";
import Image from "next/image";
import { ReactLenis } from "lenis/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { iconMap } from "@/utils/icons";
import { textSizes } from "@/utils/text-sizes";
import PageWithLoader from "./page-with-loader";
import { TfiArrowTopRight } from "react-icons/tfi";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Typography from "@/components/ui/typography";
import MonitorMockup from "@/components/ui/monitor-mockup";
import SmartphoneMockup from "@/components/ui/smartphone-mockup";
import Projects from "@/components/projects";
import { ScrollPage } from "@/components/scroll-page";
import { DrawCircleText } from "@/components/draw-circle-text";
import { MagneticButton } from "@/components/ui/button-magnetic";
import { SpinningText } from "./ui/spinning-text";
import { RiPokerSpadesFill } from "react-icons/ri";

type ProjectData = {
  title: string;
  descriptionKey: string;
  loadingText?: string;
  icon: string;
  siteUrl?: string;
  inDevelopment?: boolean;
  palette?: string;
  arrowFooterColor?: string;
  desktopImages?: string[];
  mobileImages?: string[];
  smallImages?: string[];
  fullImage?: string;
};

type ProjectDetailsProps = {
  project: ProjectData;
  currentProject: string;
};

const MemoizedImage = memo(Image);
const MemoizedTypography = memo(Typography);
const MemoizedMonitorMockup = memo(MonitorMockup);
const MemoizedSmartphoneMockup = memo(SmartphoneMockup);

export default function ProjectDetails({
  project,
  currentProject,
}: ProjectDetailsProps) {
  const t = useTranslations("Project.projectDetails");
  const Icon = iconMap[project.icon as keyof typeof iconMap];

  return (
    <PageWithLoader text={project.title}>
      <Header />
      <ReactLenis root options={{ lerp: 0.05 }}>
        <MainContent
          project={project}
          currentProject={currentProject}
          translation={t}
          Icon={Icon}
        />
      </ReactLenis>
      <Footer
        page={t("footer.contact")}
        route="/contact"
        palette={project.palette}
        arrowFooterColor={project.arrowFooterColor}
      />
    </PageWithLoader>
  );
}

type MainContentProps = {
  project: ProjectData;
  currentProject: string;
  translation: ReturnType<typeof useTranslations>;
  Icon: React.ElementType;
};

const MainContent = memo(function MainContent({
  project,
  currentProject,
  translation,
  Icon,
}: MainContentProps) {
  return (
    <main className="flex flex-col gap-y-2 lg:gap-y-10">
      <HeroSection title={project.title} Icon={Icon} />
      <DescriptionSection
        description={translation(project.descriptionKey)}
        loadingText={translation("loadingText")}
        siteUrl={project.siteUrl}
        inDevelopment={project.inDevelopment}
        buttonText={translation("viewSite")}
      />
      {project.fullImage && <FullImageSection imageSrc={project.fullImage} />}
      {project.mobileImages && (
        <MobileMockupsSection images={project.mobileImages} />
      )}
      {project.desktopImages && (
        <DesktopMockupsSection images={project.desktopImages} />
      )}
      {project.smallImages && (
        <SmallImagesSection
          images={project.smallImages}
          title={project.title}
        />
      )}
      <CallToActionSection
        nextText={translation("next")}
        palette={project.palette}
        currentProject={currentProject}
      />
    </main>
  );
});

// --- Sections ---

const HeroSection = memo(function HeroSection({
  title,
  Icon,
}: {
  title: string;
  Icon: React.ElementType;
}) {
  return (
    <section
      className="relative container mx-auto px-4 flex flex-col items-center justify-center text-center pt-12 min-h-[calc(100vh-80px)]"
      role="banner"
      aria-label="Project hero section"
    >
      <div className="flex flex-row items-center justify-between gap-4 -mt-28">
        <Icon
          className={`${textSizes.xl5} text-foreground dark:text-white`}
          aria-hidden="true"
        />
        <MemoizedTypography
          text={title}
          color="white"
          size="xl5"
          letterPadding={false}
        />
      </div>
      <div className="absolute bottom-6 sm:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0">
        <ScrollPage sectionLink="#project-description" />
      </div>
    </section>
  );
});

function DescriptionSection({
  description,
  loadingText,
  siteUrl = "",
  inDevelopment,
  buttonText,
}: {
  description: string;
  loadingText: string;
  siteUrl?: string;
  inDevelopment?: boolean;
  buttonText: string;
}) {
  return (
    <section
      id="project-description"
      className="container mx-auto px-4 py-20 lg:py-0 min-h-[20rem] lg:min-h-[40rem] flex flex-col lg:flex-row justify-between items-center gap-4"
    >
      <MemoizedTypography
        text={description}
        color="white"
        size="xl2"
        className="w-full lg:w-[60%] text-center lg:text-start"
      />
      {inDevelopment && !siteUrl ? (
        <div className="relative max-w-full p-10 min-w-[15rem] min-h-[15rem] flex justify-center items-center">
          <SpinningText
            fontSize={1}
            radius={6}
            duration={12}
            centerElement={
              <RiPokerSpadesFill
                className={`${textSizes.xl6} text-foreground dark:text-white`}
              />
            }
          >
            {loadingText}
          </SpinningText>
        </div>
      ) : (
        <Link href={siteUrl} target="_blank" rel="noopener noreferrer">
          <MagneticButton
            distance={1}
            type="3d"
            className="w-40 h-40 lg:w-64 lg:h-64 flex flex-col justify-center items-center gap-2 text-2xl p-5"
          >
            <TfiArrowTopRight
              className={`${textSizes.xl6} text-foreground dark:text-white`}
            />
            <MemoizedTypography
              size="md"
              text={buttonText}
              letterPadding={false}
            />
          </MagneticButton>
        </Link>
      )}
    </section>
  );
}

function FullImageSection({ imageSrc }: { imageSrc: string }) {
  return (
    <section className="w-full mx-auto px-4 min-h-[50vh] lg:min-h-screen mb-16 lg:mb-0 flex items-start justify-center">
      <MemoizedMonitorMockup>
        <MemoizedImage
          src={imageSrc}
          alt="Full screen mockup"
          fill
          className="rounded-[3rem] h-[90%]"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/images/fallback.webp";
          }}
        />
      </MemoizedMonitorMockup>
    </section>
  );
}

function MobileMockupsSection({ images }: { images: string[] }) {
  return (
    <section
      className="w-full min-h-screen flex items-center"
      role="region"
      aria-label="Mobile mockups gallery"
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row flex-wrap gap-16 items-center justify-center lg:justify-between">
        {images.map((src, index) => (
          <MemoizedSmartphoneMockup key={index}>
            <MemoizedImage
              src={src}
              alt={`Mobile application mockup ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-[3rem] h-[90%]"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/images/fallback.webp";
              }}
            />
          </MemoizedSmartphoneMockup>
        ))}
      </div>
    </section>
  );
}

function DesktopMockupsSection({ images }: { images: string[] }) {
  return (
    <section
      className="w-full min-h-screen mt-32"
      role="region"
      aria-label="Desktop mockups gallery"
    >
      {images.map((src, index) => (
        <div
          key={index}
          role="img"
          aria-label={`Desktop application mockup ${index + 1}`}
          className="w-full min-h-screen bg-no-repeat bg-contain lg:bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </section>
  );
}

function SmallImagesSection({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <section className="container mx-auto px-4 mt-40 flex flex-col items-center gap-16">
      {images.map((src, index) => (
        <div
          key={index}
          className={`flex w-full min-h-[50vh] ${
            index === 0 ? "items-start justify-start" : "items-end justify-end"
          }`}
        >
          <MemoizedImage
            src={src}
            width={700}
            height={700}
            alt={`${title} small image ${index + 1}`}
            className="object-contain pointer-events-none"
          />
        </div>
      ))}
    </section>
  );
}

function CallToActionSection({
  nextText,
  palette,
  currentProject,
}: {
  nextText: string;
  palette?: string;
  currentProject: string;
}) {
  const [firstWord, secondWord] = nextText.split(" ");

  return (
    <section className="min-h-[8vh] lg:min-h-[50vh] mt-40 flex flex-col items-center justify-center">
      <DrawCircleText
        firstWord={firstWord}
        secondWord={secondWord}
        palette={palette}
        textSize="lg"
      />
      <Projects currentProject={currentProject} />
    </section>
  );
}
