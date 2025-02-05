import HeroSection from "../components/heroSection";
import ImproveSkill from "../components/ImproveSkill";
import QouteSection from "../components/QouteSection";
import ChiefSection from "../components/ChiefSection";
import Layout from "./Layout";

export default function Home() {
    return (
        <Layout>
            <div>
                <HeroSection />
                <ImproveSkill />
                <QouteSection />
                <ChiefSection />
            </div>
        </Layout>
    )
}