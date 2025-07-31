import SlideShow from "../../components/slideShow";
import SearchBar from "../../components/search";
import EventListPage from "../evenList/page";

export default function HomePage() {
    return (
        <div>
            <SearchBar />
            <SlideShow />
            <EventListPage />
        </div>
    )
}