import React from "react";
import {
  ExternalLink,
  Linkedin,
  Github,
  Twitter,
  Globe,
  Mail,
  Phone,
  MapPin,
  Send,
  Award,
} from "lucide-react";
import { ResumeRoot, SectionId } from "../types/resume";

interface TemplateProps {
  data: ResumeRoot;
}

const Watermark = ({ isRtl, color }: { isRtl: boolean; color: string }) => (
  <div className="mt-12 pt-6 border-t border-slate-100 flex justify-center flex-col items-center gap-2 no-print break-inside-avoid">
    <a
      href="https://ahm-id.github.io/OpenResume"
      target="_blank"
      rel="noopener"
      className="text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2 font-vazirmatn"
      style={{ color: color }}
    >
      <span className="opacity-50">
        {isRtl ? "ساخته شده توسط" : "Built with"}
      </span>
      <span>OpenResume</span>
    </a>
  </div>
);

const SocialLinks = ({
  data,
  color,
  iconSize = 12,
  className = "",
  isRtl = false,
}: {
  data: any;
  color: string;
  iconSize?: number;
  className?: string;
  isRtl?: boolean;
}) => {
  const links = [
    {
      value: data.linkedin,
      icon: <Linkedin size={iconSize} />,
      label: "LinkedIn",
    },
    { value: data.github, icon: <Github size={iconSize} />, label: "GitHub" },
    {
      value: data.twitter,
      icon: <Twitter size={iconSize} />,
      label: "X/Twitter",
    },
    { value: data.telegram, icon: <Send size={iconSize} />, label: "Telegram" },
    {
      value: data.website,
      icon: <Globe size={iconSize} />,
      label: "Portfolio",
    },
  ].filter((l) => l.value);

  if (links.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-2 items-center ${className}`}>
      {links.map((l, i) => (
        <a
          key={i}
          href={l.value}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity no-underline whitespace-nowrap"
          style={{ color }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <span className="shrink-0 order-first">{l.icon}</span>
          <span className="text-[10px] font-black uppercase tracking-tight">
            {l.label}
          </span>
        </a>
      ))}
    </div>
  );
};

const ProfileImage = ({
  src,
  size = "120px",
  className = "",
  style = {},
}: {
  src?: string;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  if (!src) return null;
  return (
    <div
      className={`shrink-0 overflow-hidden bg-slate-100 ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <img src={src} alt="Profile" className="w-full h-full object-cover" />
    </div>
  );
};

const renderSectionContent = (
  id: SectionId,
  data: ResumeRoot,
  isRtl: boolean
) => {
  const { experiences, educations, skills, projects, assessments, settings } =
    data;
  const primaryColor = settings.primaryColor;
  const langClass = "font-vazirmatn";

  switch (id) {
    case "experiences":
      return (
        experiences.length > 0 && (
          <div className="mb-6">
            <h2
              className={`text-[12px] font-black border-b-2 mb-3 uppercase tracking-widest ${langClass}`}
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {isRtl ? "سوابق شغلی" : "Experience"}
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3
                      className={`font-bold text-slate-900 text-sm ${langClass}`}
                    >
                      {exp.company}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-tight font-vazirmatn shrink-0">
                      {exp.dateRange}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span
                      className={`font-black text-[11px] uppercase ${langClass}`}
                      style={{ color: primaryColor }}
                    >
                      {exp.role}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-bold font-vazirmatn shrink-0">
                      {exp.location}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] text-slate-600 whitespace-pre-line leading-relaxed text-justify ${langClass}`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      );
    case "educations":
      return (
        educations.length > 0 && (
          <div className="mb-6 break-inside-avoid">
            <h2
              className={`text-[12px] font-black border-b-2 mb-3 uppercase tracking-widest ${langClass}`}
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {isRtl ? "تحصیلات" : "Education"}
            </h2>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3
                      className={`font-bold text-slate-900 text-sm ${langClass}`}
                    >
                      {edu.school}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-black font-vazirmatn shrink-0">
                      {edu.dateRange}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] text-slate-600 font-bold uppercase tracking-wide ${langClass}`}
                  >
                    {edu.degree} • {edu.field}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      );
    case "skills":
      return (
        skills.length > 0 && (
          <div className="mb-6 break-inside-avoid">
            <h2
              className={`text-[12px] font-black border-b-2 mb-3 uppercase tracking-widest ${langClass}`}
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {isRtl ? "مهارت‌ها" : "Skills"}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <span
                    className={`text-[11px] font-black text-slate-700 uppercase tracking-wide ${langClass}`}
                  >
                    {skill.name}
                    {skill.level ? ` (${skill.level})` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      );
    case "projects":
      return (
        projects.length > 0 && (
          <div className="mb-6">
            <h2
              className={`text-[12px] font-black border-b-2 mb-3 uppercase tracking-widest ${langClass}`}
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {isRtl ? "پروژه‌ها" : "Projects"}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-100 break-inside-avoid"
                >
                  <h3
                    className={`font-bold text-[11px] text-slate-900 mb-0.5 uppercase tracking-wide ${langClass}`}
                  >
                    {proj.name}
                  </h3>
                  <p
                    className={`text-[10px] text-slate-500 leading-relaxed mb-1.5 ${langClass}`}
                  >
                    {proj.description}
                  </p>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener"
                      className="text-[9px] font-black hover:underline uppercase tracking-tighter flex items-center gap-1"
                      style={{ color: primaryColor }}
                    >
                      <ExternalLink size={9} className="shrink-0" />
                      {isRtl ? "مشاهده پروژه" : "View Project"}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      );
    case "assessments":
      return (
        assessments.length > 0 && (
          <div className="mb-6 break-inside-avoid">
            <h2
              className={`text-[12px] font-black border-b-2 mb-3 uppercase tracking-widest ${langClass}`}
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {isRtl ? "آزمون‌ها و دستاوردها" : "Assessments"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assessments.map((item) => (
                <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <Award
                    size={16}
                    style={{ color: primaryColor }}
                    className="shrink-0"
                  />
                  <div className="min-w-0">
                    <div
                      className={`text-[11px] font-bold text-slate-900 truncate ${langClass}`}
                    >
                      {item.title}
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <span
                        className={`text-[9px] font-black uppercase ${langClass} flex items-center gap-1`}
                        style={{ color: primaryColor }}
                      >
                        {item.score}
                      </span>
                      <span className="text-[8px] text-slate-400 font-vazirmatn flex items-center gap-1">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      );
    default:
      return null;
  }
};

const ResumePageWrapper = ({
  children,
  isRtl,
}: {
  children: React.ReactNode;
  isRtl: boolean;
}) => (
  <div
    className="bg-white min-h-[297mm] h-[297mm] max-w-[210mm] w-full mx-auto relative overflow-hidden"
    dir={isRtl ? "rtl" : "ltr"}
  >
    {children}
  </div>
);

/**
 * MINIMAL TEMPLATE
 */
export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, settings } = data;
  const isRtl = settings.language === "fa";
  const primaryColor = settings.primaryColor;

  return (
    <ResumePageWrapper isRtl={isRtl}>
      <div className="p-12 text-slate-900 leading-relaxed font-vazirmatn h-full flex flex-col">
        <header
          className="mb-8 border-b-4 pb-6 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6"
          style={{ borderColor: primaryColor }}
        >
          <div className="flex-1 text-center sm:text-start">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-1.5 uppercase leading-none">
              {personalInfo.fullName}
            </h1>
            <p
              className="text-base md:text-lg font-black tracking-[0.2em] uppercase mb-3"
              style={{ color: primaryColor }}
            >
              {personalInfo.jobTitle}
            </p>
            <div
              className={`flex flex-wrap gap-x-5 gap-y-1.5 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 justify-center sm:justify-start items-center`}
            >
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1 no-underline text-inherit whitespace-nowrap"
                >
                  <Mail size={11} className="shrink-0" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-1 no-underline text-inherit whitespace-nowrap"
                >
                  <Phone size={11} className="shrink-0" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <MapPin size={11} className="shrink-0" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
            </div>
            <SocialLinks
              data={personalInfo}
              color={primaryColor}
              className="justify-center sm:justify-start"
              isRtl={isRtl}
            />
          </div>
          {settings.showProfileImage && personalInfo.profileImage && (
            <ProfileImage
              src={personalInfo.profileImage}
              size="100px"
              className="rounded-2xl shadow-lg ring-4 ring-slate-50"
            />
          )}
        </header>
        {personalInfo.summary && (
          <section className="mb-6 break-inside-avoid">
            <p className="text-[12px] text-slate-600 leading-relaxed font-medium text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}
        <div className="flex-1 overflow-hidden">
          {settings.sectionOrder
            .filter((id) => id !== "personalInfo")
            .map((id) => (
              <section key={id}>
                {renderSectionContent(id, data, isRtl)}
              </section>
            ))}
        </div>
        {settings.showWatermark && (
          <Watermark isRtl={isRtl} color={primaryColor} />
        )}
      </div>
    </ResumePageWrapper>
  );
};

/**
 * Modern TEMPLATE
 */
export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, settings } = data;
  const isRtl = settings.language === "fa";
  const primaryColor = settings.primaryColor;

  return (
    <ResumePageWrapper isRtl={isRtl}>
      <div className="flex flex-col sm:flex-row h-full font-vazirmatn">
        <aside
          className={`w-full sm:w-[30%] bg-slate-900 text-slate-100 p-8 flex flex-col ${
            isRtl ? "sm:order-2" : ""
          }`}
        >
          {settings.showProfileImage && personalInfo.profileImage && (
            <div className="mb-6 flex justify-center">
              <ProfileImage
                src={personalInfo.profileImage}
                size="130px"
                className="rounded-2xl border-2 border-slate-700 aspect-square shadow-xl"
              />
            </div>
          )}
          <div className="mb-8 text-center sm:text-start">
            <h1 className="text-xl md:text-2xl font-black mb-1 leading-tight text-white">
              {personalInfo.fullName}
            </h1>
            <p
              className="font-black uppercase tracking-widest text-[9px]"
              style={{ color: primaryColor }}
            >
              {personalInfo.jobTitle}
            </p>
          </div>
          <section className="mb-8 space-y-5 break-inside-avoid">
            <h2 className="text-[9px] font-black border-b border-slate-700 pb-1.5 uppercase text-slate-500 tracking-[0.3em]">
              {isRtl ? "ارتباط" : "Contact"}
            </h2>
            <div className="text-[9px] space-y-3.5 font-bold tracking-wide">
              {personalInfo.email && (
                <div className="flex flex-col gap-0.5 break-all">
                  <span className="text-slate-500 uppercase text-[7px] tracking-widest">
                    Email
                  </span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-white hover:opacity-70 no-underline flex items-center gap-1.5"
                  >
                    <Mail size={10} className="shrink-0" />
                    <span>{personalInfo.email}</span>
                  </a>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-500 uppercase text-[7px] tracking-widest">
                    Phone
                  </span>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-white hover:opacity-70 no-underline flex items-center gap-1.5"
                  >
                    <Phone size={10} className="shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </a>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-500 uppercase text-[7px] tracking-widest">
                    Location
                  </span>
                  <div className="text-white flex items-center gap-1.5">
                    <MapPin size={10} className="shrink-0" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              )}
              <div className="pt-1.5">
                <SocialLinks
                  data={personalInfo}
                  color="#fff"
                  iconSize={12}
                  className="gap-2"
                  isRtl={isRtl}
                />
              </div>
            </div>
          </section>
          {settings.sectionOrder.includes("skills") && (
            <div className="mt-2 break-inside-avoid">
              <h2 className="text-[9px] font-black border-b border-slate-700 pb-1.5 mb-3 uppercase text-slate-500 tracking-[0.3em]">
                {isRtl ? "مهارت‌ها" : "Skills"}
              </h2>
              <div className="space-y-2">
                {data.skills.map((s) => (
                  <div
                    key={s.id}
                    className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5"
                  >
                    <div
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
        <main className="flex-1 p-8 md:p-10 bg-white flex flex-col overflow-hidden">
          {personalInfo.summary && (
            <section className="mb-8 break-inside-avoid">
              <h2 className="text-[12px] font-black mb-3 flex items-center gap-2.5">
                <div
                  className="w-5 h-1 rounded"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <span style={{ color: primaryColor }}>
                  {isRtl ? "درباره من" : "Summary"}
                </span>
              </h2>
              <p className="text-slate-600 text-[11px] leading-relaxed font-medium text-justify">
                {personalInfo.summary}
              </p>
            </section>
          )}
          <div className="flex-1 overflow-hidden">
            {settings.sectionOrder
              .filter((id) => !["personalInfo", "skills"].includes(id))
              .map((id) => (
                <div key={id} className="mb-6">
                  {renderSectionContent(id, data, isRtl)}
                </div>
              ))}
          </div>
          {settings.showWatermark && (
            <div className="mt-auto pt-4">
              <Watermark isRtl={isRtl} color={primaryColor} />
            </div>
          )}
        </main>
      </div>
    </ResumePageWrapper>
  );
};

/**
 * CREATIVE TEMPLATE
 */
export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, settings } = data;
  const isRtl = settings.language === "fa";
  const primaryColor = settings.primaryColor;

  return (
    <ResumePageWrapper isRtl={isRtl}>
      <div className="h-full flex flex-col font-vazirmatn bg-white">
        <header className="h-40 bg-slate-950 px-10 md:px-14 flex flex-row items-center justify-between text-white relative shrink-0">
          <div
            className="absolute top-0 right-0 left-0 h-1.5"
            style={{ backgroundColor: primaryColor }}
          ></div>
          <div className="z-10 flex-1 pr-6 md:pr-10">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight break-words uppercase">
              {personalInfo.fullName}
            </h1>
            <p
              className="text-sm md:text-base font-black uppercase tracking-[0.4em] mt-2"
              style={{ color: primaryColor }}
            >
              {personalInfo.jobTitle}
            </p>
          </div>
          {settings.showProfileImage && personalInfo.profileImage && (
            <div className="z-20 shrink-0">
              <ProfileImage
                src={personalInfo.profileImage}
                size="120px"
                className="rounded-3xl border-[3px] border-white shadow-xl transform rotate-3"
              />
            </div>
          )}
        </header>

        <div className="p-8 md:p-12 flex-1 flex flex-col overflow-hidden">
          <div className="grid grid-cols-12 gap-8 flex-1 overflow-hidden">
            <div className="col-span-12 md:col-span-8 flex flex-col overflow-hidden">
              {personalInfo.summary && (
                <section className="mb-8 break-inside-avoid">
                  <h2
                    className="text-lg font-black mb-4 uppercase italic border-l-8 pl-5"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    {isRtl ? "خلاصه" : "Profile"}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-[12px] font-medium text-justify">
                    {personalInfo.summary}
                  </p>
                </section>
              )}
              <div className="space-y-8 flex-1 overflow-hidden">
                {settings.sectionOrder
                  .filter(
                    (id) =>
                      !["personalInfo", "skills", "educations"].includes(id)
                  )
                  .map((id) => (
                    <section key={id}>
                      {renderSectionContent(id, data, isRtl)}
                    </section>
                  ))}
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 space-y-8 overflow-hidden">
              <section className="bg-slate-50 p-5 rounded-2xl border border-slate-200 break-inside-avoid">
                <h2 className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em] border-b border-slate-200 pb-2">
                  {isRtl ? "تماس" : "Contact"}
                </h2>
                <div className="space-y-4 text-[9px] md:text-[10px] font-black text-slate-800 uppercase">
                  {personalInfo.email && (
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="flex items-center gap-1.5 no-underline"
                      style={{ color: primaryColor }}
                    >
                      <Mail size={10} className="shrink-0" />
                      <span>{personalInfo.email}</span>
                    </a>
                  )}
                  {personalInfo.phone && (
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="flex items-center gap-1.5 no-underline"
                      style={{ color: primaryColor }}
                    >
                      <Phone size={10} className="shrink-0" />
                      <span>{personalInfo.phone}</span>
                    </a>
                  )}
                  {personalInfo.location && (
                    <div
                      className="flex items-center gap-1.5"
                      style={{ color: primaryColor }}
                    >
                      <MapPin size={10} className="shrink-0" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                  <SocialLinks
                    data={personalInfo}
                    color={primaryColor}
                    iconSize={10}
                    className="gap-2"
                    isRtl={isRtl}
                  />
                </div>
              </section>

              <div className="space-y-8 overflow-hidden">
                {settings.sectionOrder.includes("skills") &&
                  renderSectionContent("skills", data, isRtl)}
                {settings.sectionOrder.includes("educations") &&
                  renderSectionContent("educations", data, isRtl)}
              </div>
            </div>
          </div>
          {settings.showWatermark && (
            <div className="mt-6">
              <Watermark isRtl={isRtl} color={primaryColor} />
            </div>
          )}
        </div>
      </div>
    </ResumePageWrapper>
  );
};

/**
 * ACADEMIC TEMPLATE
 */
export const AcademicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, settings } = data;
  const isRtl = settings.language === "fa";
  const primaryColor = settings.primaryColor;

  return (
    <ResumePageWrapper isRtl={isRtl}>
      <div className="p-12 text-slate-900 leading-relaxed h-full flex flex-col font-vazirmatn">
        <header className="mb-10 text-center border-b border-slate-100 pb-8 flex flex-col items-center shrink-0 break-inside-avoid">
          {settings.showProfileImage && personalInfo.profileImage && (
            <ProfileImage
              src={personalInfo.profileImage}
              size="90px"
              className="rounded-full mb-4 shadow-md ring-4 ring-slate-50"
            />
          )}
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            {personalInfo.fullName}
          </h1>
          <p className="text-sm text-slate-500 font-medium mb-4 uppercase tracking-widest">
            {personalInfo.jobTitle}
          </p>
          <div className="flex justify-center flex-wrap gap-x-5 gap-y-1 text-[10px] font-medium text-slate-400 mb-3 items-center">
            {personalInfo.email && (
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Mail size={10} className="shrink-0" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Phone size={10} className="shrink-0" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1 whitespace-nowrap">
                <MapPin size={10} className="shrink-0" />
                {personalInfo.location}
              </span>
            )}
          </div>
          <SocialLinks
            data={personalInfo}
            color={primaryColor}
            className="justify-center"
            isRtl={isRtl}
          />
        </header>
        {personalInfo.summary && (
          <section className="mb-8 break-inside-avoid">
            <h2
              className="text-[12px] font-bold uppercase mb-3 text-center"
              style={{ color: primaryColor }}
            >
              {isRtl ? "خلاصه تحقیق" : "Research Objective"}
            </h2>
            <p className="text-[12px] text-slate-600 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}
        <div className="flex-1 overflow-hidden">
          {settings.sectionOrder
            .filter((id) => id !== "personalInfo")
            .map((id) => (
              <section key={id}>
                {renderSectionContent(id, data, isRtl)}
              </section>
            ))}
        </div>
        {settings.showWatermark && (
          <Watermark isRtl={isRtl} color={primaryColor} />
        )}
      </div>
    </ResumePageWrapper>
  );
};

/**
 * COMPACT TEMPLATE
 */
export const CompactTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, settings } = data;
  const isRtl = settings.language === "fa";
  const primaryColor = settings.primaryColor;

  return (
    <ResumePageWrapper isRtl={isRtl}>
      <div className="p-10 text-slate-900 leading-snug h-full flex flex-col font-vazirmatn">
        <header
          className="mb-5 flex flex-row justify-between items-start border-b-2 pb-4 gap-6 shrink-0 break-inside-avoid"
          style={{ borderColor: primaryColor }}
        >
          <div className="flex flex-row gap-3 items-start">
            {settings.showProfileImage && personalInfo.profileImage && (
              <ProfileImage
                src={personalInfo.profileImage}
                size="60px"
                className="rounded-lg border-2 shadow-sm"
              />
            )}
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight leading-none">
                {personalInfo.fullName}
              </h1>
              <p
                className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-0.5"
                style={{ color: primaryColor }}
              >
                {personalInfo.jobTitle}
              </p>
              <div className="mt-2.5">
                <SocialLinks
                  data={personalInfo}
                  color={primaryColor}
                  iconSize={11}
                  className="gap-x-2.5"
                  isRtl={isRtl}
                />
              </div>
            </div>
          </div>
          <div className="text-[8px] font-bold text-end uppercase space-y-0.5 opacity-60 shrink-0">
            {personalInfo.email && (
              <p className="flex items-center gap-1 justify-end">
                <Mail size={9} className="shrink-0" />
                {personalInfo.email}
              </p>
            )}
            {personalInfo.phone && (
              <p className="flex items-center gap-1 justify-end">
                <Phone size={9} className="shrink-0" />
                {personalInfo.phone}
              </p>
            )}
            {personalInfo.location && (
              <p className="flex items-center gap-1 justify-end">
                <MapPin size={9} className="shrink-0" />
                {personalInfo.location}
              </p>
            )}
          </div>
        </header>
        {personalInfo.summary && (
          <p className="text-[10px] text-slate-600 mb-5 text-justify leading-snug break-inside-avoid">
            {personalInfo.summary}
          </p>
        )}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 overflow-hidden">
          {settings.sectionOrder
            .filter((id) => id !== "personalInfo")
            .map((id) => (
              <div key={id} className="mb-3.5">
                {renderSectionContent(id, data, isRtl)}
              </div>
            ))}
        </div>
        {settings.showWatermark && (
          <div className="mt-3">
            <Watermark isRtl={isRtl} color={primaryColor} />
          </div>
        )}
      </div>
    </ResumePageWrapper>
  );
};
