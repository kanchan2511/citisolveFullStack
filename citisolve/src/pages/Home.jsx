
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css'


const Home = () => {
  const { user } = useAuth();

  return (
    <main>
      {/* Hero section*/ }
      <div className="hero-container">
        <h1>Citizen Resolution System</h1>
        <p>
          Report and track community issues efficiently. Your voice matters in
          building a better community.
        </p>
      </div>
      {/* render based on login or logout state */}
      {user ? (
        <>
        <div className="welcome-card">
          <p>
            Welcome back,<span>{user}
              </span>
          </p>
        </div>
         {/* Quick actions section*/}
         <section>
            <h2 className='section-title'>Quick Actions</h2>
            <div className='actions-grid'>
                    { /*card 1 */}
                  <div className='action-card'>
                      <h3>Submit Complaint</h3>
                      <p>Report a new issue in your community</p>
                      <button>Submit Now</button>
                  </div>
                   { /*card 2 */}
                   <div className='action-card'>
                     <h3>My Complaint</h3>
                     <p>Track the status of your submitted complaints</p>
                     <button>View Complaints</button>
                   </div>
            </div>
         </section>
        </>
      ) : (
        <>
          <div className="buttons">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
      <section className='how-section'>
         <h1 className='how-title'>How it works</h1>
          <div className="features">      
            <div>
              <div>1</div>
              <h4>Register</h4>
              <p>Create your account as a citizen</p>
            </div>
            <div>
              <div>2</div>
              <h4>Submit</h4>
              <p>Report issues with details and photos</p>
            </div>
            <div>
              <div>3</div>
              <h4>Track</h4>
              <p>Monitor progress and status updates</p>
            </div>
          </div>
           </section>
          <div className="get-started">
            <h1>Ready to Get Started?</h1>
            <p>Join our community and help make a difference</p>
            <div>
              <Link to="/register">Create Account</Link>
              <Link to="/login">Sign In</Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;


