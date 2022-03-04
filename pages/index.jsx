
import axios from 'axios';
import dynamic from 'next/dynamic';
import { API_URL } from '../libs/variables';
import Layout from '../components/Layouts';
import Hero from '../components/Hero';
import ActivitiesSkeleton from '../components/ActivitiesSkeleton';
import CitiesSkeleton from '../components/CitiesSkeleton';
import Advantages from '../components/Advantages';
import ActivitiesMap from "../components/ActivitiesMap"
import Contacts from '../components/Contacts';


const Activities = dynamic(
  () => import('../components/Activities'), 
  { ssr: false, loading: () => <ActivitiesSkeleton /> }
);

const Cities = dynamic(
  () => import('../components/Cities'), 
  { ssr: false, loading: () => <CitiesSkeleton /> }
);


export default function Home({ activities, cities }){
  return (
    <Layout>
      <Hero data={cities} />
      <Activities data={activities} />
      <Advantages />
      <Cities data={cities} showTitle={true} maxCities={5}/>
      <ActivitiesMap />
      <Contacts showBtn={true}/>
    </Layout>
  )
}

export const getStaticProps = async () =>
{
    const activitiesRes = await axios(`${API_URL}activities?offset=2&limit=5`);

    const citiesRes = await axios(`${API_URL}cities?limit=7&without_events=yes`);

    return {
      props: {
        activities: activitiesRes.data,
        cities: citiesRes.data
      }
    };
};