import '../styles/home.css'

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import FeaturedInfo from './FeaturedInfo'
import WidgetSm from './WidgetSm';

function Home() {

  return (
    <div>
    <Topbar />
      <div className="admincontainer">
        <Sidebar />
    <div className="home">
       <FeaturedInfo />
      <div className="homeWidgets">
        <WidgetSm/>
      </div>
    </div>
    </div>
</div>
  );
}
export default Home;