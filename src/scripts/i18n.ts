import type { Lang } from '../types/schema';

export interface Translations {
  brandName: string;
  nav: {
    home: string;
    programs: string;
    community: string;
    dashboard: string;
    about: string;
  };
  aiAssistantBtn: string;
  subBar: {
    officialSources: string;
    savedCount: string;
    compareCount: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    smartAiBtn: string;
    aiParsing: string;
    quickExamplesLabel: string;
    examples: string[];
    parsedLabel: string;
    clearFilters: string;
  };
  filters: {
    title: string;
    university: string;
    allUniversities: string;
    city: string;
    allCities: string;
    yerevan: string;
    gyumri: string;
    vanadzor: string;
    gavar: string;
    goris: string;
    kapan: string;
    ijevan: string;
    degree: string;
    allDegrees: string;
    bachelor: string;
    master: string;
    phd: string;
    language: string;
    allLanguages: string;
    hy: string;
    en: string;
    ru: string;
    fr: string;
    field: string;
    allFields: string;
    maxTuition: string;
    scholarshipOnly: string;
    resultsCount: string;
    sortBy: string;
    sortFit: string;
    sortTuitionAsc: string;
    sortTuitionDesc: string;
    noResults: string;
  };
  fields: {
    it: string;
    engineering: string;
    economics: string;
    medicine: string;
    law: string;
    humanities: string;
    sciences: string;
    agriculture: string;
    arts: string;
  };
  program: {
    fitScore: string;
    annualTuition: string;
    amdPerYear: string;
    duration: string;
    years: string;
    language: string;
    deadline: string;
    scholarshipYes: string;
    scholarshipNo: string;
    unpublished: string;
    compare: string;
    compared: string;
    save: string;
    saved: string;
    details: string;
    trustLens: string;
    examsTitle: string;
    documentsTitle: string;
    curriculumTitle: string;
    mobilityTitle: string;
    minScore: string;
  };
  compare: {
    trayTitle: string;
    openMatrix: string;
    clear: string;
    minTwoNotice: string;
    maxFourNotice: string;
    modalTitle: string;
    rowUniversity: string;
    rowTuition: string;
    rowDuration: string;
    rowLanguage: string;
    rowExams: string;
    rowDocuments: string;
    rowDeadline: string;
    rowMobility: string;
    close: string;
  };
  trustLens: {
    title: string;
    subtitle: string;
    officialUrl: string;
    pageTitle: string;
    exactSnippet: string;
    collectedAt: string;
    verifiedAt: string;
    contentHash: string;
    notPublishedBanner: string;
    openOriginal: string;
    close: string;
  };
  programsPage: {
    title: string;
    subtitle: string;
    tabUniversities: string;
    tabPrograms: string;
    tabMobility: string;
    uniTypeState: string;
    uniTypePrivate: string;
    uniTypeIntl: string;
    allTypes: string;
    founded: string;
    students: string;
    faculties: string;
    programsCount: string;
    visitWebsite: string;
    viewUniDetails: string;
    hostCountry: string;
    fundingFull: string;
    fundingPartial: string;
    eligibility: string;
    partnerUnis: string;
  };
  communityPage: {
    title: string;
    subtitle: string;
    tabNews: string;
    tabJobs: string;
    filterByUni: string;
    filterByCategory: string;
    allCategories: string;
    catConference: string;
    catOlympiad: string;
    catHackathon: string;
    catOpenDay: string;
    catAdmissions: string;
    jobDegreeReq: string;
    jobMaster: string;
    jobPhd: string;
    jobDoctor: string;
    jobEmployment: string;
    jobFullTime: string;
    jobPartTime: string;
    applyOnline: string;
    applied: string;
    subscribeAlerts: string;
    subscribedAlerts: string;
    submitApplication: string;
    applicantName: string;
    applicantEmail: string;
    coverNote: string;
    applicationSuccess: string;
  };
  dashboardPage: {
    title: string;
    subtitle: string;
    roleTitle: string;
    roles: {
      applicant: string;
      international: string;
      parent: string;
      lecturer: string;
    };
    authNote: string;
    profileTitle: string;
    budgetLabel: string;
    gpaLabel: string;
    englishLabel: string;
    preferredField: string;
    preferredLang: string;
    preferredCity: string;
    preferredDegree: string;
    saveProfile: string;
    profileSavedToast: string;
    savedProgramsTitle: string;
    savedMobilityTitle: string;
    savedJobsTitle: string;
    calendarTitle: string;
    daysLeft: string;
    changesTitle: string;
    changesSubtitle: string;
    oldLabel: string;
    newLabel: string;
    markRead: string;
    emptySaved: string;
  };
  aboutPage: {
    title: string;
    subtitle: string;
    missionTitle: string;
    missionBody: string;
    pillarsTitle: string;
    howItWorksTitle: string;
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
    partnersTitle: string;
    contactTitle: string;
    contactSubtitle: string;
    contactAddressLabel: string;
    contactAddressValue: string;
    contactPhoneLabel: string;
    contactEmailLabel: string;
    contactHoursLabel: string;
    contactHoursValue: string;
    contactNameLabel: string;
    contactSubjectLabel: string;
    contactMsgLabel: string;
    contactSendBtn: string;
    contactSuccess: string;
    reportTitle: string;
    reportSubtitle: string;
    reportTypeIssue: string;
    reportTypePartner: string;
    reportUniLabel: string;
    reportMessageLabel: string;
    reportEmailLabel: string;
    reportSubmit: string;
    reportSuccess: string;
  };
  assistant: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    thinking: string;
    welcome: string;
    prompts: string[];
    sourcesLabel: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    basedOn: string;
  };
}

export const I18N: Record<Lang, Translations> = {
  hy: {
    brandName: 'ՀՀ ԲՈՒՀ Պորտալ',
    nav: {
      home: 'Գլխավոր',
      programs: 'Կրթական ծրագրեր',
      community: 'Համայնք',
      dashboard: 'Աշխատասենյակ',
      about: 'Մեր մասին',
    },
    aiAssistantBtn: 'AI Խորհրդատու',
    subBar: {
      officialSources: 'Ստուգված պաշտոնական աղբյուրներ',
      savedCount: 'Պահպանված',
      compareCount: 'Համեմատվող',
    },
    hero: {
      kicker: 'ՀՀ Բարձրագույն կրթության միասնական թվային ուղեցույց',
      title: 'Համեմատեք ՀՀ բոլոր բուհերի ծրագրերը, վարձավճարները և քննական պահանջները մեկ հարթակում',
      subtitle:
        'Ստուգելի փաստեր ՀՀ պետական, մասնավոր և միջազգային բուհերի պաշտոնական կայքերից՝ Trust Lens ապացույցի հղումներով, Fit Score գնահատմամբ և եռալեզու AI որոնմամբ։',
      searchPlaceholder: 'Օրինակ՝ «Ուզում եմ ԻՏ բակալավրիատ Երևանում, հայերենով, տարեկան մինչև 1 մլն դրամ»',
      smartAiBtn: 'AI Որոնում',
      aiParsing: 'Վերլուծվում է...',
      quickExamplesLabel: 'Փորձեք հարցումը.',
      examples: [
        'ԻՏ բակալավրիատ Երևանում, հայերենով, մինչև 1 մլն դրամ',
        'Ագրարային կամ ճարտարապետական ծրագրեր ՀԱԱՀ-ում կամ ՃՇՀԱՀ-ում',
        'Կրթական ծրագրեր Գյումրիում, Վանաձորում, Կապանում կամ Իջևանում',
      ],
      parsedLabel: 'AI-ն առանձնացրեց պարամետրերը.',
      clearFilters: 'Մաքրել ֆիլտրերը',
    },
    filters: {
      title: 'Արագ և ընդլայնված ֆիլտրեր',
      university: 'ԲՈՒՀ',
      allUniversities: 'Բոլոր բուհերը',
      city: 'Քաղաք',
      allCities: 'Բոլոր քաղաքները',
      yerevan: 'Երևան',
      gyumri: 'Գյումրի',
      vanadzor: 'Վանաձոր',
      gavar: 'Գավառ',
      goris: 'Գորիս',
      kapan: 'Կապան',
      ijevan: 'Իջևան',
      degree: 'Կրթական աստիճան',
      allDegrees: 'Բոլոր աստիճանները',
      bachelor: 'Բակալավրիատ',
      master: 'Մագիստրատուրա',
      phd: 'Ասպիրանտուրա',
      language: 'Ուսուցման լեզու',
      allLanguages: 'Բոլոր լեզուները',
      hy: 'Հայերեն',
      en: 'Անգլերեն',
      ru: 'Ռուսերեն',
      fr: 'Ֆրանսերեն / Հայերեն',
      field: 'Ոլորտ',
      allFields: 'Բոլոր ոլորտները',
      maxTuition: 'Տարեկան առավելագույն վարձ (ՀՀ դրամ)',
      scholarshipOnly: 'Միայն կրթաթոշակի / պետպատվերի հնարավորությամբ',
      resultsCount: 'Գտնվել է ծրագիր',
      sortBy: 'Դասավորել.',
      sortFit: 'Ըստ Fit Score-ի',
      sortTuitionAsc: 'Վարձը՝ աճման կարգով',
      sortTuitionDesc: 'Վարձը՝ նվազման կարգով',
      noResults: 'Ընտրված պարամետրերով կրթական ծրագրեր չեն գտնվել։ Փորձեք ընդլայնել բյուջեն կամ մաքրել ֆիլտրերը։',
    },
    fields: {
      it: 'Տեղեկատվական տեխնոլոգիաներ',
      engineering: 'Ճարտարագիտություն և ճարտարապետություն',
      economics: 'Տնտեսագիտություն և բիզնես',
      medicine: 'Բժշկություն և սպորտ',
      law: 'Իրավագիտություն և կառավարում',
      humanities: 'Հումանիտար և մանկավարժություն',
      sciences: 'Բնական գիտություններ',
      agriculture: 'Ագրարային գիտություններ և գինեգործություն',
      arts: 'Արվեստ, երաժշտություն և կինո',
    },
    program: {
      fitScore: 'Fit Score',
      annualTuition: 'Տարեկան վարձ',
      amdPerYear: 'դրամ / տարի',
      duration: 'Տևողություն',
      years: 'տարի',
      language: 'Լեզու',
      deadline: 'Դիմելու վերջնաժամ',
      scholarshipYes: 'Կրթաթոշակ / զեղչ առկա է',
      scholarshipNo: 'Միայն վճարովի',
      unpublished: 'Այս տեղեկատվությունը բուհը չի հրապարակել',
      compare: 'Համեմատել',
      compared: 'Ընտրված է',
      save: 'Պահպանել',
      saved: 'Պահպանված է',
      details: 'Մանրամասներ',
      trustLens: 'Trust Lens',
      examsTitle: 'Ընդունելության քննություններ և անցողիկ շեմեր',
      documentsTitle: 'Պահանջվող փաստաթղթեր',
      curriculumTitle: 'Ուսումնական պլանի ամփոփագիր',
      mobilityTitle: 'Պրակտիկա և միջազգային փոխանակում',
      minScore: 'Անցողիկ նվազագույն շեմ.',
    },
    compare: {
      trayTitle: 'Ծրագրերի համեմատում (2–4 ծրագիր)',
      openMatrix: 'Բացել համեմատման աղյուսակը',
      clear: 'Մաքրել',
      minTwoNotice: 'Ընտրեք առնվազն 2 ծրագիր համեմատելու համար',
      maxFourNotice: 'Կարող եք համեմատել առավելագույնը 4 ծրագիր',
      modalTitle: 'Կրթական ծրագրերի զուգահեռ համեմատություն',
      rowUniversity: 'Համալսարան և տեղակայում',
      rowTuition: 'Տարեկան վարձ, զեղչեր և կրթաթոշակ',
      rowDuration: 'Տևողություն և որակավորում',
      rowLanguage: 'Ուսուցման լեզու',
      rowExams: 'Քննություններ և նվազագույն շեմ',
      rowDocuments: 'Պահանջվող փաստաթղթեր',
      rowDeadline: 'Դիմելու վերջնաժամ',
      rowMobility: 'Պրակտիկա և միջազգային փոխանակում',
      close: 'Փակել',
    },
    trustLens: {
      title: 'Trust Lens — Ապացույցի ոսպնյակ',
      subtitle: 'Պաշտոնական սկզբնաղբյուրի և փաստի վավերացման պատուհան',
      officialUrl: 'ԲՈՒՀ-ի պաշտոնական կայքի URL',
      pageTitle: 'Աղբյուրի էջի վերնագիր',
      exactSnippet: 'Բնօրինակ մեջբերում (Exact Snippet)',
      collectedAt: 'Հավաքագրման ամսաթիվ',
      verifiedAt: 'Վերջին ստուգման ամսաթիվ',
      contentHash: 'Տեքստի հեշ (Content Hash)',
      notPublishedBanner: 'Այս տեղեկատվությունը բուհը չի հրապարակել։ Համակարգը բացառում է ենթադրությունները և արհեստական թվերի հորինումը։',
      openOriginal: 'Բացել պաշտոնական էջը',
      close: 'Փակել',
    },
    programsPage: {
      title: 'ՀՀ բոլոր բուհերը, կրթական ծրագրերը և շարժունությունը',
      subtitle: 'Հավատարմագրված պետական, մասնավոր, միջազգային և մարզային բուհերի ամբողջական կատալոգը և փոխանակման ծրագրերը։',
      tabUniversities: 'ՀՀ բուհեր (Կատալոգ)',
      tabPrograms: 'Կրթական ծրագրեր',
      tabMobility: 'Միջազգային շարժունություն',
      uniTypeState: 'Պետական բուհ',
      uniTypePrivate: 'Մասնավոր բուհ',
      uniTypeIntl: 'Միջազգային / Միջպետական',
      allTypes: 'Բոլոր տեսակները',
      founded: 'Հիմնադրված է',
      students: 'Ուսանողներ',
      faculties: 'Ֆակուլտետներ և ինստիտուտներ',
      programsCount: 'ծրագիր',
      visitWebsite: 'Պաշտոնական կայք',
      viewUniDetails: 'Բուհի էջ և ծրագրեր',
      hostCountry: 'Ընդունող երկիր',
      fundingFull: 'Լրիվ ֆինանսավորում',
      fundingPartial: 'Մասնակի ֆինանսավորում',
      eligibility: 'Մասնակցության պահանջներ',
      partnerUnis: 'Գործընկեր ՀՀ բուհեր',
    },
    communityPage: {
      title: 'Ակադեմիական համայնք և կարիերա',
      subtitle: 'Ուսանողական միջոցառումների միասնական լրահոս և EURAXESS մոդելով կառուցված դասախոսական/գիտական թափուր հաստիքների շտեմարան։',
      tabNews: 'Ուսանողական նորություններ և միջոցառումներ',
      tabJobs: 'Ակադեմիական կարիերա (Թափուր հաստիքներ)',
      filterByUni: 'Ֆիլտրել ըստ ԲՈՒՀ-ի',
      filterByCategory: 'Միջոցառման տեսակ',
      allCategories: 'Բոլորը',
      catConference: 'Գիտաժողով',
      catOlympiad: 'Օլիմպիադա',
      catHackathon: 'Հաքաթոն',
      catOpenDay: 'Բաց դռների օր',
      catAdmissions: 'Ընդունելություն',
      jobDegreeReq: 'Գիտական աստիճանի պահանջ',
      jobMaster: 'Մագիստրոս',
      jobPhd: 'Գիտությունների թեկնածու (PhD)',
      jobDoctor: 'Գիտությունների դոկտոր',
      jobEmployment: 'Զբաղվածություն',
      jobFullTime: 'Լրիվ դրույք',
      jobPartTime: 'Համատեղությամբ',
      applyOnline: 'Դիմել առցանց',
      applied: 'Դիմումը ուղարկված է',
      subscribeAlerts: 'Բաժանորդագրվել նոր հաստիքների ծանուցումներին',
      subscribedAlerts: 'Բաժանորդագրված եք ծանուցումներին',
      submitApplication: 'Ուղարկել մրցութային հայտը',
      applicantName: 'Անուն Ազգանուն',
      applicantEmail: 'Էլեկտրոնային հասցե',
      coverNote: 'Ուղեկցող նամակ / գիտական փորձի համառոտ նկարագրություն',
      applicationSuccess: 'Ձեր հայտը գրանցված է և փոխանցվել է բուհի մրցութային հանձնաժողովին։',
    },
    dashboardPage: {
      title: 'Անձնական աշխատասենյակ և Fit Score կարգավորումներ',
      subtitle: 'Կառավարեք ձեր ակադեմիական պրոֆիլը, պահպանված ծրագրերը, վերջնաժամկետների օրացույցը և «Ի՞նչ է փոխվել» ծանուցումները։',
      roleTitle: 'Օգտատիրոջ կարգավիճակ (Դեր)',
      roles: {
        applicant: 'Դիմորդ / Ուսանող',
        international: 'Միջազգային ուսանող',
        parent: 'Ծնող / Խորհրդատու',
        lecturer: 'Դասախոս / Գիտաշխատող',
      },
      authNote: 'Մուտքագրված է որպես՝',
      profileTitle: 'Անձնական պրոֆիլ (Fit Score հաշվարկ)',
      budgetLabel: 'Տարեկան առավելագույն բյուջե (ՀՀ դրամ)',
      gpaLabel: 'ՄՈԳ / Ավարտական միջին գնահատական (0–20)',
      englishLabel: 'Անգլերենի մակարդակ',
      preferredField: 'Նախընտրած մասնագիտական ոլորտ',
      preferredLang: 'Նախընտրած ուսուցման լեզու',
      preferredCity: 'Նախընտրած քաղաք',
      preferredDegree: 'Կրթական աստիճան',
      saveProfile: 'Պահպանել և վերահաշվարկել Fit Score-ը',
      profileSavedToast: 'Պրոֆիլը թարմացվեց․ Fit Score ցուցիչները վերահաշվարկված են։',
      savedProgramsTitle: 'Պահպանված կրթական ծրագրեր',
      savedMobilityTitle: 'Պահպանված միջազգային փոխանակումներ',
      savedJobsTitle: 'Պահպանված թափուր հաստիքներ',
      calendarTitle: 'Վերջնաժամկետների անձնական օրացույց',
      daysLeft: 'օր է մնացել',
      changesTitle: '«Ի՞նչ է փոխվել» (Change Detection)',
      changesSubtitle: 'Crawler-ի կողմից արձանագրված վերջին փոփոխությունները բուհերի պաշտոնական կայքերում',
      oldLabel: 'Նախկինը.',
      newLabel: 'Նորը.',
      markRead: 'Նշել կարդացված',
      emptySaved: 'Դեռևս պահպանված տարրեր չկան։ Պահպանեք ծրագրեր որոնման էջից։',
    },
    aboutPage: {
      title: 'Մեր մասին, մեթոդաբանություն և կապ',
      subtitle: '«Ապացույցը՝ նախքան խորհուրդը» սկզբունքով կառուցված ՀՀ բարձրագույն կրթության թվային էկոհամակարգ։',
      missionTitle: 'Առաքելություն և գիտական հիմքեր',
      missionBody:
        'Հարթակը նախագծվել է «ՀՀ կրթության՝ մինչև 2030 թ. զարգացման պետական ծրագրի», DeLone & McLean տեղեկատվական համակարգերի հաջողության մոդելի և եվրոպական UCAS ու EURAXESS ստանդարտների համադրությամբ՝ վերացնելով բուհական տեղեկատվության մասնատվածությունը։',
      pillarsTitle: 'Համակարգի 3 հիմնասյուները',
      howItWorksTitle: 'Ինչպե՞ս են աշխատում Trust Lens-ը և RAG AI-ն',
      step1Title: '01. Պաշտոնական կայքերի ավտոմատ սկանավորում և Hashing',
      step1Body: 'Crawler ծառայությունը շաբաթական առնվազն 2 անգամ (իսկ ընդունելության շրջանում՝ ամեն օր) ստուգում է ՀՀ բոլոր բուհերի պաշտոնական էջերը և ֆիքսում ցանկացած փոփոխություն։',
      step2Title: '02. Խիստ սխեմատիկ վավերացում (Zero-Hallucination Policy)',
      step2Body: 'Բացակայող տվյալների դեպքում AI-ն վերադարձնում է null՝ երբեք չհորինելով վարձավճար կամ վերջնաժամ։ Օգտատերը տեսնում է բացահայտ նշում։',
      step3Title: '03. Trust Lens հղում և RAG պատասխաններ',
      step3Body: 'Յուրաքանչյուր թիվ և պահանջ կապված է բնօրինակ URL-ի, մեջբերման և ստուգման ամսաթվի հետ։',
      partnersTitle: 'Համակարգում ընդգրկված ԲՈՒՀ-եր',
      contactTitle: 'Կապ մեզ հետ',
      contactSubtitle: 'Ունե՞ք հարցեր դիմելու ընթացակարգի, տեխնիկական աջակցության կամ համագործակցության վերաբերյալ։ Կապվեք մեր թիմի հետ։',
      contactAddressLabel: 'Հասցե',
      contactAddressValue: 'Մարշալ Բաղրամյան պող. 24, Երևան 0019, ՀՀ',
      contactPhoneLabel: 'Հեռախոսահամար',
      contactEmailLabel: 'Էլ. փոստ',
      contactHoursLabel: 'Աշխատանքային ժամեր',
      contactHoursValue: 'Երկուշաբթի – Ուրբաթ, 09:00 – 18:00',
      contactNameLabel: 'Անուն Ազգանուն',
      contactSubjectLabel: 'Թեմա',
      contactMsgLabel: 'Ձեր հաղորդագրությունը',
      contactSendBtn: 'Ուղարկել նամակը',
      contactSuccess: 'Շնորհակալություն․ ձեր հաղորդագրությունը ստացվել է։ Մեր թիմը կպատասխանի 1 աշխատանքային օրվա ընթացքում։',
      reportTitle: 'Տվյալների ճշգրտում և բուհերի գործընկերություն',
      reportSubtitle: 'Նկատե՞լ եք անճշտություն կամ ցանկանո՞ւմ եք միանալ որպես գործընկեր բուհ։',
      reportTypeIssue: 'Հաղորդել տվյալի անճշտության մասին',
      reportTypePartner: 'Գործընկերության հայտ (ԲՈՒՀ-ի համար)',
      reportUniLabel: 'Ուսումնական հաստատություն',
      reportMessageLabel: 'Նկարագրություն կամ պաշտոնական էջի հղում',
      reportEmailLabel: 'Ձեր էլ. փոստը',
      reportSubmit: 'Ուղարկել հաղորդումը',
      reportSuccess: 'Շնորհակալություն․ ձեր հաղորդումը գրանցված է վավերացման հերթում։',
    },
    assistant: {
      title: 'Եռալեզու AI Խորհրդատու (RAG)',
      subtitle: 'Պատասխանները գեներացվում են բացառապես ՀՀ բուհերի ստուգված աղբյուրների հիման վրա',
      placeholder: 'Հարցրեք վարձերի, քննությունների, բուհերի մասին...',
      send: 'Ուղարկել',
      thinking: 'Ստուգում եմ պաշտոնական բազան...',
      welcome:
        'Բարև ձեզ։ Ես ՀՀ ԲՈՒՀ Պորտալի AI խորհրդատուն եմ։ Կարող եք հարցնել ԵՊՀ, ՀԱՀ, ՀԱՊՀ, ԵՊԲՀ, ՀՊՏՀ, ՀԱԱՀ, ԽՊՄՀ, ԲՊՀ, ՃՇՀԱՀ, ՀՌՀ, ՀՖՀՀ և մարզային բուհերի ծրագրերի, վարձավճարների ու քննությունների մասին։',
      prompts: [
        'Ո՞ր բուհում է ԻՏ բակալավրիատն ամենամատչելին Երևանում',
        'Ի՞նչ մասնագիտություններ կան ՀԱԱՀ-ում (Ագրարային համալսարան)',
        'Ի՞նչ ծրագրեր կան Գյումրիում, Վանաձորում, Կապանում կամ Գավառում',
      ],
      sourcesLabel: 'Հիմնված է աղբյուրների վրա.',
    },
    footer: {
      tagline: 'ՀՀ համալսարանների միասնական թվային ուղեցույց-պորտալ · Ստուգելի փաստերի էկոհամակարգ',
      copyright: '© 2026–2027 ՀՀ ԲՈՒՀ Պորտալ',
      basedOn: 'Տեխնիկական առաջադրանք v1.0 · Հիմնված է UCAS, EURAXESS և DeLone & McLean մոդելների վրա',
    },
  },
  en: {
    brandName: 'Armenia UniPortal',
    nav: {
      home: 'Home',
      programs: 'Programs',
      community: 'Community',
      dashboard: 'Dashboard',
      about: 'About & Contact',
    },
    aiAssistantBtn: 'AI Advisor',
    subBar: {
      officialSources: 'Verified official sources',
      savedCount: 'Saved',
      compareCount: 'Compare',
    },
    hero: {
      kicker: 'Armenian Higher Education Unified Digital Portal',
      title: 'Compare all Armenian university programs, tuition, and admissions in one verified place',
      subtitle:
        'Fact-checked data across state, private, international, and regional Armenian universities with Trust Lens citations, Fit Score matching, and trilingual AI search.',
      searchPlaceholder: 'Try: "IT bachelor in Yerevan, taught in Armenian, under 1M AMD per year"',
      smartAiBtn: 'AI Smart Search',
      aiParsing: 'Analyzing...',
      quickExamplesLabel: 'Try a query:',
      examples: [
        'IT bachelor in Yerevan in Armenian under 1,000,000 AMD',
        'Agriculture, winemaking, or architecture at ANAU or NUACA',
        'University programs in Gyumri, Vanadzor, Kapan, or Ijevan',
      ],
      parsedLabel: 'AI extracted search parameters:',
      clearFilters: 'Reset filters',
    },
    filters: {
      title: 'Quick & Advanced Filters',
      university: 'University',
      allUniversities: 'All Universities',
      city: 'City',
      allCities: 'All Cities',
      yerevan: 'Yerevan',
      gyumri: 'Gyumri',
      vanadzor: 'Vanadzor',
      gavar: 'Gavar',
      goris: 'Goris',
      kapan: 'Kapan',
      ijevan: 'Ijevan',
      degree: 'Degree Level',
      allDegrees: 'All Degrees',
      bachelor: 'Bachelor',
      master: 'Master',
      phd: 'PhD / Doctoral',
      language: 'Language',
      allLanguages: 'All Languages',
      hy: 'Armenian',
      en: 'English',
      ru: 'Russian',
      fr: 'French / Armenian',
      field: 'Academic Field',
      allFields: 'All Fields',
      maxTuition: 'Max Annual Tuition (AMD)',
      scholarshipOnly: 'Scholarships or state-funded seats only',
      resultsCount: 'Programs found',
      sortBy: 'Sort by:',
      sortFit: 'Best Fit Score',
      sortTuitionAsc: 'Tuition: Low to High',
      sortTuitionDesc: 'Tuition: High to Low',
      noResults: 'No programs match your current criteria. Try increasing the budget limit or resetting filters.',
    },
    fields: {
      it: 'Information Technology',
      engineering: 'Engineering & Architecture',
      economics: 'Economics & Business',
      medicine: 'Medicine & Sports',
      law: 'Law & Public Governance',
      humanities: 'Humanities & Pedagogy',
      sciences: 'Natural Sciences',
      agriculture: 'Agrarian Sciences & Enology',
      arts: 'Arts, Music & Cinema',
    },
    program: {
      fitScore: 'Fit Score',
      annualTuition: 'Annual Tuition',
      amdPerYear: 'AMD / yr',
      duration: 'Duration',
      years: 'yrs',
      language: 'Language',
      deadline: 'Application Deadline',
      scholarshipYes: 'Scholarships / waivers available',
      scholarshipNo: 'Tuition-only track',
      unpublished: 'Not published by the university',
      compare: 'Compare',
      compared: 'Selected',
      save: 'Save',
      saved: 'Saved',
      details: 'Program Profile',
      trustLens: 'Trust Lens',
      examsTitle: 'Entrance Exams & Passing Thresholds',
      documentsTitle: 'Required Documents',
      curriculumTitle: 'Curriculum Overview',
      mobilityTitle: 'Internships & International Exchange',
      minScore: 'Min passing score:',
    },
    compare: {
      trayTitle: 'Compare Programs (2–4 programs)',
      openMatrix: 'Open Comparison Table',
      clear: 'Clear',
      minTwoNotice: 'Select at least 2 programs to compare side-by-side',
      maxFourNotice: 'You can compare up to 4 programs simultaneously',
      modalTitle: 'Side-by-Side Academic Comparison',
      rowUniversity: 'University & Location',
      rowTuition: 'Annual Tuition, Waivers & Scholarships',
      rowDuration: 'Duration & Qualification',
      rowLanguage: 'Language of Instruction',
      rowExams: 'Admissions Exams & Min Scores',
      rowDocuments: 'Required Documents',
      rowDeadline: 'Application Deadline',
      rowMobility: 'Internships & Exchange Opportunities',
      close: 'Close',
    },
    trustLens: {
      title: 'Trust Lens — Evidence Verifier',
      subtitle: 'Official institutional source & audit trail for this data point',
      officialUrl: 'Official University URL',
      pageTitle: 'Source Page Title',
      exactSnippet: 'Exact Original Snippet',
      collectedAt: 'Collected On',
      verifiedAt: 'Last Verified On',
      contentHash: 'Content Hash',
      notPublishedBanner: 'This information has not been published by the university. The portal strictly prohibits guessing or fabricating missing figures.',
      openOriginal: 'Open Official Source',
      close: 'Close',
    },
    programsPage: {
      title: 'All Armenian Universities, Programs & Mobility',
      subtitle: 'Complete catalog of accredited state, private, international, and regional Armenian universities plus international exchange opportunities.',
      tabUniversities: 'Universities Directory',
      tabPrograms: 'Programs Catalog',
      tabMobility: 'Exchange & Mobility',
      uniTypeState: 'State University',
      uniTypePrivate: 'Private University',
      uniTypeIntl: 'International / Intergovernmental',
      allTypes: 'All Types',
      founded: 'Founded',
      students: 'Students',
      faculties: 'Faculties & Institutes',
      programsCount: 'programs',
      visitWebsite: 'Official Website',
      viewUniDetails: 'University Profile',
      hostCountry: 'Host Country',
      fundingFull: 'Full Funding',
      fundingPartial: 'Partial Funding',
      eligibility: 'Eligibility Criteria',
      partnerUnis: 'Partner Armenian Universities',
    },
    communityPage: {
      title: 'Academic Community & Career Board',
      subtitle: 'Unified student events feed and EURAXESS-modeled faculty & research job board across Armenian universities.',
      tabNews: 'Student News & Events',
      tabJobs: 'Academic Career Board',
      filterByUni: 'Filter by University',
      filterByCategory: 'Event Category',
      allCategories: 'All Categories',
      catConference: 'Conference',
      catOlympiad: 'Olympiad',
      catHackathon: 'Hackathon',
      catOpenDay: 'Open Day',
      catAdmissions: 'Admissions',
      jobDegreeReq: 'Required Degree',
      jobMaster: 'Master’s Degree',
      jobPhd: 'PhD / Candidate',
      jobDoctor: 'Doctor of Sciences',
      jobEmployment: 'Employment Type',
      jobFullTime: 'Full-Time',
      jobPartTime: 'Part-Time',
      applyOnline: 'Apply Online',
      applied: 'Applied',
      subscribeAlerts: 'Subscribe to New Vacancy Alerts',
      subscribedAlerts: 'Subscribed to Vacancy Alerts',
      submitApplication: 'Submit Academic Application',
      applicantName: 'Full Name',
      applicantEmail: 'Email Address',
      coverNote: 'Cover Note / Research & Teaching Summary',
      applicationSuccess: 'Your application has been recorded and forwarded to the university selection committee.',
    },
    dashboardPage: {
      title: 'Personal Workspace & Fit Score Settings',
      subtitle: 'Manage your academic role, Fit Score criteria, saved lists, personal deadlines calendar, and tracked website change alerts.',
      roleTitle: 'User Role',
      roles: {
        applicant: 'Applicant / Student',
        international: 'International Student',
        parent: 'Parent / Counselor',
        lecturer: 'Lecturer / Researcher',
      },
      authNote: 'Signed in as:',
      profileTitle: 'Personal Profile (Fit Score Engine)',
      budgetLabel: 'Max Annual Budget (AMD)',
      gpaLabel: 'GPA / Average Grade (0–20)',
      englishLabel: 'English Proficiency',
      preferredField: 'Preferred Field',
      preferredLang: 'Preferred Language',
      preferredCity: 'Preferred City',
      preferredDegree: 'Target Degree',
      saveProfile: 'Save & Recalculate Fit Scores',
      profileSavedToast: 'Profile saved. Fit Scores recalculated across all programs.',
      savedProgramsTitle: 'Saved Educational Programs',
      savedMobilityTitle: 'Saved Exchange Programs',
      savedJobsTitle: 'Saved Academic Vacancies',
      calendarTitle: 'Personal Deadlines Calendar',
      daysLeft: 'days left',
      changesTitle: 'What Changed? (Change Detection)',
      changesSubtitle: 'Recent official updates detected by our automated university crawler',
      oldLabel: 'Previous:',
      newLabel: 'Updated:',
      markRead: 'Mark as read',
      emptySaved: 'No saved items yet. Save programs or vacancies from the catalog.',
    },
    aboutPage: {
      title: 'About, Methodology & Contact Us',
      subtitle: 'A trust-first digital ecosystem for Armenian higher education built on the "Proof Before Advice" principle.',
      missionTitle: 'Mission & Scientific Foundation',
      missionBody:
        'Aligned with Armenia’s Education Development Strategy to 2030, the DeLone & McLean Information Systems Success Model, and international UCAS and EURAXESS standards to eliminate information fragmentation.',
      pillarsTitle: '3 Pillars of System Quality',
      howItWorksTitle: 'How Trust Lens & RAG AI Work',
      step1Title: '01. Automated Crawling & Content Hashing',
      step1Body: 'Our crawler checks official university websites at least twice weekly (daily during May–August admissions) to detect tuition, exam, or deadline updates.',
      step2Title: '02. Strict Schema Validation (Zero-Hallucination)',
      step2Body: 'Unpublished values remain strictly null—AI never invents tuition fees or passing scores and explicitly discloses missing official disclosures.',
      step3Title: '03. Trust Lens Citations & RAG Grounding',
      step3Body: 'Every verified number links back to its exact official URL, quoted source snippet, and timestamped audit hash.',
      partnersTitle: 'Covered Armenian Universities',
      contactTitle: 'Contact Us',
      contactSubtitle: 'Have questions about admissions data, technical support, or institutional collaboration? Reach out to our team directly.',
      contactAddressLabel: 'Address',
      contactAddressValue: '24 Marshal Baghramyan Ave, Yerevan 0019, Armenia',
      contactPhoneLabel: 'Phone',
      contactEmailLabel: 'Email',
      contactHoursLabel: 'Office Hours',
      contactHoursValue: 'Monday – Friday, 09:00 – 18:00 (AMT)',
      contactNameLabel: 'Full Name',
      contactSubjectLabel: 'Subject',
      contactMsgLabel: 'Message',
      contactSendBtn: 'Send Message',
      contactSuccess: 'Thank you! Your message has been received. Our team will respond within 1 business day.',
      reportTitle: 'Report an Issue or University Partnership',
      reportSubtitle: 'Spotted an outdated fee or want to connect an institutional admin feed?',
      reportTypeIssue: 'Report a Data Discrepancy',
      reportTypePartner: 'University Partnership Request',
      reportUniLabel: 'University',
      reportMessageLabel: 'Details or Official Source URL',
      reportEmailLabel: 'Your Email',
      reportSubmit: 'Submit Report',
      reportSuccess: 'Thank you. Your submission has been queued for Trust Lens verification.',
    },
    assistant: {
      title: 'Trilingual AI Advisor (RAG)',
      subtitle: 'Responses are strictly grounded in verified Armenian university records',
      placeholder: 'Ask about tuition, entrance exams, or scholarships...',
      send: 'Send',
      thinking: 'Querying verified sources...',
      welcome:
        'Hello! I am the Armenia UniPortal AI Advisor. Ask me about YSU, AUA, NPUA, YSMU, ASUE, ANAU, ASPU, NUACA, BSU, RAU, UFAR, or regional university programs, tuition fees, and exams.',
      prompts: [
        'Which IT bachelor program in Yerevan is most affordable?',
        'What programs does ANAU (Agrarian University) offer?',
        'What universities operate in Gyumri, Vanadzor, Kapan, or Gavar?',
      ],
      sourcesLabel: 'Grounded in sources:',
    },
    footer: {
      tagline: 'Armenian Higher Education Unified Digital Portal · Trust-First Academic Ecosystem',
      copyright: '© 2026–2027 Armenia UniPortal',
      basedOn: 'Technical Specification v1.0 · Modeled on UCAS, EURAXESS & DeLone & McLean',
    },
  },
  ru: {
    brandName: 'Портал ВУЗов РА',
    nav: {
      home: 'Главная',
      programs: 'Программы',
      community: 'Сообщество',
      dashboard: 'Кабинет',
      about: 'О нас и контакты',
    },
    aiAssistantBtn: 'AI Консультант',
    subBar: {
      officialSources: 'Проверенные официальные источники',
      savedCount: 'Сохранено',
      compareCount: 'Сравнение',
    },
    hero: {
      kicker: 'Единый цифровой навигатор вузов Республики Армения',
      title: 'Сравнивайте программы, стоимость и требования всех вузов Армении на одной платформе',
      subtitle:
        'Проверяемые факты с официальных сайтов государственных, частных, международных и региональных вузов РА с механизмом Trust Lens, оценкой Fit Score и AI-поиском.',
      searchPlaceholder: 'Например: «Бакалавриат по ИТ в Ереване, на армянском, до 1 млн драмов в год»',
      smartAiBtn: 'AI Поиск',
      aiParsing: 'Анализ...',
      quickExamplesLabel: 'Примеры запросов:',
      examples: [
        'ИТ бакалавриат в Ереване, на армянском, до 1 млн драмов',
        'Аграрные науки, виноделие или архитектура в НАУА и НУАСА',
        'Программы обучения в Гюмри, Ванадзоре, Капане или Иджеване',
      ],
      parsedLabel: 'AI распознал параметры запроса:',
      clearFilters: 'Сбросить фильтры',
    },
    filters: {
      title: 'Быстрые и расширенные фильтры',
      university: 'ВУЗ',
      allUniversities: 'Все вузы',
      city: 'Город',
      allCities: 'Все города',
      yerevan: 'Ереван',
      gyumri: 'Гюмри',
      vanadzor: 'Ванадзор',
      gavar: 'Гавар',
      goris: 'Горис',
      kapan: 'Капан',
      ijevan: 'Иджеван',
      degree: 'Степень',
      allDegrees: 'Все степени',
      bachelor: 'Бакалавриат',
      master: 'Магистратура',
      phd: 'Аспирантура (PhD)',
      language: 'Язык обучения',
      allLanguages: 'Все языки',
      hy: 'Армянский',
      en: 'Английский',
      ru: 'Русский',
      fr: 'Французский / Армянский',
      field: 'Направление',
      allFields: 'Все направления',
      maxTuition: 'Макс. годовая плата (AMD)',
      scholarshipOnly: 'Только с наличием грантов / стипендий',
      resultsCount: 'Найдено программ',
      sortBy: 'Сортировка:',
      sortFit: 'По Fit Score',
      sortTuitionAsc: 'Цена: по возрастанию',
      sortTuitionDesc: 'Цена: по убыванию',
      noResults: 'Программы по заданным параметрам не найдены. Попробуйте увеличить бюджет или сбросить фильтры.',
    },
    fields: {
      it: 'Информационные технологии',
      engineering: 'Инженерия и архитектура',
      economics: 'Экономика и бизнес',
      medicine: 'Медицина и спорт',
      law: 'Юриспруденция и управление',
      humanities: 'Гуманитарные и педагогика',
      sciences: 'Естественные науки',
      agriculture: 'Аграрные науки и виноделие',
      arts: 'Искусство, музыка и кино',
    },
    program: {
      fitScore: 'Fit Score',
      annualTuition: 'Стоимость в год',
      amdPerYear: 'AMD / год',
      duration: 'Длительность',
      years: 'г./лет',
      language: 'Язык',
      deadline: 'Крайний срок',
      scholarshipYes: 'Есть гранты / скидки',
      scholarshipNo: 'Только платное обучение',
      unpublished: 'Вуз не опубликовал данную информацию',
      compare: 'Сравнить',
      compared: 'Выбрано',
      save: 'Сохранить',
      saved: 'Сохранено',
      details: 'Подробнее',
      trustLens: 'Trust Lens',
      examsTitle: 'Вступительные экзамены и проходные баллы',
      documentsTitle: 'Необходимые документы',
      curriculumTitle: 'Краткий учебный план',
      mobilityTitle: 'Стажировки и международный обмен',
      minScore: 'Проходной минимум:',
    },
    compare: {
      trayTitle: 'Сравнение программ (2–4 программы)',
      openMatrix: 'Открыть таблицу сравнения',
      clear: 'Очистить',
      minTwoNotice: 'Выберите минимум 2 программы для сравнения',
      maxFourNotice: 'Можно сравнить не более 4 программ одновременно',
      modalTitle: 'Параллельное сравнение образовательных программ',
      rowUniversity: 'Университет и город',
      rowTuition: 'Годовая плата, скидки и стипендии',
      rowDuration: 'Срок обучения и квалификация',
      rowLanguage: 'Язык обучения',
      rowExams: 'Экзамены и минимальный балл',
      rowDocuments: 'Требуемые документы',
      rowDeadline: 'Крайний срок подачи',
      rowMobility: 'Стажировки и программы обмена',
      close: 'Закрыть',
    },
    trustLens: {
      title: 'Trust Lens — Линза доказательств',
      subtitle: 'Официальный первоисточник и история проверки данных',
      officialUrl: 'Официальный URL сайта вуза',
      pageTitle: 'Заголовок страницы-источника',
      exactSnippet: 'Оригинальная цитата (Exact Snippet)',
      collectedAt: 'Дата сбора',
      verifiedAt: 'Дата последней проверки',
      contentHash: 'Хэш контента',
      notPublishedBanner: 'Данная информация не опубликована университетом. Система строго исключает домыслы и генерацию вымышленных цифр.',
      openOriginal: 'Открыть официальную страницу',
      close: 'Закрыть',
    },
    programsPage: {
      title: 'Все вузы Армении, программы и мобильность',
      subtitle: 'Полный каталог аккредитованных государственных, частных, международных и региональных вузов РА.',
      tabUniversities: 'Каталог ВУЗов',
      tabPrograms: 'Образовательные программы',
      tabMobility: 'Международный обмен',
      uniTypeState: 'Государственный вуз',
      uniTypePrivate: 'Частный вуз',
      uniTypeIntl: 'Международный / Межгосударственный',
      allTypes: 'Все типы',
      founded: 'Основан в',
      students: 'Студентов',
      faculties: 'Факультеты и институты',
      programsCount: 'программ',
      visitWebsite: 'Официальный сайт',
      viewUniDetails: 'Профиль вуза',
      hostCountry: 'Принимающая страна',
      fundingFull: 'Полное финансирование',
      fundingPartial: 'Частичное финансирование',
      eligibility: 'Требования к участникам',
      partnerUnis: 'Партнерские вузы РА',
    },
    communityPage: {
      title: 'Академическое сообщество и карьера',
      subtitle: 'Лента студенческих событий и единая база академических вакансий по модели EURAXESS.',
      tabNews: 'Студенческие новости и события',
      tabJobs: 'Академическая карьера (Вакансии)',
      filterByUni: 'Фильтр по ВУЗу',
      filterByCategory: 'Категория',
      allCategories: 'Все',
      catConference: 'Конференция',
      catOlympiad: 'Олимпиада',
      catHackathon: 'Хакатон',
      catOpenDay: 'День открытых дверей',
      catAdmissions: 'Приемная кампания',
      jobDegreeReq: 'Требуемая степень',
      jobMaster: 'Магистр',
      jobPhd: 'Кандидат наук (PhD)',
      jobDoctor: 'Доктор наук',
      jobEmployment: 'Занятость',
      jobFullTime: 'Полная ставка',
      jobPartTime: 'Совместительство',
      applyOnline: 'Подать заявку',
      applied: 'Заявка отправлена',
      subscribeAlerts: 'Подписаться на уведомления о вакансиях',
      subscribedAlerts: 'Вы подписаны на уведомления',
      submitApplication: 'Отправить конкурсную заявку',
      applicantName: 'ФИО',
      applicantEmail: 'Электронная почта',
      coverNote: 'Сопроводительное письмо / описание научного опыта',
      applicationSuccess: 'Ваша заявка зарегистрирована и передана конкурсной комиссии вуза.',
    },
    dashboardPage: {
      title: 'Личный кабинет и настройка Fit Score',
      subtitle: 'Управляйте академическим профилем, сохраненными программами, календарем дедлайнов и уведомлениями об изменениях.',
      roleTitle: 'Роль пользователя',
      roles: {
        applicant: 'Абитуриент / Студент',
        international: 'Иностранный студент',
        parent: 'Родитель / Консультант',
        lecturer: 'Преподаватель / Исследователь',
      },
      authNote: 'Вы вошли как:',
      profileTitle: 'Личный профиль (Расчет Fit Score)',
      budgetLabel: 'Макс. годовой бюджет (AMD)',
      gpaLabel: 'Средний балл / GPA (0–20)',
      englishLabel: 'Уровень английского',
      preferredField: 'Предпочитаемое направление',
      preferredLang: 'Язык обучения',
      preferredCity: 'Город',
      preferredDegree: 'Степень',
      saveProfile: 'Сохранить и пересчитать Fit Score',
      profileSavedToast: 'Профиль обновлен. Показатели Fit Score пересчитаны.',
      savedProgramsTitle: 'Сохраненные образовательные программы',
      savedMobilityTitle: 'Сохраненные программы обмена',
      savedJobsTitle: 'Сохраненные вакансии',
      calendarTitle: 'Персональный календарь дедлайнов',
      daysLeft: 'дн. осталось',
      changesTitle: 'Что изменилось? (Change Detection)',
      changesSubtitle: 'Последние изменения, зафиксированные краулером на сайтах вузов',
      oldLabel: 'Было:',
      newLabel: 'Стало:',
      markRead: 'Отметить прочитанным',
      emptySaved: 'Пока нет сохраненных позиций. Сохраните программы из каталога.',
    },
    aboutPage: {
      title: 'О проекте, методология и контакты',
      subtitle: 'Цифровая экосистема высшего образования Армении, построенная по принципу «Доказательство важнее совета».',
      missionTitle: 'Миссия и научная база',
      missionBody:
        'Платформа разработана в соответствии с государственной программой развития образования РА до 2030 года, моделью успеха ИС DeLone & McLean и международными стандартами UCAS и EURAXESS.',
      pillarsTitle: '3 опоры качества системы',
      howItWorksTitle: 'Как работают Trust Lens и RAG AI',
      step1Title: '01. Автоматический краулинг и хэширование контента',
      step1Body: 'Краулер проверяет официальные сайты вузов минимум 2 раза в неделю (и ежедневно в период приема) для выявления изменений.',
      step2Title: '02. Строгая валидация схемы (Без галлюцинаций)',
      step2Body: 'Отсутствующие данные строго остаются null — система никогда не выдумывает цены или сроки.',
      step3Title: '03. Ссылки Trust Lens и RAG-поиск',
      step3Body: 'Каждый факт привязан к прямому URL вуза, точной цитате и дате последней проверки.',
      partnersTitle: 'Вузы-участники в системе',
      contactTitle: 'Связаться с нами',
      contactSubtitle: 'Есть вопросы по поступлению, работе платформы или сотрудничеству? Напишите нашей команде напрямую.',
      contactAddressLabel: 'Адрес',
      contactAddressValue: 'пр. Маршала Баграмяна 24, Ереван 0019, Армения',
      contactPhoneLabel: 'Телефон',
      contactEmailLabel: 'Email',
      contactHoursLabel: 'Часы работы',
      contactHoursValue: 'Понедельник – Пятница, 09:00 – 18:00',
      contactNameLabel: 'ФИО',
      contactSubjectLabel: 'Тема',
      contactMsgLabel: 'Сообщение',
      contactSendBtn: 'Отправить сообщение',
      contactSuccess: 'Спасибо! Ваше сообщение получено. Наша команда ответит в течение 1 рабочего дня.',
      reportTitle: 'Корректировка данных и партнерство с вузами',
      reportSubtitle: 'Заметили неточность или хотите подключить ваш университет?',
      reportTypeIssue: 'Сообщить о неточности данных',
      reportTypePartner: 'Заявка на партнерство для ВУЗа',
      reportUniLabel: 'Учебное заведение',
      reportMessageLabel: 'Описание или официальная ссылка',
      reportEmailLabel: 'Ваш Email',
      reportSubmit: 'Отправить сообщение',
      reportSuccess: 'Спасибо! Ваше обращение добавлено в очередь проверки.',
    },
    assistant: {
      title: 'Трехъязычный AI Консультант (RAG)',
      subtitle: 'Ответы формируются строго на основе проверенных официальных источников вузов РА',
      placeholder: 'Спросите о стоимости, экзаменах или стипендиях...',
      send: 'Отправить',
      thinking: 'Проверяю официальную базу...',
      welcome:
        'Здравствуйте! Я AI-консультант Портала ВУЗов РА. Спрашивайте о программах всех вузов Армении (ЕГУ, AUA, НПУА, ЕГМУ, АГЭУ, НАУА, РАУ, UFAR и др.), стоимости и экзаменах.',
      prompts: [
        'Где в Ереване самый доступный бакалавриат по ИТ?',
        'Какие специальности есть в НАУА (Аграрном университете)?',
        'Какие вузы работают в Гюмри, Ванадзоре, Капане и Гаваре?',
      ],
      sourcesLabel: 'На основе источников:',
    },
    footer: {
      tagline: 'Единый цифровой портал вузов Армении · Экосистема проверяемых академических данных',
      copyright: '© 2026–2027 Портал ВУЗов РА',
      basedOn: 'Техническое задание v1.0 · На базе моделей UCAS, EURAXESS и DeLone & McLean',
    },
  },
};

export function formatAmd(amount: number | null, lang: Lang): string {
  if (amount === null) return I18N[lang].program.unpublished;
  const formatted = new Intl.NumberFormat('en-US').format(amount);
  const unit = lang === 'hy' ? 'ՀՀ դրամ' : 'AMD';
  return `${formatted} ${unit}`;
}
