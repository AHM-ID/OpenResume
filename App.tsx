import React, { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Trash2,
  Download,
  Eye,
  Layout,
  Settings,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  ChevronRight,
  Github,
  Globe,
  Moon,
  Sun,
  GripVertical,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Linkedin,
  Palette,
  Type,
  Lock,
  LayoutGrid,
  Rocket,
  BookOpen,
  Layers,
  Monitor,
  Twitter,
  Send,
  Image as ImageIcon,
  X,
  Award,
} from "lucide-react";
import {
  ResumeRoot,
  Experience,
  Education,
  Skill,
  Project,
  Assessment,
  LanguageId,
  TemplateId,
  SectionId,
} from "./types/resume";
import { useSessionState } from "./hooks/useSessionState";
import { useTranslations } from "./i18n/translations";
import {
  Button,
  Input,
  TextArea,
  FormSection,
  Select,
} from "./components/ui/Common";
import {
  MinimalTemplate,
  ModernTemplate,
  CreativeTemplate,
  AcademicTemplate,
  CompactTemplate,
} from "./templates/ResumeTemplates";
import { exportToHTML } from "./utils/exportUtils";

const INITIAL_DATA: ResumeRoot = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
    telegram: "",
    profileImage: "",
    summary: "",
  },
  experiences: [],
  educations: [],
  skills: [],
  projects: [],
  assessments: [],
  settings: {
    template: "minimal",
    language: "en",
    theme: "light",
    sectionOrder: [
      "personalInfo",
      "experiences",
      "educations",
      "skills",
      "projects",
      "assessments",
    ],
    primaryColor: "#4f46e5",
    showWatermark: true,
    showProfileImage: false,
  },
};

const COLOR_PRESETS = [
  "#4f46e5", // Indigo
  "#0f172a", // Slate
  "#0891b2", // Cyan
  "#059669", // Emerald
  "#b91c1c", // Ruby
  "#7c3aed", // Violet
  "#ea580c", // Orange
  "#1d4ed8", // Royal Blue
  "#db2777", // Pink
  "#4d7c0f", // Olive Green
];

const App: React.FC = () => {
  const [resumeData, setResumeData] = useSessionState<ResumeRoot>(
    "resume-v4-ahm",
    INITIAL_DATA
  );
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [notification, setNotification] = useState<string | null>(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const t = useTranslations(resumeData.settings.language);
  const isRtl = resumeData.settings.language === "fa";
  const isDark = resumeData.settings.theme === "dark";

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 6000);
  };

  const updatePersonalInfo = (
    field: keyof ResumeRoot["personalInfo"],
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = (
    type: "experiences" | "educations" | "skills" | "projects" | "assessments"
  ) => {
    const id = crypto.randomUUID();
    const newItem = { id };
    setResumeData((prev) => ({
      ...prev,
      [type]: [...prev[type], newItem],
    }));
  };

  const removeItem = (
    type: "experiences" | "educations" | "skills" | "projects" | "assessments",
    id: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item: any) => item.id !== id),
    }));
  };

  const updateItem = (
    type: "experiences" | "educations" | "skills" | "projects" | "assessments",
    id: string,
    field: string,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      [type]: prev[type].map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const setLanguage = (lang: LanguageId) => {
    setResumeData((prev) => ({
      ...prev,
      settings: { ...prev.settings, language: lang },
    }));
  };

  const toggleTheme = () => {
    setResumeData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: prev.settings.theme === "light" ? "dark" : "light",
      },
    }));
  };

  const onDragStart = (index: number) => {
    const sectionId = resumeData.settings.sectionOrder[index];
    if (sectionId === "personalInfo" || sectionId === "assessments") return;
    setDraggedItemIndex(index);
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    if (index === 0 || index === resumeData.settings.sectionOrder.length - 1)
      return;

    const newOrder = [...resumeData.settings.sectionOrder];
    const item = newOrder[draggedItemIndex];
    newOrder.splice(draggedItemIndex, 1);
    newOrder.splice(index, 0, item);

    setDraggedItemIndex(index);
    setResumeData((prev) => ({
      ...prev,
      settings: { ...prev.settings, sectionOrder: newOrder },
    }));
  };

  const handleDownloadHTML = () => {
    exportToHTML(
      "resume-preview",
      resumeData.settings.language,
      `${resumeData.personalInfo.fullName || "resume"}.html`
    );
    showNotification(t.downloadSuccess);
  };

  const CurrentTemplate = useMemo(() => {
    switch (resumeData.settings.template) {
      case "modern":
        return ModernTemplate;
      case "creative":
        return CreativeTemplate;
      case "academic":
        return AcademicTemplate;
      case "compact":
        return CompactTemplate;
      default:
        return MinimalTemplate;
    }
  }, [resumeData.settings.template]);

  const templateOptions = [
    { value: "minimal", label: t.minimal, icon: <Layers size={18} /> },
    { value: "modern", label: t.modern, icon: <Monitor size={18} /> },
    { value: "creative", label: t.creative, icon: <Rocket size={18} /> },
    { value: "academic", label: t.academic, icon: <BookOpen size={18} /> },
    { value: "compact", label: t.compact, icon: <LayoutGrid size={18} /> },
  ];

  const renderSection = (id: SectionId) => {
    switch (id) {
      case "personalInfo":
        return (
          <FormSection
            key={id}
            title={t.personalInfo}
            icon={<User size={20} />}
          >
            <div className="flex flex-col sm:flex-row gap-8 mb-6">
              <div className="flex-shrink-0 flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-2xl bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden flex items-center justify-center relative group">
                  {resumeData.personalInfo.profileImage ? (
                    <>
                      <img
                        src={resumeData.personalInfo.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => updatePersonalInfo("profileImage", "")}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <ImageIcon className="text-slate-300" size={40} />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-[10px] font-black uppercase text-slate-400">
                  {t.profileImage}
                </span>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) =>
                    updatePersonalInfo("fullName", e.target.value)
                  }
                  placeholder={t.fullName}
                />
                <Input
                  value={resumeData.personalInfo.jobTitle}
                  onChange={(e) =>
                    updatePersonalInfo("jobTitle", e.target.value)
                  }
                  placeholder={t.jobTitle}
                />
                <Input
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  placeholder={t.email}
                  type="email"
                />
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  placeholder={t.phone}
                />
                <Input
                  value={resumeData.personalInfo.location}
                  onChange={(e) =>
                    updatePersonalInfo("location", e.target.value)
                  }
                  placeholder={t.location}
                />
                <Input
                  value={resumeData.personalInfo.website}
                  onChange={(e) =>
                    updatePersonalInfo("website", e.target.value)
                  }
                  placeholder={t.website}
                />
                <Input
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) =>
                    updatePersonalInfo("linkedin", e.target.value)
                  }
                  placeholder={t.linkedin}
                />
                <Input
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo("github", e.target.value)}
                  placeholder={t.github}
                />
                <Input
                  value={resumeData.personalInfo.twitter}
                  onChange={(e) =>
                    updatePersonalInfo("twitter", e.target.value)
                  }
                  placeholder={t.twitter}
                />
                <Input
                  value={resumeData.personalInfo.telegram}
                  onChange={(e) =>
                    updatePersonalInfo("telegram", e.target.value)
                  }
                  placeholder={t.telegram}
                />
              </div>
            </div>
            <TextArea
              value={resumeData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              placeholder={t.summary}
            />
          </FormSection>
        );
      case "experiences":
        return (
          <FormSection
            key={id}
            title={t.experience}
            icon={<Briefcase size={20} />}
          >
            {resumeData.experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl space-y-4 border border-slate-100 dark:border-slate-800 relative transition-all hover:border-indigo-200"
              >
                <div className="flex justify-between items-center mb-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest font-vazirmatn">
                    {t.experience}
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem("experiences", exp.id)}
                    className="rounded-lg h-8 w-8 !p-0"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      updateItem(
                        "experiences",
                        exp.id,
                        "company",
                        e.target.value
                      )
                    }
                    placeholder={t.company}
                  />
                  <Input
                    value={exp.role}
                    onChange={(e) =>
                      updateItem("experiences", exp.id, "role", e.target.value)
                    }
                    placeholder={t.role}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    value={exp.dateRange}
                    onChange={(e) =>
                      updateItem(
                        "experiences",
                        exp.id,
                        "dateRange",
                        e.target.value
                      )
                    }
                    placeholder={t.dateRange}
                  />
                  <Input
                    value={exp.location}
                    onChange={(e) =>
                      updateItem(
                        "experiences",
                        exp.id,
                        "location",
                        e.target.value
                      )
                    }
                    placeholder={t.location}
                  />
                </div>
                <TextArea
                  value={exp.description}
                  onChange={(e) =>
                    updateItem(
                      "experiences",
                      exp.id,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder={t.description}
                />
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() => addItem("experiences")}
              className="w-full py-4 border-dashed border-2"
            >
              <Plus size={18} /> {t.addExperience}
            </Button>
          </FormSection>
        );
      case "educations":
        return (
          <FormSection
            key={id}
            title={t.education}
            icon={<GraduationCap size={20} />}
          >
            {resumeData.educations.map((edu) => (
              <div
                key={edu.id}
                className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl space-y-4 border border-slate-100 dark:border-slate-800 relative"
              >
                <div className="flex justify-between items-center mb-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest font-vazirmatn">
                    {t.education}
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem("educations", edu.id)}
                    className="rounded-lg h-8 w-8 !p-0"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <Input
                  value={edu.school}
                  onChange={(e) =>
                    updateItem("educations", edu.id, "school", e.target.value)
                  }
                  placeholder={t.school}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    value={edu.degree}
                    onChange={(e) =>
                      updateItem("educations", edu.id, "degree", e.target.value)
                    }
                    placeholder={t.degree}
                  />
                  <Input
                    value={edu.field}
                    onChange={(e) =>
                      updateItem("educations", edu.id, "field", e.target.value)
                    }
                    placeholder={t.field}
                  />
                </div>
                <Input
                  value={edu.dateRange}
                  onChange={(e) =>
                    updateItem(
                      "educations",
                      edu.id,
                      "dateRange",
                      e.target.value
                    )
                  }
                  placeholder={t.dateRange}
                />
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() => addItem("educations")}
              className="w-full py-4 border-dashed border-2"
            >
              <Plus size={18} /> {t.addEducation}
            </Button>
          </FormSection>
        );
      case "skills":
        return (
          <FormSection key={id} title={t.skills} icon={<Code size={20} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="flex gap-2">
                  <Input
                    value={skill.name}
                    onChange={(e) =>
                      updateItem("skills", skill.id, "name", e.target.value)
                    }
                    placeholder={t.skillName}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem("skills", skill.id)}
                    className="rounded-lg h-11 w-11 !p-0 shrink-0"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              onClick={() => addItem("skills")}
              className="w-full py-4 border-dashed border-2"
            >
              <Plus size={18} /> {t.addSkill}
            </Button>
          </FormSection>
        );
      case "projects":
        return (
          <FormSection
            key={id}
            title={t.projects}
            icon={<FolderGit2 size={20} />}
          >
            {resumeData.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl space-y-4 border border-slate-100 dark:border-slate-800 relative"
              >
                <div className="flex justify-between items-center mb-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest font-vazirmatn">
                    {t.projects}
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem("projects", proj.id)}
                    className="rounded-lg h-8 w-8 !p-0"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <Input
                  value={proj.name}
                  onChange={(e) =>
                    updateItem("projects", proj.id, "name", e.target.value)
                  }
                  placeholder={t.projectName}
                />
                <Input
                  value={proj.link}
                  onChange={(e) =>
                    updateItem("projects", proj.id, "link", e.target.value)
                  }
                  placeholder={t.projectLink}
                />
                <TextArea
                  value={proj.description}
                  onChange={(e) =>
                    updateItem(
                      "projects",
                      proj.id,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder={t.description}
                />
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() => addItem("projects")}
              className="w-full py-4 border-dashed border-2"
            >
              <Plus size={18} /> {t.addProject}
            </Button>
          </FormSection>
        );
      case "assessments":
        return (
          <FormSection
            key={id}
            title={t.assessments}
            icon={<Award size={20} />}
          >
            {resumeData.assessments.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl space-y-4 border border-slate-100 dark:border-slate-800 relative transition-all hover:border-indigo-200 font-vazirmatn text-start rtl:text-right"
              >
                <div className="flex justify-between items-center mb-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                    {t.assessments}
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem("assessments", item.id)}
                    className="rounded-lg h-8 w-8 !p-0"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    value={item.title}
                    onChange={(e) =>
                      updateItem(
                        "assessments",
                        item.id,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder={t.assessmentTitle}
                  />
                  <Input
                    value={item.score}
                    onChange={(e) =>
                      updateItem(
                        "assessments",
                        item.id,
                        "score",
                        e.target.value
                      )
                    }
                    placeholder={t.score}
                  />
                </div>
                <Input
                  value={item.date}
                  onChange={(e) =>
                    updateItem("assessments", item.id, "date", e.target.value)
                  }
                  placeholder={t.date}
                />
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() => addItem("assessments")}
              className="w-full py-4 border-dashed border-2"
            >
              <Plus size={18} /> {t.addAssessment}
            </Button>
          </FormSection>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-all duration-500 font-vazirmatn`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md bg-white dark:bg-slate-800 border-2 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-top duration-300">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <span className="font-bold text-sm md:text-base leading-tight">
            {notification}
          </span>
        </div>
      )}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between sticky top-0 z-50 no-print">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 transform hover:rotate-6 transition-transform">
            <Briefcase size={24} className="md:hidden" />
            <Briefcase size={32} className="hidden md:block" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              OpenResume
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">
              <ShieldCheck size={12} /> Privacy First
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-5">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl md:rounded-2xl">
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black transition-all ${
                resumeData.settings.language === "en"
                  ? "bg-white dark:bg-slate-700 shadow-md text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("fa")}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black transition-all ${
                resumeData.settings.language === "fa"
                  ? "bg-white dark:bg-slate-700 shadow-md text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              فارسی
            </button>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={toggleTheme}
            className="hidden sm:flex rounded-2xl p-2.5"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <div className="flex gap-1.5 md:gap-2">
            <Button
              onClick={handleDownloadHTML}
              className="rounded-xl md:rounded-2xl shadow-indigo-500/30 px-3 md:px-5"
            >
              <Download size={20} />
              <span className="hidden md:inline">{t.downloadHTML}</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="bg-slate-100 dark:bg-slate-900 px-4 md:px-8 py-2 border-b border-slate-200 dark:border-slate-800 no-print">
        <p className="text-[9px] md:text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 tracking-widest text-center">
          <ShieldCheck size={14} className="text-indigo-500 shrink-0" />{" "}
          {t.privacyBadge}
        </p>
      </div>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div
          className={`w-full lg:w-[520px] xl:w-[600px] overflow-y-auto scrollbar-hide p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 no-print ${
            activeTab === "preview" ? "hidden lg:block" : "block"
          }`}
          style={{ height: "calc(100vh - 124px)" }}
        >
          <div className="space-y-6 md:space-y-8 pb-20">
            <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <Palette size={20} className="text-indigo-500" />
                <h2 className="text-lg font-black uppercase tracking-widest">
                  {t.settings}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-start rtl:text-right">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest font-vazirmatn">
                    {t.template}
                  </label>
                  <Select
                    isRtl={isRtl}
                    options={templateOptions}
                    value={resumeData.settings.template}
                    onChange={(val) =>
                      setResumeData((prev) => ({
                        ...prev,
                        settings: { ...prev.settings, template: val },
                      }))
                    }
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest font-vazirmatn">
                    {t.primaryColor}
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {COLOR_PRESETS.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          setResumeData((prev) => ({
                            ...prev,
                            settings: { ...prev.settings, primaryColor: color },
                          }))
                        }
                        className={`w-full aspect-square rounded-full border-2 transition-all hover:scale-110 ${
                          resumeData.settings.primaryColor === color
                            ? "border-indigo-500 ring-2 ring-indigo-500/20 scale-105"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-4 flex flex-col gap-4 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-vazirmatn">
                    {t.showProfileImage}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={resumeData.settings.showProfileImage}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          settings: {
                            ...prev.settings,
                            showProfileImage: e.target.checked,
                          },
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-vazirmatn">
                    {t.showWatermark}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={resumeData.settings.showWatermark}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          settings: {
                            ...prev.settings,
                            showWatermark: e.target.checked,
                          },
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-indigo-600 dark:bg-indigo-900/50 p-4 md:p-6 rounded-2xl shadow-xl shadow-indigo-500/20 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings size={22} />
                  <h2 className="text-xl font-black font-vazirmatn">
                    {t.layout}
                  </h2>
                </div>
                <GripVertical size={20} className="opacity-50" />
              </div>
              <p className="text-sm font-medium text-indigo-100/70 font-vazirmatn text-start rtl:text-right">
                {t.dragToOrder}
              </p>
              <div className="space-y-3">
                {resumeData.settings.sectionOrder.map((id, idx) => {
                  const isFixed = id === "personalInfo" || id === "assessments";
                  return (
                    <div
                      key={id}
                      draggable={!isFixed}
                      onDragStart={() => onDragStart(idx)}
                      onDragOver={(e) => onDragOver(e, idx)}
                      onDragEnd={() => setDraggedItemIndex(null)}
                      className={`flex items-center justify-between bg-white/10 p-4 rounded-2xl border border-white/10 transition-all ${
                        isFixed
                          ? "opacity-80 shadow-inner"
                          : "cursor-grab active:cursor-grabbing hover:bg-white/20"
                      } ${
                        draggedItemIndex === idx
                          ? "dragging opacity-50 scale-95 shadow-inner"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {isFixed ? (
                          <Lock size={18} className="text-white/40" />
                        ) : (
                          <GripVertical size={18} className="text-white/40" />
                        )}
                        <span className="text-sm font-black uppercase tracking-widest font-vazirmatn">
                          {(t as any)[id] || id}
                        </span>
                      </div>
                      <CheckCircle2 size={16} className="text-indigo-300" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-8">
              {resumeData.settings.sectionOrder.map(renderSection)}
            </div>
          </div>
          <footer className="pt-8 border-t border-slate-100 dark:border-slate-900 text-center space-y-6 pb-8">
            <div className="flex flex-col items-center gap-3">
              <div className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest font-vazirmatn text-center">
                {t.footerText}
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#009249]" />
                <div className="w-3 h-3 rounded-full bg-white border border-slate-200 dark:border-slate-700" />
                <div className="w-3 h-3 rounded-full bg-[#ff0000]" />
              </div>
              <div className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em]">
                V1.4 • POWERED BY AHM
              </div>
            </div>
          </footer>
        </div>

        <div
          className={`flex-1 bg-slate-200 dark:bg-slate-900/50 overflow-hidden p-3 md:p-4 lg:p-6 flex flex-col items-center relative ${
            activeTab === "form" ? "hidden lg:flex" : "flex"
          }`}
          style={{ height: "calc(100vh - 124px)" }}
        >
          <div className="w-full max-w-[210mm] h-full flex flex-col">
            <div className="flex-shrink-0 mb-3 md:mb-4 lg:mb-6 no-print">
              <div className="lg:hidden flex justify-between items-center mb-3">
                <Button
                  variant="secondary"
                  onClick={() => setActiveTab("form")}
                  className="rounded-xl px-3 py-2 text-xs"
                >
                  <ChevronRight
                    size={16}
                    className={isRtl ? "" : "rotate-180"}
                  />
                  Editor
                </Button>
                <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">
                  Live Preview
                </h3>
              </div>
              <div className="hidden lg:flex justify-center w-full">
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 dark:border-slate-700/50 shadow-xl flex items-center gap-3 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  {t.liveRendering}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex justify-center scrollbar-hide items-start p-2">
              <div className="relative w-full max-w-[210mm]">
                <div
                  id="resume-preview"
                  className="w-full max-w-[210mm] min-h-[297mm] h-[297mm] bg-white shadow-xl transition-all duration-300 overflow-auto rounded-sm"
                >
                  <CurrentTemplate data={resumeData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 z-50 no-print">
        <button
          className={`py-4 flex flex-col items-center gap-1 transition-all ${
            activeTab === "form"
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-400"
          }`}
          onClick={() => setActiveTab("form")}
        >
          <Settings size={22} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] font-vazirmatn">
            Editor
          </span>
        </button>
        <button
          className={`py-4 flex flex-col items-center gap-1 transition-all ${
            activeTab === "preview"
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-400"
          }`}
          onClick={() => setActiveTab("preview")}
        >
          <Eye size={22} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] font-vazirmatn">
            Preview
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;
