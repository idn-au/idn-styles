export const externalLinks: ContentNavigationItem[] = [
    {
        title: "Catalogue",
        path: "https://data.idnau.org",
        stem: "2.catalogue",
        description: "",
        button: true,
    },
    {
        title: "About",
        path: "/about",
        stem: "3.about/1.index",
        description: "",
        children: [
            {
                title: "The Indigenous Data Network",
                path: "https://mspgh.unimelb.edu.au/centres-institutes/onemda/research-group/indigenous-studies-unit/indigenous-data-network",
                stem: "3.about/3.idn",
                description: "A national initiative that supports Aboriginal and Torres Strait Islander communities in leading the design, governance, and use of data that reflects their cultural values, priorities, and knowledge systems.",
            },
        ],
    },
    {
        title: "Tools",
        path: "/tools",
        stem: "5.tools/1.index",
        children: [
            {
                title: "IDN Catalogue Profile",
                path: "https://data.idnau.org/pid/cp",
                stem: "5.tools/2.idn-catalogue-profile",
                description: "Learn about the structure and standards underpinning the IDN Catalogue Profile, including how records are organised, described, and made discoverable within the Indigenous Data Network.",
            },
            {
                title: "Agent Database",
                path: "https://agentsdb.idnau.org",
                stem: "5.tools/3.agent-database",
                description: "Access and contribute to a directory of organisations, communities, and researchers involved in Indigenous data initiatives and collaborations.",
            },
            {
                title: "Metadata Entry Tool",
                path: "https://metadata.idnau.org/",
                stem: "5.tools/4.metadata-entry-tool",
                description: "Create metadata records to support the discoverability, governance, and reuse of Indigenous data in line with Indigenous Data Commons principles.",
            },
            {
                title: "Search portal",
                path: "https://data.idnau.org/search",
                stem: "5.tools/5.search-portal",
                description: "Explore datasets and records spatially through an interactive map interface.",
            },
        ],
    },
];
