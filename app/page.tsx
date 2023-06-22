import { HeroSection } from "./components/pages/home/hero-section";
import { HighlightedProjects } from "./components/pages/home/highlighted-projects";
import { KnownTechs } from "./components/pages/home/know-techs";
import { WorkExperience } from "./components/pages/home/work-experience";
import { fetchHygraphQuery } from "./components/utils/fetch-hygraph-query";
import { HomePageData } from "./types/page-info";


const getPageData = async (): Promise<HomePageData> => {
  const query = `
    query MyQuery {
      page(where: {slug: "home"}) {
        introduction {
          raw
        }
        kownTechs {
          iconSvg
          name
          startDate
        }
        profilePicture {
          url
        }
        socials {
          url
          iconSvg
        }
        technologies {
          name
          iconSvg
          startDate
        }
        highlightProjects {
          slug
          thumbnail {
            url
          }
          title
          shortDescription
          technologies {
            name
          }
        }
      }
      workExperiences {
        companyLogo {
          url
        }
        role
        companyName
        companyUrl
        startDate
        endDate
        description {
          raw
        }
        technologies {
          name
        }
      }
    }
  `

  return fetchHygraphQuery(
    query,
    60 * 60 * 24
  )
}

export default async function Home() {
  const { page: pageData, workExperiences } = await getPageData();


  return (
    <>
      <HeroSection homeInfo={pageData} />
      <KnownTechs techs={pageData.kownTechs} />
      <HighlightedProjects projects={pageData.highlightProjects} />
      <WorkExperience experiences={workExperiences}/>
    </>
  )
}
