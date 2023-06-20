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
        }
        technologies {
          name
        }
        socials {
          url
          iconSvg
        }
    }
  `

  return fetchHygraphQuery(
    query,
    
  )
}

export default async function Home() {
  const { page: pageData } = await getPageData()

  return (
    <>
      <HeroSection homeInfo={pageData} />
      <KnownTechs />
      <HighlightedProjects />
      <WorkExperience/>
    </>
  )
}
