import '../styles/home.css'
import Coins from './Coins';
import HomeTrips from './HomeTrips';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function Home() {
  return (
    <div>
    <Topbar />
      <div className="admincontainer">
        <Sidebar />
    <div className="home">

      <div className="homeWidgets">
        
      </div>
    </div>
    </div>
</div>
  );
}
export default Home;